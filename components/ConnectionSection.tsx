import DeepDive from "@/components/DeepDive";

export default function ConnectionSection() {
  return (
    <section className="py-12 px-5">
      <div className="max-w-reading mx-auto flex flex-col gap-7">

        <div className="flex flex-col gap-2">
          <p className="section-label">Qué tipo de conexión me interesa</p>
          <h2 className="text-2xl font-semibold tracking-tight" style={{ color: "#FFFFFF" }}>
            Me gusta la gente con mundo interno.
          </h2>
        </div>

        <DeepDive
          ctaTitle="Leer lo que busco"
          ctaSubtitle="Sin volverlo intenso de entrada"
          summary={
            <p>
              No estoy buscando conocer por conocer, ni perder el tiempo en vínculos
              vacíos, juegos raros o conversaciones que no van para ningún lado.
            </p>
          }
        >
          <p>
            Me gustaría conocer a alguien familiar, centrada, divertida, con ganas
            de crecer, con ternura, criterio y una forma bonita de mirar la vida.
          </p>
          <p>
            No busco una persona perfecta. Me interesa más alguien real: alguien
            que también esté construyéndose, que tenga sueños, cosas por mejorar
            y ganas de vivir con intención.
          </p>
          <p>
            Quiero una conexión donde podamos impulsarnos: crecer, reírnos,
            retarnos, calmarnos, aprender, construir y también disfrutar lo simple.
          </p>
          <p>
            Para mí la vida no es solo lograr cosas. También es familia, conversaciones
            honestas, comidas largas, caminar sin afán, reírse de bobadas, hablar
            de sueños grandes y sentir paz con alguien que también quiere estar ahí.
          </p>
          <p>
            Yo sí quiero formar familia algún día. No como presión inmediata, sino
            como parte de la vida que quiero construir.
          </p>
          <p>
            Si hay conexión, se verá. Si no, también está bien. Pero si la hay,
            me interesa que sume, que dé paz, que rete bonito y que tenga con qué
            construirse.
          </p>
        </DeepDive>

      </div>
    </section>
  );
}
