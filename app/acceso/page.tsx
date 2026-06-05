"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import EtherealBackground from "@/components/EtherealBackground";

function AccessForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "No pudimos validar la clave.");
      return;
    }

    router.replace(next);
    router.refresh();
  }

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center px-5 py-16">
      <EtherealBackground />
      <form
        onSubmit={submit}
        className="relative z-10 flex w-full max-w-sm flex-col gap-5 rounded-[8px] p-6"
        style={{
          background: "rgba(13,13,13,0.86)",
          border: "1px solid var(--border2)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="flex flex-col gap-2">
          <p className="section-label">acceso</p>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "#FFFFFF" }}>
            Esta página tiene clave.
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
            Si llegaste hasta aquí, probablemente alguien te la pasó. Si no, buena
            exploración, pero todavía falta la contraseña.
          </p>
        </div>

        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Clave de acceso"
          className="input-base"
          autoFocus
        />

        {error && (
          <p className="rounded-2xl border border-red-900/40 bg-red-950/30 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading || !code.trim()} className="btn-primary disabled:opacity-40">
          {loading ? "Revisando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}

export default function AccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }} />}>
      <AccessForm />
    </Suspense>
  );
}
