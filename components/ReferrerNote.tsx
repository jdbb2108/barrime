import type { Referrer } from "@/types/referrer";

interface Props {
  referrer: Referrer;
}

export default function ReferrerNote({ referrer }: Props) {
  return (
    <div
      className="flex flex-col gap-3 rounded-3xl px-6 py-5"
      style={{
        background: "color-mix(in srgb, var(--pink) 8%, var(--surface))",
        border: "1px solid color-mix(in srgb, var(--pink) 25%, var(--border))",
      }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold"
          style={{
            background: "color-mix(in srgb, var(--pink) 20%, var(--surface2))",
            color: "#FFFFFF",
          }}
        >
          +
        </div>
        <p
          className="text-xs font-semibold uppercase tracking-[0.1em]"
          style={{ color: "var(--pink-soft)" }}
        >
          vienes por {referrer.name} · {referrer.relationship}
        </p>
      </div>

      <p className="pl-9 text-[16px] leading-relaxed" style={{ color: "var(--t1)" }}>
        {referrer.customNote}
      </p>
      <p className="pl-9 text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
        Si algo de esto te genera curiosidad, responde desde ahí. Si no, también está bien.
      </p>
    </div>
  );
}
