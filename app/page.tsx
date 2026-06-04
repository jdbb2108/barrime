"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";

import HeroSection from "@/components/HeroSection";
import ResumenSection from "@/components/ResumenSection";
import ContextSection from "@/components/ContextSection";
import AboutJoseSection from "@/components/AboutJoseSection";
import ConnectionSection from "@/components/ConnectionSection";
import RiBuzzSection from "@/components/RiBuzzSection";
import NotSoPrettySection from "@/components/NotSoPrettySection";
import ExploreSection from "@/components/ExploreSection";
import InstagramSection from "@/components/InstagramSection";
import ReferrerNote from "@/components/ReferrerNote";
import ResponseForm from "@/components/ResponseForm";
import Footer from "@/components/Footer";
import VisitTracker from "@/components/VisitTracker";
import { getReferrer } from "@/lib/referrers";
import { inferSource } from "@/lib/source";

function LandingContent() {
  const searchParams = useSearchParams();
  const refSlug = searchParams.get("ref") ?? undefined;
  const referrer = getReferrer(refSlug);
  const source = inferSource(refSlug, undefined);

  const formRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const resumenRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);
  const [hideFloatingCta, setHideFloatingCta] = useState(true);

  useEffect(() => {
    const hero = heroRef.current;
    const form = formRef.current;
    if (!hero || !form) return;

    const visible = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => visible.set(entry.target, entry.isIntersecting));
        setHideFloatingCta(Boolean(visible.get(hero) || visible.get(form)));
      },
      { rootMargin: "-12% 0px -18% 0px", threshold: 0.08 }
    );

    observer.observe(hero);
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scrollToResumen() {
    resumenRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scrollToContext() {
    contextRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="relative">
      <VisitTracker refSlug={refSlug} source={source} path="/" />

      <button
        type="button"
        onClick={scrollToForm}
        className={`fixed bottom-4 right-4 z-20 rounded-full p-[1px] transition-all duration-300 ${
          hideFloatingCta ? "pointer-events-none translate-y-5 opacity-0" : "translate-y-0 opacity-100"
        }`}
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--pink) 65%, transparent), var(--border2), color-mix(in srgb, var(--pink-soft) 38%, transparent))",
          boxShadow: "0 14px 36px rgba(0,0,0,0.48)",
        }}
      >
        <span
          className="flex items-center gap-2 rounded-full px-3 py-2.5 text-left sm:px-3.5"
          style={{
            background: "rgba(10,10,10,0.9)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-base font-semibold"
            style={{ background: "color-mix(in srgb, var(--pink) 28%, transparent)", color: "#FFFFFF" }}
          >
            +
          </span>
          <span className="min-w-0">
            <span className="block whitespace-nowrap text-[13px] font-semibold leading-tight text-white">
              Responder
            </span>
          </span>
          <span className="text-base text-white/70">→</span>
        </span>
      </button>

      {/* 1. Hero */}
      <div ref={heroRef}>
        <HeroSection onScrollToResumen={scrollToResumen} onScrollToContext={scrollToContext} />
      </div>

      {/* Nota de referente si aplica */}
      {referrer && (
        <section className="px-5 pb-4">
          <div className="max-w-reading mx-auto">
            <ReferrerNote referrer={referrer} />
          </div>
        </section>
      )}

      {/* 2. Resumen rápido */}
      <div ref={resumenRef}>
        <ResumenSection />
      </div>

      {/* Divisor */}
      <div className="px-5">
        <div className="max-w-reading mx-auto h-px" style={{ backgroundColor: "var(--border)" }} />
      </div>

      {/* 3. Por qué existe esto */}
      <div ref={contextRef}>
        <ContextSection />
      </div>

      {/* 5. Quién soy */}
      <AboutJoseSection />

      {/* 5b. Lo que estoy construyendo — RiBuzz */}
      <RiBuzzSection />

      {/* 6. Qué tipo de conexión */}
      <ConnectionSection />

      <NotSoPrettySection />

      {/* Galería */}
      <ExploreSection />

      {/* Instagram */}
      <InstagramSection />

      {/* 7. Formulario — Decisión simple */}
      <div ref={formRef}>
        <ResponseForm refSlug={refSlug} source={source} />
      </div>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }} />}>
        <LandingContent />
      </Suspense>
    </main>
  );
}
