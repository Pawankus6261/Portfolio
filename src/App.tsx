import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmoothScrollProvider } from "@/context/SmoothScrollContext";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import BackToTop from "@/components/BackToTop";

const SESSION_STORAGE_KEY = "pawan_portfolio_visited";

const shouldShowLoader = () => {
  try {
    return sessionStorage.getItem(SESSION_STORAGE_KEY) !== "true";
  } catch (e) {
    return true;
  }
};

const App = () => {
  const [isLoading, setIsLoading] = useState(shouldShowLoader);
  const [isSiteReady, setIsSiteReady] = useState(() => !shouldShowLoader());

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setIsSiteReady(true);
  };

  return (
    <SmoothScrollProvider>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      <CustomCursor />
      <Navbar isReady={isSiteReady} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isSiteReady ? 1 : 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <Hero isReady={isSiteReady} />
        <Marquee />
        <About />
        <TechStack />
        <Work />
        <Experience />
        <Contact />
      </motion.main>
      <Footer />
      <BackToTop />
    </SmoothScrollProvider>
  );
};

export default App;