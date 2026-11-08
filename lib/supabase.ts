// lib/supabase.ts
// Connexion à la base de données Supabase

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Variables Supabase manquantes. Vérifie ton fichier .env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);