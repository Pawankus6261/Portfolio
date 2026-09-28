const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <div>
          <span>PAWAN KUSHWAHA © {new Date().getFullYear()}</span>
          <span style={{ margin: "0 0.5rem", opacity: 0.3 }}>/</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>

        <div>
          <span>CRAFTED WITH INTENTIONALITY & CODE</span>
        </div>

        <div className="footer-socials">
          <a
            href="https://github.com/Pawankus6261"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/pawan-kushwaha-ai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:contact.pawan62@gmail.com">Email</a>
          <button onClick={scrollToTop} className="footer-top-btn">
            Back to Top ↑
          </button>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: var(--ink);
          padding: 3.5rem 0;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--muted-gray);
          border-top: 1px solid var(--hairline);
        }

        .footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .footer-socials {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .footer-socials a:hover, .footer-top-btn:hover {
          color: var(--bone);
        }

        .footer-top-btn {
          color: var(--muted-gray);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          cursor: pointer;
          transition: color 0.2s;
        }

        @media (max-width: 768px) {
          .site-footer {
            padding: 2.5rem 0 3.5rem;
          }
          .footer-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
          .footer-socials {
            width: 100%;
            justify-content: flex-start;
            gap: 1.25rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
