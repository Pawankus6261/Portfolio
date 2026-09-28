import { useEffect, useState, useRef } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const PHRASES = [
  "Loading the studio",
  "Setting the type",
  "Almost there",
];

const SESSION_STORAGE_KEY = "pawan_portfolio_visited";

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [exitPhase, setExitPhase] = useState<"idle" | "counter-exit" | "split-exit">("idle");
  const completedRef = useRef(false);

  // Determine active phrase based on progress
  const activePhraseIndex = progress < 36 ? 0 : progress < 76 ? 1 : 2;
  const currentPhrase = PHRASES[activePhraseIndex];

  // Lock body scroll while loader is active and restore upon completion
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Main timing and loading engine
  useEffect(() => {
    // Check prefers-reduced-motion
    let isReduced = false;
    try {
      isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      isReduced = false;
    }

    if (isReduced) {
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
      } catch (e) {}
      setExitPhase("counter-exit");
      const quickTimer = setTimeout(() => {
        onComplete();
      }, 300);
      return () => clearTimeout(quickTimer);
    }

    // Real loading trackers
    let fontsReady = false;
    let windowLoaded = document.readyState === "complete";

    if (document.fonts) {
      document.fonts.ready
        .then(() => {
          fontsReady = true;
        })
        .catch(() => {
          fontsReady = true;
        });
    } else {
      fontsReady = true;
    }

    if (!windowLoaded) {
      const onLoad = () => {
        windowLoaded = true;
      };
      window.addEventListener("load", onLoad, { once: true });
    }

    const startTime = performance.now();
    const minDuration = 1800; // minimum display time (ms)
    const maxDuration = 3500; // maximum display time (ms)

    const finishLoading = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      setProgress(100);

      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
      } catch (e) {}

      // Phase 1: At 100, counter scales up and fades
      setTimeout(() => {
        setExitPhase("counter-exit");

        // Phase 2: Split panels slide apart with cubic-bezier(.7,0,.2,1) over 0.9s
        setTimeout(() => {
          setExitPhase("split-exit");

          // Phase 3: Wait for panels to fully clear (0.9s), then trigger hero & navbar entrance
          setTimeout(() => {
            onComplete();
          }, 900);
        }, 320);
      }, 160);
    };

    let animationFrameId: number;

    const tick = (now: number) => {
      if (completedRef.current) return;

      const elapsed = now - startTime;
      const realReady = fontsReady && windowLoaded;

      // Smooth mathematical easing curve
      let targetProgress = 0;

      if (elapsed < minDuration) {
        // Between 0 and 1.8s: ease smoothly from 0 to 95%
        const t = elapsed / minDuration;
        // Cubic ease-out
        const eased = 1 - Math.pow(1 - t, 2.5);
        targetProgress = Math.floor(eased * 96);
      } else if (realReady || elapsed >= maxDuration) {
        targetProgress = 100;
      } else {
        // Between 1.8s and 3.5s: creep gently from 96% to 99% until real load arrives
        const overtime = (elapsed - minDuration) / (maxDuration - minDuration);
        targetProgress = Math.min(96 + Math.floor(overtime * 4), 99);
      }

      setProgress((prev) => {
        const next = Math.max(prev, targetProgress);
        return next > 100 ? 100 : next;
      });

      if (targetProgress >= 100) {
        finishLoading();
      } else {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  // Digits indexing for odometer
  const hundredsIndex = progress >= 100 ? 1 : 0;
  const tensIndex = progress < 10 ? 0 : progress < 100 ? Math.floor(progress / 10) : 10;
  const onesIndex = progress;

  return (
    <div
      className={`film-preloader phase-${exitPhase}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio experience"
    >
      {/* Screen-reader live progress announcement */}
      <span className="sr-only">
        {progress}% loaded. {currentPhrase}.
      </span>

      {/* Split Shutter Panels */}
      <div className="preloader-panel panel-top" aria-hidden="true" />
      <div className="preloader-panel panel-bottom" aria-hidden="true" />

      {/* Background Elements */}
      <div className="preloader-bg" aria-hidden="true">
        {/* Moving Grid */}
        <div className="moving-grid" />
        {/* Soft Accent Light following progress */}
        <div
          className="progress-light"
          style={{
            left: `${25 + (progress * 0.5)}%`,
            opacity: exitPhase === "idle" ? 0.85 : 0,
          }}
        />
        {/* Film grain overlay */}
        <div className="preloader-film-grain" />
      </div>

      {/* Top-Left: "Pawan" */}
      <div className="preloader-tl" aria-hidden="true">
        Pawan
      </div>

      {/* Bottom-Right: "Full Stack · AI & ML" */}
      <div className="preloader-br" aria-hidden="true">
        Full Stack · AI &amp; ML
      </div>

      {/* Center Stage: Odometer Counter & Progress Line */}
      <div className="preloader-center-content" aria-hidden="true">
        <div className="odometer-wrap">
          {/* Hundreds Column */}
          <div className={`odometer-col col-hundreds ${progress >= 100 ? "col-visible" : ""}`}>
            <div
              className="odometer-strip"
              style={{ transform: `translateY(-${hundredsIndex}em)` }}
            >
              <span className="odometer-digit">&nbsp;</span>
              <span className="odometer-digit">1</span>
            </div>
          </div>

          {/* Tens Column */}
          <div className={`odometer-col col-tens ${progress >= 10 ? "col-visible" : ""}`}>
            <div
              className="odometer-strip"
              style={{ transform: `translateY(-${tensIndex}em)` }}
            >
              <span className="odometer-digit">&nbsp;</span>
              <span className="odometer-digit">1</span>
              <span className="odometer-digit">2</span>
              <span className="odometer-digit">3</span>
              <span className="odometer-digit">4</span>
              <span className="odometer-digit">5</span>
              <span className="odometer-digit">6</span>
              <span className="odometer-digit">7</span>
              <span className="odometer-digit">8</span>
              <span className="odometer-digit">9</span>
              <span className="odometer-digit">0</span>
            </div>
          </div>

          {/* Ones Column */}
          <div className="odometer-col col-ones col-visible">
            <div
              className="odometer-strip"
              style={{ transform: `translateY(-${onesIndex}em)` }}
            >
              {Array.from({ length: 101 }, (_, i) => (
                <span key={i} className="odometer-digit">
                  {i % 10}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 1px Thin Progress Line */}
        <div className="progress-line-track">
          <div
            className="progress-line-fill"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>

      {/* Bottom-Center: Cycling short lines */}
      <div className="preloader-phrases" aria-hidden="true">
        {PHRASES.map((phrase, i) => {
          const status =
            i === activePhraseIndex ? "active" : i < activePhraseIndex ? "exit" : "enter";
          return (
            <span key={phrase} className={`phrase-line phrase-${status}`}>
              {phrase}
            </span>
          );
        })}
      </div>

      <style>{`
        /* =============================================
           OPENING TITLE SEQUENCE PRELOADER
           Ink Black #08080a • Bricolage Grotesque 800
           ============================================= */

        .film-preloader {
          position: fixed;
          inset: 0;
          z-index: 100000;
          background: #08080a;
          color: #efece6;
          overflow: hidden;
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Screen Reader Only Utility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Split Shutter Panels */
        .preloader-panel {
          position: absolute;
          left: 0;
          width: 100%;
          height: 50.5%;
          background: #08080a;
          z-index: 3;
          pointer-events: none;
          will-change: transform;
        }

        .panel-top {
          top: 0;
          transform: translateY(0);
        }

        .panel-bottom {
          bottom: 0;
          transform: translateY(0);
        }

        /* Exit Split Animations */
        .phase-split-exit .panel-top {
          transform: translateY(-100%);
          transition: transform 0.9s cubic-bezier(0.7, 0, 0.2, 1);
        }

        .phase-split-exit .panel-bottom {
          transform: translateY(100%);
          transition: transform 0.9s cubic-bezier(0.7, 0, 0.2, 1);
        }

        /* Background & Atmosphere */
        .preloader-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .moving-grid {
          position: absolute;
          inset: -80px;
          background-size: 64px 64px;
          background-image:
            linear-gradient(to right, rgba(239, 236, 230, 0.032) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(239, 236, 230, 0.032) 1px, transparent 1px);
          mask-image: radial-gradient(circle at 50% 50%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black 30%, transparent 80%);
          animation: gridPan 24s linear infinite;
        }

        @keyframes gridPan {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-64px, -64px, 0); }
        }

        .progress-light {
          position: absolute;
          top: 50%;
          width: clamp(350px, 45vw, 650px);
          height: clamp(350px, 45vw, 650px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(91, 108, 255, 0.22) 0%, rgba(91, 108, 255, 0.05) 45%, transparent 70%);
          filter: blur(55px);
          transform: translate(-50%, -50%);
          transition: left 0.12s linear, opacity 0.4s ease;
          will-change: left, opacity;
        }

        .preloader-film-grain {
          position: absolute;
          inset: 0;
          opacity: 0.045;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        /* Top-Left & Bottom-Right Corner Text */
        .preloader-tl,
        .preloader-br {
          position: absolute;
          font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 0.85rem;
          color: #85858f;
          font-weight: 500;
          letter-spacing: 0.02em;
          z-index: 4;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .preloader-tl {
          top: max(2rem, env(safe-area-inset-top));
          left: max(2rem, env(safe-area-inset-left));
        }

        .preloader-br {
          bottom: max(2rem, env(safe-area-inset-bottom));
          right: max(2rem, env(safe-area-inset-right));
        }

        .phase-counter-exit .preloader-tl,
        .phase-counter-exit .preloader-br,
        .phase-split-exit .preloader-tl,
        .phase-split-exit .preloader-br {
          opacity: 0;
        }

        /* Center Content Stage */
        .preloader-center-content {
          position: relative;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
          will-change: transform, opacity;
        }

        .phase-counter-exit .preloader-center-content,
        .phase-split-exit .preloader-center-content {
          transform: scale(1.08);
          opacity: 0;
        }

        /* Odometer Rolling Counter */
        .odometer-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 1.08em;
          line-height: 1;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(80px, 22vw, 320px);
          letter-spacing: -0.06em;
          color: #efece6;
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum" 1;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%);
        }

        .odometer-col {
          display: flex;
          flex-direction: column;
          height: 1.08em;
          overflow: hidden;
          position: relative;
          width: 0;
          opacity: 0;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
        }

        .odometer-col.col-visible {
          width: 1ch;
          opacity: 1;
        }

        .odometer-strip {
          display: flex;
          flex-direction: column;
          will-change: transform;
          transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .odometer-digit {
          height: 1.08em;
          line-height: 1.08em;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          user-select: none;
        }

        /* 1px Thin Progress Line */
        .progress-line-track {
          width: clamp(140px, 32vw, 380px);
          height: 1px;
          background: rgba(239, 236, 230, 0.08);
          margin-top: clamp(1.25rem, 3vw, 2.5rem);
          position: relative;
          overflow: hidden;
        }

        .progress-line-fill {
          width: 100%;
          height: 100%;
          background: #5b6cff;
          transform-origin: left;
          will-change: transform;
          transition: transform 0.1s linear;
        }

        /* Bottom Center Cycling Lines */
        .preloader-phrases {
          position: absolute;
          bottom: max(2rem, env(safe-area-inset-bottom));
          left: 50%;
          transform: translateX(-50%);
          height: 1.6rem;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .phase-counter-exit .preloader-phrases,
        .phase-split-exit .preloader-phrases {
          opacity: 0;
        }

        .phrase-line {
          position: absolute;
          font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 0.88rem;
          color: #85858f;
          letter-spacing: 0.02em;
          white-space: nowrap;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.38s ease;
          will-change: transform, opacity;
        }

        .phrase-enter {
          opacity: 0;
          transform: translateY(14px);
        }

        .phrase-active {
          opacity: 1;
          transform: translateY(0);
        }

        .phrase-exit {
          opacity: 0;
          transform: translateY(-14px);
        }

        /* Responsive Safety Adjustments */
        @media (max-width: 640px) {
          .preloader-tl {
            top: max(1.25rem, env(safe-area-inset-top));
            left: max(1.25rem, env(safe-area-inset-left));
            font-size: 0.78rem;
          }
          .preloader-br {
            display: none;
          }
          .preloader-phrases {
            bottom: max(1.25rem, env(safe-area-inset-bottom));
          }
          .phrase-line {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
