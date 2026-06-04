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
      "Laura pensó que podríamos tener una buena conversación.",
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
  return referrers[slug.toLowerCase()] ?? null;
}
