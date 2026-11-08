// app/admin/mediatheque/page.tsx
// Médiathèque : photos et vidéos des produits

"use client";

const MEDIAS_EXEMPLE = [
  {
    nom: "robe-noire-1.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
  },
  {
    nom: "robe-noire-2.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400",
  },
  {
    nom: "baskets-femme.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
  },
  {
    nom: "chemise-homme.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
  },
];

export default function AdminMediatheque() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Médiathèque</h1>
        <button className="btn-oblack text-sm">+ Uploader</button>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Photos et vidéos utilisées sur le site. Upload via Supabase Storage à
        connecter.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {MEDIAS_EXEMPLE.map((m) => (
          <div
            key={m.nom}
            className="bg-white rounded-xl overflow-hidden shadow-sm"
          >
            <div className="aspect-square bg-gray-100">
              <img
                src={m.url}
                alt={m.nom}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2">
              <p className="text-xs font-semibold truncate">{m.nom}</p>
              <p className="text-xs text-gray-400">{m.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}