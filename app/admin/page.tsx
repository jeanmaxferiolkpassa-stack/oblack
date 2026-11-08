// app/admin/page.tsx
// Tableau de bord : stats + graphique des ventes (FCFA)

"use client";

import { formatPrix } from "@/lib/communes";

// Données d'exemple — à remplacer par Supabase
const STATS = {
  ventesJour: 125000,
  commandesJour: 8,
  produitsActifs: 42,
  enAttente: 3,
};

const VENTES_SEMAINE = [
  { jour: "Lun", montant: 85000 },
  { jour: "Mar", montant: 120000 },
  { jour: "Mer", montant: 95000 },
  { jour: "Jeu", montant: 150000 },
  { jour: "Ven", montant: 180000 },
  { jour: "Sam", montant: 220000 },
  { jour: "Dim", montant: 125000 },
];

export default function AdminDashboard() {
  const max = Math.max(...VENTES_SEMAINE.map((v) => v.montant));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>

      {/* Cartes stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Ventes du jour", valeur: formatPrix(STATS.ventesJour), icone: "💰" },
          { label: "Commandes du jour", valeur: STATS.commandesJour, icone: "📦" },
          { label: "Produits actifs", valeur: STATS.produitsActifs, icone: "👕" },
          { label: "En attente", valeur: STATS.enAttente, icone: "⏳" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-2xl mb-1">{s.icone}</p>
            <p className="text-lg font-bold">{s.valeur}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Graphique */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="font-bold mb-4">Ventes des 7 derniers jours (FCFA)</h2>
        <div className="flex items-end justify-between gap-2 h-56">
          {VENTES_SEMAINE.map((v) => (
            <div key={v.jour} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight">
                {formatPrix(v.montant)}
              </span>
              <div
                className="w-full bg-black rounded-t-md hover:bg-yellow-400 transition"
                style={{ height: `${(v.montant / max) * 80}%` }}
              />
              <span className="text-xs text-gray-500">{v.jour}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}