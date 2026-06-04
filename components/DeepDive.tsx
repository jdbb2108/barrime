import type { ReactNode } from "react";

interface DeepDiveProps {
  summary: ReactNode;
  children: ReactNode;
  label?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
}

export default function DeepDive({
  summary,
  children,
  label = "Profundizar",
  ctaTitle,
}: DeepDiveProps) {
  const title = ctaTitle ?? label;

  return (
    <details
      className="group rounded-[8px]"
      style={{
        border: "1px solid var(--border)",
        borderLeft: "3px solid color-mix(in srgb, var(--pink) 65%, var(--border))",
        background: "var(--surface)",
      }}
    >
      <summary
        className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left"
        style={{ color: "#FFFFFF" }}
      >
        <div className="text-[16px] leading-[1.7]" style={{ color: "#FFFFFF" }}>
          {summary}
        </div>
        <span
          className="flex shrink-0 items-center gap-2 text-sm font-medium transition-colors group-open:hidden"
          style={{ color: "var(--pink-soft)" }}
        >
          <span className="text-base leading-none">+</span>
          {title}
        </span>
        <span
          className="hidden shrink-0 text-sm font-medium transition-colors group-open:inline"
          style={{ color: "var(--t2)" }}
        >
          Cerrar
        </span>
      </summary>

      <div
        className="px-5 pb-5 pt-1 text-[16px] leading-[1.8]"
        style={{ color: "#FFFFFF", borderTop: "1px solid var(--border)" }}
      >
        <div className="flex flex-col gap-4 pt-4">{children}</div>
      </div>
    </details>
  );
}
