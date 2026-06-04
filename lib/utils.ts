/**
 * Sanitiza texto libre: trim + colapsa espacios múltiples.
 * No hace HTML-encoding porque Sheets no lo necesita.
 */
export function sanitizeText(input: string | undefined): string {
  if (!input) return "";
  return input.trim().replace(/\s{2,}/g, " ");
}

/**
 * Devuelve la IP del cliente desde los headers de Vercel/Next.js.
 * Solo se usa para rate limiting — nunca se guarda en Sheets.
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

/**
 * Formatea una fecha al formato ISO 8601 con timezone Colombia (UTC-5).
 */
export function nowISO(): string {
  return new Date().toISOString();
}

/**
 * cn — concatena clases de Tailwind condicionalmente.
 * Versión mínima sin dependencias externas.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
