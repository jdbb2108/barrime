import { NextRequest, NextResponse } from "next/server";
import { appendRow } from "@/lib/googleSheets";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp, nowISO } from "@/lib/utils";

interface VisitPayload {
  refSlug?: string;
  source?: string;
  path?: string;
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    // Silencioso — no queremos interrumpir la experiencia por un rate limit de visita
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  let body: VisitPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // Columnas: created_at, ref_slug, source, path, user_agent
  const row = [
    nowISO(),
    body.refSlug ?? "",
    body.source ?? "unknown",
    body.path ?? "/",
    request.headers.get("user-agent") ?? "",
  ];

  try {
    await appendRow(
      process.env.GOOGLE_SHEETS_VISITS_RANGE ?? "Visits!A:E",
      row
    );
  } catch (err) {
    // Silencioso — el registro de visitas no debe romper la experiencia
    console.error("[api/visits] Error guardando en Sheets:", err);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
