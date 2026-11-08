// app/commande/livraison/page.tsx
// Étape 1 du tunnel de commande : formulaire de livraison

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { COMMUNES, formatPrix } from "@/lib/communes";

export default function Livraison() {
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [commune, setCommune] = useState("");
  const [adresse, setAdresse] = useState("");
  const [note, setNote] = useState("");

  const frais = commune ? COMMUNES.find((c) => c.nom === commune)?.tarif ?? 0 : 0;

  const valide = nom.trim() && telephone.trim() && commune && adresse.trim();

  function continuer() {
    if (!valide) return;
    // On stocke les infos de livraison dans sessionStorage pour l'étape paiement
    sessionStorage.setItem(
      "oblack_livraison",
      JSON.stringify({ nom, telephone, commune, adresse, note, frais })
    );
    router.push("/commande/paiement");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Étapes */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <span className="bg-black text-white px-3 py-1 rounded-full font-semibold">
          1. Livraison
        </span>
        <span className="text-gray-400">2. Paiement</span>
        <span className="text-gray-400">3. Confirmation</span>
      </div>

      <h1 className="text-2xl font-bold mb-6">Informations de livraison</h1>

      <div className="space-y-4">
        {/* Nom */}
        <div>
          <label className="block text-sm font-semibold mb-1">Nom complet *</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Ex : Koffi Yao"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-semibold mb-1">Téléphone *</label>
          <input
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            placeholder="Ex : 07 00 00 00 00"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Commune */}
        <div>
          <label className="block text-sm font-semibold mb-1">Commune *</label>
          <select
            value={commune}
            onChange={(e) => setCommune(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Choisir une commune</option>
            {COMMUNES.map((c) => (
              <option key={c.nom} value={c.nom}>
                {c.nom} — {formatPrix(c.tarif)}
              </option>
            ))}
          </select>
          {commune && (
            <p className="text-xs text-gray-500 mt-1">
              Frais de livraison : <strong>{formatPrix(frais)}</strong>
            </p>
          )}
        </div>

        {/* Adresse */}
        <div>
          <label className="block text-sm font-semibold mb-1">Adresse précise *</label>
          <input
            type="text"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            placeholder="Ex : Angré, 7e tranche, près de la pharmacie"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Note pour le livreur (facultatif)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ex : Appeler avant d'arriver"
            rows={2}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      <button
        onClick={continuer}
        disabled={!valide}
        className="btn-oblack w-full mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continuer vers le paiement
      </button>

      {!valide && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Remplis tous les champs obligatoires (*) pour continuer.
        </p>
      )}
    </div>
  );
}