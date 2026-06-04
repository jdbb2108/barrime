import type { ResponsePayload } from "@/types/response";

type Source = ResponsePayload["source"];

/**
 * Infiere el origen del tráfico a partir del slug ref y el
 * encabezado Referer del request.
 */
export function inferSource(
  refSlug: string | undefined,
  referer: string | undefined
): Source {
  if (refSlug) {
    // Si el slug es "instagram" o contiene "ig_", tráfico directo de Instagram
    if (refSlug.toLowerCase().startsWith("ig")) return "instagram";
    return "friend";
  }

  if (referer) {
    if (referer.includes("instagram.com")) return "instagram";
  }

  return "direct";
}
