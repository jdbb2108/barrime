export default function Footer() {
  return (
    <footer className="py-12 px-5">
      <div className="max-w-reading mx-auto flex flex-col items-center gap-4">
        <div className="w-full h-px" style={{ backgroundColor: "var(--border)" }} />
        <p className="text-[13px] leading-relaxed text-center max-w-sm" style={{ color: "var(--t3)" }}>
          Esta página es privada. La información que dejes se usa únicamente
          para saber si hay interés mutuo y no se comparte con terceros.
        </p>
        <p className="text-[12px]" style={{ color: "var(--border2)" }}>
          Hola, soy José · 2026
        </p>
      </div>
    </footer>
  );
}
