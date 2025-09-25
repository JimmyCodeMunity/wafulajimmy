import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/alexjohnson",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/alexjohnson",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:alex.johnson@email.com",
    label: "Email",
  },
];

export function Footer() {
  const { portfolio } = usePortfolio();
  console.log("portfolio info", portfolio);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/30 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {portfolio?.author?.name || ""}
            </h3>
            <p className="text-muted-foreground mt-2">
              Software Engineer & Web Developer
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors duration-300 group"
              >
                <social.icon className="w-5 h-5 text-primary group-hover:text-primary/80 transition-colors" />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center md:text-right text-muted-foreground"
          >
            <p className="flex items-center justify-center md:justify-end gap-1">
              Made with{" "}
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />{" "}
              © {currentYear}
            </p>
          </motion.div>
        </div>

        {/* Scroll to Top */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 pt-8 border-t border-border/50 text-center"
        >
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
          >
            Back to Top ↑
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
