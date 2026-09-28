import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface CaseStudyChapter {
  title: string;
  body: string;
}

interface ProjectData {
  id: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  outcome: string;
  artSvg: string;
  chapters: CaseStudyChapter[];
  link?: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: "devlinkhub",
    name: "DevLinkHub",
    category: "01 · Ecosystem Platform & Community",
    description:
      "A collaborative open-source ecosystem engineered to empower developers with peer-to-peer mentoring, collaborative code sprints, and unified project discovery. Built and founded from zero to thousands of active peers.",
    stack: ["Next.js 14", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    outcome: "1,200+ Active Members & 15+ Shipped Sprints",
    link: "https://github.com/Pawankus6261",
    artSvg: `
      <svg viewBox="0 0 600 375" fill="none" style="width:100%;height:100%;">
        <rect width="600" height="375" fill="#0e0e13" />
        <circle cx="150" cy="180" r="4" fill="#5b6cff" />
        <circle cx="280" cy="100" r="6" fill="#efece6" />
        <circle cx="380" cy="220" r="5" fill="#5b6cff" />
        <circle cx="480" cy="140" r="4" fill="#efece6" />
        <circle cx="300" cy="280" r="7" fill="#5b6cff" />
        <line x1="150" y1="180" x2="280" y2="100" stroke="#5b6cff" stroke-width="1.5" stroke-opacity="0.4" />
        <line x1="280" y1="100" x2="380" y2="220" stroke="#efece6" stroke-width="1.5" stroke-opacity="0.3" />
        <line x1="380" y1="220" x2="480" y2="140" stroke="#5b6cff" stroke-width="1.5" stroke-opacity="0.4" />
        <line x1="380" y1="220" x2="300" y2="280" stroke="#5b6cff" stroke-width="2" stroke-opacity="0.6" />
        <circle cx="300" cy="190" r="80" stroke="#5b6cff" stroke-width="1" stroke-dasharray="4 6" opacity="0.5"/>
        <text x="300" y="196" fill="#efece6" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="28" text-anchor="middle" letter-spacing="2">DEVLINKHUB</text>
        <text x="300" y="222" fill="#5b6cff" font-family="JetBrains Mono, monospace" font-size="11" text-anchor="middle" letter-spacing="4">COMMUNITY ECOSYSTEM</text>
      </svg>
    `,
    chapters: [
      {
        title: "01. Introduction",
        body: "DevLinkHub was conceived out of a fundamental gap in the developer journey: the friction between learning syntax in isolation and shipping production code inside collaborative engineering teams. As founder and community head, I designed DevLinkHub to bridge self-taught engineers, students, and open-source contributors into high-velocity sprint cohorts.",
      },
      {
        title: "02. Problem",
        body: "Traditional forums and developer channels suffer from signal degradation, unstructured thread fragmentation, and lack of accountability. Junior builders struggle to get architectural code reviews, while mentors lack intuitive tooling to guide multi-contributor projects without getting overwhelmed.",
      },
      {
        title: "03. Concept",
        body: "A unified platform centered around 'Sprint Pods'—time-boxed, micro-cohort initiatives where developers collaborate on open-source repositories with strict pull-request reviews, automated CI verification, and public showcase telemetry.",
      },
      {
        title: "04. Development",
        body: "Engineered with Next.js 14 App Router, TypeScript, and Tailwind CSS on the frontend for immediate page loads and responsive state handling. The backend leverages Node.js with PostgreSQL and Prisma ORM, utilizing connection pooling for sub-50ms query responses during community live sprints.",
      },
      {
        title: "05. Architecture",
        body: "Multi-tier decoupled architecture: static edge generation for community showcase pages, real-time WebSocket communication for collaborative sprint channels, and Redis caching for trending repository matrices and live member activity feeds.",
      },
      {
        title: "06. Outcome & Impact",
        body: "Scaled rapidly to over 1,200 active community engineers, successfully orchestrating 15+ comprehensive tech sprints, yielding dozens of open-source repositories and verified portfolio projects for members.",
      },
      {
        title: "07. Project Link",
        body: "Explore the community and code on GitHub: https://github.com/Pawankus6261",
      },
    ],
  },
  {
    id: "medisync",
    name: "MediSync Adherence",
    category: "02 · HealthTech & Predictive AI",
    description:
      "Intelligent patient medication adherence and interaction alert system. Features OCR prescription scanning with vision models, multi-factor behavioral compliance forecasting, and automated family alert escalations.",
    stack: ["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL"],
    outcome: "94.8% Adherence Precision & Sub-second OCR",
    link: "https://github.com/Pawankus6261",
    artSvg: `
      <svg viewBox="0 0 600 375" fill="none" style="width:100%;height:100%;">
        <rect width="600" height="375" fill="#0d0e14" />
        <path d="M 50 200 L 180 200 L 210 130 L 240 270 L 270 170 L 300 220 L 330 200 L 550 200" stroke="#5b6cff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="210" cy="130" r="5" fill="#efece6"/>
        <circle cx="240" cy="270" r="5" fill="#5b6cff"/>
        <circle cx="270" cy="170" r="5" fill="#efece6"/>
        <text x="300" y="85" fill="#efece6" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="28" text-anchor="middle" letter-spacing="2">MEDISYNC</text>
        <text x="300" y="110" fill="#5b6cff" font-family="JetBrains Mono, monospace" font-size="11" text-anchor="middle" letter-spacing="3">AI PATIENT ADHERENCE</text>
      </svg>
    `,
    chapters: [
      {
        title: "01. Introduction",
        body: "MediSync Adherence is an intelligent patient-care system created to address prescription non-compliance—a leading contributor to preventable health complications and hospital readmissions worldwide.",
      },
      {
        title: "02. Problem",
        body: "Patients with chronic conditions frequently misunderstand doctor handwritings, forget multi-dose schedules, or accidentally take contraindicated medications due to disjointed healthcare records.",
      },
      {
        title: "03. Concept",
        body: "An end-to-end mobile and web companion: scan a prescription via camera, instantly extract dosage, timing, and active compounds via OCR, cross-check drug-to-drug interactions in real time, and deploy predictive reminders tailored to patient wake-sleep patterns.",
      },
      {
        title: "04. Development",
        body: "Built using Python and TensorFlow for OCR post-processing and compliance forecasting models. The API layer is powered by FastAPI with async worker threads, serving JSON payloads in under 120ms to a sleek React dashboard.",
      },
      {
        title: "05. Architecture",
        body: "Encrypted HIPAA-conscious schema over PostgreSQL, secure token-based authorization, automated multi-channel alert dispatchers (SMS, push, email), and an inference microservice deployed with Docker.",
      },
      {
        title: "06. Outcome & Impact",
        body: "Demonstrated 94.8% medication adherence prediction accuracy across benchmark patient cohorts, cutting prescription entry times from 5 minutes down to an automated 1.2-second image scan.",
      },
      {
        title: "07. Project Link",
        body: "View source code & documentation on GitHub: https://github.com/Pawankus6261",
      },
    ],
  },
  {
    id: "fasalsathii",
    name: "FasalSathii",
    category: "03 · AgriTech & Computer Vision",
    description:
      "AI-driven agronomy platform diagnosing crop pathology via smartphone camera snapshots. Provides hyper-local meteorological forecasts, vernacular soil enrichment advisories, and treatment guidance for rural farmers.",
    stack: ["PyTorch", "Computer Vision", "FastAPI", "React", "Leaflet"],
    outcome: "96.2% Diagnostic Accuracy in 1.4s Inference",
    link: "https://github.com/Pawankus6261",
    artSvg: `
      <svg viewBox="0 0 600 375" fill="none" style="width:100%;height:100%;">
        <rect width="600" height="375" fill="#0d1012" />
        <rect x="180" y="90" width="240" height="195" rx="12" stroke="#efece6" stroke-width="1" stroke-dasharray="8 6" opacity="0.4"/>
        <line x1="300" y1="75" x2="300" y2="300" stroke="#5b6cff" stroke-width="1" stroke-opacity="0.5" />
        <line x1="165" y1="187" x2="435" y2="187" stroke="#5b6cff" stroke-width="1" stroke-opacity="0.5" />
        <circle cx="300" cy="187" r="45" stroke="#efece6" stroke-width="1.5" stroke-opacity="0.8"/>
        <text x="300" y="194" fill="#efece6" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="28" text-anchor="middle" letter-spacing="2">FASALSATHII</text>
        <text x="300" y="218" fill="#5b6cff" font-family="JetBrains Mono, monospace" font-size="11" text-anchor="middle" letter-spacing="3">COMPUTER VISION AGRITECH</text>
      </svg>
    `,
    chapters: [
      {
        title: "01. Introduction",
        body: "FasalSathii is an AI-powered agronomy platform designed to empower smallholder farmers with instant disease diagnostics, meteorological alerts, and soil treatment recommendations in regional vernacular languages.",
      },
      {
        title: "02. Problem",
        body: "Crop infections and pests spread rapidly through fields before agricultural extension officers can perform physical inspections. Farmers often lose up to 35% of crop yield due to delayed or improper chemical remedies.",
      },
      {
        title: "03. Concept",
        body: "A lightweight, low-bandwidth computer vision system that classifies leaf pathologies directly from field photos and immediately delivers actionable, organic and chemical recovery steps with local language audio outputs.",
      },
      {
        title: "04. Development",
        body: "Trained a convolutional deep learning architecture on thousands of crop disease samples using PyTorch. Quantized the model for swift edge execution, integrated weather APIs for micro-climate forecasting, and built an intuitive, accessible React frontend.",
      },
      {
        title: "05. Architecture",
        body: "Containerized inference pipeline via Docker, served through an asynchronous FastAPI gateway with intelligent client-side image compression to function seamlessly even over 2G/3G rural networks.",
      },
      {
        title: "06. Outcome & Impact",
        body: "Attained 96.2% diagnostic accuracy across 18 major crop classifications, delivering inferences within 1.4 seconds and actively tested by over 500 regional farmers.",
      },
      {
        title: "07. Project Link",
        body: "View source code & documentation on GitHub: https://github.com/Pawankus6261/Fasal-sathi",
      },
    ],
  },
  {
    id: "drone-3d",
    name: "Drone Video to 3D",
    category: "04 · Spatial Computing & Computer Vision",
    description:
      "Advanced photogrammetry pipeline translating raw aerial drone video feeds into dense 3D point-cloud spatial reconstructions and textured triangular meshes using feature matching and camera pose estimation.",
    stack: ["Python", "OpenCV", "Three.js", "NumPy", "FastAPI"],
    outcome: "Sub-pixel feature tracking & rapid 3D point-cloud extraction",
    link: "https://github.com/Pawankus6261/DRONE-VIDEO-TO-3D-MODAL",
    artSvg: `
      <svg viewBox="0 0 600 375" fill="none" style="width:100%;height:100%;">
        <rect width="600" height="375" fill="#0d0f14" />
        <defs>
          <radialGradient id="g4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#5b6cff" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#08080a" stop-opacity="0.95"/>
          </radialGradient>
        </defs>
        <rect width="600" height="375" fill="url(#g4)" />
        <!-- 3D wireframe cube -->
        <polygon points="300,100 420,160 420,280 300,220" stroke="#5b6cff" stroke-width="1.5" fill="rgba(91,108,255,0.08)"/>
        <polygon points="300,100 180,160 180,280 300,220" stroke="#efece6" stroke-width="1.5" fill="rgba(239,236,230,0.04)"/>
        <polygon points="300,100 420,160 300,220 180,160" stroke="#5b6cff" stroke-width="1.5" fill="rgba(91,108,255,0.12)"/>
        <text x="300" y="80" fill="#efece6" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="28" text-anchor="middle" letter-spacing="2">DRONE 3D VISION</text>
        <text x="300" y="320" fill="#5b6cff" font-family="JetBrains Mono, monospace" font-size="11" text-anchor="middle" letter-spacing="3">PHOTOGRAMMETRIC POINT CLOUD</text>
      </svg>
    `,
    chapters: [
      {
        title: "01. Introduction",
        body: "DRONE-VIDEO-TO-3D-MODAL is a computer vision research project that reconstructs physical 3D spatial terrain models from uncalibrated aerial drone camera video footage without requiring expensive LiDAR scanners.",
      },
      {
        title: "02. Problem",
        body: "Surveying rugged agricultural land or industrial infrastructure traditionally requires multi-thousand-dollar LiDAR equipment or cumbersome terrestrial survey teams, creating prohibitive costs for small developers and researchers.",
      },
      {
        title: "03. Concept",
        body: "Structure-from-Motion (SfM) pipeline: extract video keyframes, compute SIFT/ORB feature keypoints, establish optical flow correspondences, estimate camera intrinsic and extrinsic poses, and perform multi-view triangulation.",
      },
      {
        title: "04. Development",
        body: "Implemented in Python utilizing OpenCV, NumPy matrix transformations, and Open3D for dense point cloud generation and Poisson surface reconstruction, visualized interactively in the browser with Three.js.",
      },
      {
        title: "05. Architecture",
        body: "Modular processing pipeline: video pre-filtering -> keyframe decimation -> descriptor matching -> bundle adjustment -> point cloud voxel filtering -> mesh decimation -> glTF 3D export.",
      },
      {
        title: "06. Outcome & Impact",
        body: "Achieved dense point cloud extraction from standard 4K consumer drone videos with robust camera trajectory recovery under varying daylight conditions.",
      },
      {
        title: "07. Project Link",
        body: "View source code & documentation on GitHub: https://github.com/Pawankus6261/DRONE-VIDEO-TO-3D-MODAL",
      },
    ],
  },
];

