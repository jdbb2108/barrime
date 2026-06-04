import { google } from "googleapis";

/**
 * Crea un cliente autenticado de Google Sheets usando Service Account.
 * Las credenciales nunca se exponen al frontend.
 */
function getAuth() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

/**
 * Agrega una fila al final del rango indicado.
 */
export async function appendRow(
  range: string,
  values: (string | boolean | number | null)[]
) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });
}

/**
 * Lee el número de filas en un rango (para el contador del admin).
 * Devuelve 0 si no hay datos o hay error.
 */
export async function countRows(range: string): Promise<number> {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range,
    });

    const rows = res.data.values ?? [];
    // Restar 1 para no contar el encabezado
    return Math.max(0, rows.length - 1);
  } catch {
    return 0;
  }
}
