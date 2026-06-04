import DeepDive from "@/components/DeepDive";

export default function RiBuzzSection() {
  return (
    <section className="px-5 py-12">
      <div className="mx-auto flex max-w-reading flex-col gap-7">
        <div className="flex flex-col gap-2">
          <p className="section-label">Lo que estoy construyendo</p>
          <h2 className="text-2xl font-semibold tracking-tight" style={{ color: "#FFFFFF" }}>
            Hoy gran parte de mi energía está puesta en RiBuzz.
          </h2>
        </div>

        <DeepDive
          ctaTitle="Entender RiBuzz"
          ctaSubtitle="Qué es y por qué me importa"
          summary={
            <p>
              RiBuzz es una empresa que estoy construyendo para ayudar a negocios
              en etapa temprana a crecer con más claridad.
            </p>
          }
        >
          <p>
            La idea nace de algo que veo mucho: personas con buenos productos,
            buenos servicios o buenas ideas, pero sin un camino claro para vender,
            priorizar y ejecutar.
          </p>
          <p>
            RiBuzz busca ser ese puente entre el desorden y la acción: entender
            dónde está trabado un negocio, ordenar prioridades, encontrar qué tiene
            más sentido hacer primero y acompañar la ejecución.
          </p>

          <div
            className="rounded-2xl px-6 py-5"
            style={{
              background: "color-mix(in srgb, var(--pink) 6%, var(--surface))",
              border: "1px solid color-mix(in srgb, var(--pink) 24%, var(--border2))",
              borderLeft: "3px solid var(--pink)",
            }}
          >
            <p style={{ color: "#FFFFFF" }}>
              En palabras más simples: ayudamos a que una empresa entienda qué
              le está frenando el crecimiento y qué debería hacer primero para
              vender mejor, operar mejor y avanzar con más claridad.
            </p>
          </div>

          <p>
            A futuro, quiero que RiBuzz se convierta en una plataforma asistida
            por IA capaz de diagnosticar, estructurar y orquestar sistemas comerciales
            para empresas que quieren crecer mejor.
          </p>
          <p>
            Y creo que eso dice mucho de cómo funciona mi cabeza: me gusta tomar
            algo confuso, entenderlo, encontrarle estructura y volverlo real.
          </p>
        </DeepDive>
      </div>
    </section>
  );
}
