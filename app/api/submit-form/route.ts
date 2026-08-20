import { NextRequest, NextResponse } from "next/server";

const POWER_AUTOMATE_WEBHOOK = process.env.POWER_AUTOMATE_WEBHOOK_URL;

export async function POST(request: NextRequest) {
  if (!POWER_AUTOMATE_WEBHOOK) {
    return NextResponse.json(
      { error: "Webhook no configurado" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    const requiredFields = [
      "name", "role", "email", "phone", "company",
      "country", "companySize", "consent", "twentyFiveUsers", "dataProcessing"
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Campo requerido faltante: ${field}` },
          { status: 400 }
        );
      }
    }

    const response = await fetch(POWER_AUTOMATE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Power Automate error:", response.status, errorText);
      return NextResponse.json(
        { error: "Error al procesar la postulación" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submit form error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}