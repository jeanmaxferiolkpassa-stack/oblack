// app/layout.tsx
// Squelette de l'application : Header sur toutes les pages

import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "O'Black — Mode à Abidjan",
  description:
    "Vêtements et chaussures homme et femme, livrés à Abidjan en 24-48h.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col bg-white text-black">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="bg-black text-white text-center py-4 text-sm">
          © {new Date().getFullYear()} O&apos;Black — Abidjan
        </footer>
      </body>
    </html>
  );
}