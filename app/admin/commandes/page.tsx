// app/admin/commandes/page.tsx
// Gestion des commandes avec les 4 statuts

"use client";

import { useState } from "react";
import { formatPrix } from "@/lib/communes";

type Statut = "en attente" | "en cours" | "livré" | "annulé";

type Commande = {
  id: string;
  client: string;
  commune: string;
  total: number;
  statut: Statut;
  date: string;
};

const COMMANDES_INITIALES: Commande[] = [
  { id: "OB-12345678", client: "Koffi Yao", commune: "Cocody", total: 35500, statut: "en attente", date: "24/10 10:30" },
  { id: "OB-87654321", client: "Aya Traoré", commune: "Yopougon", total: 12000, statut: "en cours", date: "24/10 09:15" },
  { id: "OB-11223344", client: "Moussa Diallo", commune: "Plateau", total: 45000, statut: "livré", date: "23/10 17:00" },
];

const STATUTS: { valeur: Statut; couleur: string }[] = [
  { valeur: "en attente", couleur: "bg-yellow-100 text-yellow-800" },
  { valeur: "en cours", couleur: "bg-blue-100 text-blue-800" },
  { valeur: "livré", couleur: "bg-green-100 text-green-800" },
  { valeur: "annulé", couleur: "bg-red-100 text-red-800" },
];

export default function AdminCommandes() {
  const [commandes, setCommandes] = useState<Commande[]>(COMMANDES_INITIALES);
  const [filtre, setFiltre] = useState<Statut | "toutes">("toutes");

  function changerStatut(id: string, statut: Statut) {
    setCommandes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, statut } : c))
    );
  }

  const commandesFiltrees =
    filtre === "toutes"
      ? commandes
      : commandes.filter((c) => c.statut === filtre);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Commandes</h1>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFiltre("toutes")}
          className={`text-xs px-3 py-1 rounded-full font-semibold ${
            filtre === "toutes" ? "bg-black text-white" : "bg-gray-100 text-gray-600"
          }`}
        >
          Toutes ({commandes.length})
        </button>
        {STATUTS.map((s) => (
          <button
            key={s.valeur}
            onClick={() => setFiltre(s.valeur)}
            className={`text-xs px-3 py-1 rounded-full font-semibold ${
              filtre === s.valeur ? "bg-black text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            {s.valeur} ({commandes.filter((c) => c.statut === s.valeur).length})
          </button>
        ))}
      </div>

      {/* Liste */}
      <div className="space-y-3">
        {commandesFiltrees.map((c) => (
          <div key={c.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="font-bold">{c.id}</p>
                <p className="text-sm text-gray-600">{c.client}</p>
                <p className="text-xs text-gray-400">
                  {c.commune} · {c.date}
                </p>
              </div>
              <p className="font-bold">{formatPrix(c.total)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {STATUTS.map((s) => (
                <button
                  key={s.valeur}
                  onClick={() => changerStatut(c.id, s.valeur)}
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    c.statut === s.valeur
                      ? s.couleur + " ring-2 ring-black"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {s.valeur}
                </button>
              ))}
            </div>
          </div>
        ))}

        {commandesFiltrees.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Aucune commande avec ce statut.
          </p>
        )}
      </div>
    </div>
  );
}