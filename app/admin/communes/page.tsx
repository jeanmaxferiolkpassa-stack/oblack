// app/admin/communes/page.tsx
// Gestion des communes et tarifs de livraison

"use client";

import { useState } from "react";
import { COMMUNES, formatPrix } from "@/lib/communes";

export default function AdminCommunes() {
  const [communes, setCommunes] = useState(COMMUNES);
  const [edit, setEdit] = useState<string | null>(null);
  const [valeur, setValeur] = useState("");

  function modifier(nom: string, tarif: number) {
    if (isNaN(tarif) || tarif < 0) return;
    setCommunes((prev) =>
      prev.map((c) => (c.nom === nom ? { ...c, tarif } : c))
    );
    setEdit(null);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Communes & tarifs</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {communes.map((c, i) => (
          <div
            key={c.nom}
            className={`flex items-center justify-between px-4 py-3 text-sm ${
              i % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <span className="font-semibold">{c.nom}</span>
            {edit === c.nom ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={valeur}
                  onChange={(e) => setValeur(e.target.value)}
                  className="border rounded px-2 py-1 w-24 text-right"
                  autoFocus
                />
                <span className="text-xs text-gray-500">F</span>
                <button
                  onClick={() => modifier(c.nom, Number(valeur))}
                  className="text-xs bg-black text-white px-2 py-1 rounded"
                >
                  OK
                </button>
                <button
                  onClick={() => setEdit(null)}
                  className="text-xs text-gray-500"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="font-bold">{formatPrix(c.tarif)}</span>
                <button
                  onClick={() => {
                    setEdit(c.nom);
                    setValeur(String(c.tarif));
                  }}
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  Modifier
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Les modifications sont locales pour l&apos;instant. Elles seront
        enregistrées dans Supabase à la prochaine étape.
      </p>
    </div>
  );
}