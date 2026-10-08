import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import heroPortrait from "../assets/pawan-profile.png";
import { useSmoothScroll } from "@/context/SmoothScrollContext";

interface HeroProps {
  isReady?: boolean;
}

// Characters for KUSHWAHA with intentional wrapping depth:
// Letters K, U, S pass behind the subject's right arm/shoulder
// Letters H, W, A emerge in front across the chest, crossed arms, and watch
// Letter H dips behind the left elbow
// Final letter A emerges in front on the right
const KUSHWAHA_LETTERS = [
  { char: "K", front: false },
  { char: "U", front: false },
  { char: "S", front: false },
  { char: "H", front: true },
  { char: "W", front: true },
  { char: "A", front: true },
  { char: "H", front: false },
  { char: "A", front: true },
];

const Hero = ({ isReady = true }: HeroProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);
  const { scrollTo: smoothScrollTo } = useSmoothScroll();

  // Smooth mouse coordinates via Framer Motion values (no DOM style collisions)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 75, damping: 22, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 75, damping: 22, mass: 0.5 });

  // Mouse Parallax for Layer 1: PAWAN (Back layer - slowest)
  const pawanParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const pawanParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-8, 8]);

  // Mouse Parallax for Layer 2: PORTRAIT (Middle layer - medium + 3D tilt)
  const portraitParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-18, 18]);
  const portraitParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);
  const portraitRotY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);
  const portraitRotX = useTransform(smoothMouseY, [-0.5, 0.5], [4.5, -4.5]);

  // Mouse Parallax for Layer 3: KUSHWAHA (Foreground weave layer - faster depth)
  const kushwahaParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-24, 24]);
  const kushwahaParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-16, 16]);

  // Mouse Parallax for Background Glow and Stars
  const bgGlowX = useTransform(smoothMouseX, [-0.5, 0.5], [20, -20]);
  const bgGlowY = useTransform(smoothMouseY, [-0.5, 0.5], [16, -16]);
  const bgStarsX = useTransform(smoothMouseX, [-0.5, 0.5], [14, -14]);
  const bgStarsY = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);

  // Scroll synchronization for smooth layer separation on scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.45,
    restDelta: 0.001,
  });

  // Vertical scroll separation
  const pawanScrollY = useTransform(smoothScroll, [0, 1], [0, -75]);
  const portraitScale = useTransform(smoothScroll, [0, 1], [1, 0.94]);
  const portraitScrollY = useTransform(smoothScroll, [0, 1], [0, 55]);
  const kushwahaScrollY = useTransform(smoothScroll, [0, 1], [0, 70]);

  // Description Area: Cinematic Rack-Focus Fade (sharp -> soft -> faded)
  const descY = useTransform(smoothScroll, [0, 0.6, 1], [0, 22, 50]);
  const descScale = useTransform(smoothScroll, [0, 0.6, 1], [1, 0.97, 0.92]);
  const descOpacity = useTransform(smoothScroll, [0, 0.35, 0.75, 1], [1, 0.92, 0.3, 0]);
  const descFilter = useTransform(smoothScroll, [0, 0.35, 0.7, 1], [
    "blur(0px)",
    "blur(0px)",
    "blur(4px)",
    "blur(12px)",
  ]);

  // Atmospheric Scrim Expansion on scroll
  const scrimScale = useTransform(smoothScroll, [0, 1], [1, 1.15]);
  const scrimOpacity = useTransform(smoothScroll, [0, 0.6, 1], [1, 0.85, 0]);

  // Track mouse movements relative to hero container
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const onMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [mouseX, mouseY]);

  // Magnetic button physics for CTAs
  useEffect(() => {
    const attachMagnetic = (btn: HTMLElement | null) => {
      if (!btn) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
      };
      const onLeave = () => {
        btn.style.transform = "translate(0px, 0px)";
      };
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      return () => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      };
    };

    const clean1 = attachMagnetic(primaryBtnRef.current);
    const clean2 = attachMagnetic(secondaryBtnRef.current);

    return () => {
      clean1?.();
      clean2?.();
    };
  }, []);

  return (
    <section
      className="hero-editorial-poster"
      id="home"
      ref={heroRef}
      aria-label="Pawan Kushwaha — Portfolio Hero"
    >
      {/* Background Ambience: Subtle Stars, Vignette & Depth Glow */}
      <div className="hero-backdrop" aria-hidden="true">
        <motion.div
          className="backdrop-glow"
          style={{ x: bgGlowX, y: bgGlowY }}
        />
        <div className="backdrop-grid" />
        <div className="backdrop-vignette" />
        
        {/* Subtle Atmospheric Star Particles */}
        <motion.div
          className="backdrop-stars"
          style={{ x: bgStarsX, y: bgStarsY }}
        >
          <span className="star-point star-1" style={{ top: "15%", left: "18%" }}>✦</span>
          <span className="star-point star-2" style={{ top: "28%", right: "22%" }}>✦</span>
          <span className="star-point star-3" style={{ top: "62%", left: "12%" }}>✦</span>
          <span className="star-point star-4" style={{ top: "75%", right: "14%" }}>✦</span>
          <span className="star-point star-5" style={{ top: "38%", left: "8%" }}>·</span>
          <span className="star-point star-6" style={{ top: "82%", left: "42%" }}>·</span>
          <span className="star-point star-7" style={{ top: "18%", right: "38%" }}>·</span>
          <span className="star-point star-8" style={{ top: "52%", right: "8%" }}>✦</span>
        </motion.div>
      </div>

      {/* Hero Outer Canvas Container - Clean, Unobstructed Top Area */}
      <div className="hero-poster-canvas">
        {/* =========================================================
            MASTER LAYERED ART-DIRECTED COMPOSITION:
            LAYER 1 (BACK, z:10): HUGE 'PAWAN' BEHIND PORTRAIT
            LAYER 2A (BEHIND WEAVE, z:15): KUSHWAHA BACK LETTERS
            LAYER 2B (CENTER, z:20): CENTRAL DOMINANT PORTRAIT
            LAYER 3 (FRONT WEAVE, z:25): KUSHWAHA FRONT LETTERS
            ========================================================= */}
        <div className="hero-poster-stage">
          {/* LAYER 1: PAWAN (Back layer, z-index: 10) */}
          <motion.div
            className="layer-back-pawan"
            style={{ y: pawanScrollY }}
            initial={{ opacity: 0, y: -40, filter: "blur(10px)" }}
            animate={{
              opacity: isReady ? 1 : 0,
              y: isReady ? 0 : -40,
              filter: isReady ? "blur(0px)" : "blur(10px)",
            }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <motion.div
              style={{ x: pawanParallaxX, y: pawanParallaxY }}
              className="name-word-box"
            >
              <h1 className="name-word pawan-word">PAWAN</h1>
            </motion.div>
          </motion.div>

          {/* LAYER 2A: KUSHWAHA BACK WEAVE (z-index: 15, sits behind the portrait cutout) */}
          <motion.div
            className="layer-kushwaha-weave kushwaha-behind"
            style={{ y: kushwahaScrollY }}
            initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
            animate={{
              opacity: isReady ? 1 : 0,
              y: isReady ? 0 : 35,
              filter: isReady ? "blur(0px)" : "blur(8px)",
            }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <motion.div
              style={{ x: kushwahaParallaxX, y: kushwahaParallaxY }}
              className="name-word-box"
            >
              <div className="name-word kushwaha-word" aria-label="KUSHWAHA">
                {KUSHWAHA_LETTERS.map((item, idx) => (
                  <span
                    key={`back-${idx}`}
                    className={`kushwaha-char ${!item.front ? "char-active-back" : "char-phantom"}`}
                  >
                    {item.char}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* LAYER 2B: THE CENTRAL DOMINANT PORTRAIT (z-index: 20) */}
          <motion.div
            className="layer-middle-portrait"
            style={{
              scale: portraitScale,
              y: portraitScrollY,
            }}
            initial={{ opacity: 0, scale: 0.94, y: 50 }}
            animate={{
              opacity: isReady ? 1 : 0,
              scale: isReady ? 1 : 0.94,
              y: isReady ? 0 : 50,
            }}
            transition={{ duration: 1.15, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="portrait-anchor"
              style={{
                x: portraitParallaxX,
                y: portraitParallaxY,
                rotateX: portraitRotX,
                rotateY: portraitRotY,
                transformPerspective: 1200,
              }}
              data-cursor="EXPLORE"
              role="img"
              aria-label="Pawan Kushwaha — Portrait"
            >
              {/* Soft ambient rim glow behind cutout */}
              <div className="portrait-rim-glow" aria-hidden="true" />
              
              <img
                src={heroPortrait}
                alt="Pawan Kushwaha"
                className="portrait-cutout-img"
                loading="eager"
              />
            </motion.div>
          </motion.div>

          {/* LAYER 3: KUSHWAHA FRONT WEAVE (z-index: 25, emerges in front of suit/arms) */}
          <motion.div
            className="layer-kushwaha-weave kushwaha-foreground"
            style={{ y: kushwahaScrollY }}
            initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
            animate={{
              opacity: isReady ? 1 : 0,
              y: isReady ? 0 : 35,
              filter: isReady ? "blur(0px)" : "blur(8px)",
            }}
            transition={{ duration: 1.1, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <motion.div
              style={{ x: kushwahaParallaxX, y: kushwahaParallaxY }}
              className="name-word-box"
            >
              <div className="name-word kushwaha-word">
                {KUSHWAHA_LETTERS.map((item, idx) => (
                  <span
                    key={`front-${idx}`}
                    className={`kushwaha-char ${item.front ? "char-active-front" : "char-phantom"}`}
                  >
                    {item.char}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* =========================================================
            BOTTOM FLANKS: EDITORIAL DESCRIPTION + CTAS + TECHNICAL SPECS
            With feathered invisible radial blur / dark atmospheric fade.
            ========================================================= */}
        <div className="hero-bottom-flanks">
          {/* Left Flank: Wrapped in an invisible radial blur + dark atmospheric scrim */}
          <motion.div
            className="flank-left-container"
            style={{
              y: descY,
              scale: descScale,
              opacity: descOpacity,
              filter: descFilter,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 24 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* The Invisible Feathered Radial Blur + Dark Atmospheric Fade */}
            <motion.div
              className="description-atmospheric-scrim"
              style={{ scale: scrimScale, opacity: scrimOpacity }}
              aria-hidden="true"
            />

            <div className="flank-left-content">
              {/* Small Technical Label */}
              <div className="flank-label-wrap">
                <span className="flank-accent-bullet">✦</span>
                <span className="flank-technical-label">
                  CREATIVE DEVELOPER / AI × SOFTWARE
                </span>
              </div>
              
              {/* Concise Description Paragraph */}
              <p className="flank-description">
                Creative Developer & AI/ML Engineer building intelligent deep systems,
                interactive architectures, and real-world digital experiences.
              </p>

              {/* Minimal Magnetic CTAs */}
              <div className="flank-cta-row">
                <a
                  href="#work"
                  className="hero-cta-btn cta-primary"
                  ref={primaryBtnRef}
                  data-cursor="OPEN"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("work");
                    if (el) {
                      smoothScrollTo(el, { offset: -50, duration: 1.25 });
                    }
                  }}
                >
                  <span>EXPLORE MY WORK</span>
                  <svg
                    className="cta-arrow-icon"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="13" x2="13" y2="3" />
                    <polyline points="4 3 13 3 13 12" />
                  </svg>
                </a>

                <a
                  href="#contact"
                  className="hero-cta-btn cta-secondary"
                  ref={secondaryBtnRef}
                  data-cursor="OPEN"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("contact");
                    if (el) {
                      smoothScrollTo(el, { offset: -50, duration: 1.25 });
                    }
                  }}
                >
                  <span>LET’S CONNECT</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Flank: Micro Technical Spec & Scroll Cue */}
          <motion.div
            className="flank-right"
            style={{
              y: descY,
              opacity: descOpacity,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 24 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="technical-spec-block">
              <div className="spec-line">
                <span className="spec-tag">SPEC.01</span>
                <span className="spec-val">FOUNDER @ DEVLINKHUB</span>
              </div>
              <div className="spec-line">
                <span className="spec-tag">SPEC.02</span>
                <span className="spec-val">GOOGLE STUDENT AMBASSADOR</span>
              </div>
              <div className="spec-line">
                <span className="spec-tag">SPEC.03</span>
                <span className="spec-val">B.TECH CSE (AI & ML · 2024–28)</span>
              </div>
            </div>

            <div
              className="flank-scroll-cue"
              onClick={() => {
                const el = document.getElementById("about");
                if (el) {
                  smoothScrollTo(el, { offset: -30, duration: 1.2 });
                }
              }}
            >
              <span className="scroll-cue-text">SCROLL TO EXPLORE</span>
              <div className="scroll-cue-needle">
                <span className="needle-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Styled Scoped CSS */}
      <style>{`
        .hero-editorial-poster {
          position: relative;
          min-height: 100svh;
          height: 100svh;
          width: 100%;
          background: #08080a;
          color: var(--bone);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-bottom: 1px solid var(--hairline);
          user-select: none;
        }

        /* Ambient Backdrop */
        .hero-backdrop {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .backdrop-glow {
          position: absolute;
          top: 48%;
          left: 50%;
          width: clamp(400px, 60vw, 900px);
          height: clamp(400px, 60vw, 900px);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(91, 108, 255, 0.16) 0%,
            rgba(91, 108, 255, 0.035) 45%,
            transparent 72%
          );
          filter: blur(55px);
          will-change: transform;
        }

        .backdrop-grid {
          position: absolute;
          inset: 0;
          background-size: 72px 72px;
          background-image: 
            linear-gradient(to right, rgba(239, 236, 230, 0.022) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(239, 236, 230, 0.022) 1px, transparent 1px);
          mask-image: radial-gradient(circle at 50% 50%, black 35%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black 35%, transparent 80%);
        }

        .backdrop-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(8, 8, 10, 0.8) 100%);
        }

        .backdrop-stars {
          position: absolute;
          inset: 0;
          will-change: transform;
        }

        .star-point {
          position: absolute;
          color: var(--accent);
          opacity: 0.35;
          font-size: 0.85rem;
          line-height: 1;
        }

        /* Canvas Frame - Clean Top Breathing Space */
        .hero-poster-canvas {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          max-width: 1720px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: clamp(2rem, 4vh, 3.5rem) clamp(1.25rem, 3.5vw, 3.5rem) clamp(1.25rem, 2.5vh, 2rem);
        }

        /* =========================================================
           STAGE: Z-INDEX DEPTH SANDWICH WITH KUSHWAHA WEAVE
           ========================================================= */
        .hero-poster-stage {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          pointer-events: none;
          z-index: 10;
        }

        /* Common Word Style */
        .name-word-box {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: auto;
          will-change: transform;
        }

        .name-word {
          font-family: var(--font-display);
          font-weight: 800;
          letter-spacing: -0.045em;
          line-height: 0.8;
          text-transform: uppercase;
          margin: 0;
          padding: 0;
          text-align: center;
          white-space: nowrap;
        }

        /* LAYER 1: PAWAN (Back layer, z-index: 10) */
        .layer-back-pawan {
          position: absolute;
          top: clamp(13%, 16vh, 21%);
          left: 0;
          right: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
          pointer-events: none;
          will-change: transform;
        }

        .pawan-word {
          font-size: clamp(6.5rem, 19vw, 19.5rem);
          color: #efece6;
          opacity: 0.94;
          text-shadow: 0 10px 45px rgba(0, 0, 0, 0.7);
        }

        /* LAYER 2B: PORTRAIT (Middle layer, z-index: 20) */
        .layer-middle-portrait {
          position: relative;
          z-index: 20;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          height: 82%;
          max-height: clamp(520px, 78vh, 860px);
          pointer-events: auto;
          will-change: transform;
        }

        .portrait-anchor {
          position: relative;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          cursor: pointer;
          will-change: transform;
        }

        .portrait-rim-glow {
          position: absolute;
          inset: -10%;
          border-radius: 50%;
          background: radial-gradient(
            circle at 50% 40%,
            rgba(91, 108, 255, 0.22) 0%,
            transparent 65%
          );
          pointer-events: none;
          filter: blur(40px);
          z-index: -1;
        }

        .portrait-cutout-img {
          display: block;
          height: 100%;
          max-height: clamp(520px, 78vh, 860px);
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.95))
                 drop-shadow(0 0 35px rgba(91, 108, 255, 0.18));
          image-rendering: -webkit-optimize-contrast;
          transition: filter 0.35s ease;
        }

        .portrait-anchor:hover .portrait-cutout-img {
          filter: drop-shadow(0 30px 65px rgba(0, 0, 0, 0.98))
                 drop-shadow(0 0 50px rgba(91, 108, 255, 0.36));
        }

        /* =========================================================
           LAYERS 2A & 3: KUSHWAHA WEAVE (BEHIND z:15 & FRONT z:25)
           Anchored across the crossed arms & wristwatch, far below the face & chin
           ========================================================= */
        .layer-kushwaha-weave {
          position: absolute;
          bottom: clamp(16%, 20vh, 24%);
          top: auto;
          left: 0;
          right: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
          will-change: transform;
        }

        .kushwaha-behind {
          z-index: 15;
        }

        .kushwaha-foreground {
          z-index: 25;
        }

        .kushwaha-word {
          font-size: clamp(3.8rem, 11.5vw, 12rem);
          line-height: 0.85;
          letter-spacing: clamp(0.04em, 1.2vw, 0.1em);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .kushwaha-char {
          display: inline-block;
          color: #efece6;
          -webkit-text-stroke: 0px transparent !important;
          text-shadow: 0 8px 30px rgba(0, 0, 0, 0.7);
          transition: color 0.3s ease;
        }

        /* Characters marked active-front pop in the foreground */
        .char-active-front {
          visibility: visible;
          color: #efece6;
          -webkit-text-stroke: 0px transparent !important;
          filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.95));
        }

        /* Characters marked active-back sit behind the portrait cutout */
        .char-active-back {
          visibility: visible;
          color: #efece6;
          opacity: 0.94;
          -webkit-text-stroke: 0px transparent !important;
          filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.7));
        }

        /* Invisible placeholding characters to guarantee identical spacing */
        .char-phantom {
          visibility: hidden;
          pointer-events: none;
        }

        /* =========================================================
           BOTTOM FLANKS: INVISIBLE RADIAL BLUR & DESCRIPTION ZONE
           ========================================================= */
        .hero-bottom-flanks {
          position: relative;
          z-index: 35;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2.5rem;
          padding-bottom: clamp(1rem, 2.5vh, 2rem);
          width: 100%;
          pointer-events: none;
        }

        /* Left Flank Container */
        .flank-left-container {
          position: relative;
          max-width: clamp(340px, 32vw, 460px);
          pointer-events: auto;
          will-change: transform, opacity, filter;
        }

        /* The Invisible Feathered Radial Blur + Dark Atmospheric Scrim
           CLEAR -> SOFT BLUR -> DARKER CENTER -> SOFT FADE -> CLEAR
           Zero rectangular card edges! Pure natural depth vignette */
        .description-atmospheric-scrim {
          position: absolute;
          inset: -3.5rem -4.5rem -3.5rem -4.5rem;
          pointer-events: none;
          z-index: -1;
          border-radius: 50%;
          background: radial-gradient(
            ellipse 65% 60% at 35% 55%,
            rgba(8, 8, 10, 0.92) 0%,
            rgba(8, 8, 10, 0.78) 35%,
            rgba(8, 8, 10, 0.35) 65%,
            transparent 100%
          );
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          mask-image: radial-gradient(
            ellipse 70% 65% at 35% 55%,
            black 25%,
            rgba(0, 0, 0, 0.65) 55%,
            transparent 88%
          );
          -webkit-mask-image: radial-gradient(
            ellipse 70% 65% at 35% 55%,
            black 25%,
            rgba(0, 0, 0, 0.65) 55%,
            transparent 88%
          );
          filter: blur(6px);
          will-change: transform, opacity;
        }

        .flank-left-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 0.95rem;
        }

        .flank-label-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: var(--accent);
          text-transform: uppercase;
          font-weight: 600;
        }

        .flank-accent-bullet {
          font-size: 0.75rem;
        }

        .flank-description {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.15vw, 1.08rem);
          line-height: 1.55;
          color: #d1cecd;
          margin: 0;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.95);
        }

        .flank-cta-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 0.45rem;
          flex-wrap: wrap;
        }

        .hero-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1.75rem;
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.3s var(--ease-out);
          will-change: transform;
          cursor: pointer;
        }

        .cta-primary {
          background: #efece6;
          color: #08080a;
          box-shadow: 0 10px 28px rgba(239, 236, 230, 0.14);
        }

        .cta-primary:hover {
          background: #ffffff;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 14px 35px rgba(91, 108, 255, 0.38);
          color: #08080a;
        }

        .cta-arrow-icon {
          width: 14px;
          height: 14px;
          transition: transform 0.25s var(--ease-out);
        }

        .cta-primary:hover .cta-arrow-icon {
          transform: translate(3px, -3px);
        }

        .cta-secondary {
          background: rgba(14, 14, 18, 0.75);
          color: #efece6;
          border: 1px solid rgba(239, 236, 230, 0.2);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .cta-secondary:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(91, 108, 255, 0.08);
          transform: translateY(-2px) scale(1.03);
        }

        /* Right Flank */
        .flank-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1.5rem;
          pointer-events: auto;
          text-align: right;
          will-change: transform, opacity;
        }

        .technical-spec-block {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .spec-line {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: flex-end;
        }

        .spec-tag {
          color: var(--accent);
          font-weight: 600;
        }

        .spec-val {
          color: var(--muted-gray);
        }

        .flank-scroll-cue {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          opacity: 0.65;
          transition: opacity 0.25s ease;
        }

        .flank-scroll-cue:hover {
          opacity: 1;
        }

        .scroll-cue-text {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.16em;
          color: var(--muted-gray);
          text-transform: uppercase;
        }

        .scroll-cue-needle {
          width: 22px;
          height: 1px;
          background: rgba(239, 236, 230, 0.25);
          position: relative;
          overflow: hidden;
        }

        .needle-pulse {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 50%;
          background: var(--accent);
          animation: needleShift 1.8s ease-in-out infinite;
        }

        @keyframes needleShift {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }

        /* =========================================================
           RESPONSIVE REFINEMENT
           ========================================================= */
        @media (max-width: 1200px) {
          .pawan-word {
            font-size: clamp(5rem, 18vw, 14rem);
          }
          .kushwaha-word {
            font-size: clamp(3.8rem, 13vw, 10.5rem);
          }
          .flank-left-container {
            max-width: 360px;
          }
          .technical-spec-block {
            display: none;
          }
        }

        @media (max-width: 900px) {
          .layer-middle-portrait {
            height: 74%;
          }
          .portrait-cutout-img {
            max-height: clamp(400px, 62vh, 560px);
          }
          .layer-back-pawan {
            top: 15%;
          }
          .layer-kushwaha-weave {
            top: auto;
            bottom: clamp(12%, 16vh, 20%);
          }
          .flank-right {
            display: none;
          }
          .flank-left-container {
            max-width: 100%;
          }
        }

        /* Tablet & Mobile: Unify KUSHWAHA into single crisp foreground layer */
        @media (max-width: 768px) {
          .kushwaha-behind {
            display: none !important;
          }
          .kushwaha-foreground .char-phantom {
            visibility: visible !important;
            pointer-events: auto !important;
          }
          .kushwaha-foreground .kushwaha-char {
            display: inline-block;
            visibility: visible !important;
            color: #efece6 !important;
            opacity: 1 !important;
            text-shadow: 0 4px 22px rgba(0, 0, 0, 0.98) !important;
            filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.95)) !important;
          }
        }

        @media (max-width: 640px) {
          .hero-editorial-poster {
            height: auto;
            min-height: 100svh;
            padding: 0;
          }
          .hero-poster-canvas {
            padding: 4.8rem clamp(1rem, 3.5vw, 1.35rem) 1.5rem;
            min-height: 100svh;
            justify-content: space-between;
          }
          .hero-poster-stage {
            position: relative;
            inset: auto;
            width: 100%;
            min-height: clamp(360px, 48vh, 440px);
            margin: 0.25rem 0 0.85rem;
          }
          .layer-back-pawan {
            top: 1%;
          }
          .pawan-word {
            font-size: clamp(3.4rem, 17.5vw, 5.8rem);
            letter-spacing: -0.04em;
          }
          .layer-middle-portrait {
            height: auto;
            max-height: clamp(340px, 46vh, 410px);
            width: 100%;
          }
          .portrait-cutout-img {
            max-height: clamp(330px, 45vh, 400px);
            max-width: 86vw;
          }
          .layer-kushwaha-weave {
            top: auto;
            bottom: clamp(6%, 8vh, 12%);
          }
          .kushwaha-word {
            font-size: clamp(2rem, 9.6vw, 3.4rem);
            letter-spacing: clamp(0.04em, 1.2vw, 0.08em);
            line-height: 0.9;
          }
          .hero-bottom-flanks {
            position: relative;
            z-index: 30;
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
            padding-bottom: 0.75rem;
            width: 100%;
          }
          .description-atmospheric-scrim {
            inset: -1.2rem -1rem -1.2rem -1rem;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            opacity: 0.55;
          }
          .flank-label-wrap {
            font-size: clamp(0.66rem, 2vw, 0.72rem);
          }
          .flank-description {
            font-size: clamp(0.88rem, 2.7vw, 0.98rem);
            line-height: 1.5;
          }
          .flank-cta-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.65rem;
            width: 100%;
            padding-top: 0.25rem;
          }
          .hero-cta-btn {
            width: 100%;
            justify-content: center;
            padding: 0.8rem 0.6rem;
            font-size: clamp(0.68rem, 2.4vw, 0.76rem);
            letter-spacing: 0.04em;
            gap: 0.4rem;
            white-space: nowrap;
          }
        }

        @media (max-width: 360px) {
          .flank-cta-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;