const Work = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // Esc key listener to close modal
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll and Lenis when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.lenis?.stop();
    } else {
      document.body.style.overflow = "";
      window.lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      window.lenis?.start();
    };
  }, [selectedProject]);

  return (
    <section className="work-section" id="work">
      <div className="container">
        <ScrollReveal direction="up" distance={30} duration={0.6}>
          <div className="work-header">
            <div className="section-tag">03 / Selected Work</div>
            <h2 className="work-title">Featured Projects</h2>
          </div>
        </ScrollReveal>

        <div className="projects-list">
          {PROJECTS.map((proj, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <ScrollReveal
                key={proj.id}
                direction="up"
                distance={35}
                duration={0.7}
                delay={idx * 0.08}
              >
                <article
                  className={`project-row ${isReversed ? "reversed" : ""}`}
                  onClick={() => setSelectedProject(proj)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open case study for ${proj.name}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedProject(proj);
                    }
                  }}
                >
                  {/* Visual Art Panel */}
                  <div className="project-visual-col">
                    <div
                      className="project-visual-panel"
                      dangerouslySetInnerHTML={{ __html: proj.artSvg }}
                    />
                  </div>

                  {/* Info Column */}
                  <div className="project-info-col">
                    <span className="project-category">{proj.category}</span>
                    <h3 className="project-name">{proj.name}</h3>
                    <p className="project-description">{proj.description}</p>

                    <div className="project-pills">
                      {proj.stack.map((st) => (
                        <span key={st} className="project-pill">
                          {st}
                        </span>
                      ))}
                    </div>

                    <div className="project-outcome">
                      <span>Outcome:</span>
                      <span className="project-outcome-metric">{proj.outcome}</span>
                    </div>

                    <div className="case-study-prompt">Explore Case Study ↗</div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* FULL-SCREEN SLIDE-UP CASE STUDY OVERLAY WITH SMOOTH TRANSITION */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="case-study-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title-el"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="case-study-motion-wrap"
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                className="case-study-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close Case Study"
              >
                ✕
              </button>

              <div className="container">
                <div
                  className="modal-hero-art"
                  dangerouslySetInnerHTML={{ __html: selectedProject.artSvg }}
                />

                <div className="modal-header-section">
                  <div className="modal-category">{selectedProject.category}</div>
                  <h2 className="modal-title" id="modal-title-el">
                    {selectedProject.name}
                  </h2>
                  <div className="modal-stack-row">
                    {selectedProject.stack.map((st) => (
                      <span
                        key={st}
                        className="project-pill"
                        style={{ fontSize: "0.8rem", padding: "0.4rem 0.9rem" }}
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="case-study-grid">
                  {selectedProject.chapters.map((ch, i) => (
                    <div key={i} className="case-study-chapter">
                      <h4 className="chapter-heading">{ch.title}</h4>
                      <div className="chapter-content">
                        <p>{ch.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .work-section {
          padding: clamp(3.5rem, 8vh, 8rem) 0;
          position: relative;
          border-bottom: 1px solid var(--hairline);
        }

        .work-header {
          margin-bottom: clamp(2.5rem, 6vh, 5rem);
        }

        .work-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(2.2rem, 7vw, 7rem);
          line-height: 0.92;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: var(--bone);
        }

        .projects-list {
          display: flex;
          flex-direction: column;
          gap: clamp(3.5rem, 7vh, 7rem);
        }

        .project-row {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: clamp(2rem, 5vw, 6rem);
          align-items: center;
          cursor: pointer;
        }

        .project-row.reversed {
          grid-template-columns: 0.85fr 1.15fr;
        }

        .project-row.reversed .project-visual-col {
          order: 2;
        }

        .project-row.reversed .project-info-col {
          order: 1;
        }

        .project-visual-panel {
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 12px;
          overflow: hidden;
          background: var(--surface);
          border: 1px solid var(--hairline-strong);
          transition: transform 0.5s var(--ease-out), border-color 0.4s;
        }

        .project-row:hover .project-visual-panel {
          transform: scale(1.02);
          border-color: var(--accent);
        }

        .project-category {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.75rem;
        }

        .project-name {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          line-height: 0.95;
          letter-spacing: -0.035em;
          margin-bottom: 1.25rem;
          color: var(--bone);
          transition: color 0.35s var(--ease-out), transform 0.35s var(--ease-out);
        }

        .project-row:hover .project-name {
          color: var(--accent);
          transform: translateX(10px);
        }

        .project-description {
          font-size: 1.05rem;
          color: var(--muted-gray);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          max-width: 48ch;
        }

        .project-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
        }

        .project-pill {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--bone);
          background: var(--deep-gray);
          border: 1px solid var(--hairline);
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
        }

        .project-outcome {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--bone);
          font-weight: 500;
          padding-top: 1.25rem;
          border-top: 1px solid var(--hairline);
        }

        .project-outcome-metric {
          color: var(--accent);
          font-family: var(--font-mono);
          font-weight: 600;
        }

        .case-study-prompt {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.25rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--accent);
          letter-spacing: 0.08em;
          font-weight: 500;
        }

        /* Case study overlay modal */
        .case-study-overlay {
          position: fixed;
          inset: 0;
          background: rgba(8, 8, 10, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 10001;
          overflow-y: auto;
          padding: clamp(2rem, 5vh, 4rem) 0 6rem;
        }

        .case-study-motion-wrap {
          width: 100%;
        }

        .case-study-close-btn {
          position: fixed;
          top: 2rem;
          right: clamp(1.5rem, 5vw, 4rem);
          z-index: 10002;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--deep-gray);
          border: 1px solid var(--hairline-strong);
          color: var(--bone);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          transition: all 0.25s;
        }

        .case-study-close-btn:hover {
          background: var(--accent);
          color: #fff;
          transform: rotate(90deg);
        }

        .modal-hero-art {
          width: 100%;
          max-height: 440px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 3.5rem;
          border: 1px solid var(--hairline-strong);
          background: var(--surface);
        }

        .modal-header-section {
          margin-bottom: 4rem;
        }

        .modal-category {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--accent);
          letter-spacing: 0.12em;
          margin-bottom: 0.75rem;
        }

        .modal-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(3rem, 7vw, 6.5rem);
          line-height: 0.92;
          letter-spacing: -0.04em;
          margin-bottom: 1.5rem;
        }

        .modal-stack-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .case-study-grid {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        .case-study-chapter {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 3rem;
          padding-top: 2.5rem;
          border-top: 1px solid var(--hairline);
        }

        .chapter-heading {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.6rem;
          letter-spacing: -0.02em;
          color: var(--accent);
        }

        .chapter-content {
          font-size: 1.12rem;
          color: #c4c0b8;
          line-height: 1.7;
        }

        @media (max-width: 860px) {
          .project-row, .project-row.reversed {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .project-row.reversed .project-visual-col { order: 1; }
          .project-row.reversed .project-info-col { order: 2; }
          .project-name {
            font-size: clamp(1.75rem, 5.5vw, 2.5rem);
          }
          .case-study-close-btn {
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }
          .modal-hero-art {
            max-height: 240px;
            margin-bottom: 2rem;
          }
          .modal-header-section {
            margin-bottom: 2.5rem;
          }
          .modal-title {
            font-size: clamp(2rem, 7vw, 3.5rem);
          }
          .case-study-grid {
            gap: 2rem;
          }
          .case-study-chapter {
            grid-template-columns: 1fr;
            gap: 0.75rem;
            padding-top: 1.5rem;
          }
          .chapter-heading {
            font-size: 1.25rem;
          }
          .chapter-content {
            font-size: 0.98rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Work;
