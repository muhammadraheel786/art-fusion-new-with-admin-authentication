import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Send, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

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

export const ContactSection = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 animate-gradient opacity-15" />

      <div className="container mx-auto px-3 sm:px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-16"
          >
            <motion.span
              className="section-badge text-primary mb-4 inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              Get In Touch
            </motion.span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Order Your <span className="text-primary">Painting</span>
            </h2>
            <p className="font-body text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-1">
              Interested in a painting? Contact me directly to place your order. 
              I'm happy to discuss custom pieces and commissions too!
            </p>
          </motion.div>

          {/* Order Notice */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-3xl p-8 md:p-12 shadow-artistic mb-12 border border-border/50"
          >
            <div className="flex items-start gap-4 mb-8">
              <motion.div
                className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <MessageCircle className="w-6 h-6 text-accent" />
              </motion.div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  How to Order
                </h3>
                <p className="font-body text-muted-foreground">
                  To order a painting, simply contact me through any of the channels below. 
                  Share the painting you're interested in, and we'll arrange the details together.
                </p>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col items-center p-6 rounded-2xl bg-background/50 hover:bg-background transition-all duration-300 group border border-transparent hover:border-primary/20"
                >
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4 ${contact.color}`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                  >
                    <contact.icon className="w-7 h-7" />
                  </motion.div>
                  <span className="text-sm font-body text-muted-foreground mb-1">
                    {contact.label}
                  </span>
                  <span className="font-body font-medium text-foreground text-center group-hover:text-primary transition-colors">
                    {contact.value}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button variant="hero" size="xl" asChild>
                <a href="https://wa.me/923706905456" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5 mr-2" />
                  WhatsApp Me
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="mailto:abdulbasitriaz27@gmail.com">
                  <Send className="w-5 h-5 mr-2" />
                  Send Email
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
