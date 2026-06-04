import DeepDive from "@/components/DeepDive";

export default function AboutJoseSection() {
  return (
    <section className="py-12 px-5">
      <div className="max-w-reading mx-auto flex flex-col gap-7">

        <div className="flex flex-col gap-2">
          <p className="section-label">Quién soy</p>
          <h2 className="text-2xl font-semibold tracking-tight" style={{ color: "#FFFFFF" }}>
            Con un poco más de profundidad.
          </h2>
        </div>

        <DeepDive
          ctaTitle="Conocer más"
          ctaSubtitle="Cómo pienso y qué me mueve"
          summary={
            <p>
              Creo que una de las cosas que más me mueve es no querer mirar atrás
              y sentir que me quedé debiendo mi propia vida.
            </p>
          }
        >
          <p>
            No quiero vivir en automático. No quiero hacer lo correcto solo porque
            tocaba. Quiero vivir una vida de la que me sienta orgulloso, incluso
            si no sale perfecta.
          </p>
          <p>
            Soy una persona muy familiar. Mi familia me importa mucho: estar,
            cuidar, compartir, hacer sentir orgullosa a la gente que quiero y
            construir una vida donde los míos también puedan estar mejor.
          </p>
          <p>
            También pienso mucho en la familia que quiero construir algún día.
            Quiero tener una hija. Y si la vida me da esa oportunidad, probablemente
            haga bastante fuerza para que se llame Isabel.
          </p>
          <p>
            No quiero que mi ambición sea solo para mí. Uno de mis sueños más grandes
            es influenciar a que un millón de sueños se hagan realidad: proyectos,
            empresas, decisiones, vidas distintas, saltos que alguien lleva tiempo
            aplazando.
          </p>
          <p>
            Soy una persona centrada. Aunque tengo ideas raras y a veces parezco
            lanzado con cosas como esta, no vivo desde el desorden. Me gusta construir
            con intención y entender hacia dónde voy.
          </p>
          <p>
            También soy divertido. Me gusta molestar, reírme, improvisar y no tomarme
            todo tan en serio. Pero al mismo tiempo tengo una obsesión fuerte por
            mejorar, crear más, entender más y construir mejor.
          </p>
          <p>
            Quiero construir una vida grande, pero no vacía. Una vida ambiciosa,
            pero también familiar; con proyectos, conversaciones, risas, calma,
            viajes, comidas largas, momentos simples y gente que valga la pena cerca.
          </p>
        </DeepDive>

      </div>
    </section>
  );
}
