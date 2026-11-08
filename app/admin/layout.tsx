// app/admin/layout.tsx
// Squelette de l'admin : sidebar + contenu

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LIENS = [
  { href: "/admin", label: "Tableau de bord", icone: "📊" },
  { href: "/admin/produits", label: "Produits", icone: "👕" },
  { href: "/admin/commandes", label: "Commandes", icone: "📦" },
  { href: "/admin/communes", label: "Communes & tarifs", icone: "📍" },
  { href: "/admin/mediatheque", label: "Médiathèque", icone: "🖼️" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar PC */}
      <aside className="w-60 bg-black text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <Link href="/admin" className="text-xl font-bold">
            O&apos;<span className="text-yellow-400">BLACK</span>
            <span className="block text-xs text-gray-400 font-normal mt-1">
              Administration
            </span>
          </Link>
        </div>
        <nav className="flex-1 p-2">
          {LIENS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-1 ${
                pathname === l.href
                  ? "bg-yellow-400 text-black font-semibold"
                  : "hover:bg-gray-800"
              }`}
            >
              <span>{l.icone}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800 text-xs text-gray-400">
          <Link href="/" className="hover:text-yellow-400">
            ← Retour au site
          </Link>
        </div>
      </aside>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        {/* Barre mobile */}
        <div className="md:hidden bg-black text-white p-3 flex gap-2 overflow-x-auto">
          {LIENS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                pathname === l.href ? "bg-yellow-400 text-black" : "bg-gray-800"
              }`}
            >
              {l.icone} {l.label}
            </Link>
          ))}
        </div>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}