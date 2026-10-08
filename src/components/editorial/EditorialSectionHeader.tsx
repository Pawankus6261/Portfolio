import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export interface EditorialSectionHeaderProps {
  sectionNumber: string;
  sectionCategory: string;
  solidTitle: string;
  outlineTitle: string;
  tiltAngle: number; // e.g. -2.4, +2.0, -2.5, +2.2, -1.8
  leftMeta: string;
  rightMeta: string;
  watermarkText?: string;
  subtitle?: string;
  theme?: "dark" | "light";
  className?: string;
}

export const EditorialSectionHeader: React.FC<EditorialSectionHeaderProps> = ({
  sectionNumber,
  sectionCategory,
  solidTitle,
  outlineTitle,
  tiltAngle,
  leftMeta,
  rightMeta,
  watermarkText,
  subtitle,
  theme = "dark",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Progressive scroll for convergence into reading position
  const { scrollYProgress: enterProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Full-span scroll progress for subtle background parallax
  const { scrollYProgress: spanProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Inertial smooth spring for continuous, reversible motion
  const smoothEnter = useSpring(enterProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.5,
    restDelta: 0.001,
  });

  const smoothSpan = useSpring(spanProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.4,
    restDelta: 0.001,
  });

  // Dual-side horizontal motion (approaching center)
  const leftX = useTransform(smoothEnter, [0, 1], [-90, 0]);
  const rightX = useTransform(smoothEnter, [0, 1], [90, 0]);
  const sideOpacity = useTransform(smoothEnter, [0, 0.65], [0, 1]);

  // Construction lines: extend from left & right toward center
  const leftLineScale = useTransform(smoothEnter, [0.08, 0.92], [0, 1]);
  const rightLineScale = useTransform(smoothEnter, [0.08, 0.92], [0, 1]);

  // Center star marker scale & rotation
  const centerStarScale = useTransform(smoothEnter, [0.35, 0.95], [0, 1]);
  const centerStarRotate = useTransform(smoothEnter, [0, 1], [-90, 0]);

  // Intentional editorial tilt rotation: starts slightly offset, settles precisely into tiltAngle
  // When scrolling back up, gently rotates back
  const initialTilt = tiltAngle * 1.75;
  const titleRotate = useTransform(smoothEnter, [0, 1], [initialTilt, tiltAngle]);
  const titleY = useTransform(smoothEnter, [0, 1], [38, 0]);
  const titleOpacity = useTransform(smoothEnter, [0, 0.5], [0, 1]);

  // Background watermark parallax: dual counter-motion
  const watermarkXLeft = useTransform(smoothSpan, [0, 1], [-70, 45]);
  const watermarkXRight = useTransform(smoothSpan, [0, 1], [70, -45]);
  const watermarkOpacity = useTransform(
    smoothSpan,
    [0, 0.25, 0.75, 1],
    [0, theme === "light" ? 0.055 : 0.045, theme === "light" ? 0.055 : 0.045, 0]
  );

  const isLight = theme === "light";
  const fgColor = isLight ? "#08080a" : "#efece6";
  const mutedColor = isLight ? "#5e5e68" : "#85858f";
  const hairlineColor = isLight ? "rgba(8, 8, 10, 0.15)" : "rgba(239, 236, 230, 0.12)";
  const strokeColor = isLight ? "rgba(8, 8, 10, 0.85)" : "rgba(239, 236, 230, 0.85)";

  const isTiltLeft = tiltAngle < 0;

  return (
    <div
      ref={containerRef}
      className={`editorial-header-composition ${className}`}
      data-theme={theme}
    >
      {/* Background Oversized Typographic Watermark (Dual Counter-Parallax) */}
      {watermarkText && (
        <div className="editorial-watermark-wrap" aria-hidden="true">
          <motion.div
            className="editorial-watermark-track left-track"
            style={{ x: watermarkXLeft, opacity: watermarkOpacity, color: fgColor }}
          >
            <span className="watermark-solid">{watermarkText}</span>
            <span className="watermark-dot">·</span>
            <span className="watermark-outline">{sectionNumber}</span>
          </motion.div>
          <motion.div
            className="editorial-watermark-track right-track"
            style={{ x: watermarkXRight, opacity: watermarkOpacity, color: fgColor }}
          >
            <span className="watermark-outline">{watermarkText}</span>
            <span className="watermark-dot">·</span>
            <span className="watermark-solid">{sectionCategory.toUpperCase()}</span>
          </motion.div>
        </div>
      )}

      {/* Dual-Side Top Construction Guide (Left -> Center <- Right) */}
      <div className="editorial-construction-guide" aria-hidden="true">
        {/* Left Segment */}
        <motion.div
          className="guide-side left-guide"
          style={{ x: leftX, opacity: sideOpacity }}
        >
          <span className="guide-index" style={{ color: "var(--accent)" }}>
            [ {sectionNumber} ]
          </span>
          <span className="guide-text" style={{ color: mutedColor }}>
            {leftMeta}
          </span>
          <motion.div
            className="guide-line left-line"
            style={{
              backgroundColor: hairlineColor,
              scaleX: leftLineScale,
              transformOrigin: "left center",
            }}
          />
        </motion.div>

        {/* Center Intersection: Delicate Celestial 4-Point Star */}
        <motion.div
          className="guide-center-mark"
          style={{
            scale: centerStarScale,
            rotate: centerStarRotate,
            color: "var(--accent)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" />
          </svg>
        </motion.div>

        {/* Right Segment */}
        <motion.div
          className="guide-side right-guide"
          style={{ x: rightX, opacity: sideOpacity }}
        >
          <motion.div
            className="guide-line right-line"
            style={{
              backgroundColor: hairlineColor,
              scaleX: rightLineScale,
              transformOrigin: "right center",
            }}
          />
          <span className="guide-text" style={{ color: mutedColor }}>
            {rightMeta}
          </span>
          <span className="guide-cross" style={{ color: "var(--accent)" }}>
            +
          </span>
        </motion.div>
      </div>

      {/* Main Title Row: Slight Intentional Editorial Tilt & Dual-Side Arrival */}
      <div className="editorial-title-container">
        <motion.div
          className="editorial-title-pivot"
          style={{
            rotate: titleRotate,
            y: titleY,
            opacity: titleOpacity,
            transformOrigin: isTiltLeft ? "bottom left" : "bottom right",
          }}
        >
          <h2 className="editorial-main-title">
            <span className="title-part solid-word" style={{ color: fgColor }}>
              {solidTitle}
            </span>
            <span
              className="title-part outline-word"
              style={{
                WebkitTextStroke: `1.8px ${strokeColor}`,
                color: "transparent",
              }}
            >
              {outlineTitle}
            </span>
          </h2>
        </motion.div>

        {/* Supporting Editorial Subtitle / Tag */}
        {subtitle && (
          <motion.p
            className="editorial-header-subtitle"
            style={{
              x: isTiltLeft ? rightX : leftX,
              opacity: sideOpacity,
              color: mutedColor,
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <style>{`
        .editorial-header-composition {
          position: relative;
          width: 100%;
          margin-bottom: clamp(2.5rem, 6vh, 4.5rem);
          overflow: visible;
        }

        /* Watermark Background */
        .editorial-watermark-wrap {
          position: absolute;
          top: -2.5rem;
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          max-width: 1600px;
          pointer-events: none;
          z-index: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          overflow: hidden;
          user-select: none;
        }

        .editorial-watermark-track {
          white-space: nowrap;
          font-family: var(--font-display);
          font-size: clamp(3.8rem, 11vw, 9.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 0.9;
          text-transform: uppercase;
          will-change: transform;
        }

        .watermark-solid {
          opacity: 0.85;
        }

        .watermark-outline {
          color: transparent !important;
          -webkit-text-stroke: 1.5px currentColor;
          opacity: 0.55;
        }

        .watermark-dot {
          margin: 0 0.8rem;
          opacity: 0.4;
        }

        /* Construction Guide */
        .editorial-construction-guide {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 1rem;
          margin-bottom: clamp(1rem, 2.2vh, 1.75rem);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .guide-side {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          min-width: 0;
          will-change: transform, opacity;
        }

        .left-guide {
          justify-content: flex-start;
        }

        .right-guide {
          justify-content: flex-end;
        }

        .guide-line {
          flex: 1;
          height: 1px;
          min-width: 28px;
          will-change: transform;
        }

        .guide-index {
          font-weight: 600;
          white-space: nowrap;
        }

        .guide-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .guide-cross {
          font-weight: 500;
          font-size: 0.85rem;
        }

        .guide-center-mark {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          will-change: transform;
          filter: drop-shadow(0 0 6px rgba(91, 108, 255, 0.45));
        }

        /* Main Title & Pivot */
        .editorial-title-container {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .editorial-title-pivot {
          display: inline-block;
          will-change: transform;
          padding: 0.25rem 0;
        }

        .editorial-main-title {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 6.4vw, 5.8rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          column-gap: 0.4em;
          row-gap: 0.1em;
          margin: 0;
        }

        .title-part {
          display: inline-block;
          transition: transform 0.25s var(--ease-out);
        }

        .outline-word {
          paint-order: stroke fill;
          transition: -webkit-text-stroke-color 0.3s ease, color 0.3s ease;
        }

        .outline-word:hover {
          color: var(--accent) !important;
          -webkit-text-stroke-color: var(--accent) !important;
        }

        .editorial-header-subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.98rem, 1.35vw, 1.15rem);
          line-height: 1.55;
          max-width: 58ch;
          margin: 0;
          will-change: transform, opacity;
        }

        @media (max-width: 768px) {
          .editorial-watermark-wrap {
            top: -1rem;
          }
          .guide-text {
            display: none;
          }
          .editorial-main-title {
            font-size: clamp(2rem, 8vw, 3.2rem);
            line-height: 1.02;
          }
          .editorial-header-composition {
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EditorialSectionHeader;
