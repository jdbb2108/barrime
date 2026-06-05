import { NextResponse } from "next/server";
import { google } from "googleapis";

export const dynamic = "force-dynamic";

function getPrivateKeyInfo() {
  const raw = process.env.GOOGLE_PRIVATE_KEY ?? "";
  const normalized = raw.replace(/\\n/g, "\n").trim();

  return {
    present: Boolean(raw),
    startsCorrectly: normalized.startsWith("-----BEGIN PRIVATE KEY-----"),
    endsCorrectly: normalized.endsWith("-----END PRIVATE KEY-----"),
    length: raw.length,
    hasEscapedNewlines: raw.includes("\\n"),
    hasRealNewlines: raw.includes("\n"),
    normalized,
  };
}

export async function GET() {
  const privateKey = getPrivateKeyInfo();
  const config = {
    serviceAccountEmail: {
      present: Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL),
      value: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? null,
    },
    spreadsheetId: {
      present: Boolean(process.env.GOOGLE_SHEETS_SPREADSHEET_ID),
    },
    responsesRange: process.env.GOOGLE_SHEETS_RESPONSES_RANGE ?? "Responses!A:Q",
    visitsRange: process.env.GOOGLE_SHEETS_VISITS_RANGE ?? "Visits!A:E",
    privateKey: {
      present: privateKey.present,
      startsCorrectly: privateKey.startsCorrectly,
      endsCorrectly: privateKey.endsCorrectly,
      length: privateKey.length,
      hasEscapedNewlines: privateKey.hasEscapedNewlines,
      hasRealNewlines: privateKey.hasRealNewlines,
    },
  };

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey.normalized,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "Responses!A1:Q1",
    });

    return NextResponse.json({
      ok: true,
      config,
      sheets: {
        canRead: true,
        headerColumns: response.data.values?.[0]?.length ?? 0,
      },
    });
  } catch (err) {
    const error = err as {
      code?: number | string;
      message?: string;
      errors?: unknown;
    };

    return NextResponse.json(
      {
        ok: false,
        config,
        googleError: {
          code: error.code ?? null,
          message: error.message ?? "Unknown error",
          errors: error.errors ?? null,
        },
      },
      { status: 500 }
    );
  }
}
