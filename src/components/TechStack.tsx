import { useState } from "react";

interface TechItem {
  name: string;
  desc: string;
}

const TECHNOLOGIES: TechItem[] = [
  { name: "Next.js", desc: "Primary production framework for server-rendered, performance-critical web platforms with App Router & SSR." },
  { name: "TypeScript", desc: "Strict static typing across full-stack boundaries, shared interfaces, and zero runtime surprises." },
  { name: "React", desc: "Modular component architectures, concurrent rendering hooks, and state machine orchestration." },
  { name: "TensorFlow", desc: "Designing, training, and quantizing custom neural networks for mobile and edge inference." },
  { name: "Python", desc: "Core weapon for mathematical computing, automated ML pipelines, and computer vision models." },
  { name: "FastAPI", desc: "Asynchronous high-throughput microservices, WebSocket endpoints, and automatic OpenAPI generation." },
  { name: "Node.js", desc: "Event-driven runtime for microservices, streaming file I/O, and real-time community systems." },
  { name: "PostgreSQL", desc: "Relational schema modeling, foreign key constraints, connection pooling, and indexing strategy." },
  { name: "GSAP", desc: "Timeline-controlled motion sequencing, SVG path morphs, and smooth choreographed scroll mechanics." },
  { name: "Lenis", desc: "Inertial smooth scrolling engine preserving native browser accessibility and momentum." },
  { name: "Canvas", desc: "Hardware-accelerated 2D/3D pixel rendering, custom particle simulations, and generative art." },
  { name: "Tailwind", desc: "Systematic tokenized styling, responsive utility constraints, and lean zero-runtime CSS." },
  { name: "Docker", desc: "Containerized microservice workflows, reproducible environments, and automated CI/CD builds." },
  { name: "PyTorch", desc: "Deep learning model research, transfer learning, and computer vision classification backbones." },
  { name: "Redis", desc: "In-memory sub-millisecond caching, rate-limiting, and distributed pub/sub pub-queues." },
  { name: "GraphQL", desc: "Declarative schema querying, eliminating over-fetching, and unified data aggregation." },
  { name: "Figma", desc: "Precision typographic grids, design token definitions, and interaction wireframes." },
];

const TechStack = () => {
  const [activeTech, setActiveTech] = useState<TechItem>(TECHNOLOGIES[0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="stack-section" id="stack">
      <div className="container">
        <div className="stack-header">
          <div>
            <div className="section-tag" style={{ color: "var(--ink)" }}>
              02 / Technology Ecosystem
            </div>
            <h2 className="stack-title">Engineering Arsenal</h2>
          </div>
          <p className="stack-subtitle">
            An interactive map of core tools and frameworks I leverage to design, optimize, and deploy resilient digital artifacts.
          </p>
        </div>

        {/* Giant Interactive Word Cloud */}
        <div className={`word-cloud-container ${isHovered ? "has-hover" : ""}`}>
          {TECHNOLOGIES.map((item) => (
            <button
              key={item.name}
              className={`cloud-tag ${activeTech.name === item.name ? "active-tag" : ""}`}
              onClick={() => setActiveTech(item)}
              onMouseEnter={() => {
                setActiveTech(item);
                setIsHovered(true);
              }}
              onFocus={() => {
                setActiveTech(item);
                setIsHovered(true);
              }}
              onMouseLeave={() => setIsHovered(false)}
              onBlur={() => setIsHovered(false)}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Dynamic Contextual Readout Line */}
        <div className="stack-readout-panel">
          <span className="readout-tag-name">{activeTech.name}</span>
          <span className="readout-description">{activeTech.desc}</span>
        </div>
      </div>

      <style>{`
        .stack-section {
          background: var(--bone);
          color: var(--ink);
          padding: clamp(3.5rem, 8vh, 8rem) 0;
          position: relative;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .stack-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: clamp(2.5rem, 5vh, 4rem);
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .stack-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(2.2rem, 6vw, 6rem);
          line-height: 0.92;
          letter-spacing: -0.04em;
          text-transform: uppercase;
        }

        .stack-subtitle {
          font-size: 1.05rem;
          color: #555560;
          max-width: 38ch;
        }

        .word-cloud-container {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(0.5rem, 1.8vw, 1.75rem);
          align-items: center;
          justify-content: flex-start;
          margin-bottom: clamp(2.5rem, 5vh, 4rem);
        }

        .cloud-tag {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.2rem, 3.8vw, 3.8rem);
          letter-spacing: -0.035em;
          padding: 0.35rem 0.9rem;
          border-radius: 9999px;
          border: 1px solid rgba(8, 8, 10, 0.12);
          color: var(--ink);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s var(--ease-out);
          will-change: transform;
        }

        .cloud-tag:hover, .cloud-tag:focus-visible, .cloud-tag.active-tag {
          background: var(--accent);
          color: #ffffff;
          border-color: var(--accent);
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 12px 28px rgba(91, 108, 255, 0.25);
        }

        .word-cloud-container.has-hover .cloud-tag:not(:hover):not(:focus-visible) {
          opacity: 0.3;
        }

        .stack-readout-panel {
          padding: 1.5rem 1.75rem;
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid rgba(8, 8, 10, 0.08);
          display: flex;
          align-items: center;
          gap: 1.25rem;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.04);
          min-height: 76px;
        }

        .readout-tag-name {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent);
          background: rgba(91, 108, 255, 0.08);
          padding: 0.35rem 0.85rem;
          border-radius: 6px;
          white-space: nowrap;
        }

        .readout-description {
          font-size: 1.1rem;
          font-weight: 500;
          color: #202025;
          line-height: 1.4;
          transition: opacity 0.2s ease;
        }

        @media (max-width: 768px) {
          .cloud-tag {
            font-size: clamp(1rem, 3.2vw, 1.4rem);
            padding: 0.3rem 0.75rem;
          }
          .stack-readout-panel {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
            padding: 1.25rem;
          }
          .readout-description {
            font-size: 0.95rem;
            line-height: 1.5;
          }
        }
      `}</style>
    </section>
  );
};

export default TechStack;
