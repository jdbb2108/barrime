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
      "Laura cree que aquí podría haber una buena conversación o, mínimo, una curiosidad bien puesta.",
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
    name: "alguien en común",
    relationship: "referido",
    customNote:
      "Alguien en común cree que hay cositas. Puede que sí, puede que no; por eso esta vuelta existe.",
  };
}
