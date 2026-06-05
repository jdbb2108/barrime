import { NextRequest, NextResponse } from "next/server";
import { appendRow, updateRange } from "@/lib/googleSheets";
import { validateResponse } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rateLimit";
import { sanitizeText, getClientIp, nowISO } from "@/lib/utils";
import type { ResponsePayloadRaw } from "@/types/response";

function getResponsesRange() {
  const configured = process.env.GOOGLE_SHEETS_RESPONSES_RANGE;
  if (!configured) return "Responses!A:Q";

  // Older deployments used A:K/A:O. The current payload writes 17 columns.
  return configured.replace(/!A:(K|O)$/i, "!A:Q");
}

const RESPONSE_HEADERS = [
  "created_at",
  "ref_slug",
  "source",
  "feeling",
  "relationship_status",
  "openness",
  "preferred_contact_method",
  "wants_contact",
  "alternate_intent",
  "contact_value",
  "project_name",
  "project_stage",
  "project_challenge",
  "note",
  "consent",
  "status",
  "user_agent",
];

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
  const row = [
    nowISO(),
    body.refSlug ?? "",
    body.source ?? "unknown",
    body.feeling ?? "",
    body.relationshipStatus ?? "",
    body.openness ?? "",
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
    await updateRange("Responses!A1:Q1", [RESPONSE_HEADERS]);
    await appendRow(getResponsesRange(), row);
  } catch (err) {
    console.error("[api/responses] Error guardando en Sheets:", err);
    return NextResponse.json(
      {
        error: "No se pudo guardar en Sheets. Revisa las variables de Google en Vercel.",
        saved: false,
        warning: "sheets_append_failed",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, saved: true }, { status: 200 });
}
