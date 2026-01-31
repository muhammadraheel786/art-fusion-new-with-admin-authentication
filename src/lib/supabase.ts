import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export type DbPainting = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  featured: boolean;
  created_at?: string;
};

export type PaintingWithRating = DbPainting & {
  avg_rating: number;
  rating_count: number;
};
