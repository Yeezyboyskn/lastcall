import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Redis } from "@upstash/redis";
import { z } from "zod";

const POWER_AUTOMATE_WEBHOOK = process.env.POWER_AUTOMATE_WEBHOOK_URL;

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN
  ? new Redis({ url: UPSTASH_REDIS_REST_URL, token: UPSTASH_REDIS_REST_TOKEN })
  : null;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;

const FormSchema = z.object({
  name: z.string().min(3, "Nombre muy corto"),
  role: z.string().min(2, "Cargo requerido"),
  email: z.string().email("Correo inválido"),
  phone: z.string().regex(/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{4,6}$/, "Teléfono inválido"),
  company: z.string().min(2, "Empresa requerida"),
  country: z.enum(["Chile", "Perú", "Otro país de LATAM"]),
  companySize: z.enum(["30 a 49 colaboradores", "50 a 99 colaboradores", "100 a 299 colaboradores", "300 o más colaboradores"]),
  consent: z.boolean().refine((v) => v === true, "Debes autorizar el contacto"),
  twentyFiveUsers: z.boolean().refine((v) => v === true, "Confirma participación de usuarios"),
  dataProcessing: z.boolean().refine((v) => v === true, "Debes autorizar tratamiento de datos"),
  _honey: z.string().optional(),
});

function getClientIp(request: VercelRequest): string {
  const forwarded = request.headers["x-forwarded-for"];
  if (forwarded) {
    return (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(",")[0]).trim();
  }
  return (request.headers["x-real-ip"] as string) || "unknown";
}

async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  if (!redis) {
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS, resetTime: Date.now() + RATE_LIMIT_WINDOW_MS };
  }

  const key = `ratelimit:${ip}`;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  await redis.zremrangebyscore(key, 0, windowStart);
  await redis.zadd(key, { score: now, member: `${now}:${Math.random()}` });
  await redis.expire(key, Math.ceil(RATE_LIMIT_WINDOW_MS / 1000));

  const currentCount = await redis.zcard(key);

  if (currentCount > RATE_LIMIT_MAX_REQUESTS) {
    const oldest = await redis.zrange(key, 0, 0, { withScores: true });
    const resetTime = oldest.length > 0 ? Number((oldest[0] as { score: number }).score) + RATE_LIMIT_WINDOW_MS : now + RATE_LIMIT_WINDOW_MS;
    return { allowed: false, remaining: 0, resetTime };
  }

  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - currentCount, resetTime: now + RATE_LIMIT_WINDOW_MS };
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Método no permitido" });
  }

  if (!POWER_AUTOMATE_WEBHOOK) {
    return response.status(500).json({ error: "Webhook no configurado" });
  }

  const clientIp = getClientIp(request);
  const rateLimit = await checkRateLimit(clientIp);

  response.setHeader("X-RateLimit-Limit", RATE_LIMIT_MAX_REQUESTS.toString());
  response.setHeader("X-RateLimit-Remaining", rateLimit.remaining.toString());
  response.setHeader("X-RateLimit-Reset", new Date(rateLimit.resetTime).toISOString());

  if (!rateLimit.allowed) {
    const retryAfter = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
    response.setHeader("Retry-After", retryAfter.toString());
    return response.status(429).json({
      error: "Demasiadas solicitudes. Intenta nuevamente más tarde.",
      retryAfter,
    });
  }

  try {
    const body = request.body as Record<string, unknown>;

    if (body._honey && typeof body._honey === "string" && body._honey.length > 0) {
      return response.status(200).json({ success: true });
    }

    const parsed = FormSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return response.status(400).json({ error: firstError.message });
    }

    const webhookResponse = await fetch(POWER_AUTOMATE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error("Power Automate error:", webhookResponse.status, errorText);
      return response.status(502).json({ error: "Error al procesar la postulación" });
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Submit form error:", error);
    return response.status(500).json({ error: "Error interno del servidor" });
  }
}