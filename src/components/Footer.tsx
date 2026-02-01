import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, Heart, Lock } from "lucide-react";

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/artby.basit",
    label: "Instagram"
  },
  {
    icon: Mail,
    href: "mailto:abdulbasitriaz27@gmail.com",
    label: "Email"
  },
  {
    icon: Phone,
    href: "https://wa.me/923706905456",
    label: "WhatsApp"
  }
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-10 sm:py-12 px-3 sm:px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <h3 className="font-display text-2xl sm:text-3xl font-bold">
              Art<span className="text-accent">Fusion</span>
            </h3>
            <p className="font-body text-sm text-primary-foreground/70 mt-2">
              Art Fusion & Handmade Paintings
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 mb-8"
          >
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.05 }}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="w-24 h-px bg-primary-foreground/20 mb-6" />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-sm text-primary-foreground/60 flex items-center gap-4 flex-wrap justify-center"
          >
            <span className="flex items-center gap-1">
              © {currentYear} ArtFusion. Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-primary fill-primary" />
              </motion.span>
              by Abdul Basit
            </span>
            <Link
              to="/admin/login"
              className="flex items-center gap-1 text-primary-foreground/40 hover:text-primary-foreground/80 transition-colors"
            >
              <Lock className="w-3 h-3" />
              Admin
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
