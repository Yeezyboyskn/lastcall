import type { VercelRequest, VercelResponse } from "@vercel/node";

const POWER_AUTOMATE_WEBHOOK = process.env.POWER_AUTOMATE_WEBHOOK_URL;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}

function getClientIp(request: VercelRequest): string {
  const forwarded = request.headers["x-forwarded-for"];
  if (forwarded) {
    return (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(",")[0]).trim();
  }
  return request.headers["x-real-ip"] as string || "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  cleanupRateLimitStore();

  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetTime < now) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    };
    rateLimitStore.set(ip, newEntry);
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetTime: newEntry.resetTime };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - entry.count, resetTime: entry.resetTime };
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
  const rateLimit = checkRateLimit(clientIp);

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
    const body = request.body;

    const requiredFields = [
      "name", "role", "email", "phone", "company",
      "country", "companySize", "consent", "twentyFiveUsers", "dataProcessing"
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return response.status(400).json({ error: `Campo requerido faltante: ${field}` });
      }
    }

    if (typeof body.consent !== "boolean" || typeof body.twentyFiveUsers !== "boolean" || typeof body.dataProcessing !== "boolean") {
      return response.status(400).json({ error: "Los campos de consentimiento deben ser booleanos" });
    }

    const webhookResponse = await fetch(POWER_AUTOMATE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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