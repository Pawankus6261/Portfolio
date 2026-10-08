import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface EditorialTransitionDividerProps {
  fromSection: string;
  toSection: string;
  label?: string;
  coord?: string;
  theme?: "dark" | "light";
}

export const EditorialTransitionDivider: React.FC<EditorialTransitionDividerProps> = ({
  fromSection,
  toSection,
  label,
  coord = "LOC.23.25°N // SYSTEM.LOCK",
  theme = "dark",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.45,
    restDelta: 0.001,
  });

  const leftX = useTransform(smooth, [0, 0.5, 1], [-80, 0, 80]);
  const rightX = useTransform(smooth, [0, 0.5, 1], [80, 0, -80]);
  const lineScale = useTransform(smooth, [0.1, 0.5, 0.9], [0.2, 1, 0.2]);
  const starRotate = useTransform(smooth, [0, 1], [-90, 90]);
  const opacity = useTransform(smooth, [0.05, 0.45, 0.55, 0.95], [0, 1, 1, 0]);

  const isLight = theme === "light";
  const textColor = isLight ? "#454550" : "#85858f";
  const hairline = isLight ? "rgba(8, 8, 10, 0.12)" : "rgba(239, 236, 230, 0.09)";

  return (
    <div
      ref={containerRef}
      className="editorial-transition-divider"
      aria-hidden="true"
    >
      <div className="container divider-inner">
        {/* Left Side Construction Tag */}
        <motion.div
          className="divider-side left-side"
          style={{ x: leftX, opacity }}
        >
          <span className="accent-sym">[</span>
          <span className="meta-text" style={{ color: textColor }}>
            {label || `SECT.${fromSection} → SECT.${toSection}`}
          </span>
          <span className="accent-sym">]</span>
        </motion.div>

        {/* Center Lines Converging at Star */}
        <div className="divider-center">
          <motion.div
            className="divider-line"
            style={{
              backgroundColor: hairline,
              scaleX: lineScale,
              transformOrigin: "left center",
            }}
          />
          <motion.span
            className="divider-star"
            style={{ rotate: starRotate, opacity }}
          >
            ✦
          </motion.span>
          <motion.div
            className="divider-line"
            style={{
              backgroundColor: hairline,
              scaleX: lineScale,
              transformOrigin: "right center",
            }}
          />
        </div>

        {/* Right Side Coordinate Reading */}
        <motion.div
          className="divider-side right-side"
          style={{ x: rightX, opacity }}
        >
          <span className="accent-sym">[</span>
          <span className="meta-text" style={{ color: textColor }}>
            {coord}
          </span>
          <span className="accent-sym">]</span>
        </motion.div>
      </div>

      <style>{`
        .editorial-transition-divider {
          position: relative;
          width: 100%;
          padding: 1.25rem 0;
          overflow: hidden;
          user-select: none;
        }

        .divider-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .divider-side {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          white-space: nowrap;
          will-change: transform, opacity;
        }

        .accent-sym {
          color: var(--accent);
          font-weight: 600;
        }

        .meta-text {
          font-weight: 500;
        }

        .divider-center {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          min-width: 20px;
          will-change: transform;
        }

        .divider-star {
          color: var(--accent);
          font-size: 0.72rem;
          display: inline-block;
          will-change: transform;
          filter: drop-shadow(0 0 5px rgba(91, 108, 255, 0.4));
        }

        @media (max-width: 768px) {
          .meta-text {
            font-size: 0.58rem;
          }
          .right-side {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default EditorialTransitionDivider;
