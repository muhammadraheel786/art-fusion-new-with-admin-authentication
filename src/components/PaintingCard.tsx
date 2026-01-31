import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";
import { submitRating, hasSupabase } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/formatPrice";
import type { PaintingWithRating } from "@/hooks/usePaintings";

interface PaintingCardProps {
  painting: PaintingWithRating;
  index: number;
  onRatingUpdate?: (paintingId: number, avgRating: number) => void;
}

export const PaintingCard = ({ painting, index, onRatingUpdate }: PaintingCardProps) => {
  const [displayRating, setDisplayRating] = useState(painting.avg_rating);
  const [ratingCount, setRatingCount] = useState(painting.rating_count);
  const [isHovered, setIsHovered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleRating = async (rating: number) => {
    if (!hasSupabase) {
      setDisplayRating(rating);
      return;
    }
    setSubmitting(true);
    try {
      const { avg_rating, rating_count } = await submitRating(painting.id, rating);
      setDisplayRating(avg_rating);
      setRatingCount(rating_count);
      onRatingUpdate?.(painting.id, avg_rating);
    } catch {
      toast({
        variant: "destructive",
        title: "Could not save rating",
        description: "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="painting-card bg-card group border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={painting.image}
          alt={painting.title}
          className="painting-image w-full h-full object-cover"
          loading="lazy"
        />

        {/* Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent flex flex-col justify-end p-5"
        >
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/90 text-sm font-body leading-relaxed"
          >
            {painting.description}
          </motion.p>
        </motion.div>

        {/* Category Badge */}
        {painting.category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-body font-medium bg-background/90 backdrop-blur-sm rounded-full text-foreground">
              {painting.category}
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {painting.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-xs font-body font-medium bg-accent text-accent-foreground rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Price badge on image */}
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block px-4 py-2 text-sm font-display font-bold bg-primary/95 backdrop-blur-sm text-primary-foreground rounded-xl shadow-lg border border-primary/30">
            {formatPrice(painting.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {painting.title}
        </h3>

        {/* Rating - user can click to rate (persists for all users when Supabase is used) */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              disabled={submitting}
              className="transition-transform hover:scale-110 disabled:opacity-50"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={`w-4 h-4 transition-colors ${
                  star <= Math.round(displayRating)
                    ? "fill-accent text-accent"
                    : "text-muted-foreground/30"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-muted-foreground font-body">
            ({displayRating.toFixed(1)}
            {ratingCount > 0 && ` · ${ratingCount} rating${ratingCount !== 1 ? "s" : ""}`})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="font-display text-xl font-bold text-primary">
            {formatPrice(painting.price)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
