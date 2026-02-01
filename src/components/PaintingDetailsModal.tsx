import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ExternalLink, Mail, Phone, Instagram } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { PaintingWithRating } from "@/hooks/usePaintings";
import { Button } from "./ui/button";

interface PaintingDetailsModalProps {
  painting: PaintingWithRating | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PaintingDetailsModal = ({ painting, isOpen, onClose }: PaintingDetailsModalProps) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open for smoother UX
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && painting) {
      closeButtonRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen, painting]);

  if (!painting) return null;

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "abdulbasitriaz27@gmail.com",
      href: "mailto:abdulbasitriaz27@gmail.com",
      color: "text-primary",
    },
    {
      icon: Phone,
      label: "Phone / WhatsApp",
      value: "0370 6905456",
      href: "https://wa.me/923706905456",
      color: "text-green-600",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@artby.basit",
      href: "https://www.instagram.com/artby.basit",
      color: "text-pink-500",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto overscroll-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <motion.div
            className="relative w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] bg-card rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-elevated grid grid-cols-1 lg:grid-cols-2"
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - always visible, high contrast, touch-friendly */}
            <Button
              ref={closeButtonRef}
              variant="secondary"
              size="icon"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[60] flex items-center justify-center rounded-full border-2 border-border bg-background/95 backdrop-blur-md text-foreground shadow-lg hover:bg-muted hover:border-primary/50 min-h-[44px] min-w-[44px] h-11 w-11 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary"
              onClick={onClose}
              aria-label="Close details"
            >
              <X className="w-6 h-6 shrink-0 stroke-[2.5]" />
            </Button>

            {/* Image Section */}
            <div className="relative aspect-[4/5] lg:aspect-auto overflow-hidden bg-muted">
              <img
                src={painting.image}
                alt={painting.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details Section - scrollable on mobile, smooth scroll */}
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto overflow-x-hidden max-h-[50vh] sm:max-h-none scroll-smooth overscroll-contain">
              <div className="flex items-center gap-2 mb-3">
                {painting.category && (
                  <span className="px-3 py-1.5 text-xs font-body font-medium bg-secondary rounded-full text-muted-foreground">
                    {painting.category}
                  </span>
                )}
                {painting.featured && (
                  <span className="px-3 py-1.5 text-xs font-body font-medium bg-accent text-accent-foreground rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                {painting.title}
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
                {painting.description}
              </p>

              {/* Price and Rating */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-y border-border/50 py-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-display text-3xl font-bold text-primary">
                    {formatPrice(painting.price)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= Math.round(painting.avg_rating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-base text-muted-foreground font-body">
                    ({painting.avg_rating.toFixed(1)}
                    {painting.rating_count > 0 && ` · ${painting.rating_count} rating${painting.rating_count !== 1 ? "s" : ""}`})
                  </span>
                </div>
              </div>

              {/* Contact to Order */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Contact the Artist to Order
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {contactInfo.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors group"
                  >
                    <contact.icon className={`w-5 h-5 ${contact.color}`} />
                    <span className="font-body text-sm text-foreground group-hover:text-primary transition-colors">
                      {contact.value}
                    </span>
                  </a>
                ))}
              </div>

              <Button className="w-full" size="lg" asChild>
                <a href={painting.image} target="_blank" rel="noopener noreferrer">
                  View Full Image <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
