// app/produit/[id]/page.tsx
// Fiche produit : photos, taille, couleur, prix, remise, stock

"use client";

import { useState } from "react";
import { formatPrix } from "@/lib/communes";

type Produit = {
  id: number;
  nom: string;
  description: string;
  prix: number;
  remise?: number;
  stock: number;
  photos: string[];
  tailles: string[];
  couleurs: string[];
};

// Produit d'exemple — à remplacer par Supabase plus tard
const PRODUIT: Produit = {
  id: 1,
  nom: "Robe noire élégante",
  description:
    "Robe noire fluide, coupe ajustée, parfaite pour les soirées. Tissu léger et confortable.",
  prix: 15000,
  remise: 20,
  stock: 8,
  photos: [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800",
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800",
  ],
  tailles: ["S", "M", "L", "XL"],
  couleurs: ["Noir", "Rouge", "Bleu"],
};

export default function FicheProduit() {
  const [photoActive, setPhotoActive] = useState(0);
  const [taille, setTaille] = useState<string | null>(null);
  const [couleur, setCouleur] = useState<string | null>(null);

  const p = PRODUIT;
  const prixFinal = p.remise ? Math.round(p.prix * (1 - p.remise / 100)) : p.prix;
  const enStock = p.stock > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Photos */}
        <div>
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
            <img
              src={p.photos[photoActive]}
              alt={p.nom}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {p.photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setPhotoActive(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                  photoActive === i ? "border-yellow-400" : "border-transparent"
                }`}
              >
                <img src={photo} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Infos */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{p.nom}</h1>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-black">{formatPrix(prixFinal)}</span>
            {p.remise && (
              <>
                <span className="text-gray-400 line-through">{formatPrix(p.prix)}</span>
                <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                  -{p.remise}%
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 mb-4">{p.description}</p>

          <p className={`text-sm font-semibold mb-4 ${enStock ? "text-green-600" : "text-red-600"}`}>
            {enStock ? `En stock (${p.stock} disponibles)` : "Rupture de stock"}
          </p>

          {/* Tailles */}
          <div className="mb-4">
            <p className="font-semibold mb-2">Taille</p>
            <div className="flex gap-2 flex-wrap">
              {p.tailles.map((t) => (
                <button
                  key={t}
                  onClick={() => setTaille(t)}
                  className={`px-4 py-2 rounded-lg border text-sm font-semibold ${
                    taille === t
                      ? "bg-black text-white border-black"
                      : "border-gray-300 text-black"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Couleurs */}
          <div className="mb-6">
            <p className="font-semibold mb-2">Couleur</p>
            <div className="flex gap-2 flex-wrap">
              {p.couleurs.map((c) => (
                <button
                  key={c}
                  onClick={() => setCouleur(c)}
                  className={`px-4 py-2 rounded-lg border text-sm font-semibold ${
                    couleur === c
                      ? "bg-black text-white border-black"
                      : "border-gray-300 text-black"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              disabled={!enStock || !taille || !couleur}
              className="btn-oblack flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Ajouter au panier
            </button>
            <button className="btn-oblack-outline">❤️ Favoris</button>
          </div>

          {(!taille || !couleur) && enStock && (
            <p className="text-xs text-gray-500 mt-2">
              Choisis une taille et une couleur pour ajouter au panier.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}