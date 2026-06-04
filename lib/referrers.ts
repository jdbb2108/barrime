import type { ReferrersMap } from "@/types/referrer";

/**
 * Referentes reales que pueden compartir el link.
 * IMPORTANTE: Solo personas reales aquí.
 * El origen "instagram" (contacto directo) se maneja con
 * source: "instagram" en el payload — no como referente.
 */
export const referrers: ReferrersMap = {
  laura: {
    name: "Laura",
    relationship: "amiga",
    customNote:
      "Laura pensó que valía la pena que llegaras hasta aquí. No como presión, más como una pequeña señal de confianza.",
  },
  // Agrega más personas aquí según sea necesario:
  // andres: {
  //   name: "Andrés",
  //   relationship: "amigo",
  //   customNote: "Andrés pensó que podría interesarte esto.",
  // },
};

export function getReferrer(slug: string | undefined) {
  if (!slug) return null;
  const normalized = slug.toLowerCase();
  const knownReferrer = referrers[normalized];
  if (knownReferrer) return knownReferrer;
  if (normalized.startsWith("ig")) return null;

  return {
    name: slug
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase()),
    relationship: "referido",
    customNote:
      "Alguien te compartió esto con intención. No significa que tengas que responder nada; solo que llegaste por una puerta un poquito más humana que un link suelto.",
  };
}
