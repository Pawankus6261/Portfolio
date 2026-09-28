import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/context/SmoothScrollContext";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    scrollTo(0, { duration: 1.4 });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={handleClick}
          className="back-to-top-btn"
          aria-label="Scroll back to top"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
          <span className="back-to-top-label">TOP</span>

          <style>{`
            .back-to-top-btn {
              position: fixed;
              bottom: 2rem;
              right: 2rem;
              z-index: 999;
              display: flex;
              align-items: center;
              gap: 0.4rem;
              background: rgba(18, 18, 22, 0.85);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              color: var(--bone);
              border: 1px solid var(--hairline-strong);
              padding: 0.65rem 1rem;
              border-radius: 9999px;
              cursor: pointer;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 15px rgba(91, 108, 255, 0.15);
              transition: border-color 0.25s, box-shadow 0.25s, color 0.25s;
              font-family: var(--font-mono);
              font-size: 0.72rem;
              letter-spacing: 0.08em;
              font-weight: 600;
            }

            .back-to-top-btn:hover {
              border-color: var(--accent);
              color: var(--accent);
              box-shadow: 0 10px 36px rgba(0, 0, 0, 0.5), 0 0 25px rgba(91, 108, 255, 0.35);
            }

            @media (max-width: 640px) {
              .back-to-top-btn {
                bottom: 1.25rem;
                right: 1.25rem;
                padding: 0.55rem 0.85rem;
              }
            }
          `}</style>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
