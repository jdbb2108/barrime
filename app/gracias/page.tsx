import type { Metadata } from "next";
import ThankYouMessage from "@/components/ThankYouMessage";

export const metadata: Metadata = {
  title: "Gracias — Hola, soy José",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ intent?: string }>;
}

export default async function GraciasPage({ searchParams }: Props) {
  const { intent } = await searchParams;
  const safeIntent =
    intent === "friendship" || intent === "project" || intent === "pass"
      ? intent
      : "open";

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-4 py-16">
      <ThankYouMessage intent={safeIntent} />
    </main>
  );
}
