import React from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="w-full bg-background border-t border-border text-muted-foreground py-4 mt-20"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">

          {/* Left Side — Name and Year */}
          <div>
            <h4 className="font-semibold text-foreground text-base tracking-wide">
              Pawan Kushwaha
            </h4>
            <span className="text-sm opacity-80">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </span>
          </div>

          {/* Center — Social + Tagline */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex justify-center space-x-3">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/Pawankush6261"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hover:text-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              </Button>

              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://linkedin.com/in/pawan-kushwaha-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>

              <Button variant="ghost" size="icon" asChild>
                <a
                  href="mailto:contact.pawan62@gmail.com"
                  aria-label="Email"
                  className="hover:text-foreground transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>

            <p className="text-sm text-foreground font-medium">
              Crafted with <span className="text-red-500">❤️</span> by{" "}
              <span className="font-semibold text-primary">Pawan Kushwaha</span>
            </p>
          </div>

          {/* Right Side — Scroll Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className="bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
