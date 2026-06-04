import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hola, soy José",
  description: "Una presentación breve, honesta y con intención.",
  // No indexar por bots — es una experiencia privada
  robots: { index: false, follow: false },
  openGraph: {
    title: "Hola, soy José",
    description: "Una presentación breve, honesta y con intención.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
