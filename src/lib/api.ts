import { supabase } from "./supabase";
import type { DbPainting, PaintingWithRating } from "./supabase";

const hasSupabase = !!(
  import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const ANON_USER_KEY = "artfusion_anon_id";

function getAnonUserId(): string {
  let id = localStorage.getItem(ANON_USER_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(ANON_USER_KEY, id);
  }
  return id;
}

export async function fetchPaintings(): Promise<PaintingWithRating[]> {
  if (!hasSupabase || !supabase) throw new Error("Supabase not configured");

  const { data: paintings, error } = await supabase
    .from("paintings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  if (!paintings?.length) return [];

  const { data: ratingData } = await supabase
    .from("ratings")
    .select("painting_id, rating")
    .in("painting_id", paintings.map((p) => p.id));

  const ratingMap = new Map<number, { sum: number; count: number }>();
  for (const r of ratingData || []) {
    const curr = ratingMap.get(r.painting_id) ?? { sum: 0, count: 0 };
    curr.sum += Number(r.rating);
    curr.count += 1;
    ratingMap.set(r.painting_id, curr);
  }

  return paintings.map((p) => {
    const agg = ratingMap.get(p.id);
    const avg_rating = agg ? agg.sum / agg.count : (p as { rating?: number }).rating ?? 4;
    const rating_count = agg?.count ?? 0;
    return { ...p, avg_rating, rating_count };
  });
}

export async function submitRating(
  paintingId: number,
  rating: number
): Promise<{ avg_rating: number; rating_count: number }> {
  if (!hasSupabase || !supabase) throw new Error("Supabase not configured");

  const userId = getAnonUserId();
  const { error } = await supabase.from("ratings").upsert(
    { painting_id: paintingId, user_id: userId, rating },
    { onConflict: "painting_id,user_id" }
  );

  if (error) throw new Error(error.message);

  const { data } = await supabase
    .from("ratings")
    .select("rating")
    .eq("painting_id", paintingId);

  const ratings = (data || []).map((r) => Number(r.rating));
  const avg_rating =
    ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : rating;
  return { avg_rating, rating_count: ratings.length };
}

export async function login(email: string, password: string) {
  if (!hasSupabase || !supabase) throw new Error("Supabase not configured");

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  if (!data.session) throw new Error("Login failed");

  return {
    token: data.session.access_token,
    username: data.user?.email ?? email,
  };
}

export async function verifyToken(token: string) {
  if (!hasSupabase || !supabase) return null;
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;
  return { valid: true, username: data.user.email };
}

export async function createPainting(
  _token: string,
  data: FormData | Record<string, unknown>
): Promise<DbPainting> {
  if (!hasSupabase || !supabase) throw new Error("Supabase not configured");

  const body = data instanceof FormData
    ? Object.fromEntries(data.entries()) as Record<string, string>
    : (data as Record<string, unknown>);

  let imageUrl = String(body.image || "");
  const file = data instanceof FormData ? (data as FormData).get("image") as File | null : null;

  if (file && file.size > 0) {
    const ext = file.name.split(".").pop() || "png";
    const path = `paintings/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("paintings").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) throw new Error(error.message);
    const { data: urlData } = supabase.storage.from("paintings").getPublicUrl(path);
    imageUrl = urlData.publicUrl;
  }

  const row = {
    title: String(body.title || "Untitled"),
    description: String(body.description || ""),
    price: String(body.price || "Price on request"),
    image: imageUrl,
    category: String(body.category || "Landscape"),
    featured: body.featured === "true" || body.featured === true,
  };

  const { data: created, error } = await supabase
    .from("paintings")
    .insert(row)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return { ...created, avg_rating: 4, rating_count: 0 };
}

export async function updatePainting(
  _token: string,
  id: number,
  data: FormData | Record<string, unknown>
): Promise<PaintingWithRating> {
  if (!hasSupabase || !supabase) throw new Error("Supabase not configured");

  const body = data instanceof FormData
    ? Object.fromEntries(data.entries()) as Record<string, string>
    : (data as Record<string, unknown>);

  let imageUrl: string | undefined;
  const file = data instanceof FormData ? (data as FormData).get("image") as File | null : null;

  if (file && file.size > 0) {
    const ext = file.name.split(".").pop() || "png";
    const path = `paintings/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("paintings").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) throw new Error(error.message);
    const { data: urlData } = supabase.storage.from("paintings").getPublicUrl(path);
    imageUrl = urlData.publicUrl;
  }

  const updates: Record<string, unknown> = {};
  if (body.title !== undefined) updates.title = body.title;
  if (body.description !== undefined) updates.description = body.description;
  if (body.price !== undefined) updates.price = body.price;
  if (body.category !== undefined) updates.category = body.category;
  if (body.featured !== undefined) updates.featured = body.featured === "true" || body.featured === true;
  if (imageUrl) updates.image = imageUrl;

  const { data: updated, error } = await supabase
    .from("paintings")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return { ...updated, avg_rating: 4, rating_count: 0 };
}

export async function deletePainting(_token: string, id: number) {
  if (!hasSupabase || !supabase) throw new Error("Supabase not configured");
  const { error } = await supabase.from("paintings").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export { hasSupabase };
