"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  Feeling,
  ContactMethod,
  WantsContact,
  AlternateIntent,
  RelationshipStatus,
  Openness,
} from "@/types/response";

interface Props {
  refSlug?: string;
  source?: string;
  referrerName?: string;
}

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const FEELINGS: { value: Feeling; label: string; emoji: string }[] = [
  { value: "curious",              label: "Sí, me dio curiosidad",              emoji: "✨" },
  { value: "nice",                 label: "Me cayó bien la energía",            emoji: "🙂" },
  { value: "weird_but_interesting",label: "Raro, pero en el buen sentido",       emoji: "🤔" },
  { value: "no_fit",               label: "No lo veo, pero respondo con cariño", emoji: "🙏" },
  { value: "thinking",             label: "Lo pensaría con calma",              emoji: "💭" },
];

const CONTACT_METHODS: { value: ContactMethod; label: string; emoji: string }[] = [
  { value: "instagram", label: "Instagram primero",  emoji: "📱" },
  { value: "coffee",    label: "Un café tranquilo",  emoji: "☕" },
  { value: "gym",       label: "Entrenar en gimnasio", emoji: "🏋️" },
  { value: "other",     label: "Algo más espontáneo", emoji: "💡" },
  { value: "thinking",  label: "Primero lo pensaría", emoji: "💭" },
];

const RELATIONSHIP_STATUSES: { value: RelationshipStatus; label: string }[] = [
  { value: "single", label: "Estoy soltera" },
  { value: "meeting_someone", label: "Estoy conociendo a alguien" },
  { value: "unclear", label: "Estoy en algo, pero no tan claro" },
  { value: "relationship", label: "Estoy en una relación" },
  { value: "prefer_not_say", label: "Prefiero no responder eso" },
];

const OPENNESS_OPTIONS: { value: Openness; label: string }[] = [
  { value: "open", label: "Sí estoy abierta" },
  { value: "depends", label: "Depende mucho de la persona" },
  { value: "friendship", label: "Más amistad/conversación que otra cosa" },
  { value: "not_now", label: "Ahora mismo no estoy buscando nada" },
  { value: "figuring_out", label: "No sé, estoy viendo" },
];

const WANTS_CONTACT: { value: WantsContact; label: string }[] = [
  { value: "yes_instagram", label: "Sí, te dejo mi Instagram" },
  { value: "yes",           label: "Sí, te dejo una forma de contacto" },
  { value: "maybe",         label: "Mejor te dejo una nota" },
  { value: "no",            label: "Por ahora no, está bien" },
];

