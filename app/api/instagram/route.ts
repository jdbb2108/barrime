import { NextResponse } from "next/server";

export const revalidate = 3600; // refresca el cache cada hora

interface BeholdPost {
  id: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  prunedCaption?: string;
}

interface BeholdFeed {
  posts: BeholdPost[];
}

export async function GET() {
  const feedId = process.env.BEHOLD_FEED_ID;

  if (!feedId) {
    return NextResponse.json(
      { error: "BEHOLD_FEED_ID no configurado." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`https://feeds.behold.so/${feedId}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Behold respondió con ${res.status}`);
    }

    const data: BeholdFeed = await res.json();

    // Devolver solo los primeros 9 posts con los campos que necesitamos
    const posts = (data.posts ?? []).slice(0, 9).map((p) => ({
      id: p.id,
      type: p.mediaType,
      thumb: p.thumbnailUrl ?? p.mediaUrl,
      url: p.permalink,
      caption: p.caption?.slice(0, 120) ?? "",
      date: p.timestamp,
    }));

    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    console.error("[api/instagram]", err);
    return NextResponse.json(
      { error: "No se pudo cargar el feed." },
      { status: 502 }
    );
  }
}
