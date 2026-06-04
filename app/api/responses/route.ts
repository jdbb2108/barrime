import { NextRequest, NextResponse } from "next/server";
import { appendRow } from "@/lib/googleSheets";
import { validateResponse } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rateLimit";
import { sanitizeText, getClientIp, nowISO } from "@/lib/utils";
import type { ResponsePayloadRaw } from "@/types/response";

function getResponsesRange() {
  const configured = process.env.GOOGLE_SHEETS_RESPONSES_RANGE;
  if (!configured) return "Responses!A:O";

  // Older deployments used A:K. The current payload writes 15 columns.
  return configured.replace(/!A:K$/i, "!A:O");
}

export async function POST(request: NextRequest) {
  // 1. Rate limiting — la IP nunca se guarda en Sheets
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera un momento y vuelve a intentarlo." },
      { status: 429 }
    );
  }

  // 2. Parsear body
  let body: ResponsePayloadRaw;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // 3. Validar
  const errors = validateResponse(body);
  if (errors.length > 0) {
    return NextResponse.json(
      { error: errors[0]?.message ?? "Revisa la respuesta e intenta de nuevo.", errors },
      { status: 422 }
    );
  }

  // 4. Sanitizar texto libre
  const note = sanitizeText(body.note);
  const contactValue = sanitizeText(body.contactValue);
  const projectName = sanitizeText(body.projectName);
  const projectStage = sanitizeText(body.projectStage);
  const projectChallenge = sanitizeText(body.projectChallenge);

  // 5. Guardar en Sheets
  // Columnas: created_at, ref_slug, source, feeling, preferred_contact_method,
  // wants_contact, alternate_intent, contact_value, project_name, project_stage,
  // project_challenge, note, consent, status, user_agent
  const row = [
    nowISO(),
    body.refSlug ?? "",
    body.source ?? "unknown",
    body.feeling ?? "",
    body.preferredContactMethod ?? "",
    body.wantsContact ?? "",
    body.alternateIntent ?? "",
    contactValue,
    projectName,
    projectStage,
    projectChallenge,
    note,
    body.consent ? "TRUE" : "FALSE",
    "new",
    request.headers.get("user-agent") ?? "",
  ];

  try {
    await appendRow(getResponsesRange(), row);
  } catch (err) {
    console.error("[api/responses] Error guardando en Sheets:", err);
    return NextResponse.json(
      { error: "Hubo un problema al guardar tu respuesta. Intenta de nuevo." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
