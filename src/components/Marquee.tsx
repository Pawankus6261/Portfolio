const Marquee = () => {
  const items = [
    "Full Stack Architecture",
    "AI & Machine Learning",
    "Founder @ DevLinkHub",
    "High-Concurrency Microservices",
    "Next.js & TypeScript",
    "TensorFlow & PyTorch",
    "Tactile Creative Engineering",
  ];

  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track">
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="marquee-item">
            {item}
            <span className="marquee-bullet" />
          </div>
        ))}
      </div>

      <style>{`
        .marquee-section {
          background: var(--accent);
          color: var(--ink);
          padding: 1.1rem 0;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        }

        .marquee-track {
          display: inline-flex;
          animation: marqueeScroll 24s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .marquee-item {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.2rem, 2.2vw, 1.8rem);
          letter-spacing: -0.02em;
          text-transform: uppercase;
          padding: 0 1.5rem;
          display: inline-flex;
          align-items: center;
          gap: 1.5rem;
        }

        .marquee-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--ink);
          opacity: 0.65;
        }

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 640px) {
          .marquee-section {
            padding: 0.75rem 0;
          }
          .marquee-item {
            font-size: 0.95rem;
            padding: 0 1rem;
            gap: 1rem;
          }
          .marquee-bullet {
            width: 6px;
            height: 6px;
          }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
