import type { Referrer } from "@/types/referrer";

interface Props {
  referrer: Referrer;
}

export default function ReferrerNote({ referrer }: Props) {
  return (
    <div
      className="flex flex-col gap-3 px-6 py-5 rounded-3xl"
      style={{
        background: "color-mix(in srgb, var(--pink) 8%, var(--surface))",
        border: "1px solid color-mix(in srgb, var(--pink) 25%, var(--border))",
      }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
          style={{ background: "color-mix(in srgb, var(--pink) 20%, var(--surface2))" }}
        >
          👋
        </div>
        <p
          className="text-xs font-semibold uppercase tracking-[0.1em]"
          style={{ color: "var(--pink-soft)" }}
        >
          {referrer.relationship} · {referrer.name}
        </p>
      </div>

      <p className="text-[16px] leading-relaxed pl-9" style={{ color: "var(--t1)" }}>
        &ldquo;{referrer.customNote}&rdquo;
      </p>
    </div>
  );
}
