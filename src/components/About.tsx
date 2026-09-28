import { useEffect, useRef } from "react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";

const ABOUT_TEXT =
  "I am a software engineer and AI researcher obsessed with the convergence of intelligent deep models and tactile digital systems. Currently pursuing B.Tech in CSE with specialization in AI & Machine Learning (2024–2028), while leading DevLinkHub as founder and community head. I bridge complex theoretical architectures into high-throughput, beautifully orchestrated production products that perform under real-world scale.";

const FACTS = [
  { label: "01 · Community", value: "Founder & Head @ DevLinkHub" },
  { label: "02 · Ambassadorship", value: "Google & GFG Ambassador" },
  { label: "03 · Education", value: "B.Tech CSE (AI & ML) · 2024–2028" },
  { label: "04 · Location", value: "Bhopal, MP, India" },
];

const About = () => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const p = paragraphRef.current;
    if (!p) return;

    const words = p.querySelectorAll<HTMLSpanElement>(".scroll-word");

    const onScroll = () => {
      const triggerY = window.innerHeight * 0.78;
      words.forEach((w) => {
        const rect = w.getBoundingClientRect();
        if (rect.top < triggerY) {
          w.classList.add("lit");
        } else {
          w.classList.remove("lit");
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const words = ABOUT_TEXT.split(" ");

  return (
    <section className="about-section" id="about">
      <div className="container">
        <ScrollReveal direction="up" distance={20} duration={0.5}>
          <div className="section-tag">01 / About</div>
        </ScrollReveal>

        {/* Huge Editorial Statement with Progressive Word Lighting */}
        <ScrollReveal direction="up" distance={30} duration={0.7} delay={0.1}>
          <p className="about-paragraph" ref={paragraphRef}>
            {words.map((word, idx) => (
              <span key={idx}>
                <span className="scroll-word">{word}</span>
              </span>
            ))}
          </p>
        </ScrollReveal>

        {/* Minimal Facts Row with Staggered Entrance */}
        <StaggerContainer className="facts-grid" delayChildren={0.15} staggerDelay={0.09}>
          {FACTS.map((fact, idx) => (
            <StaggerItem key={idx}>
              <div className="fact-item">
                <span className="fact-label">{fact.label}</span>
                <span className="fact-value">{fact.value}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <style>{`
        .about-section {
          padding: clamp(3.5rem, 8vh, 8rem) 0;
          position: relative;
          border-bottom: 1px solid var(--hairline);
        }

        .about-paragraph {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(1.4rem, 4.2vw, 4.4rem);
          line-height: 1.35;
          letter-spacing: -0.025em;
          color: #24242a;
          max-width: 1200px;
          margin-bottom: clamp(2.5rem, 6vh, 6rem);
          word-spacing: 0.08em;
        }

        .scroll-word {
          display: inline-block;
          margin-right: 0.28em;
          margin-bottom: 0.12em;
          transition: color 0.25s ease, opacity 0.25s ease;
          opacity: 0.22;
          color: #383842;
        }

        .scroll-word.lit {
          opacity: 1;
          color: var(--bone);
        }

        .facts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
          padding-top: 2.5rem;
          border-top: 1px solid var(--hairline);
        }

        .fact-item {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .fact-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          color: var(--muted-gray);
          text-transform: uppercase;
        }

        .fact-value {
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--bone);
          letter-spacing: -0.01em;
        }

        @media (max-width: 640px) {
          .facts-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding-top: 2rem;
          }
          .fact-value {
            font-size: 0.98rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;