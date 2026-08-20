import type { VercelRequest, VercelResponse } from "@vercel/node";

const POWER_AUTOMATE_WEBHOOK = process.env.POWER_AUTOMATE_WEBHOOK_URL;

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