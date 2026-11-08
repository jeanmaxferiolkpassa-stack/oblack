// app/compte/page.tsx
// Espace client : infos, communes, paiements, historique

"use client";

import { useState } from "react";
import Link from "next/link";
import { COMMUNES, formatPrix } from "@/lib/communes";

const MOBILE_MONEY = [
  { nom: "Orange Money", couleur: "bg-orange-500" },
  { nom: "MTN MoMo", couleur: "bg-yellow-500" },
  { nom: "Moov Money", couleur: "bg-blue-600" },
  { nom: "Wave", couleur: "bg-sky-400" },
];

// Historique d'exemple — à remplacer par Supabase
const COMMANDES_EXEMPLE = [
  {
    numero: "OB-12345678",
    date: "15/06/2026",
    total: 35500,
    statut: "Livré",
    couleur: "text-green-600",
  },
  {
    numero: "OB-87654321",
    date: "10/06/2026",
    total: 12000,
    statut: "En cours",
    couleur: "text-yellow-600",
  },
];

export default function Compte() {
  const [onglet, setOnglet] = useState<"commandes" | "livraison" | "paiement">(
    "commandes"
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">Mon compte</h1>
      <p className="text-gray-500 text-sm mb-6">Bienvenue chez O&apos;Black</p>

      {/* Onglets */}
      <div className="flex gap-2 mb-6 border-b">
        {[
          { id: "commandes", label: "Commandes" },
          { id: "livraison", label: "Livraison" },
          { id: "paiement", label: "Paiement" },
        ].map((o) => (
          <button
            key={o.id}
            onClick={() => setOnglet(o.id as typeof onglet)}
            className={`px-4 py-2 text-sm font-semibold border-b-2 -mb-px ${
              onglet === o.id
                ? "border-black text-black"
                : "border-transparent text-gray-400"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* Onglet Commandes */}
      {onglet === "commandes" && (
        <div className="space-y-3">
          {COMMANDES_EXEMPLE.map((c) => (
            <div
              key={c.numero}
              className="border rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-sm">{c.numero}</p>
                <p className="text-xs text-gray-500">{c.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{formatPrix(c.total)}</p>
                <p className={`text-xs font-semibold ${c.couleur}`}>
                  {c.statut}
                </p>
              </div>
            </div>
          ))}
          {COMMANDES_EXEMPLE.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Aucune commande pour l&apos;instant.
            </p>
          )}
          <Link href="/" className="btn-oblack block text-center mt-4">
            Faire une commande
          </Link>
        </div>
      )}

      {/* Onglet Livraison */}
      {onglet === "livraison" && (
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Nous livrons uniquement à Abidjan, sous 24 à 48h. Voici les tarifs
            par commune :
          </p>
          <div className="border rounded-xl overflow-hidden">
            {COMMUNES.map((c, i) => (
              <div
                key={c.nom}
                className={`flex justify-between px-4 py-2 text-sm ${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <span>{c.nom}</span>
                <span className="font-semibold">{formatPrix(c.tarif)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Onglet Paiement */}
      {onglet === "paiement" && (
        <div>
          <div className="border-2 border-black rounded-xl p-4 mb-4 bg-gray-50">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💵</span>
              <div>
                <p className="font-bold">Paiement à la livraison</p>
                <p className="text-sm text-gray-600">
                  Tu paies en espèces au livreur.
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm font-semibold text-gray-500 mb-2">
            Paiement mobile (bientôt disponible)
          </p>
          <div className="grid grid-cols-2 gap-3">
            {MOBILE_MONEY.map((m) => (
              <div
                key={m.nom}
                className="border rounded-xl p-3 flex items-center gap-2 opacity-50"
              >
                <span className={`w-8 h-8 rounded-full ${m.couleur}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{m.nom}</p>
                  <span className="badge-bientot">Bientôt disponible</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}