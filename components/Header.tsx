// components/Header.tsx
// Bandeau du haut avec logo O'Black, recherche et icônes

"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [recherche, setRecherche] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wider">
          O&apos;<span className="text-yellow-400">BLACK</span>
        </Link>

        {/* Barre de recherche (PC + mobile) */}
        <div className="flex-1 max-w-xl">
          <input
            type="search"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher un article..."
            className="w-full px-4 py-2 rounded-full text-black text-sm outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Icônes */}
        <nav className="flex items-center gap-4 text-xl">
          <Link href="/favoris" aria-label="Favoris">
            ❤️
          </Link>
          <Link href="/panier" aria-label="Panier">
            🛒
          </Link>
          <Link href="/compte" aria-label="Compte">
            👤
          </Link>
        </nav>
      </div>
    </header>
  );
}