const ALTERNATE_INTENTS: { value: AlternateIntent; label: string }[] = [
  { value: "friendship", label: "Me caíste bien, podría haber amistad" },
  { value: "business", label: "Tengo una empresa o proyecto" },
  { value: "idea", label: "Tengo una idea que estoy armando" },
  { value: "conversation", label: "Podría salir una conversación buena" },
  { value: "no", label: "No por ahora, pero gracias de verdad" },
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
  6: "response-step-6",
  7: "response-step-7",
  8: "response-step-8",
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

export default function ResponseForm({ refSlug, source, referrerName }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLElement>(null);

  const [step, setStep]                 = useState<Step>(1);
  const [respondentName, setRespondentName] = useState("");
  const [feeling, setFeeling]           = useState<Feeling | "">("");
  const [relationshipStatus, setRelationshipStatus] = useState<RelationshipStatus | "">("");
  const [openness, setOpenness] = useState<Openness | "">("");
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
    respondentName?: string;
    feeling?: Feeling;
    relationshipStatus?: RelationshipStatus;
    openness?: Openness;
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

    const finalRespondentName = overrides?.respondentName ?? respondentName.trim();
    const finalFeeling = overrides?.feeling ?? feeling;
    const finalRelationshipStatus = overrides?.relationshipStatus ?? relationshipStatus;
    const finalOpenness = overrides?.openness ?? openness;
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
    const intent =
      finalAlternateIntent === "business" || finalAlternateIntent === "idea"
        ? "project"
        : finalAlternateIntent === "friendship" || finalAlternateIntent === "conversation"
          ? "friendship"
          : finalFeeling === "no_fit"
            ? "pass"
            : "open";

    try {
      const res = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refSlug: refSlug ?? undefined,
          source: source ?? "unknown",
          respondentName: finalRespondentName || undefined,
          feeling: finalFeeling,
          relationshipStatus: finalRelationshipStatus || undefined,
          openness: finalOpenness || undefined,
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
          <p className="section-label">tu turno</p>
          <h2 className="text-xl font-semibold leading-snug" style={{ color: "#FFFFFF" }}>
            Si llegaste hasta aquí, cuéntame qué te dejó esto.
          </h2>
          <p className="text-[14px]" style={{ color: "var(--t3)" }}>
            {referrerName
              ? `${referrerName} abrió la puerta, pero la respuesta es completamente tuya.`
              : "La idea es que responder se sienta fácil, no como trámite."}
          </p>
        </div>

        <div className="card flex flex-col gap-6">

          {/* Paso 1 — Nombre */}
          <div id="response-step-1" className="flex flex-col gap-3 scroll-mt-24">
            <Q>Antes de responder: ¿cómo te llamas?</Q>
            <p className="text-sm leading-relaxed" style={{ color: "#FFFFFF" }}>
              Es solo para saber quién está escribiendo cuando lea tu respuesta.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={respondentName}
                onChange={e => setRespondentName(e.target.value.slice(0, 80))}
                placeholder="Tu nombre"
                maxLength={80}
                className="input-base flex-1"
              />
              <button
                type="button"
                onClick={() => { if (step === 1) next(2); }}
                disabled={!respondentName.trim()}
                className="btn-primary sm:w-auto disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Seguir
              </button>
            </div>
          </div>

          {/* Paso 2 — Sensación */}
          {step >= 2 && (<>
            <Divider label="primera impresión" />
            <div id="response-step-2" className="flex flex-col gap-3 scroll-mt-24">
              <Q>Primero lo honesto: ¿qué sensación te quedó?</Q>
              <div className="flex flex-col gap-2">
                {FEELINGS.map(f => (
                  <Opt key={f.value} selected={feeling === f.value} emoji={f.emoji}
                    onClick={() => {
                      if (f.value === "no_fit") {
                        setFeeling(f.value);
                        if (step === 2) next(7);
                        return;
                      }

                      setFeeling(f.value);
                      if (step === 2) next(isOpen(f.value) ? 3 : 7);
                    }}>
                    {f.label}
                  </Opt>
                ))}
              </div>
            </div>
          </>)}

          {/* Paso 3 — Situación relacional */}
          {step >= 3 && isOpen(feeling) && (<>
            <Divider label="contexto real" />
            <div id="response-step-3" className="flex flex-col gap-3 scroll-mt-24">
              <Q>Para entender mejor el contexto, ¿desde dónde estás leyendo esto?</Q>
              <div className="flex flex-col gap-2">
                {RELATIONSHIP_STATUSES.map(option => (
                  <Opt key={option.value} selected={relationshipStatus === option.value}
                    onClick={() => { setRelationshipStatus(option.value); if (step === 3) next(4); }}>
                    {option.label}
                  </Opt>
                ))}
              </div>
            </div>
          </>)}

          {/* Paso 4 — Apertura */}
          {step >= 4 && isOpen(feeling) && (<>
            <Divider label="apertura" />
            <div id="response-step-4" className="flex flex-col gap-3 scroll-mt-24">
              <Q>Y siendo honesta, ¿qué tan abierta estás a conocer a alguien en este momento?</Q>
              <div className="flex flex-col gap-2">
                {OPENNESS_OPTIONS.map(option => (
                  <Opt key={option.value} selected={openness === option.value}
                    onClick={() => { setOpenness(option.value); if (step === 4) next(5); }}>
                    {option.label}
                  </Opt>
                ))}
              </div>
            </div>
          </>)}

          {/* Paso 5 — Modo de contacto */}
          {step >= 5 && isOpen(feeling) && (<>
            <Divider label="si algún día hablamos" />
            <div id="response-step-5" className="flex flex-col gap-3 scroll-mt-24">
              <Q>Si algún día habláramos, ¿qué se sentiría más natural para ti?</Q>
              <div className="flex flex-col gap-2">
                {CONTACT_METHODS.map(m => (
                  <Opt key={m.value} selected={contactMethod === m.value} emoji={m.emoji}
                    onClick={() => { setContactMethod(m.value); if (step === 5) next(6); }}>
                    {m.label}
                  </Opt>
                ))}
              </div>
            </div>
          </>)}

          {/* Paso 6 — Señal */}
          {step >= 6 && isOpen(feeling) && (<>
            <Divider label="si quieres dejar puerta abierta" />
            <div id="response-step-6" className="flex flex-col gap-3 scroll-mt-24">
              <Q>¿Quieres dejarme una forma sencilla de encontrarte?</Q>
              <p className="text-sm leading-relaxed" style={{ color: "#FFFFFF" }}>
                Puede ser Instagram, una nota o nada. De verdad no tienes que forzar
                una respuesta para que esto haya valido la pena.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {WANTS_CONTACT.map(w => (
                  <Opt key={w.value} selected={wContact === w.value}
                    onClick={() => { setWContact(w.value); if (step === 6) next(8); }}>
                    {w.label}
                  </Opt>
                ))}
              </div>
            </div>
          </>)}

          {/* Paso 7 — Alternativa si no hay match */}
          {step >= 7 && feeling === "no_fit" && (<>
            <Divider label="otra lectura" />
            <div id="response-step-7" className="flex flex-col gap-3 scroll-mt-24">
              <Q>Si no lo ves por ese lado, ¿hay otra forma en la que sí tendría sentido conectar?</Q>
              <p className="text-sm leading-relaxed" style={{ color: "#FFFFFF" }}>
                A veces no hay match romántico y aun así puede haber una buena conversación,
                una amistad bonita o una idea que valga la pena escuchar.
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
                      if (step === 7) next(8);
                    }}
                  >
                    {intent.label}
                  </Opt>
                ))}
              </div>
            </div>
          </>)}

          {/* Paso 8 — Proyecto o contacto */}
          {step >= 8 && ["business", "idea"].includes(alternateIntent) && (
            <div id="response-step-8" className="flex flex-col gap-4 scroll-mt-24">
              <Divider label="lo que estás armando" />
              <Q>Cuéntame rápido qué estás construyendo. Sin pitch perfecto.</Q>
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

          {step >= 8 && (isOpen(feeling) || ["friendship", "conversation", "business", "idea"].includes(alternateIntent)) && (
            <div id={!["business", "idea"].includes(alternateIntent) ? "response-step-8" : undefined} className="flex flex-col gap-3 scroll-mt-24">
              <Q>¿Dónde podría escribirte si tiene sentido?</Q>
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
          {step >= 8 && (<>
            <Divider label="lo que quieras sumar" />
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <Q>Si quieres, déjame una última frase con tu tono.</Q>
                <span className="text-xs" style={{ color: "var(--t3)" }}>{note.length}/500</span>
              </div>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value.slice(0, 500))}
                placeholder="Algo que te haya dado risa, duda, curiosidad o cero ganas. Todo sirve."
                rows={3}
                className="input-base resize-none"
              />
            </div>
          </>)}

          {/* Consentimiento */}
          {step >= 8 && (
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
          {step >= 8 && (
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={() => submit()}
                disabled={submitting || !respondentName.trim() || !feeling || (submitNeedsConsent && !consent)}
                className="flex-1 btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Enviando…
                  </span>
                ) : "Enviar respuesta"}
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

