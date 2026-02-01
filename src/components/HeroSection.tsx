import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDown, Palette } from "lucide-react";

export const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden px-3 sm:px-4"
    >
      {/* Real-world video: artist painting on canvas - enhanced visibility */}
      <div className="absolute inset-0 min-w-full min-h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
          style={{
            minWidth: "100%",
            minHeight: "100%",
            width: "100%",
            height: "100%",
            filter: "brightness(1.15) contrast(1.08)",
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        >
          <source
            src="https://assets.mixkit.co/active_storage/video_items/100473/1724285261/100473-video-720.mp4"
            type="video/mp4"
          />
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Lighter overlay so video stays bright; text stays readable */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* Floating animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -40, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-2 sm:px-4 md:px-8 relative z-10 w-full max-w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-secondary/80 backdrop-blur-md border border-primary/20 mb-6 sm:mb-8 shadow-lg hover:border-primary/40 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Palette className="w-4 h-4 text-primary shrink-0" />
            </motion.div>
            <span className="text-xs sm:text-sm font-body text-muted-foreground">
              Art Fusion & Handmade Paintings
            </span>
          </motion.div>

          {/* Main Title with staggered reveal - responsive sizes */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-tight mb-4 sm:mb-6"
          >
            Where
            <motion.span
              className="text-primary inline-block mx-3"
              animate={{ rotate: [-2, 2, -2], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Art
            </motion.span>
            Meets
            <br />
            <motion.span
              className="text-gradient-gold inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Passion
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-1"
          >
            Discover unique handmade paintings that bring emotions to life. 
            Each piece is crafted with love, telling its own beautiful story. For customized paintings contact me.
          </motion.p>

          {/* CTA Buttons - touch-friendly on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="hero"
                size="xl"
                className="w-full min-h-[48px] sm:min-h-0 sm:w-auto text-base"
                onClick={() => scrollToSection("#gallery")}
              >
                View Gallery
              </Button>
            </motion.div>
            <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="heroOutline"
                size="xl"
                className="w-full min-h-[48px] sm:min-h-0 sm:w-auto text-base"
                onClick={() => scrollToSection("#contact")}
              >
                Contact for Order
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - safe area on notched phones */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 pb-[env(safe-area-inset-bottom)]"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.button
          onClick={() => scrollToSection("#gallery")}
          className="p-3 sm:p-4 min-h-[44px] min-w-[44px] rounded-full bg-secondary/50 backdrop-blur-sm text-muted-foreground hover:text-primary transition-colors border border-primary/20 flex items-center justify-center"
          aria-label="Scroll down"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
};
