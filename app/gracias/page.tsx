import type { Metadata } from "next";
import EtherealBackground from "@/components/EtherealBackground";
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
    <main className="relative isolate flex min-h-screen items-center justify-center px-4 py-16">
      <EtherealBackground />
      <div className="relative z-10">
        <ThankYouMessage intent={safeIntent} />
      </div>
    </main>
  );
}
