import { useState } from "react";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact.pawan62@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    });
  };

  return (
    <section className="contact-section" id="contact">
      {/* Concentric slowly rotating orbit rings */}
      <svg className="orbit-background" viewBox="0 0 900 900" fill="none">
        <circle cx="450" cy="450" r="420" stroke="#08080a" strokeWidth="1.5" strokeDasharray="8 12" />
        <circle cx="450" cy="450" r="320" stroke="#08080a" strokeWidth="2" strokeDasharray="14 18" />
        <circle cx="450" cy="450" r="220" stroke="#08080a" strokeWidth="1" strokeDasharray="6 8" />
        <circle cx="450" cy="450" r="120" stroke="#08080a" strokeWidth="2" />
        <circle cx="450" cy="130" r="9" fill="#08080a" />
        <circle cx="670" cy="450" r="12" fill="#08080a" />
        <circle cx="340" cy="620" r="7" fill="#08080a" />
      </svg>

      <div className="container contact-container">
        <div className="contact-eyebrow">05 / Initiate Conversation</div>
        <h2 className="contact-hero-statement">
          Let’s build something worth remembering.
        </h2>

        <div className="contact-actions-grid">
          <a
            href="mailto:contact.pawan62@gmail.com"
            className="contact-pill-btn contact-btn-dark"
          >
            <span>Send Email</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          <button
            onClick={handleCopyEmail}
            className="contact-pill-btn contact-btn-outline"
          >
            <span>{copied ? "Email Copied!" : "Copy Email"}</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>

          <a
            href="https://github.com/Pawankus6261"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-pill-btn contact-btn-outline"
          >
            <span>GitHub</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/pawan-kushwaha-ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-pill-btn contact-btn-outline"
          >
            <span>LinkedIn</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          <a
            href="CV_Pawan.pdf"
            download="Pawan_Kushwaha_CV.pdf"
            className="contact-pill-btn contact-btn-outline"
          >
            <span>Download CV</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Copy Toast */}
      <div className={`copy-toast ${copied ? "show" : ""}`}>
        Email copied to clipboard!
      </div>

      <style>{`
        .contact-section {
          background: var(--accent);
          color: var(--ink);
          padding: clamp(3.5rem, 10vh, 10rem) 0;
          position: relative;
          overflow: hidden;
        }

        .orbit-background {
          position: absolute;
          top: 50%;
          right: -15%;
          transform: translateY(-50%);
          width: 900px;
          height: 900px;
          pointer-events: none;
          opacity: 0.18;
          animation: slowSpin 120s linear infinite;
        }

        @keyframes slowSpin {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }

        .contact-container {
          position: relative;
          z-index: 2;
        }

        .contact-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(8, 8, 10, 0.7);
          margin-bottom: 1.5rem;
        }

        .contact-hero-statement {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(2.2rem, 7.5vw, 8.5rem);
          line-height: 0.92;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: var(--ink);
          max-width: 16ch;
          margin-bottom: clamp(2.5rem, 5vh, 4.5rem);
          word-break: break-word;
        }

        .contact-actions-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
        }

        .contact-pill-btn {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 1.05rem;
          padding: 1rem 2.2rem;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s var(--ease-out);
        }

        .contact-btn-dark {
          background: var(--ink);
          color: var(--bone);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25);
        }

        .contact-btn-dark:hover {
          background: #000000;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 20px 44px rgba(0, 0, 0, 0.35);
        }

        .contact-btn-outline {
          background: transparent;
          color: var(--ink);
          border: 1.5px solid rgba(8, 8, 10, 0.4);
        }

        .contact-btn-outline:hover {
          background: rgba(8, 8, 10, 0.08);
          border-color: var(--ink);
          transform: translateY(-3px);
        }

        .copy-toast {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: var(--deep-gray);
          color: var(--bone);
          border: 1px solid var(--accent);
          padding: 0.85rem 1.5rem;
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.6);
          transform: translateY(150%);
          opacity: 0;
          transition: transform 0.35s var(--ease-spring), opacity 0.35s;
          z-index: 10005;
          pointer-events: none;
        }

        .copy-toast.show {
          transform: translateY(0%);
          opacity: 1;
        }

        @media (max-width: 640px) {
          .contact-hero-statement {
            font-size: clamp(2rem, 8.5vw, 3.2rem);
            line-height: 1;
            margin-bottom: 2rem;
          }
          .contact-actions-grid {
            flex-direction: column;
            width: 100%;
            align-items: stretch;
            gap: 0.75rem;
          }
          .contact-pill-btn {
            width: 100%;
            justify-content: center;
            padding: 0.85rem 1.4rem;
            font-size: 0.95rem;
          }
          .copy-toast {
            right: 50%;
            bottom: 1.5rem;
            transform: translateX(50%) translateY(150%);
            white-space: nowrap;
          }
          .copy-toast.show {
            transform: translateX(50%) translateY(0%);
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;