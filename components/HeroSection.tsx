"use client";

interface Props {
  onScrollToResumen: () => void;
  onScrollToContext: () => void;
}

const introPhotos = [
  {
    src: "/media/intro-ribuzz.jpg",
    alt: "Ilustración de Barri para Ribuzz",
    label: "Ribuzz",
    position: "center",
    className: "col-span-2 h-24 sm:col-span-1 sm:h-28",
  },
  {
    src: "/media/intro-playa.jpg",
    alt: "José en la playa al atardecer",
    label: "pausa",
    position: "72% center",
    className: "h-24 sm:h-28",
  },
  {
    src: "/media/intro-concierto.webp",
    alt: "José en un concierto",
    label: "vida",
    position: "center 42%",
    className: "h-24 sm:h-28",
  },
];

export default function HeroSection({ onScrollToResumen, onScrollToContext }: Props) {
  return (
    <section className="px-5 pb-14 pt-24">
      <div className="mx-auto grid max-w-reading gap-10 md:grid-cols-[minmax(0,1fr)_360px] md:items-center">

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <p className="section-label">Una forma distinta de presentarme</p>
              <span
                className="hidden h-px w-12 sm:block"
                style={{ backgroundColor: "var(--border2)" }}
              />
              <p className="text-xs font-medium uppercase tracking-[0.12em]" style={{ color: "var(--t3)" }}>
                sin libreto
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h1
                className="max-w-[680px] text-[3rem] font-semibold leading-[1.03] md:text-[4.5rem]"
                style={{ letterSpacing: 0 }}
              >
                <span style={{ color: "var(--pink)" }}>Hola,</span>
                <br />
                <span style={{ color: "#FFFFFF" }}>soy José.</span>
              </h1>
              <p
                className="max-w-[620px] text-xl font-medium leading-snug md:text-[1.7rem]"
                style={{ color: "#FFFFFF" }}
              >
                Prefiero pasar pena que quedarme con la duda.
              </p>
            </div>
          </div>

          <div className="flex max-w-[620px] flex-col gap-4" style={{ color: "#FFFFFF" }}>
            <p className="text-[17px] leading-[1.8]">
              Se me ocurrió hacer esta vuelta como una forma distinta de presentarme.
              Si estás leyendo esto, puede ser porque me llamaste la atención o porque
              un amigo en común cree que hay cositas.
            </p>
            <p className="text-[17px] leading-[1.8]">
              La idea es simple: que puedas hacerte una idea rápida de quién soy,
              cómo pienso, qué estoy construyendo y qué energía tengo.{" "}
              <span style={{ color: "#FFFFFF" }}>Si no, está bien.</span>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <button onClick={onScrollToResumen} className="btn-primary">
                Conocerme en corto
              </button>
              <button onClick={onScrollToContext} className="btn-ghost">
                Leer por qué existe
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {["proyectos", "vida real", "conversación"].map(tag => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    border: "1px solid var(--border2)",
                    color: "#FFFFFF",
                    background: "color-mix(in srgb, #FFFFFF 4%, transparent)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3" aria-label="Momentos de José">
          <div
            className="relative overflow-hidden rounded-[8px]"
            style={{
              border: "1px solid var(--border2)",
              background: "var(--surface)",
              aspectRatio: "16/10",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            }}
          >
            <video
              src="/media/intro-video.mp4"
              aria-label="Un momento en video de José"
              className="h-full w-full object-cover"
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              style={{ objectPosition: "center 42%" }}
            />
            <span
              className="absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em]"
              style={{ background: "rgba(0,0,0,0.72)", color: "var(--pink-soft)" }}
            >
              en movimiento
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {introPhotos.map(item => (
              <div
                key={item.src}
                className={`relative overflow-hidden rounded-[8px] ${item.className}`}
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: item.position }}
                />
                <span
                  className="absolute bottom-1.5 left-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em]"
                  style={{ background: "rgba(0,0,0,0.72)", color: "var(--pink-soft)" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>
            Un vistazo rápido: lo que construyo, lo que vivo y lo que también me da pena mostrar.
          </p>
        </div>

      </div>

      <div className="mx-auto mt-10 flex max-w-reading items-center gap-3">
        <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
        <span className="text-xs tracking-widest" style={{ color: "var(--t3)" }}>↓</span>
        <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
      </div>
    </section>
  );
}
