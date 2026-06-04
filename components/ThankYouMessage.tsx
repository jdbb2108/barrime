interface Props {
  intent: "open" | "friendship" | "project" | "pass";
}

const copy = {
  open: {
    icon: "😏",
    title: "Listo, señal recibida.",
    body: "José la leyó en su mente antes de leerla en la base de datos. Si dejaste contacto, te escribe una sola vez. Sin intensidad rara.",
    footer: "Puedes cerrar esto y seguir con tu vida de protagonista.",
  },
  friendship: {
    icon: "🤝",
    title: "Eso cuenta como buena vibra.",
    body: "Si dejaste contacto, José aparece una vez. No como notificación intensa, más como persona normal intentando no dañarla.",
    footer: "Buen cierre. Cero drama. Bastante digno.",
  },
  project: {
    icon: "💡",
    title: "Proyecto en el radar.",
    body: "Si dejaste contacto, José te escribe para entender qué estás construyendo. Promete no llegar con pitch de tiburón de televisión.",
    footer: "Que ese sueño no se quede guardado en notas del celular.",
  },
  pass: {
    icon: "🫡",
    title: "Respuesta respetada.",
    body: "Gracias por llegar hasta aquí. No hubo match, pero al menos esta página tuvo presupuesto emocional.",
    footer: "Puedes irte en paz. El botón invisible de salida eres tú.",
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
