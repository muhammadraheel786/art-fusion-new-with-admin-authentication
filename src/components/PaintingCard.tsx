import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Painting } from "@/data/paintings";
import { useState } from "react";

interface PaintingCardProps {
  painting: Painting;
  index: number;
}

export const PaintingCard = ({ painting, index }: PaintingCardProps) => {
  const [userRating, setUserRating] = useState(painting.rating);
  const [isHovered, setIsHovered] = useState(false);

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="painting-card bg-card group"
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
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {painting.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              className="transition-transform hover:scale-110"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={`w-4 h-4 transition-colors ${
                  star <= userRating
                    ? "fill-accent text-accent"
                    : "text-muted-foreground/30"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-muted-foreground font-body">
            ({userRating.toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="font-display text-2xl font-bold text-primary">
            {painting.price} {/* Display string directly */}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
