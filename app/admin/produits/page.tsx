// app/admin/produits/page.tsx
// Gestion des produits : liste, ajout, modification, suppression

"use client";

import { useState } from "react";
import { formatPrix } from "@/lib/communes";

type Produit = {
  id: number;
  nom: string;
  prix: number;
  stock: number;
  categorie: string;
  genre: string;
  actif: boolean;
};

const PRODUITS_INITIAUX: Produit[] = [
  { id: 1, nom: "Robe noire élégante", prix: 15000, stock: 8, categorie: "Vêtements", genre: "Femme", actif: true },
  { id: 2, nom: "Chemise homme blanche", prix: 12000, stock: 15, categorie: "Vêtements", genre: "Homme", actif: true },
  { id: 3, nom: "Baskets femme", prix: 25000, stock: 0, categorie: "Chaussures", genre: "Femme", actif: false },
];

export default function AdminProduits() {
  const [produits, setProduits] = useState<Produit[]>(PRODUITS_INITIAUX);
  const [modal, setModal] = useState(false);

  function supprimer(id: number) {
    if (confirm("Supprimer ce produit ?")) {
      setProduits((p) => p.filter((x) => x.id !== id));
    }
  }

  function toggleActif(id: number) {
    setProduits((p) =>
      p.map((x) => (x.id === id ? { ...x, actif: !x.actif } : x))
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Produits</h1>
        <button onClick={() => setModal(true)} className="btn-oblack text-sm">
          + Ajouter
        </button>
      </div>

      {/* Liste */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-3 text-xs font-semibold text-gray-500 border-b">
          <span className="col-span-4">Produit</span>
          <span className="col-span-2">Prix</span>
          <span className="col-span-2">Stock</span>
          <span className="col-span-2">Genre</span>
          <span className="col-span-2 text-right">Actions</span>
        </div>
        {produits.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-2 md:grid-cols-12 gap-2 px-4 py-3 border-b last:border-0 items-center text-sm"
          >
            <span className="col-span-4 font-semibold">{p.nom}</span>
            <span className="col-span-2">{formatPrix(p.prix)}</span>
            <span className={`col-span-2 ${p.stock === 0 ? "text-red-600 font-semibold" : ""}`}>
              {p.stock}
            </span>
            <span className="col-span-2">{p.genre}</span>
            <div className="col-span-2 flex gap-2 justify-end">
              <button
                onClick={() => toggleActif(p.id)}
                className={`text-xs px-2 py-1 rounded ${
                  p.actif ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                }`}
              >
                {p.actif ? "Actif" : "Inactif"}
              </button>
              <button
                onClick={() => supprimer(p.id)}
                className="text-xs px-2 py-1 rounded bg-red-100 text-red-700"
              >
                Suppr.
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal ajout (simplifié) */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="font-bold mb-4">Ajouter un produit</h2>
            <p className="text-sm text-gray-500 mb-4">
              Formulaire complet (nom, prix, stock, catégorie, genre, 5 photos
              max + 1 vidéo) à connecter à Supabase Storage.
            </p>
            <button onClick={() => setModal(false)} className="btn-oblack w-full">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}