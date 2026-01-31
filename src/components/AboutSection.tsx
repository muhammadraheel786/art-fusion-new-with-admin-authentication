import { motion } from "framer-motion";
import { Brush, Heart, Sparkles, Palette } from "lucide-react";

const features = [
  {
    icon: Brush,
    title: "Handcrafted",
    description: "Every stroke is made by hand with love and precision",
  },
  {
    icon: Heart,
    title: "Made with Passion",
    description: "Each painting carries a piece of my heart and soul",
  },
  {
    icon: Sparkles,
    title: "Unique Pieces",
    description: "No two artworks are the same - truly one of a kind",
  },
  {
    icon: Palette,
    title: "Premium Quality",
    description: "Using finest materials for lasting beauty",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 animate-gradient opacity-10" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
          >
            <motion.span
              className="section-badge text-primary mb-6 inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              The Artist
            </motion.span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="text-primary">My Art</span>
            </h2>
            <div className="space-y-4 font-body text-muted-foreground text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Welcome to ArtFusion! I'm a passionate artist dedicated to creating 
                beautiful handmade paintings that bring warmth and emotion to any space.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                My journey in art began with a simple love for colors and the stories they 
                can tell. Each painting I create is a labor of love, combining traditional 
                techniques with personal expression.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                From serene landscapes to vibrant abstracts, my work aims to capture 
                moments of beauty and share them with art lovers like you.
              </motion.p>
            </div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center gap-4"
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="font-display text-2xl font-bold text-primary">AB</span>
              </motion.div>
              <div>
                <p className="font-display text-xl font-semibold text-foreground">Abdul Basit</p>
                <p className="text-sm text-muted-foreground">Artist & Creator</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-6 rounded-2xl bg-card shadow-artistic hover:shadow-elevated transition-all duration-300 border border-border/50 hover:border-primary/30"
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
