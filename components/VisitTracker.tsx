"use client";

import { useEffect, useRef } from "react";

interface Props {
  refSlug?: string;
  source?: string;
  path?: string;
}

/**
 * Registra la visita solo tras interacción mínima:
 *   - scroll > 30% del viewport, O
 *   - tiempo en página > 5 segundos
 * Nunca envía la IP — eso se maneja solo en servidor.
 */
export default function VisitTracker({ refSlug, source, path }: Props) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;

    async function sendVisit() {
      if (sent.current) return;
      sent.current = true;

      try {
        await fetch("/api/visits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            refSlug: refSlug ?? undefined,
            source: source ?? "unknown",
            path: path ?? "/",
          }),
        });
      } catch {
        // Silencioso — no interrumpir la experiencia
      }
    }

    // Trigger 1: scroll > 30%
    function onScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total > 0.3) {
        sendVisit();
        window.removeEventListener("scroll", onScroll);
      }
    }

    // Trigger 2: 5 segundos en página
    const timer = setTimeout(() => {
      sendVisit();
    }, 5000);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [refSlug, source, path]);

  return null;
}
