"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Feeling, ContactMethod, WantsContact, AlternateIntent } from "@/types/response";

interface Props {
  refSlug?: string;
  source?: string;
}

type Step = 1 | 2 | 3 | 4 | 5;

const FEELINGS: { value: Feeling; label: string; emoji: string }[] = [
  { value: "curious",              label: "Sí, me dio curiosidad",              emoji: "✨" },
  { value: "nice",                 label: "Tal vez, me pareció interesante",    emoji: "🌸" },
  { value: "weird_but_interesting",label: "Me pareció raro, pero en el buen sentido", emoji: "🤔" },
  { value: "no_fit",               label: "No, gracias. Responder directamente", emoji: "🙏" },
  { value: "thinking",             label: "Prefiero pensarlo",                  emoji: "💭" },
];

const CONTACT_METHODS: { value: ContactMethod; label: string; emoji: string }[] = [
  { value: "instagram", label: "Instagram primero",  emoji: "📱" },
  { value: "coffee",    label: "Un café",            emoji: "☕" },
  { value: "gym",       label: "Entrenar en gimnasio", emoji: "🏋️" },
  { value: "other",     label: "Otro plan",          emoji: "💡" },
  { value: "thinking",  label: "Prefiero pensarlo",  emoji: "💭" },
];

const WANTS_CONTACT: { value: WantsContact; label: string }[] = [
  { value: "yes_instagram", label: "Sí, te dejo mi Instagram" },
  { value: "yes",           label: "Sí, te dejo una forma de contacto" },
  { value: "maybe",         label: "Tal vez, prefiero dejar una nota" },
  { value: "no",            label: "No por ahora" },
];

const ALTERNATE_INTENTS: { value: AlternateIntent; label: string }[] = [
  { value: "friendship", label: "Sí, me caíste bien y podría haber amistad" },
  { value: "business", label: "Tengo una empresa o proyecto" },
  { value: "idea", label: "Tengo una idea que estoy construyendo" },
  { value: "conversation", label: "Podría haber una conversación interesante" },
  { value: "no", label: "No por ahora, pero gracias" },
];

function isOpen(f: Feeling | "") {
  return ["curious", "nice", "weird_but_interesting", "thinking"].includes(f);
}
function wantsContact(w: WantsContact | "") {
  return w === "yes" || w === "yes_instagram";
}

function needsConsentForResponse({
  contactValue,
  projectName,
  projectStage,
  projectChallenge,
  wantsContactValue,
  alternateIntentValue,
}: {
  contactValue: string;
  projectName: string;
  projectStage: string;
  projectChallenge: string;
  wantsContactValue: WantsContact | "";
  alternateIntentValue: AlternateIntent | "";
}) {
  return Boolean(
    contactValue ||
      projectName ||
      projectStage ||
      projectChallenge ||
      wantsContact(wantsContactValue) ||
      ["friendship", "business", "idea", "conversation"].includes(alternateIntentValue)
  );
}

const stepAnchors: Record<Step, string> = {
  1: "response-step-1",
  2: "response-step-2",
  3: "response-step-3",
  4: "response-step-4",
  5: "response-step-5",
};

function Q({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[17px] font-medium leading-snug" style={{ color: "var(--t1)" }}>
      {children}
    </p>
  );
}

function Opt({
  selected, onClick, emoji, children,
}: {
  selected: boolean; onClick: () => void; emoji?: string; children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left px-4 py-3.5 rounded-2xl text-[15px] min-h-[48px]
                 flex items-center gap-3 transition-all duration-150 active:scale-[0.98]"
      style={selected ? {
        background: "var(--pink)",
        border: "1px solid var(--pink)",
        color: "#fff",
        fontWeight: 500,
      } : {
        background: "var(--surface2)",
        border: "1px solid var(--border)",
        color: "var(--t2)",
      }}
      onMouseEnter={e => {
        if (!selected) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--pink)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--t1)";
        }
      }}
      onMouseLeave={e => {
        if (!selected) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--t2)";
        }
      }}
    >
      {emoji && <span className="text-base leading-none">{emoji}</span>}
      <span className="flex-1">{children}</span>
      {selected && <span className="text-white/60 text-xs">✓</span>}
    </button>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
      <span className="text-[11px] tracking-widest uppercase font-medium" style={{ color: "var(--t3)" }}>
        {label}
      </span>
      <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
    </div>
  );
}

