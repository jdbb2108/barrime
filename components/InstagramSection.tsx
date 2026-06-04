"use client";

import { useEffect, useState } from "react";

const HANDLE = "barriemprende";
const PROFILE_URL = `https://instagram.com/${HANDLE}`;

interface Post {
  id: string;
  type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  thumb: string;
  url: string;
  caption: string;
  date: string;
}

function PostCard({ post }: { post: Post }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square rounded-2xl overflow-hidden transition-all duration-200"
      style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border2)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      {/* Imagen */}
      {imgOk ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.thumb}
          alt={post.caption || "Instagram post"}
          onError={() => setImgOk(false)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-3xl opacity-20">📷</span>
        </div>
      )}

      {/* Badge video */}
      {post.type === "VIDEO" && (
        <div
          className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
          style={{ background: "rgba(12,11,13,0.75)", color: "var(--pink-soft)" }}
        >
          ▶ video
        </div>
      )}

      {/* Badge carrusel */}
      {post.type === "CAROUSEL_ALBUM" && (
        <div
          className="absolute top-2 right-2 text-white/60 text-sm"
        >
          ⧉
        </div>
      )}

      {/* Overlay con caption */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: "linear-gradient(to top, rgba(12,11,13,0.88) 40%, transparent)" }}
      >
        {post.caption && (
          <p className="text-white text-[11px] leading-snug line-clamp-3">
            {post.caption}
          </p>
        )}
      </div>
    </a>
  );
}

function Skeleton() {
  return (
    <div
      className="aspect-square rounded-2xl animate-pulse"
      style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
    />
  );
}

export default function InstagramSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/instagram")
      .then(r => r.json())
      .then(data => {
        if (data.posts) setPosts(data.posts);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-12 px-5">
      <div className="max-w-reading mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="section-label">Instagram</p>
            <div className="flex items-center gap-2.5">
              {/* Logo Instagram */}
              <svg
                width="20" height="20" viewBox="0 0 24 24"
                style={{ color: "var(--pink)", fill: "currentColor", flexShrink: 0 }}
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              <h2 className="text-xl font-semibold tracking-tight" style={{ color: "#FFFFFF" }}>
                @{HANDLE}
              </h2>
            </div>
          </div>

          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost flex-shrink-0"
            style={{ padding: "8px 18px", minHeight: "36px", fontSize: "13px" }}
          >
            Ver perfil →
          </a>
        </div>

        {/* Grid */}
        {loading && (
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} />)}
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {posts.map(post => <PostCard key={post.id} post={post} />)}
          </div>
        )}

        {!loading && (error || posts.length === 0) && (
          <div
            className="rounded-3xl p-8 text-center flex flex-col gap-3"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <p className="text-[15px]" style={{ color: "var(--t2)" }}>
              {error
                ? "No se pudo cargar el feed ahora. Mira el perfil directamente."
                : "Aún no hay posts para mostrar."}
            </p>
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mx-auto"
              style={{ width: "fit-content" }}
            >
              Ir a Instagram →
            </a>
          </div>
        )}

        {/* Footer con conteo */}
        {!loading && !error && posts.length > 0 && (
          <div className="text-center">
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] transition-colors"
              style={{ color: "var(--t3)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--pink-soft)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--t3)")}
            >
              Ver todo en @{HANDLE} →
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
