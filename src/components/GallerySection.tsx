import { motion } from "framer-motion";
import { usePaintings } from "@/hooks/usePaintings";
import { PaintingCard } from "./PaintingCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const GallerySection = () => {
  const { paintings, loading } = usePaintings();

  if (loading) {
    return (
      <section id="gallery" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 animate-gradient opacity-50" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                className="h-80 bg-card rounded-2xl border border-border/50"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 animate-gradient opacity-30" />
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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Explore Collection
          </motion.span>
          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Gallery of <span className="text-primary">Paintings</span>
          </motion.h2>
          <motion.p
            className="font-body text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Each artwork is a unique piece, handcrafted with passion and attention to detail. 
            Click on the stars to rate your favorites.
          </motion.p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {paintings.map((painting, index) => (
            <PaintingCard key={painting.id} painting={painting} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