export default function ResponseForm({ refSlug, source }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLElement>(null);

  const [step, setStep]                 = useState<Step>(1);
  const [feeling, setFeeling]           = useState<Feeling | "">("");
  const [contactMethod, setContactMethod] = useState<ContactMethod | "">("");
  const [wContact, setWContact]         = useState<WantsContact | "">("");
  const [alternateIntent, setAlternateIntent] = useState<AlternateIntent | "">("");
  const [note, setNote]                 = useState("");
  const [contactValue, setContactValue] = useState("");
  const [projectName, setProjectName]   = useState("");
  const [projectStage, setProjectStage] = useState("");
  const [projectChallenge, setProjectChallenge] = useState("");
  const [consent, setConsent]           = useState(false);
  const [submitting, setSubmitting]     = useState(false);
  const [serverError, setServerError]   = useState("");

  function next(n: Step) {
    setStep(n);
    setTimeout(() => {
      const target = document.getElementById(stepAnchors[n]);
      const top = target
        ? target.getBoundingClientRect().top + window.scrollY - 96
        : (formRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 96;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });
    }, 80);
  }

  async function submit(overrides?: {
    feeling?: Feeling;
    preferredContactMethod?: ContactMethod;
    wantsContact?: WantsContact;
    alternateIntent?: AlternateIntent;
    contactValue?: string;
    projectName?: string;
    projectStage?: string;
    projectChallenge?: string;
    note?: string;
    consent?: boolean;
  }) {
    setSubmitting(true);
    setServerError("");

    const finalFeeling = overrides?.feeling ?? feeling;
    const finalContactMethod = overrides?.preferredContactMethod ?? contactMethod;
    const finalWantsContact = overrides?.wantsContact ?? wContact;
    const finalAlternateIntent = overrides?.alternateIntent ?? alternateIntent;
    const finalContactValue = overrides?.contactValue ?? contactValue.trim();
    const finalProjectName = overrides?.projectName ?? projectName.trim();
    const finalProjectStage = overrides?.projectStage ?? projectStage.trim();
    const finalProjectChallenge = overrides?.projectChallenge ?? projectChallenge.trim();
    const finalNote = overrides?.note ?? note.trim();
    const finalConsent = overrides?.consent ?? consent;
    const needsConsent = needsConsentForResponse({
      contactValue: finalContactValue,
      projectName: finalProjectName,
      projectStage: finalProjectStage,
      projectChallenge: finalProjectChallenge,
      wantsContactValue: finalWantsContact,
      alternateIntentValue: finalAlternateIntent,
    });

    try {
      const res = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refSlug: refSlug ?? undefined,
          source: source ?? "unknown",
          feeling: finalFeeling,
          preferredContactMethod: finalContactMethod || undefined,
          wantsContact: finalWantsContact || undefined,
          alternateIntent: finalAlternateIntent || undefined,
          contactValue: finalContactValue || undefined,
          projectName: finalProjectName || undefined,
          projectStage: finalProjectStage || undefined,
          projectChallenge: finalProjectChallenge || undefined,
          note: finalNote || undefined,
          consent: needsConsent ? finalConsent : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setServerError(data?.error ?? "Revisa la respuesta e intenta de nuevo.");
        setSubmitting(false);
        return;
      }

      const intent =
        finalAlternateIntent === "business" || finalAlternateIntent === "idea"
          ? "project"
          : finalAlternateIntent === "friendship" || finalAlternateIntent === "conversation"
            ? "friendship"
            : finalFeeling === "no_fit"
              ? "pass"
              : "open";
      router.push(`/gracias?intent=${intent}`);
    } catch {
      setServerError("Hubo un problema de conexión. Intenta de nuevo.");
      setSubmitting(false);
    }
  }

  function submitDirectNo() {
    setFeeling("no_fit");
    setWContact("no");
    submit({
      feeling: "no_fit",
      wantsContact: "no",
      alternateIntent: "no",
      contactValue: "",
      note: "",
      consent: false,
    });
  }

  const submitNeedsConsent = needsConsentForResponse({
    contactValue: contactValue.trim(),
    projectName: projectName.trim(),
    projectStage: projectStage.trim(),
    projectChallenge: projectChallenge.trim(),
    wantsContactValue: wContact,
    alternateIntentValue: alternateIntent,
  });

  return (
    <section id="response-form" ref={formRef} className="py-12 px-5">
      <div className="max-w-reading mx-auto flex flex-col gap-5">

        <div className="flex flex-col gap-2">
          <p className="section-label">Decisión simple</p>
          <h2 className="text-xl font-semibold leading-snug" style={{ color: "#FFFFFF" }}>
            Después de leer esto, ¿te hace sentido seguir conversando?
          </h2>
          <p className="text-[14px]" style={{ color: "var(--t3)" }}>
            Sin presión. Cualquier respuesta está bien.
          </p>
        </div>

        <div className="card flex flex-col gap-6">

          {/* Paso 1 — Sensación */}
          <div id="response-step-1" className="flex flex-col gap-3 scroll-mt-24">
            <Q>Después de ver esto, ¿qué sensación te quedó?</Q>
            <div className="flex flex-col gap-2">
              {FEELINGS.map(f => (
                <Opt key={f.value} selected={feeling === f.value} emoji={f.emoji}
                  onClick={() => {
                    if (f.value === "no_fit") {
                      setFeeling(f.value);
                      if (step === 1) next(4);
                      return;
                    }

                    setFeeling(f.value);
                    if (step === 1) next(isOpen(f.value) ? 2 : 4);
                  }}>
                  {f.label}
                </Opt>
              ))}
            </div>
          </div>

          {/* Paso 2 — Modo de contacto */}
          {step >= 2 && isOpen(feeling) && (<>
            <Divider label="si habláramos" />
            <div id="response-step-2" className="flex flex-col gap-3 scroll-mt-24">
              <Q>¿Qué te haría sentir más cómoda?</Q>
              <div className="flex flex-col gap-2">
                {CONTACT_METHODS.map(m => (
                  <Opt key={m.value} selected={contactMethod === m.value} emoji={m.emoji}
                    onClick={() => { setContactMethod(m.value); if (step === 2) next(3); }}>
                    {m.label}
                  </Opt>
                ))}
              </div>
            </div>
          </>)}

          {/* Paso 3 — Señal */}
          {step >= 3 && isOpen(feeling) && (<>
            <Divider label="contacto" />
            <div id="response-step-3" className="flex flex-col gap-3 scroll-mt-24">
              <Q>¿Quieres dejarme una señal?</Q>
              <p className="text-sm leading-relaxed" style={{ color: "#FFFFFF" }}>
                Puedes dejar tu Instagram o una forma de contacto si te nace. No tienes
                que hacerlo.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {WANTS_CONTACT.map(w => (
                  <Opt key={w.value} selected={wContact === w.value}
                    onClick={() => { setWContact(w.value); if (step === 3) next(5); }}>
                    {w.label}
                  </Opt>
                ))}
              </div>
            </div>
          </>)}

          {/* Paso 4 — Alternativa si no hay match */}
          {step >= 4 && feeling === "no_fit" && (<>
            <Divider label="otra puerta" />
            <div id="response-step-4" className="flex flex-col gap-3 scroll-mt-24">
              <Q>Aunque no haya match, ¿te haría sentido conectar desde otro lugar?</Q>
              <p className="text-sm leading-relaxed" style={{ color: "#FFFFFF" }}>
                También me interesa conocer personas interesantes, hacer amistades reales
                y conversar con gente que esté construyendo algo.
              </p>
              <div className="flex flex-col gap-2">
                {ALTERNATE_INTENTS.map(intent => (
                  <Opt
                    key={intent.value}
                    selected={alternateIntent === intent.value}
                    onClick={() => {
                      setAlternateIntent(intent.value);
                      if (intent.value === "no") {
                        submitDirectNo();
                        return;
                      }
                      if (step === 4) next(5);
                    }}
                  >
                    {intent.label}
                  </Opt>
                ))}
              </div>
            </div>
          </>)}

          {/* Paso 5 — Proyecto o contacto */}
          {step >= 5 && ["business", "idea"].includes(alternateIntent) && (
            <div id="response-step-5" className="flex flex-col gap-4 scroll-mt-24">
              <Divider label="proyecto" />
              <Q>Cuéntame rápido qué estás construyendo.</Q>
              <input
                type="text"
                value={projectName}
                onChange={e => setProjectName(e.target.value.slice(0, 500))}
                placeholder="Nombre del proyecto o empresa"
                className="input-base"
              />
              <input
                type="text"
                value={projectStage}
                onChange={e => setProjectStage(e.target.value.slice(0, 500))}
                placeholder="¿En qué etapa está?"
                className="input-base"
              />
              <textarea
                value={projectChallenge}
                onChange={e => setProjectChallenge(e.target.value.slice(0, 500))}
                placeholder="¿Qué estás intentando resolver ahora?"
                rows={3}
                className="input-base resize-none"
              />
            </div>
          )}

          {step >= 5 && (isOpen(feeling) || ["friendship", "conversation", "business", "idea"].includes(alternateIntent)) && (
            <div id={!["business", "idea"].includes(alternateIntent) ? "response-step-5" : undefined} className="flex flex-col gap-3 scroll-mt-24">
              <Q>Instagram o forma de contacto.</Q>
              <input
                type="text"
                value={contactValue}
                onChange={e => setContactValue(e.target.value.slice(0, 100))}
                placeholder="@tuusuario, email o forma de contacto"
                maxLength={100}
                className="input-base"
              />
            </div>
          )}

          {/* Nota opcional */}
          {step >= 5 && (<>
            <Divider label="opcional" />
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <Q>Déjame una nota si quieres.</Q>
                <span className="text-xs" style={{ color: "var(--t3)" }}>{note.length}/500</span>
              </div>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value.slice(0, 500))}
                placeholder="Lo que quieras…"
                rows={3}
                className="input-base resize-none"
              />
            </div>
          </>)}

          {/* Consentimiento */}
          {step >= 5 && (
            <label
              className="flex gap-3 items-start cursor-pointer p-4 rounded-2xl"
              style={{
                background: "color-mix(in srgb, var(--pink) 6%, var(--surface2))",
                border: "1px solid color-mix(in srgb, var(--pink) 20%, var(--border))",
              }}
            >
              <input
                type="checkbox"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 flex-shrink-0 accent-pink-400"
              />
              <span className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
                Acepto que José use esta información únicamente para saber si hay interés
                mutuo o una conversación útil y, si yo lo autoricé, escribirme una vez.
                No se comparte con terceros.
              </span>
            </label>
          )}

          {/* Error */}
          {serverError && (
            <p className="text-red-400 text-sm bg-red-950/30 rounded-2xl px-4 py-3 border border-red-900/40">
              {serverError}
            </p>
          )}

          {/* Botones de acción */}
          {step >= 5 && (
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={() => submit()}
                disabled={submitting || !feeling || (submitNeedsConsent && !consent)}
                className="flex-1 btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Enviando…
                  </span>
                ) : "Enviar señal"}
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

