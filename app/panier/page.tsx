// app/panier/page.tsx
// Panier : articles, quantités, total + frais de livraison

"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrix, COMMUNES } from "@/lib/communes";

type ArticlePanier = {
  id: number;
  nom: string;
  prix: number;
  photo: string;
  taille: string;
  couleur: string;
  quantite: number;
};

// Articles d'exemple — à remplacer par un vrai panier (localStorage/Supabase)
const ARTICLES_INITIAUX: ArticlePanier[] = [
  {
    id: 1,
    nom: "Robe noire élégante",
    prix: 12000,
    photo: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    taille: "M",
    couleur: "Noir",
    quantite: 1,
  },
  {
    id: 3,
    nom: "Baskets femme",
    prix: 22500,
    photo: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
    taille: "38",
    couleur: "Blanc",
    quantite: 2,
  },
];

export default function Panier() {
  const [articles, setArticles] = useState<ArticlePanier[]>(ARTICLES_INITIAUX);
  const [commune, setCommune] = useState<string>("");

  const sousTotal = articles.reduce((s, a) => s + a.prix * a.quantite, 0);

  const fraisLivraison = commune
    ? COMMUNES.find((c) => c.nom === commune)?.tarif ?? 0
    : 0;

  const total = sousTotal + fraisLivraison;

  function changerQuantite(id: number, delta: number) {
    setArticles((prev) =>
      prev
        .map((a) =>
          a.id === id ? { ...a, quantite: Math.max(1, a.quantite + delta) } : a
        )
        .filter((a) => a.quantite > 0)
    );
  }

  function supprimer(id: number) {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  if (articles.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-4xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold mb-2">Ton panier est vide</h1>
        <p className="text-gray-500 mb-6">Ajoute des articles pour commencer.</p>
        <Link href="/" className="btn-oblack inline-block">
          Voir les produits
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Mon panier</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Liste articles */}
        <div className="lg:col-span-2 space-y-3">
          {articles.map((a) => (
            <div
              key={`${a.id}-${a.taille}-${a.couleur}`}
              className="flex gap-3 border rounded-xl p-3"
            >
              <img
                src={a.photo}
                alt={a.nom}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm line-clamp-1">{a.nom}</h3>
                <p className="text-xs text-gray-500">
                  Taille {a.taille} · {a.couleur}
                </p>
                <p className="font-bold mt-1">{formatPrix(a.prix)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => changerQuantite(a.id, -1)}
                    className="w-7 h-7 rounded border font-bold"
                  >
                    −
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">
                    {a.quantite}
                  </span>
                  <button
                    onClick={() => changerQuantite(a.id, 1)}
                    className="w-7 h-7 rounded border font-bold"
                  >
                    +
                  </button>
                  <button
                    onClick={() => supprimer(a.id)}
                    className="ml-auto text-xs text-red-600 font-semibold"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Résumé */}
        <div className="border rounded-xl p-4 h-fit sticky top-20">
          <h2 className="font-bold mb-3">Résumé</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Sous-total</span>
              <span className="font-semibold">{formatPrix(sousTotal)}</span>
            </div>

            <div>
              <label className="text-gray-600 block mb-1">
                Commune de livraison
              </label>
              <select
                value={commune}
                onChange={(e) => setCommune(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Choisir une commune</option>
                {COMMUNES.map((c) => (
                  <option key={c.nom} value={c.nom}>
                    {c.nom} — {formatPrix(c.tarif)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Livraison</span>
              <span className="font-semibold">
                {commune ? formatPrix(fraisLivraison) : "—"}
              </span>
            </div>

            <hr />

            <div className="flex justify-between text-base">
              <span className="font-bold">Total</span>
              <span className="font-bold">{formatPrix(total)}</span>
            </div>
          </div>

          <Link
            href="/commande/livraison"
            className={`btn-oblack block text-center mt-4 ${
              !commune ? "pointer-events-none opacity-40" : ""
            }`}
          >
            Passer la commande
          </Link>

          {!commune && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Choisis une commune pour continuer.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}