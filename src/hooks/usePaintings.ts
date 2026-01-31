import { useState, useEffect, useCallback } from "react";
import { fetchPaintings, hasSupabase } from "@/lib/api";
import { paintings as staticPaintings } from "@/data/paintings";
import type { Painting } from "@/data/paintings";

export type PaintingWithRating = Painting & {
  avg_rating: number;
  rating_count: number;
};

function toPaintingWithRating(p: Painting): PaintingWithRating {
  return {
    ...p,
    avg_rating: p.rating ?? 4,
    rating_count: 0,
  };
}

export function usePaintings() {
  const [paintings, setPaintings] = useState<PaintingWithRating[]>(() =>
    staticPaintings.map(toPaintingWithRating)
  );
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    if (!hasSupabase) {
      setPaintings(staticPaintings.map(toPaintingWithRating));
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchPaintings()
      .then(setPaintings)
      .catch(() => setPaintings(staticPaintings.map(toPaintingWithRating)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const featuredPaintings = paintings.filter((p) => p.featured);

  return { paintings, featuredPaintings, loading, refresh };
}
