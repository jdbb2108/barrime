import { NextResponse } from "next/server";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

type MediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

interface BeholdPost {
  id: string;
  mediaType?: MediaType;
  media_type?: MediaType;
  mediaUrl?: string;
  media_url?: string;
  thumbnailUrl?: string;
  thumbnail_url?: string;
  permalink?: string;
  caption?: string;
  timestamp?: string;
}

type BeholdResponse =
  | BeholdPost[]
  | {
      posts?: BeholdPost[];
      feed?: {
        posts?: BeholdPost[];
      };
    };

function getPosts(data: BeholdResponse) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.posts)) return data.posts;
  if (Array.isArray(data.feed?.posts)) return data.feed.posts;
  return [];
}

export async function GET() {
  const feedId = process.env.BEHOLD_FEED_ID ?? process.env.NEXT_PUBLIC_BEHOLD_FEED_ID;

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
      throw new Error(`Behold respondio con ${res.status}`);
    }

    const data = (await res.json()) as BeholdResponse;

    const posts = getPosts(data)
      .slice(0, 9)
      .map((p) => {
        const mediaUrl = p.mediaUrl ?? p.media_url ?? "";
        const thumbnailUrl = p.thumbnailUrl ?? p.thumbnail_url;

        return {
          id: p.id,
          type: p.mediaType ?? p.media_type ?? "IMAGE",
          thumb: thumbnailUrl ?? mediaUrl,
          url: p.permalink ?? "",
          caption: p.caption?.slice(0, 120) ?? "",
          date: p.timestamp ?? "",
        };
      })
      .filter((post) => post.id && post.thumb && post.url);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    console.error("[api/instagram]", err);
    return NextResponse.json(
      { error: "No se pudo cargar el feed." },
      { status: 502 }
    );
  }
}
