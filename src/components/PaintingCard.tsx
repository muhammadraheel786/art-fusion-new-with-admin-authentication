import { motion, useMotionValue, useTransform } from "framer-motion";
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
  onViewDetails: (painting: PaintingWithRating) => void; // New prop to open modal
}

export const PaintingCard = ({ painting, index, onRatingUpdate, onViewDetails }: PaintingCardProps) => {
  const [displayRating, setDisplayRating] = useState(painting.avg_rating);
  const [ratingCount, setRatingCount] = useState(painting.rating_count);
  const [isHovered, setIsHovered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

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
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, type: "spring", stiffness: 100 }}
      className="painting-card bg-card group border border-border/50 rounded-2xl overflow-hidden hover:border-primary/40 [perspective:1000px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onClick={() => onViewDetails(painting)} // Open modal on card click
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={painting.image}
          alt={painting.title}
          className="painting-image w-full h-full object-cover"
          loading="lazy"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Animated overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent flex flex-col justify-end p-5"
        >
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 30, opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/95 text-sm font-body leading-relaxed"
          >
            {painting.description}
          </motion.p>
        </motion.div>

        {/* Category Badge */}
        {painting.category && (
          <motion.div
            className="absolute top-4 left-4"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <span className="px-3 py-1.5 text-xs font-body font-medium bg-background/90 backdrop-blur-sm rounded-full text-foreground border border-white/10">
              {painting.category}
            </span>
          </motion.div>
        )}

        {/* Featured Badge */}
        {painting.featured && (
          <motion.div
            className="absolute top-4 right-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="px-3 py-1 text-xs font-body font-medium bg-accent text-accent-foreground rounded-full shadow-lg">
              Featured
            </span>
          </motion.div>
        )}

        {/* Price badge - animated on hover */}
        <motion.div
          className="absolute bottom-4 left-4 right-4"
          animate={{ y: isHovered ? 0 : 0, opacity: 1 }}
        >
          <motion.span
            className="inline-block px-4 py-2 text-sm font-display font-bold bg-primary/95 backdrop-blur-sm text-primary-foreground rounded-xl shadow-lg border border-primary/30"
            whileHover={{ scale: 1.02 }}
          >
            {formatPrice(painting.price)}
          </motion.span>
        </motion.div>

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
          animate={{ x: isHovered ? "200%" : "-100%" }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="p-5 space-y-3"
        initial={false}
        animate={{ backgroundColor: isHovered ? "hsl(var(--card) / 1)" : "hsl(var(--card) / 1)" }}
      >
        <motion.h3
          className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors"
          whileHover={{ x: 2 }}
        >
          {painting.title}
        </motion.h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              onClick={() => handleRating(star)}
              disabled={submitting}
              className="transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={`w-4 h-4 transition-colors ${
                  star <= Math.round(displayRating)
                    ? "fill-accent text-accent"
                    : "text-muted-foreground/30"
                }`}
              />
            </motion.button>
          ))}
          <span className="ml-2 text-sm text-muted-foreground font-body">
            ({displayRating.toFixed(1)}
            {ratingCount > 0 && ` · ${ratingCount} rating${ratingCount !== 1 ? "s" : ""}`})
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="font-display text-xl font-bold text-primary">
            {formatPrice(painting.price)}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
