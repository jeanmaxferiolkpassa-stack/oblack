// lib/communes.ts
// Liste des communes + calcul des frais de livraison O'Black

export type Commune = {
  nom: string;
  tarif: number;
};

export const COMMUNES: Commune[] = [
  { nom: "Plateau", tarif: 1000 },
  { nom: "Cocody", tarif: 1000 },
  { nom: "Marcory", tarif: 1000 },
  { nom: "Treichville", tarif: 1000 },
  { nom: "Adjamé", tarif: 1000 },
  { nom: "Attécoubé", tarif: 1500 },
  { nom: "Koumassi", tarif: 1500 },
  { nom: "Abobo", tarif: 1500 },
  { nom: "Yopougon", tarif: 1500 },
  { nom: "Port-Bouët", tarif: 2000 },
  { nom: "Anyama", tarif: 2000 },
  { nom: "Bingerville", tarif: 2000 },
  { nom: "Bassam", tarif: 3000 },
  { nom: "Songon", tarif: 3000 },
];

// Retourne le tarif d'une commune (0 si introuvable)
export function getTarifLivraison(nomCommune: string): number {
  const commune = COMMUNES.find(
    (c) => c.nom.toLowerCase() === nomCommune.toLowerCase()
  );
  return commune ? commune.tarif : 0;
}

// Formate un prix en FCFA : 1500 → "1 500 F"
export function formatPrix(montant: number): string {
  return montant.toLocaleString("fr-FR") + " F";
}