// app/page.tsx
// Page d'accueil O'Black : bannières, filtres, grille produits

"use client";

import { useState } from "react";
import { formatPrix } from "@/lib/communes";

type Produit = {
  id: number;
  nom: string;
  prix: number;
  remise?: number;
  photo: string;
  genre: "femme" | "homme";
  categorie: "vetements" | "chaussures";
};

// Produits d'exemple (Unsplash) — à remplacer via l'Admin
const PRODUITS: Produit[] = [
  { id: 1, nom: "Robe noire élégante", prix: 15000, remise: 20, photo: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", genre: "femme", categorie: "vetements" },
  { id: 2, nom: "Chemise homme blanche", prix: 12000, photo: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400", genre: "homme", categorie: "vetements" },
  { id: 3, nom: "Baskets femme", prix: 25000, remise: 10, photo: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400", genre: "femme", categorie: "chaussures" },
  { id: 4, nom: "Costume homme", prix: 45000, photo: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400", genre: "homme", categorie: "vetements" },
  { id: 5, nom: "Sac à main", prix: 18000, remise: 15, photo: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400", genre: "femme", categorie: "vetements" },
  { id: 6, nom: "Chaussures homme cuir", prix: 30000, photo: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400", genre: "homme", categorie: "chaussures" },
];

export default function Accueil() {
  const [genre, setGenre] = useState<"tous" | "femme" | "homme">("tous");
  const [categorie, setCategorie] = useState<"tous" | "vetements" | "chaussures">("tous");

  const produitsFiltres = PRODUITS.filter((p) => {
    const okGenre = genre === "tous" || p.genre === genre;
    const okCategorie = categorie === "tous" || p.categorie === categorie;
    return okGenre && okCategorie;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Bannière promo */}
      <div className="bg-black text-white rounded-2xl p-8 mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Bienvenue chez O&apos;<span className="text-yellow-400">BLACK</span>
        </h1>
        <p className="text-gray-300">Mode homme & femme — Livraison Abidjan 24-48h</p>
        <p className="text-yellow-400 font-semibold mt-2">-20% sur la première commande</p>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["tous", "femme", "homme"] as const).map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              genre === g ? "bg-black text-white" : "bg-gray-100 text-black"
            }`}
          >
            {g === "tous" ? "Tous" : g.charAt(0).toUpperCase() + g.slice(1)}
          </button>
        ))}
        <span className="w-px bg-gray-300 mx-1" />
        {(["tous", "vetements", "chaussures"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCategorie(c)}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              categorie === c ? "bg-yellow-400 text-black" : "bg-gray-100 text-black"
            }`}
          >
            {c === "tous" ? "Tout" : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {/* Grille produits */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {produitsFiltres.map((p) => {
          const prixFinal = p.remise ? Math.round(p.prix * (1 - p.remise / 100)) : p.prix;
          return (
            <a
              key={p.id}
              href={`/produit/${p.id}`}
              className="group border rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={p.photo}
                  alt={p.nom}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                {p.remise && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                    -{p.remise}%
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold line-clamp-1">{p.nom}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-black">{formatPrix(prixFinal)}</span>
                  {p.remise && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrix(p.prix)}
                    </span>
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {produitsFiltres.length === 0 && (
        <p className="text-center text-gray-500 py-12">Aucun produit trouvé.</p>
      )}
    </div>
  );
}