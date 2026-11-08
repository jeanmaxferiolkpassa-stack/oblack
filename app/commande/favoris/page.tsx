// app/favoris/page.tsx
// Page des favoris : produits aimés par le client

"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrix } from "@/lib/communes";

type Produit = {
  id: number;
  nom: string;
  prix: number;
  remise?: number;
  photo: string;
};

// Favoris d'exemple — à remplacer par Supabase
const FAVORIS_INITIAUX: Produit[] = [
  {
    id: 1,
    nom: "Robe noire élégante",
    prix: 15000,
    remise: 20,
    photo: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
  },
  {
    id: 3,
    nom: "Baskets femme",
    prix: 25000,
    remise: 10,
    photo: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
  },
];

export default function Favoris() {
  const [favoris, setFavoris] = useState<Produit[]>(FAVORIS_INITIAUX);

  function retirer(id: number) {
    setFavoris((prev) => prev.filter((p) => p.id !== id));
  }

  if (favoris.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-4xl mb-4">❤️</p>
        <h1 className="text-2xl font-bold mb-2">Aucun favori</h1>
        <p className="text-gray-500 mb-6">
          Ajoute des articles à tes favoris pour les retrouver ici.
        </p>
        <Link href="/" className="btn-oblack inline-block">
          Voir les produits
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">
        Mes favoris ({favoris.length})
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoris.map((p) => {
          const prixFinal = p.remise
            ? Math.round(p.prix * (1 - p.remise / 100))
            : p.prix;
          return (
            <div key={p.id} className="border rounded-xl overflow-hidden relative">
              {/* Bouton retirer */}
              <button
                onClick={() => retirer(p.id)}
                aria-label="Retirer des favoris"
                className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-red-500"
              >
                ✕
              </button>

              <Link href={`/produit/${p.id}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={p.photo}
                    alt={p.nom}
                    className="w-full h-full object-cover"
                  />
                  {p.remise && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                      -{p.remise}%
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold line-clamp-1">
                    {p.nom}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold">{formatPrix(prixFinal)}</span>
                    {p.remise && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrix(p.prix)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}