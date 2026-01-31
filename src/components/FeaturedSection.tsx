import { motion } from "framer-motion";
import { usePaintings } from "@/hooks/usePaintings";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { formatPrice } from "@/lib/formatPrice";

export const FeaturedSection = () => {
  const { featuredPaintings } = usePaintings();
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="featured" className="py-24 md:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-badge text-primary mb-4">
            ✨ Best Sellers
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Featured <span className="text-gradient-gold">Artworks</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Our most loved and popular paintings, chosen by art enthusiasts
          </p>
        </motion.div>

        {/* Featured Grid - Larger Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {featuredPaintings.slice(0, 4).map((painting, index) => (
            <motion.div
              key={painting.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-artistic hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-primary/30"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={painting.image}
                  alt={painting.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Featured Badge */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg"
                  >
                    <Star className="w-6 h-6 fill-accent-foreground text-accent-foreground" />
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-sm font-body text-muted-foreground mb-1 block">
                      {painting.category}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {painting.title}
                    </h3>
                  </div>

                  {/* Price */}
                  <span className="font-display text-2xl font-bold text-primary whitespace-nowrap">
                    {formatPrice(painting.price)}
                  </span>
                </div>

                <p className="mt-3 font-body text-muted-foreground line-clamp-2">
                  {painting.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(painting.avg_rating ?? 4)
                          ? "fill-accent text-accent"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                {/* Order Button */}
                <Button
                  variant="hero"
                  className="mt-6 w-full group/btn"
                  onClick={scrollToContact}
                >
                  Contact to Order
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
