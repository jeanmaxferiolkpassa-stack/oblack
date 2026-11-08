// app/commande/confirmation/page.tsx
// Étape 3 : confirmation finale de la commande

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrix } from "@/lib/communes";

type Commande = {
  livraison: {
    nom: string;
    telephone: string;
    commune: string;
    adresse: string;
    note: string;
    frais: number;
  };
  sousTotal: number;
  total: number;
  paiement: string;
  date: string;
};

export default function Confirmation() {
  const router = useRouter();
  const [commande, setCommande] = useState<Commande | null>(null);
  const [numero, setNumero] = useState("");

  useEffect(() => {
    const data = sessionStorage.getItem("oblack_commande");
    if (!data) {
      router.push("/commande/livraison");
      return;
    }
    setCommande(JSON.parse(data));
    // Numéro de commande unique : OB- + timestamp
    setNumero("OB-" + Date.now().toString().slice(-8));
  }, [router]);

  if (!commande) return null;

  const { livraison, sousTotal, total } = commande;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Icône succès */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">✅</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Commande confirmée !</h1>
        <p className="text-gray-500">
          Merci {livraison.nom.split(" ")[0]}, ta commande est bien enregistrée.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Numéro de commande :{" "}
          <span className="font-bold text-black">{numero}</span>
        </p>
      </div>

      {/* Détails livraison */}
      <div className="border rounded-xl p-4 mb-4">
        <h2 className="font-bold mb-3">Livraison</h2>
        <div className="text-sm space-y-1">
          <p>
            <span className="text-gray-500">Nom :</span> {livraison.nom}
          </p>
          <p>
            <span className="text-gray-500">Téléphone :</span>{" "}
            {livraison.telephone}
          </p>
          <p>
            <span className="text-gray-500">Commune :</span> {livraison.commune}
          </p>
          <p>
            <span className="text-gray-500">Adresse :</span> {livraison.adresse}
          </p>
          {livraison.note && (
            <p>
              <span className="text-gray-500">Note :</span> {livraison.note}
            </p>
          )}
        </div>
      </div>

      {/* Détails paiement */}
      <div className="border rounded-xl p-4 mb-4">
        <h2 className="font-bold mb-3">Paiement</h2>
        <div className="text-sm space-y-1">
          <p>
            <span className="text-gray-500">Mode :</span>{" "}
            {commande.paiement}
          </p>
          <div className="flex justify-between mt-2">
            <span className="text-gray-500">Sous-total</span>
            <span className="font-semibold">{formatPrix(sousTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Livraison</span>
            <span className="font-semibold">
              {formatPrix(livraison.frais)}
            </span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-base">
            <span className="font-bold">Total</span>
            <span className="font-bold">{formatPrix(total)}</span>
          </div>
        </div>
      </div>

      {/* Info délai */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-900">
        ⏱️ Ta commande sera livrée à <strong>{livraison.commune}</strong> sous{" "}
        <strong>24 à 48h</strong>. Le livreur te contactera au{" "}
        {livraison.telephone}.
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="btn-oblack flex-1 text-center">
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/compte"
          className="btn-oblack-outline flex-1 text-center"
        >
          Voir mes commandes
        </Link>
      </div>
    </div>
  );
}