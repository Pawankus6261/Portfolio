import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const DualSideMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.45,
    restDelta: 0.001,
  });

  // Dual-Side Motion: Upper track enters from left, lower track enters from right
  // Meeting near center during scroll
  const streamLeftX = useTransform(smoothProgress, [0, 1], [-130, 70]);
  const streamRightX = useTransform(smoothProgress, [0, 1], [130, -70]);
  
  // Center line convergence
  const lineScaleX = useTransform(smoothProgress, [0.15, 0.85], [0.2, 1]);
  const centerStarRotate = useTransform(smoothProgress, [0, 1], [-180, 180]);
  const centerOpacity = useTransform(smoothProgress, [0.1, 0.4, 0.7, 1], [0.4, 1, 1, 0.4]);

  const itemsTop = [
    "FULL STACK ARCHITECTURE",
    "AI & DEEP REINFORCEMENT",
    "FOUNDER @ DEVLINKHUB",
    "HIGH-CONCURRENCY MICROSERVICES",
    "NEXT.JS & TYPESCRIPT",
    "TENSORFLOW & PYTORCH",
    "TACTILE CREATIVE ENGINEERING",
  ];

  const itemsBottom = [
    "COMPUTER VISION PIPELINES",
    "DISTRIBUTED SYSTEMS",
    "PRODUCTION FASTAPI",
    "GOOGLE STUDENT AMBASSADOR",
    "SUB-50MS QUERY LATENCY",
    "CAMPUS REPRESENTATIVE @ GFG",
    "NEURAL NETWORK QUANTIZATION",
  ];

  return (
    <section className="dual-marquee-container" ref={containerRef} aria-hidden="true">
      {/* Top Technical Construction Bar (Left -> Center <- Right) */}
      <div className="marquee-construction-bar">
        <div className="bar-tag left-tag">
          <span className="accent-bracket">[</span>
          <span>STREAM.01 // LEFT TO CENTER</span>
          <span className="accent-bracket">]</span>
        </div>
        <div className="bar-center">
          <motion.div
            className="bar-line left-line"
            style={{ scaleX: lineScaleX, transformOrigin: "left center" }}
          />
          <motion.span
            className="bar-star"
            style={{ rotate: centerStarRotate, opacity: centerOpacity }}
          >
            ✦
          </motion.span>
          <motion.div
            className="bar-line right-line"
            style={{ scaleX: lineScaleX, transformOrigin: "right center" }}
          />
        </div>
        <div className="bar-tag right-tag">
          <span className="accent-bracket">[</span>
          <span>STREAM.02 // RIGHT TO CENTER</span>
          <span className="accent-bracket">]</span>
        </div>
      </div>

      {/* Track 1: Solid Typography traveling Left to Right */}
      <div className="marquee-track-overflow">
        <motion.div
          className="marquee-track-wrapper top-stream"
          style={{ x: streamLeftX }}
        >
          <div className="marquee-inner-loop move-forward">
            {itemsTop.concat(itemsTop).concat(itemsTop).map((item, idx) => (
              <span key={`top-${idx}`} className="marquee-phrase solid-phrase">
                <span className="phrase-text">{item}</span>
                <span className="marquee-bullet" />
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Center Architectural Partition with Coordinates */}
      <div className="marquee-mid-divider">
        <motion.div
          className="mid-line"
          style={{ scaleX: lineScaleX, transformOrigin: "center center" }}
        />
        <div className="mid-metadata">
          <span className="coord-item">LAT 23.2599° N</span>
          <span className="coord-sep">/</span>
          <span className="coord-center-badge">DEVLINKHUB · SYS.2026</span>
          <span className="coord-sep">/</span>
          <span className="coord-item">LON 77.4126° E</span>
        </div>
        <motion.div
          className="mid-line"
          style={{ scaleX: lineScaleX, transformOrigin: "center center" }}
        />
      </div>

      {/* Track 2: Outline Typography traveling Right to Left */}
      <div className="marquee-track-overflow">
        <motion.div
          className="marquee-track-wrapper bottom-stream"
          style={{ x: streamRightX }}
        >
          <div className="marquee-inner-loop move-backward">
            {itemsBottom.concat(itemsBottom).concat(itemsBottom).map((item, idx) => (
              <span key={`bot-${idx}`} className="marquee-phrase outline-phrase">
                <span className="phrase-text outline-text-stamped">{item}</span>
                <span className="marquee-star-bullet">✦</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .dual-marquee-container {
          position: relative;
          background: #0b0b0f;
          padding: clamp(1.75rem, 3.5vh, 2.75rem) 0;
          overflow: hidden;
          border-top: 1px solid var(--hairline);
          border-bottom: 1px solid var(--hairline);
          user-select: none;
        }

        /* Top Technical Guide */
        .marquee-construction-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(1.25rem, 4vw, 3rem);
          margin-bottom: 0.85rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          color: var(--muted-gray);
          text-transform: uppercase;
        }

        .bar-tag {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          white-space: nowrap;
        }

        .accent-bracket {
          color: var(--accent);
          font-weight: 600;
        }

        .bar-center {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          flex: 1;
          margin: 0 1.5rem;
        }

        .bar-line {
          flex: 1;
          height: 1px;
          background: rgba(239, 236, 230, 0.12);
          will-change: transform;
        }

        .bar-star {
          color: var(--accent);
          font-size: 0.75rem;
          display: inline-block;
          will-change: transform;
        }

        /* Track Containers */
        .marquee-track-overflow {
          overflow: hidden;
          width: 100%;
          white-space: nowrap;
          padding: 0.35rem 0;
        }

        .marquee-track-wrapper {
          display: inline-flex;
          will-change: transform;
        }

        .marquee-inner-loop {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
        }

        .move-forward {
          animation: loopLeftToRight 38s linear infinite;
        }

        .move-backward {
          animation: loopRightToLeft 34s linear infinite;
        }

        .marquee-track-overflow:hover .marquee-inner-loop {
          animation-play-state: paused;
        }

        .marquee-phrase {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.6rem, 3.2vw, 2.6rem);
          letter-spacing: -0.03em;
          text-transform: uppercase;
          line-height: 1;
          padding: 0 1.25rem;
        }

        .solid-phrase {
          color: var(--bone);
        }

        .outline-phrase {
          color: transparent;
        }

        .outline-text-stamped {
          -webkit-text-stroke: 1.4px rgba(239, 236, 230, 0.65);
          paint-order: stroke fill;
          transition: all 0.3s ease;
        }

        .outline-phrase:hover .outline-text-stamped {
          color: var(--accent);
          -webkit-text-stroke-color: var(--accent);
        }

        .marquee-bullet {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          margin-left: 2rem;
          display: inline-block;
          box-shadow: 0 0 8px rgba(91, 108, 255, 0.6);
        }

        .marquee-star-bullet {
          color: var(--accent);
          font-size: 0.95rem;
          margin-left: 2rem;
          display: inline-block;
          opacity: 0.75;
        }

        /* Mid Partition */
        .marquee-mid-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          padding: 0.65rem clamp(1.25rem, 4vw, 3rem);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: var(--muted-gray);
        }

        .mid-line {
          flex: 1;
          height: 1px;
          background: rgba(239, 236, 230, 0.09);
        }

        .mid-metadata {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          white-space: nowrap;
        }

        .coord-item {
          color: rgba(239, 236, 230, 0.5);
        }

        .coord-sep {
          color: var(--accent);
        }

        .coord-center-badge {
          color: var(--bone);
          font-weight: 500;
          letter-spacing: 0.14em;
        }

        @keyframes loopLeftToRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        @keyframes loopRightToLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .marquee-construction-bar, .mid-metadata {
            font-size: 0.6rem;
          }
          .coord-item {
            display: none;
          }
          .bar-tag span:not(.accent-bracket) {
            display: none;
          }
          .marquee-phrase {
            font-size: 1.25rem;
            padding: 0 0.75rem;
          }
          .marquee-bullet, .marquee-star-bullet {
            margin-left: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default DualSideMarquee;
