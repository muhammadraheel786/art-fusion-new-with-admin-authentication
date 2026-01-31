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
    <section id="featured" className="py-24 md:py-32 bg-secondary/50 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 animate-gradient opacity-20" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="section-badge text-primary mb-4 inline-block"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            ✨ Best Sellers
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Featured <span className="text-gradient-gold">Artworks</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Our most loved and popular paintings, chosen by art enthusiasts
          </p>
        </motion.div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {featuredPaintings.slice(0, 4).map((painting, index) => (
            <motion.div
              key={painting.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                type: "spring",
                stiffness: 80,
              }}
              whileHover={{ y: -8 }}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-artistic border border-border/50 hover:border-primary/40 hover:shadow-elevated transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                  src={painting.image}
                  alt={painting.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Featured Badge - bouncing */}
                <motion.div
                  className="absolute top-4 right-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    scale: { delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 },
                    y: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                  }}
                  animate={{ y: [0, -4, 0] }}
                >
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg">
                    <Star className="w-6 h-6 fill-accent-foreground text-accent-foreground" />
                  </div>
                </motion.div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <motion.span
                      className="text-sm font-body text-muted-foreground mb-1 block"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      {painting.category}
                    </motion.span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {painting.title}
                    </h3>
                  </div>
                  <span className="font-display text-2xl font-bold text-primary whitespace-nowrap">
                    {formatPrice(painting.price)}
                  </span>
                </div>

                <p className="mt-3 font-body text-muted-foreground line-clamp-2">
                  {painting.description}
                </p>

                <div className="flex items-center gap-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 transition-transform ${
                        star <= Math.round(painting.avg_rating ?? 4)
                          ? "fill-accent text-accent"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="hero"
                    className="mt-6 w-full group/btn"
                    onClick={scrollToContact}
                  >
                    Contact to Order
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
