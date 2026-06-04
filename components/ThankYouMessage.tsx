interface Props {
  intent: "open" | "friendship" | "project" | "pass";
}

const copy = {
  open: {
    icon: "🌸",
    title: "Gracias por responder.",
    body: "Si dejaste una forma de contacto, José te escribirá una sola vez. Sin presión. Sin insistencia. Solo una conversación si tiene sentido.",
  },
  friendship: {
    icon: "🤝",
    title: "Gracias por responder.",
    body: "Si dejaste una forma de contacto, José te escribirá una sola vez. Sin expectativa rara. Solo una conversación tranquila si tiene sentido.",
  },
  project: {
    icon: "💡",
    title: "Gracias por compartirlo.",
    body: "Si dejaste una forma de contacto, José te escribirá una sola vez para entender mejor qué estás construyendo y ver si una conversación puede ser útil.",
  },
  pass: {
    icon: "✌️",
    title: "Gracias por haberlo visto.",
    body: "Todo bien. De verdad. Que tengas un día bonito.",
  },
};

export default function ThankYouMessage({ intent }: Props) {
  const message = copy[intent];

  return (
    <div className="max-w-sm w-full mx-auto flex flex-col items-center gap-8 text-center px-5">
      <div className="text-5xl">{message.icon}</div>

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight" style={{ color: "var(--pink)" }}>
          {message.title}
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "#FFFFFF" }}>
          {message.body}
        </p>
      </div>

      <div className="w-12 h-px" style={{ backgroundColor: "var(--border2)" }} />
      <p className="text-sm" style={{ color: "var(--t3)" }}>Puedes cerrar esta pestaña.</p>
    </div>
  );
}
