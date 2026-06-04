import DeepDive from "@/components/DeepDive";

const tags = [
  "Constructor",
  "Ideas raras",
  "Conversaciones con fondo",
  "Creativo",
  "Lanzado",
  "Directo",
  "Intenso con lo que importa",
  "Sensible aunque no lo parezca",
  "Ambicioso, pero aprendiendo a estar presente",
];

export default function ResumenSection() {
  return (
    <section className="py-12 px-5">
      <div className="max-w-reading mx-auto flex flex-col gap-7">

        <div className="flex flex-col gap-2">
          <p className="section-label">En corto</p>
          <h2 className="text-2xl font-semibold tracking-tight" style={{ color: "#FFFFFF" }}>
            Soy alguien que construye.
          </h2>
        </div>

        <DeepDive
          ctaTitle="Ver el resumen real"
          ctaSubtitle="Más allá de los tags"
          summary={
            <p>
              Soy alguien que intenta volver reales las cosas que se le ocurren.
              Me gustan las ideas salidas de la caja, las conversaciones con
              profundidad y los proyectos que pasan de la cabeza a la vida real.
            </p>
          }
        >
          <p>
            Me emociona construir, probar, ajustar, equivocarme, aprender y volver
            a intentarlo con más claridad.
          </p>
          <p>
            Hoy estoy en una etapa de mucha ambición. Estoy construyendo empresas,
            proyectos y una forma de vida que se sienta verdadera para mí.
          </p>
          <p>
            Pero también estoy aprendiendo a no vivir solo persiguiendo el siguiente
            salto. Quiero estar más presente, disfrutar más el camino y no perderme
            la vida mientras construyo.
          </p>
          <p>
            Soy creativo, lanzado, directo e intenso con lo que me importa. A veces
            soy acelerado, demasiado mental o me meto mucho en mis ideas. Pero también
            soy sensible, muy de fondo y muy de querer que las cosas tengan sentido.
          </p>
          <p>
            Me gusta la gente que piensa, que se ríe, que tiene criterio, que tiene
            ternura y que no vive en automático.
          </p>
          <p>
            No busco forzar nada. Solo abrir una conversación, ver si hay energía y
            dejar que las cosas fluyan desde ahí.
          </p>
        </DeepDive>

        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <span
              key={t}
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: "var(--surface2)",
                border: "1px solid var(--border2)",
                color: "#FFFFFF",
              }}
            >
              {t}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
