import { useEffect, useRef, useState } from "react";
import heroPortrait from "../assets/pawan-profile.png";

const ROLES = [
  "FOUNDER & HEAD",
  "AI & ML ENGINEER",
  "FULL STACK",
  "COMMUNITY HEAD",
  "SYSTEMS BUILDER",
];

interface HeroProps {
  isReady?: boolean;
}

const Hero = ({ isReady = true }: HeroProps) => {
  const [revealed, setRevealed] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);

  // Typewriter state for cycling roles
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Trigger letter-by-letter reveal when page/loader is ready
  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => setRevealed(true), 150);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  // Continuous typewriter effect cycling through roles
  useEffect(() => {
    const fullText = ROLES[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && currentText === fullText) {
      // Pause at full word so user can easily read it
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && currentText === "") {
      // Finished deleting, switch to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    } else {
      // Typing speed: 75ms forward, 40ms deleting
      const speed = isDeleting ? 40 : 75;
      timer = setTimeout(() => {
        const next = isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1);
        setCurrentText(next);
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  // 3D Arch tilt and moving grid on mousemove
  useEffect(() => {
    const heroEl = heroRef.current;
    const archEl = archRef.current;
    const gridEl = gridRef.current;
    if (!heroEl || !archEl) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const rotX = -y * 18;
      const rotY = x * 22;
      archEl.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;

      if (gridEl) {
        gridEl.style.transform = `translate3d(${-x * 35}px, ${-y * 35}px, 0)`;
      }
    };

    const onMouseLeave = () => {
      archEl.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      if (gridEl) gridEl.style.transform = "translate3d(0, 0, 0)";
    };

    heroEl.addEventListener("mousemove", onMouseMove, { passive: true });
    heroEl.addEventListener("mouseleave", onMouseLeave);

    return () => {
      heroEl.removeEventListener("mousemove", onMouseMove);
      heroEl.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // Magnetic button physics
  useEffect(() => {
    const attachMagnetic = (btn: HTMLElement | null) => {
      if (!btn) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate(${dx * 0.28}px, ${dy * 0.28}px)`;
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

  const letters = ["P", "A", "W", "A", "N"];

  return (
    <section className="hero-section" id="home" ref={heroRef}>
      {/* Moving Background Grid */}
      <div className="hero-grid-canvas" ref={gridRef} aria-hidden="true" />

      <div className="container hero-container">
        {/* LEFT COLUMN: Editorial Typography & Magnetic CTAs */}
        <div className="hero-text-block">
          <div className="hero-meta">
            <span className="live-pulse">
              <span className="live-pulse-dot" />
              Available for work
            </span>
            <span>/</span>
            <span>Bhopal, India (IST)</span>
          </div>

          {/* Masked letter-by-letter reveal */}
          <div className="hero-title-wrap">
            <h1
              className={`hero-headline ${revealed ? "revealed" : ""}`}
              aria-label="Pawan Kushwaha"
            >
              {letters.map((char, i) => (
                <span
                  key={i}
                  className="reveal-letter"
                  style={{ transitionDelay: `${0.12 + i * 0.08}s` }}
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>

          <div className="hero-subhead">
            <span className="outline-text">KUSHWAHA</span>
            <span className="hero-dash">—</span>
            <span className="typewriter-container" aria-label={`Role: ${ROLES[roleIndex]}`}>
              <span className="typewriter-text">{currentText}</span>
              <span className="typewriter-cursor" aria-hidden="true" />
            </span>
          </div>

          <p className="hero-intro">
            B.Tech CSE student specializing in <strong>AI & ML (2024–2028)</strong>, Google Student Ambassador, GFG Campus Rep, and founder of <strong>DevLinkHub</strong>. Crafting intelligent neural systems, high-concurrency microservices, and tactile digital experiences with strict visual identity.
          </p>

          <div className="hero-ctas">
            <a
              href="#work"
              className="btn-magnetic btn-primary"
              ref={primaryBtnRef}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("work");
                if (window.lenis && el) {
                  window.lenis.scrollTo(el, { offset: -50, duration: 1.25 });
                } else {
                  el?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              See selected work
              <svg
                className="btn-arrow-icon"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="13" x2="13" y2="3" />
                <polyline points="4 3 13 3 13 12" />
              </svg>
            </a>

            <a
              href="#contact"
              className="btn-magnetic btn-secondary"
              ref={secondaryBtnRef}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (window.lenis && el) {
                  window.lenis.scrollTo(el, { offset: -50, duration: 1.25 });
                } else {
                  el?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Arch-Shaped Portrait Frame */}
        <div className="hero-portrait-stage">
          <div className="arch-card" ref={archRef}>
            <div className="arch-inner">
              <div className="arch-halo" />

              {/* Layered SVG depth lines */}
              <svg className="arch-svg-overlay" viewBox="0 0 380 500" fill="none">
                <circle cx="190" cy="190" r="160" stroke="#5b6cff" strokeWidth="1" strokeDasharray="6 8" />
                <circle cx="190" cy="190" r="120" stroke="#efece6" strokeWidth="0.75" strokeDasharray="4 6" />
                <circle cx="190" cy="190" r="80" stroke="#5b6cff" strokeWidth="0.5" />
              </svg>

              {/* Pawan's Portrait Image */}
              <img
                src={heroPortrait}
                alt="Pawan Kushwaha"
                className="arch-image"
                loading="eager"
              />
            </div>

            {/* Floating 3D Chips */}
            <div className="hero-chip hero-chip-top">Full Stack</div>
            <div className="hero-chip hero-chip-bottom">AI & ML</div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100svh;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: clamp(6.5rem, 12vh, 9rem);
          padding-bottom: clamp(3rem, 6vh, 5rem);
          overflow: hidden;
          border-bottom: 1px solid var(--hairline);
        }

        .hero-grid-canvas {
          position: absolute;
          inset: -5%;
          width: 110%;
          height: 110%;
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
          background-size: 56px 56px;
          background-image: 
            linear-gradient(to right, rgba(239, 236, 230, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(239, 236, 230, 0.04) 1px, transparent 1px);
          mask-image: radial-gradient(circle at 50% 50%, black 20%, transparent 75%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black 20%, transparent 75%);
          transition: transform 0.15s ease-out;
          will-change: transform;
        }

        .hero-container {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: center;
          gap: clamp(2rem, 5vw, 5rem);
        }

        .hero-meta {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: clamp(1.5rem, 3vh, 2.5rem);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          color: var(--muted-gray);
        }

        .live-pulse {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--bone);
        }

        .live-pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .hero-title-wrap {
          overflow: hidden;
          margin-bottom: 0.2rem;
        }

        .hero-headline {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(3rem, 12.5vw, 10.5rem);
          line-height: 0.9;
          letter-spacing: -0.045em;
          color: var(--bone);
          text-transform: uppercase;
          display: flex;
        }

        .reveal-letter {
          display: inline-block;
          transform: translateY(110%);
          transition: transform 1s var(--ease-out);
          will-change: transform;
        }

        .hero-headline.revealed .reveal-letter {
          transform: translateY(0%);
        }

        .hero-subhead {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.35rem, 4.4vw, 4.2rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: clamp(1.25rem, 2.5vh, 2rem);
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .hero-dash {
          color: var(--accent);
          font-weight: 800;
          display: inline-block;
          user-select: none;
        }

        .typewriter-container {
          display: inline-flex;
          align-items: center;
          position: relative;
          min-height: 1.1em;
          white-space: nowrap;
          max-width: 100%;
        }

        .typewriter-text {
          font-family: 'Clash', var(--font-display);
          font-weight: 800;
          color: var(--accent);
          letter-spacing: -0.025em;
          text-shadow: 0 0 28px var(--accent-glow);
          display: inline-block;
          min-width: 1ch;
        }

        .typewriter-cursor {
          display: inline-block;
          width: 3.5px;
          height: 0.82em;
          background: var(--bone);
          margin-left: 5px;
          border-radius: 2px;
          animation: blinkCursor 0.9s infinite ease-in-out;
        }

        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero-intro {
          font-size: clamp(1.05rem, 1.4vw, 1.25rem);
          line-height: 1.6;
          color: var(--muted-gray);
          max-width: 44ch;
          margin-bottom: clamp(2rem, 3.5vh, 2.8rem);
        }

        .hero-intro strong {
          color: var(--bone);
          font-weight: 500;
        }

        .hero-ctas {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .btn-magnetic {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.95rem 2.2rem;
          border-radius: 9999px;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          transition: transform 0.25s var(--ease-out), box-shadow 0.25s, background 0.25s;
          will-change: transform;
        }

        .btn-primary {
          background: var(--accent);
          color: #ffffff;
          box-shadow: 0 8px 24px var(--accent-glow);
        }

        .btn-primary:hover {
          background: var(--accent-hover);
          box-shadow: 0 12px 32px rgba(91, 108, 255, 0.5);
        }

        .btn-secondary {
          background: var(--deep-gray);
          color: var(--bone);
          border: 1px solid var(--hairline-strong);
        }

        .btn-secondary:hover {
          border-color: var(--bone);
          background: var(--surface);
        }

        .btn-arrow-icon {
          width: 14px;
          height: 14px;
          transition: transform 0.25s ease;
        }

        .btn-magnetic:hover .btn-arrow-icon {
          transform: translate(3px, -3px);
        }

        /* 3D Arch Card */
        .hero-portrait-stage {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1200px;
        }

        .arch-card {
          position: relative;
          width: 100%;
          max-width: 380px;
          aspect-ratio: 3/4.2;
          border-radius: 200px 200px 16px 16px;
          background: linear-gradient(180deg, #181820 0%, #0c0c10 100%);
          border: 1px solid var(--hairline-strong);
          padding: 8px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7), 0 0 80px rgba(91, 108, 255, 0.12);
          transform-style: preserve-3d;
          transition: transform 0.15s ease-out;
          will-change: transform;
        }

        .arch-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 192px 192px 10px 10px;
          overflow: hidden;
          background: radial-gradient(circle at 50% 35%, rgba(91, 108, 255, 0.2) 0%, rgba(8, 8, 10, 0.95) 75%);
        }

        .arch-halo {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(91, 108, 255, 0.35) 0%, transparent 70%);
          pointer-events: none;
        }

        .arch-svg-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.35;
        }

        .arch-image {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 115%;
          height: auto;
          max-height: 98%;
          object-fit: cover;
          object-position: center bottom;
          filter: contrast(1.08) brightness(1.02);
          mask-image: linear-gradient(to bottom, black 82%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 82%, transparent 100%);
          pointer-events: none;
          transition: transform 0.3s ease;
        }

        .hero-chip {
          position: absolute;
          z-index: 10;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          background: rgba(8, 8, 10, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--hairline-strong);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: var(--bone);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transform: translateZ(40px);
          transition: transform 0.3s ease;
          white-space: nowrap;
        }

        .hero-chip::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
        }

        .hero-chip-top {
          top: 12%;
          right: -8%;
        }

        .hero-chip-bottom {
          bottom: 12%;
          left: -8%;
        }

        @media (max-width: 960px) {
          .hero-section {
            padding-top: clamp(5.5rem, 11vh, 8rem);
            padding-bottom: 2.5rem;
          }
          .hero-container {
            grid-template-columns: 1fr;
            text-align: left;
            gap: 2.25rem;
          }
          .hero-portrait-stage {
            order: -1;
            max-width: 270px;
            margin: 0 auto;
          }
          .hero-chip-top {
            top: 5%;
            right: 0;
            padding: 0.38rem 0.8rem;
            font-size: 0.68rem;
          }
          .hero-chip-bottom {
            bottom: 5%;
            left: 0;
            padding: 0.38rem 0.8rem;
            font-size: 0.68rem;
          }
        }

        @media (max-width: 640px) {
          .hero-meta {
            flex-wrap: wrap;
            gap: 0.5rem;
            font-size: 0.68rem;
          }
          .hero-ctas {
            flex-direction: column;
            width: 100%;
            align-items: stretch;
            gap: 0.8rem;
          }
          .btn-magnetic {
            width: 100%;
            justify-content: center;
            padding: 0.85rem 1.4rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;