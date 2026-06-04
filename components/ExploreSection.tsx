"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { mediaItems, type MediaItem } from "@/lib/media";

// ─── Modal ───────────────────────────────────────────────────────────────────

function Modal({ item, onClose, onPrev, onNext }: {
  item: MediaItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.95)" }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col gap-4 items-center"
        style={{ width: item.type === "video" ? "min(100%, 380px)" : "min(100%, 720px)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-sm flex items-center gap-1.5 transition-colors"
          style={{ color: "#444444" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#FFFFFF")}
          onMouseLeave={e => (e.currentTarget.style.color = "#444444")}
        >
          Cerrar <span className="text-xs opacity-50">esc</span>
        </button>

        {/* Media */}
        <div
          className="rounded-3xl overflow-hidden w-full"
          style={{
            border: "1px solid var(--border2)",
            aspectRatio: item.type === "video" ? "9/16" : "auto",
            position: "relative",
          }}
        >
          {item.type === "video" ? (
            <video
              key={item.id}
              controls
              autoPlay
              poster={item.cover}
              className="absolute inset-0 w-full h-full object-cover bg-black"
            >
              <source src={item.src} type="video/mp4" />
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.src}
              alt={item.title}
              className="w-full max-h-[75vh] object-contain block"
              style={{ background: "var(--surface)" }}
            />
          )}
        </div>

        {/* Info + nav */}
        <div className="flex items-start justify-between gap-6 w-full">
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--pink)" }}>
              {item.category}
            </span>
            <p className="text-base font-semibold" style={{ color: "#FFFFFF" }}>
              {item.title}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#888888" }}>
              {item.caption}
            </p>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            {[{ label: "←", action: onPrev }, { label: "→", action: onNext }].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm transition-all"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "#888888" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--pink)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--pink)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#888888";
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────

function MediaCard({ item, onClick }: { item: MediaItem; onClick: () => void }) {
  const [imgOk, setImgOk] = useState(true);
  const thumb = item.type === "video" ? item.cover : item.src;
  // Todas las cards: mismo ancho y proporción 9:16 para uniformidad
  return (
    <button
      onClick={onClick}
      className="group relative flex-shrink-0 rounded-2xl overflow-hidden text-left transition-all duration-200 active:scale-[0.98]"
      style={{
        width: "160px",
        border: "1px solid var(--border)",
        background: "var(--surface)",
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border2)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      {/* Thumbnail — siempre 9:16 con object-cover */}
      <div
        className="relative overflow-hidden"
        style={{ background: "var(--surface2)", aspectRatio: "9/16" }}
      >
        {thumb && imgOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={item.title}
            onError={() => setImgOk(false)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-2xl opacity-20">{item.type === "video" ? "▶" : "🖼"}</span>
          </div>
        )}

        {/* Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white text-base"
            style={{ background: "var(--pink)" }}
          >
            {item.type === "video" ? "▶" : "⊕"}
          </div>
        </div>

        {/* Badge video */}
        {item.type === "video" && (
          <div
            className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
            style={{ background: "rgba(0,0,0,0.75)", color: "var(--pink)" }}
          >
            video
          </div>
        )}
      </div>

      {/* Texto */}
      <div className="p-3 flex flex-col gap-1">
        <p className="text-[12px] font-medium leading-snug text-left" style={{ color: "#FFFFFF" }}>
          {item.title}
        </p>
        <p className="text-[11px] leading-snug line-clamp-2 text-left" style={{ color: "#444444" }}>
          {item.caption}
        </p>
      </div>
    </button>
  );
}

// ─── Carrusel principal ───────────────────────────────────────────────────────

export default function ExploreSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const prev = useCallback(() => {
    setSelectedIndex(i => i === null ? null : (i - 1 + mediaItems.length) % mediaItems.length);
  }, []);

  const next = useCallback(() => {
    setSelectedIndex(i => i === null ? null : (i + 1) % mediaItems.length);
  }, []);

  function scrollCarousel(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  }

  return (
    <section className="py-12">
      <div className="flex flex-col gap-6">

        {/* Header */}
        <div className="px-5 max-w-reading mx-auto w-full flex items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="section-label">Conocer más</p>
            <h2 className="text-2xl font-semibold tracking-tight" style={{ color: "#FFFFFF" }}>
              Un poco de contexto adicional.
            </h2>
          </div>

          {/* Flechas */}
          <div className="flex gap-2 flex-shrink-0">
            {(["left", "right"] as const).map(dir => (
              <button
                key={dir}
                onClick={() => scrollCarousel(dir)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "#888888" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--pink)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--pink)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#888888";
                }}
              >
                {dir === "left" ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>

        {/* Carrusel — scroll horizontal nativo */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2"
          style={{
            scrollbarWidth: "none",
            paddingLeft: "max(20px, calc((100vw - 1040px) / 2))",
            paddingRight: "20px",
          }}
        >
          {mediaItems.map((item, index) => (
            <MediaCard key={item.id} item={item} onClick={() => openModal(index)} />
          ))}
        </div>

      </div>

      {/* Modal */}
      {selectedIndex !== null && mediaItems[selectedIndex] && (
        <Modal
          item={mediaItems[selectedIndex]}
          onClose={closeModal}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
