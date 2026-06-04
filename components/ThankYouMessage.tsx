interface Props {
  intent: "open" | "friendship" | "project" | "pass";
}

const copy = {
  open: {
    icon: "😏",
    title: "Listo, señal recibida.",
    body: "Gracias por responder. Si dejaste contacto, José te escribe una vez y ya vemos si la conversación tiene vida propia.",
    footer: "Buen movimiento. Bastante elegante para una página tan poco normal.",
  },
  friendship: {
    icon: "🤝",
    title: "Eso cuenta como buena vibra.",
    body: "Gracias por responder con claridad. Si dejaste contacto, José te escribe y miramos si hay conversación, amistad o una de esas conexiones difíciles de explicar.",
    footer: "Nada mal. La vuelta terminó mejor de lo que empezó.",
  },
  project: {
    icon: "💡",
    title: "Proyecto en el radar.",
    body: "Gracias por compartirlo. Si dejaste contacto, José te escribe para entender mejor qué estás construyendo y por dónde se puede pensar.",
    footer: "Ojalá ese sueño no se quede viviendo en una nota del celular.",
  },
  pass: {
    icon: "🫡",
    title: "Respuesta respetada.",
    body: "Gracias por llegar hasta aquí y responder con honestidad. Si no te hizo sentido, está bien.",
    footer: "Puedes cerrar esto con tranquilidad. Igual fue una buena anécdota.",
  },
};

export default function ThankYouMessage({ intent }: Props) {
  const message = copy[intent];

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-7 px-5 text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full text-4xl"
        style={{
          background: "color-mix(in srgb, var(--pink) 14%, var(--surface2))",
          border: "1px solid color-mix(in srgb, var(--pink) 28%, var(--border2))",
        }}
      >
        {message.icon}
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight" style={{ color: "#FFFFFF" }}>
          {message.title}
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "#FFFFFF" }}>
          {message.body}
        </p>
      </div>

      <div className="h-px w-12" style={{ backgroundColor: "var(--border2)" }} />
      <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
        {message.footer}
      </p>
    </div>
  );
}
