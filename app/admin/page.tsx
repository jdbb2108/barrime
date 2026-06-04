"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL ?? "";

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);
    if (res.ok) setAuthed(true);
    else setError("Contraseña incorrecta.");
  }

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4"
            style={{ backgroundColor: "var(--bg)" }}>
        <div className="card w-full max-w-sm">
          <h1 className="text-xl font-semibold mb-6" style={{ color: "var(--t1)" }}>Admin</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="input-base"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Verificando…" : "Entrar"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4"
          style={{ backgroundColor: "var(--bg)" }}>
      <div className="card w-full max-w-sm text-center flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-semibold mb-1" style={{ color: "var(--t1)" }}>Panel</h1>
          <p className="text-sm" style={{ color: "var(--t2)" }}>Acceso directo al Google Sheet.</p>
        </div>
        <a href={sheetUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Abrir Google Sheet →
        </a>
        <button onClick={() => setAuthed(false)}
                className="text-sm transition-colors"
                style={{ color: "var(--t3)" }}>
          Cerrar sesión
        </button>
      </div>
    </main>
  );
}
