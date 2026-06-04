import type { ResponsePayloadRaw } from "@/types/response";

const VALID_FEELINGS = [
  "curious",
  "nice",
  "weird_but_interesting",
  "no_fit",
  "thinking",
];

const VALID_CONTACT_METHODS = [
  "instagram",
  "call",
  "coffee",
  "walk",
  "gym",
  "other",
  "thinking",
];

const VALID_WANTS_CONTACT = ["yes", "yes_instagram", "maybe", "no"];
const VALID_ALTERNATE_INTENTS = [
  "friendship",
  "business",
  "idea",
  "conversation",
  "no",
];

export interface ValidationError {
  field: string;
  message: string;
}

export function validateResponse(body: ResponsePayloadRaw): ValidationError[] {
  const errors: ValidationError[] = [];

  // feeling es obligatorio
  if (!body.feeling) {
    errors.push({ field: "feeling", message: "Este campo es obligatorio." });
  } else if (!VALID_FEELINGS.includes(body.feeling)) {
    errors.push({ field: "feeling", message: "Respuesta no válida." });
  }

  // preferredContactMethod — opcional pero debe ser válido si se envía
  if (
    body.preferredContactMethod &&
    !VALID_CONTACT_METHODS.includes(body.preferredContactMethod)
  ) {
    errors.push({
      field: "preferredContactMethod",
      message: "Opción no válida.",
    });
  }

  // wantsContact — opcional pero debe ser válido si se envía
  if (
    body.wantsContact &&
    !VALID_WANTS_CONTACT.includes(body.wantsContact)
  ) {
    errors.push({ field: "wantsContact", message: "Opción no válida." });
  }

  if (
    body.alternateIntent &&
    !VALID_ALTERNATE_INTENTS.includes(body.alternateIntent)
  ) {
    errors.push({ field: "alternateIntent", message: "Opción no válida." });
  }

  // contactValue — máx 100 chars, no teléfonos
  if (body.contactValue) {
    if (body.contactValue.length > 100) {
      errors.push({
        field: "contactValue",
        message: "Máximo 100 caracteres.",
      });
    }
    // Rechazar números de teléfono (10+ dígitos consecutivos)
    if (/\d{10,}/.test(body.contactValue.replace(/\s/g, ""))) {
      errors.push({
        field: "contactValue",
        message: "Por favor deja tu Instagram, no un número de teléfono.",
      });
    }
  }

  // note — máx 500 chars
  if (body.note && body.note.length > 500) {
    errors.push({ field: "note", message: "Máximo 500 caracteres." });
  }

  for (const field of ["projectName", "projectStage", "projectChallenge"] as const) {
    if (body[field] && body[field]!.length > 500) {
      errors.push({ field, message: "Máximo 500 caracteres." });
    }
  }

  // consent — obligatorio si deja contacto, proyecto o autoriza conexión.
  const needsConsent =
    body.contactValue ||
    body.projectName ||
    body.projectStage ||
    body.projectChallenge ||
    body.wantsContact === "yes" ||
    body.wantsContact === "yes_instagram" ||
    ["friendship", "business", "idea", "conversation"].includes(body.alternateIntent ?? "");

  if (needsConsent && !body.consent) {
    errors.push({
      field: "consent",
      message: "Necesitas aceptar antes de continuar.",
    });
  }

  return errors;
}
