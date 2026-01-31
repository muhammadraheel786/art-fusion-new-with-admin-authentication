import { motion } from "framer-motion";
import { usePaintings } from "@/hooks/usePaintings";
import { PaintingCard } from "./PaintingCard";

export const GallerySection = () => {
  const { paintings, loading } = usePaintings();

  if (loading) {
    return (
      <section id="gallery" className="py-24 md:py-32" style={{ background: "var(--gradient-warm)" }}>
        <div className="container mx-auto px-4 md:px-8 text-center text-muted-foreground">
          Loading gallery...
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-24 md:py-32" style={{ background: "var(--gradient-warm)" }}>
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
            Explore Collection
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Gallery of <span className="text-primary">Paintings</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Each artwork is a unique piece, handcrafted with passion and attention to detail. 
            Click on the stars to rate your favorites.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {paintings.map((painting, index) => (
            <PaintingCard key={painting.id} painting={painting} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
