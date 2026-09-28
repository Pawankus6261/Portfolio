import { useState } from "react";
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
    <>
      {isLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      <CustomCursor />
      <Navbar isReady={isSiteReady} />
      <main>
        <Hero isReady={isSiteReady} />
        <Marquee />
        <About />
        <TechStack />
        <Work />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;