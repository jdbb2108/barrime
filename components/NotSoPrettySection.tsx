import DeepDive from "@/components/DeepDive";

export default function NotSoPrettySection() {
  return (
    <section className="py-12 px-5">
      <div className="max-w-reading mx-auto flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <p className="section-label">Lo no tan bonito</p>
          <h2 className="text-2xl font-semibold tracking-tight" style={{ color: "#FFFFFF" }}>
            Tampoco estoy intentando vender una versión perfecta.
          </h2>
        </div>

        <DeepDive
          ctaTitle="Leer esta parte"
          summary={
            <p>
              También tengo mis cosas. Algunas se entienden mejor conversando,
              pero tiene sentido nombrarlas desde el principio.
            </p>
          }
        >
          <p>A veces soy demasiado mental. A veces me acelero.</p>
          <p>
            A veces me cuesta apagar la cabeza o me meto tanto en lo que estoy
            construyendo que tengo que recordarme volver al presente.
          </p>
          <p>
            Puedo ser intenso con lo que me importa. No intenso de drama, pero sí
            de profundidad, de darle vueltas a las cosas, de querer entender,
            mejorar, resolver y avanzar.
          </p>
          <p>
            También puedo ser muy exigente conmigo. Eso a veces me empuja, pero
            otras veces me hace olvidar que no todo se tiene que ganar, optimizar
            o convertir en el siguiente paso.
          </p>
          <p>
            Estoy aprendiendo a vivir eso mejor: a estar más presente, escuchar más
            despacio, disfrutar sin sentir que todo tiene que producir algo y
            construir sin perderme en la construcción.
          </p>
          <p>
            No pongo esto para hacerme el profundo. Lo pongo porque si la idea es
            conocerse con algo de verdad, también tiene sentido decir que no soy
            una persona perfecta, terminada o siempre fácil de leer.
          </p>
        </DeepDive>
      </div>
    </section>
  );
}
