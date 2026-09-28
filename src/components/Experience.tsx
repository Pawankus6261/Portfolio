import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface TrajectoryItem {
  id: string;
  category: "experience" | "education" | "certificates";
  year: string;
  period?: string;
  title: string;
  org: string;
  badge?: string;
  desc: string;
  credentialId?: string;
  highlights?: string[];
  link?: string;
}

const TRAJECTORY_DATA: TrajectoryItem[] = [
  // =============================================
  // 1. PROFESSIONAL EXPERIENCE & LEADERSHIP (Started 2024)
  // =============================================
  {
    id: "devlinkhub",
    category: "experience",
    year: "2026",
    period: "Jul 2026 — Present",
    title: "Founder & Community Head",
    org: "DevLinkHub · Self-employed",
    badge: "Founder & Leadership",
    desc: "Founded and lead DevLinkHub, a student-focused tech community connecting developers, innovators, and aspiring tech professionals. Building an open collaborative ecosystem through community hackathons, project showcases, and peer-to-peer mentoring with 1,200+ members.",
    highlights: [
      "Architected DevLinkHub platform with Next.js 14 App Router, React 18, TypeScript, and FastAPI backend with SQLite + ORM.",
      "Engineered Neo-Brutalist design system, tactile retro cards, interactive terminal CLI, and automated registration pipeline.",
      "Orchestrated 15+ collaborative open-source tech sprints, code reviews, and community workshops.",
      "Core skills: Event Management, Team Leadership, Full-Stack Architecture, and Community Building.",
    ],
    link: "https://github.com/Pawankus6261",
  },
  {
    id: "gfg-rep",
    category: "experience",
    year: "2026",
    period: "Jan 2026 — Jun 2026 · 6 mos",
    title: "Campus Representative",
    org: "GeeksforGeeks · Internship",
    badge: "Campus Leadership",
    desc: "Played a pivotal role in fostering a collaborative technical environment at college through GeeksforGeeks, driving technical problem-solving, DSA workshops, and student developer initiatives on-site.",
    highlights: [
      "Organized campus-wide coding challenges, algorithmic bootcamps, and technical contests.",
      "Mentored 200+ students on Data Structures & Algorithms, interview prep, and competitive programming.",
      "Coordinated with student bodies to expand technical awareness and participation in hackathons.",
      "Core skills: Leadership, Critical Thinking, Event Management, and Technical Mentorship.",
    ],
  },
  {
    id: "google-ambassador",
    category: "experience",
    year: "2025",
    period: "Sep 2025 — Jan 2026 · 5 mos",
    title: "Google Student Ambassador",
    org: "Google · Internship",
    badge: "Google Ambassador",
    desc: "Represented Google's developer ecosystem on-site, promoting learning, modern cloud tools, and innovation among students through interactive workshops and developer community programs.",
    highlights: [
      "Evangelized Google technologies, Google Cloud, Android, and Machine Learning tools across student cohorts.",
      "Organized study jams, technical hands-on labs, and hackathons focused on real-world engineering.",
      "Built bridges between student developers and Google developer resources.",
      "Core skills: Developer Relations, Public Speaking, Community Building, and Team Leadership.",
    ],
  },
  {
    id: "freelance-ai",
    category: "experience",
    year: "2024",
    period: "2024 — Present · Engineering",
    title: "Full Stack Developer & AI Engineer",
    org: "Independent & Open Source · Started 2024",
    badge: "AI & Full Stack",
    desc: "Started professional software engineering journey in 2024, delivering scalable full-stack web applications and AI pipelines. Built high-concurrency FastAPI backends, responsive React dashboards, and computer vision models.",
    highlights: [
      "Engineered MediSync Adherence (OCR vision models and patient medication compliance tracking).",
      "Built FasalSathii (AgriTech deep learning platform for crop pathology detection in 1.4s).",
      "Developed DRONE-VIDEO-TO-3D-MODAL (computer vision pipeline for 3D point-cloud reconstruction from drone footage).",
    ],
    link: "https://github.com/Pawankus6261",
  },

  // =============================================
  // 2. ACADEMICS & SCHOOLING (Exact Milestones)
  // =============================================
  {
    id: "btech-college",
    category: "education",
    year: "2024",
    period: "2024 — 2028 · Joined College 2024",
    title: "B.Tech in Computer Science & Engineering",
    org: "Bansal Institute of Science & Technology · AI & ML Specialization",
    badge: "Undergraduate Degree",
    desc: "Joined college in 2024 to pursue B.Tech in CSE with specialization in Artificial Intelligence and Machine Learning. Active student community founder, Google Student Ambassador, and builder.",
    highlights: [
      "Specialized Domain: Deep Learning, Neural Networks, Computer Vision, DSA, DBMS, Operating Systems, Computer Networks.",
      "Founder & Community Head of DevLinkHub on campus, leading 1,200+ student developers.",
      "Campus Representative for GeeksforGeeks and Google Student Ambassador.",
    ],
  },
  {
    id: "school-12th",
    category: "education",
    year: "2024",
    period: "2022 — 2024 · Completed 2024",
    title: "Senior Secondary Schooling (Class XII — PCM)",
    org: "Higher Secondary Board Examination · Science Stream",
    badge: "Class XII (12th Grade)",
    desc: "Completed Senior Secondary Schooling (Class 12th) in 2024 with a rigorous focus on Physics, Chemistry, Mathematics (PCM), and Computer Science.",
    highlights: [
      "Graduated high school in 2024 right before joining B.Tech Computer Science & Engineering.",
      "Strong foundation in differential calculus, linear algebra, mechanics, and algorithmic thinking.",
      "Built initial software projects in Python and C++.",
    ],
  },
  {
    id: "school-10th",
    category: "education",
    year: "2022",
    period: "2020 — 2022 · Completed 2022",
    title: "Secondary School Examination (Class X)",
    org: "High School Board Examination",
    badge: "Class X (10th Grade)",
    desc: "Completed Secondary Schooling (Class 10th) in 2022 with strong academic honors in Mathematics, Science, and Information Technology.",
    highlights: [
      "Completed Class 10th in 2022, establishing early excellence in mathematics and scientific problem solving.",
    ],
  },

  // =============================================
  // 3. CERTIFICATIONS & VERIFIED ACCREDITATIONS
  // =============================================
  {
    id: "cert-genai",
    category: "certificates",
    year: "2025",
    period: "Aug 2025 · Google Cloud & Hack2skill",
    title: "Gen AI Academy — Google Cloud & Hack2skill",
    org: "Google Cloud Skills Boost · Hack2skill",
    badge: "Google Cloud GenAI",
    credentialId: "2025H2S04GENAI-AI200138",
    desc: "Comprehensive certification covering Generative AI fundamentals, large language models (LLMs), prompt engineering, Google Cloud AI infrastructure, and multimodal solutions.",
    link: "https://certificate.hack2skill.com/user/genai12/2025H2S04GENAI-A1200138",
  },
  {
    id: "cert-aws",
    category: "certificates",
    year: "2025",
    period: "May 2025 · Amazon Web Services",
    title: "AWS Academy Graduate — Cloud Foundations",
    org: "Amazon Web Services (AWS)",
    badge: "AWS Certified",
    desc: "Accreditation in foundational cloud computing architecture, security, compute instances (EC2), storage services (S3), networking (VPC), and distributed cloud economics.",
    link: "https://www.credly.com/go/6vnhhePC",
  },
  {
    id: "cert-sql",
    category: "certificates",
    year: "2025",
    period: "Apr 2025 · HackerRank",
    title: "SQL (Basic) Certification",
    org: "HackerRank",
    badge: "HackerRank Verified",
    credentialId: "8BB4A978450F",
    desc: "Demonstrated proficiency in relational database queries, complex JOIN operations, filtering, grouping, aggregation functions, and subquery optimization.",
    link: "https://www.hackerrank.com/certificates/8bb4a978450f",
  },
  {
    id: "cert-deloitte",
    category: "certificates",
    year: "2024",
    period: "2024 · Deloitte",
    title: "Data Analytics Job Simulation",
    org: "Deloitte / Forage",
    badge: "Deloitte Verified",
    credentialId: "FwioH8fW52gtp5ySK",
    desc: "Practical corporate simulation tackling enterprise analytics problems, data forensics, visualization dashboards, and business insights presentation.",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Milestones" },
  { id: "experience", label: "Experience & Ambassadorship" },
  { id: "education", label: "Academics & Schooling" },
  { id: "certificates", label: "Certifications" },
] as const;

type FilterType = "all" | "experience" | "education" | "certificates";

const Experience = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredItems =
    activeFilter === "all"
      ? TRAJECTORY_DATA
      : TRAJECTORY_DATA.filter((item) => item.category === activeFilter);

  return (
    <section className="experience-section" id="experience">
      <div className="container">
        <ScrollReveal direction="up" distance={25} duration={0.5}>
          <div className="section-tag">04 / Trajectory & Pedigree</div>
        </ScrollReveal>

        <ScrollReveal direction="up" distance={30} duration={0.65} delay={0.1}>
          <div className="trajectory-header">
            <h2 className="work-title">Experience & Academics</h2>
            <p className="trajectory-subtitle">
              Chronicle of engineering leadership, Google & GFG ambassadorship, academic journey, and verified technical credentials.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter Pills */}
        <ScrollReveal direction="up" distance={20} duration={0.5} delay={0.15}>
          <div className="filter-pill-row" role="tablist" aria-label="Trajectory filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeFilter === cat.id}
                className={`filter-btn ${activeFilter === cat.id ? "active" : ""}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.label}
                <span className="filter-count">
                  {cat.id === "all"
                    ? TRAJECTORY_DATA.length
                    : TRAJECTORY_DATA.filter((i) => i.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Trajectory Items List with Smooth Filter Transition */}
        <div className="exp-list">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                className="exp-item"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="exp-year-col">
                  <span className="exp-year">{item.year}</span>
                  {item.badge && <span className="exp-badge">{item.badge}</span>}
                  {item.period && <span className="exp-period">{item.period}</span>}
                </div>

                <div className="exp-details">
                  <div className="exp-title-row">
                    <h3 className="exp-role-title">{item.title}</h3>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="exp-link-icon"
                        aria-label={`Verify credential or view link for ${item.title}`}
                      >
                        ↗
                      </a>
                    )}
                  </div>

                  <div className="exp-org-row">
                    <span className="exp-role-org">{item.org}</span>
                    {item.credentialId && (
                      <span className="exp-credential-tag">
                        <span className="credential-label">ID:</span>
                        <span className="credential-code">{item.credentialId}</span>
                      </span>
                    )}
                  </div>

                  <p className="exp-desc">{item.desc}</p>

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="exp-highlights">
                      {item.highlights.map((hl, i) => (
                        <li key={i} className="exp-highlight-item">
                          <span className="bullet-point">▸</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.link && (
                    <div className="exp-action-row">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="exp-verify-pill"
                      >
                        Verify Credential ↗
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .experience-section {
          padding: clamp(3.5rem, 8vh, 8rem) 0;
          position: relative;
          border-bottom: 1px solid var(--hairline);
        }

        .trajectory-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: clamp(2rem, 5vh, 4rem);
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .trajectory-subtitle {
          font-size: 1.05rem;
          color: var(--muted-gray);
          max-width: 44ch;
          line-height: 1.6;
        }

        .filter-pill-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: clamp(2.5rem, 5vh, 4rem);
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--hairline);
        }

        .filter-btn {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 500;
          padding: 0.5rem 1.1rem;
          border-radius: 9999px;
          border: 1px solid var(--hairline-strong);
          background: var(--deep-gray);
          color: var(--muted-gray);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
          transition: all 0.25s var(--ease-out);
        }

        .filter-btn:hover {
          color: var(--bone);
          border-color: var(--bone);
        }

        .filter-btn.active {
          background: var(--accent);
          color: #ffffff;
          border-color: var(--accent);
          box-shadow: 0 4px 16px var(--accent-glow);
        }

        .filter-count {
          font-size: 0.7rem;
          opacity: 0.75;
          padding: 0.1rem 0.4rem;
          border-radius: 9999px;
          background: rgba(0, 0, 0, 0.2);
        }

        .exp-list {
          display: flex;
          flex-direction: column;
        }

        .exp-item {
          display: grid;
          grid-template-columns: clamp(140px, 22vw, 240px) 1fr;
          gap: 2.5rem;
          padding: clamp(2.2rem, 4.5vh, 3.5rem) 0;
          border-bottom: 1px solid var(--hairline);
          align-items: baseline;
          transition: transform 0.35s var(--ease-out);
        }

        .exp-item:first-child {
          border-top: 1px solid var(--hairline);
        }

        .exp-item:hover {
          transform: translateX(1.2rem);
        }

        .exp-year-col {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .exp-year {
          font-family: 'Bricolage Grotesque', var(--font-display);
          font-weight: 800;
          font-size: clamp(3rem, 6.5vw, 6rem);
          line-height: 0.85;
          letter-spacing: -0.04em;
          color: var(--ink);
          -webkit-text-stroke: 1.8px var(--muted-gray);
          paint-order: stroke fill;
          transition: color 0.35s var(--ease-out), -webkit-text-stroke-color 0.35s;
        }

        .exp-item:hover .exp-year {
          color: var(--accent);
          -webkit-text-stroke-color: var(--accent);
        }

        .exp-badge {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--accent);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(91, 108, 255, 0.08);
          border: 1px solid rgba(91, 108, 255, 0.2);
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
          display: inline-block;
          width: fit-content;
        }

        .exp-period {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--muted-gray);
          letter-spacing: 0.02em;
        }

        .exp-details {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .exp-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .exp-role-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(1.6rem, 2.6vw, 2.4rem);
          letter-spacing: -0.02em;
          color: var(--bone);
        }

        .exp-link-icon {
          color: var(--accent);
          font-size: 1.1rem;
          font-weight: 700;
          transition: transform 0.2s;
        }

        .exp-link-icon:hover {
          transform: translate(2px, -2px);
        }

        .exp-org-row {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          flex-wrap: wrap;
        }

        .exp-credential-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--hairline-strong);
          padding: 0.18rem 0.55rem;
          border-radius: 4px;
        }

        .credential-label {
          color: var(--muted-gray);
          font-weight: 500;
        }

        .credential-code {
          color: var(--bone);
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        .exp-role-org {
          font-family: var(--font-mono);
          font-size: 0.84rem;
          color: var(--accent);
          letter-spacing: 0.05em;
        }

        .exp-desc {
          font-size: 1.05rem;
          color: var(--muted-gray);
          max-width: 65ch;
          line-height: 1.6;
          margin-top: 0.4rem;
        }

        .exp-action-row {
          margin-top: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .exp-verify-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--accent);
          background: rgba(91, 108, 255, 0.08);
          border: 1px solid rgba(91, 108, 255, 0.25);
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.25s var(--ease-out);
        }

        .exp-verify-pill:hover {
          background: var(--accent);
          color: #ffffff;
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px var(--accent-glow);
        }

        .exp-highlights {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-top: 0.75rem;
          padding-left: 0.2rem;
        }

        .exp-highlight-item {
          font-size: 0.95rem;
          color: #c4c0b8;
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
          line-height: 1.5;
        }

        .bullet-point {
          color: var(--accent);
          font-size: 0.8rem;
        }

        @media (max-width: 768px) {
          .filter-pill-row {
            overflow-x: auto;
            flex-wrap: nowrap;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 0.85rem;
            scrollbar-width: none;
          }
          .filter-pill-row::-webkit-scrollbar {
            display: none;
          }
          .exp-item {
            grid-template-columns: 1fr;
            gap: 0.85rem;
            padding: 1.8rem 0;
          }
          .exp-item:hover {
            transform: none;
          }
          .exp-year {
            font-size: clamp(2.2rem, 6.5vw, 6rem);
          }
          .exp-role-title {
            font-size: 1.3rem;
          }
          .exp-desc {
            font-size: 0.96rem;
          }
          .exp-highlight-item {
            font-size: 0.88rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;