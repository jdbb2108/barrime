import DeepDive from "@/components/DeepDive";

export default function ContextSection() {
  return (
    <section className="py-12 px-5">
      <div className="max-w-reading mx-auto flex flex-col gap-7">

        <div className="flex flex-col gap-2">
          <p className="section-label">Por qué existe esto</p>
          <h2 className="text-2xl font-semibold tracking-tight" style={{ color: "#FFFFFF" }}>
            La historia detrás de esta pendejada.
          </h2>
        </div>

        <DeepDive
          ctaTitle="Leer la historia"
          ctaSubtitle="Por qué hice esta página"
          summary={
            <p>
              Esto nació porque soy re lanzado. Porque se me ocurren vueltas medio
              locas y muchas veces, en vez de dejarlas en la cabeza, me da por
              volverlas realidad.
            </p>
          }
        >
          <p>
            Hay una parte de mí que genuinamente cree que muchas cosas buenas empiezan
            cuando uno se atreve a hacer algo que le da pena.
          </p>
          <p style={{ color: "#FFFFFF" }}>Y sí, esto da un poco de pena.</p>
          <p>
            Pero hay una parte de mí que genuinamente cree que muchas cosas buenas
            empiezan justo ahí: cuando uno se atreve a hacer algo que le da pena.
          </p>
          <p>
            Mi vida hoy se mueve mucho entre construir proyectos, eventos de empresa,
            gimnasio y no mucho más. Me gusta esa vida. La elegí. La estoy construyendo.
            Pero también soy consciente de que no siempre abre tantos espacios
            naturales para conocer personas nuevas.
          </p>
          <p style={{ color: "#FFFFFF" }}>
            Entonces pensé: ¿y si hago una presentación mía? Algo corto, honesto,
            un poco raro, pero real.
          </p>
          <p>
            Puede que no pase nada. Puede que esto no funcione. Puede que sea una
            pendejada. O puede que alguien lea esto, se ría, entienda un poco mi
            energía y piense:{" "}
            <span style={{ color: "#FFFFFF" }}>
              &ldquo;ok, este man está loco, pero de una forma interesante&rdquo;.
            </span>{" "}
            <span style={{ color: "var(--pink)" }}>Quién quita.</span>
          </p>
          <p>
            Porque al final, esta también es un poco mi forma de vivir: si algo me da
            curiosidad, lo pruebo. Si me da miedo, lo miro. Si me da pena,
            probablemente hay algo ahí que vale la pena romper.
          </p>
        </DeepDive>

      </div>
    </section>
  );
}
