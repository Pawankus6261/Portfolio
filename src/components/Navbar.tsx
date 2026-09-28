import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

interface NavbarProps {
  isReady?: boolean;
}

const Navbar = ({ isReady = true }: NavbarProps) => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinksWrapRef = useRef<HTMLDivElement>(null);
  const activePillRef = useRef<HTMLDivElement>(null);

  // Scroll listener for progress bar, shrink state, and active section
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / (docHeight || 1)) * 100;
      setScrollProgress(progress);
      setScrolled(scrollY > 40);

      // Detect active section
      const sectionIds = NAV_ITEMS.map((item) => item.id);
      let current = "home";
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && scrollY + window.innerHeight * 0.45 >= el.offsetTop) {
          current = sectionIds[i];
          break;
        }
      }
      setActiveSection(current);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update sliding blue indicator position on desktop
  useEffect(() => {
    if (!navLinksWrapRef.current || !activePillRef.current) return;
    const activeEl = navLinksWrapRef.current.querySelector<HTMLAnchorElement>(
      `a[href="#${activeSection}"]`
    );
    if (activeEl) {
      const activeRect = activeEl.getBoundingClientRect();
      const wrapRect = navLinksWrapRef.current.getBoundingClientRect();
      activePillRef.current.style.width = `${activeRect.width}px`;
      activePillRef.current.style.left = `${activeRect.left - wrapRect.left}px`;
      activePillRef.current.style.opacity = "1";
    }
  }, [activeSection]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        id="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className={!isReady ? "header-pending" : "header-entered"}>
        {/* DESKTOP NAVBAR */}
        <nav
          className={`navbar desktop-navbar ${scrolled ? "scrolled" : ""}`}
          id="navbar"
          aria-label="Main Navigation"
        >
          {/* Logo chip */}
          <button
            onClick={() => scrollTo("home")}
            className="nav-logo-chip"
            aria-label="Pawan Kushwaha Home"
          >
            PK
          </button>

          {/* Nav links with sliding blue indicator */}
          <div className="nav-links-wrapper" ref={navLinksWrapRef}>
            <div
              className="nav-active-pill"
              ref={activePillRef}
              aria-hidden="true"
            />
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.id);
                }}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Say Hello CTA */}
          <a
            href="mailto:contact.pawan62@gmail.com"
            className="nav-contact-btn"
          >
            Say Hello
          </a>
        </nav>

        {/* MOBILE TOP BAR (Phone & Small Tablets) */}
        <div className={`mobile-topbar ${scrolled ? "scrolled" : ""}`}>
          <button
            onClick={() => scrollTo("home")}
            className="mobile-brand-chip"
            aria-label="Pawan Kushwaha Home"
          >
            <span className="mobile-brand-dot" />
            <span className="mobile-brand-name">PAWAN.K</span>
          </button>

          <div className="mobile-topbar-actions">
            <a
              href="mailto:contact.pawan62@gmail.com"
              className="mobile-quick-cta"
            >
              Say Hello
            </a>

            <button
              className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className="toggle-line line-1" />
              <span className="toggle-line line-2" />
            </button>
          </div>
        </div>

        {/* MOBILE FULL-SCREEN / SLIDE-DOWN OVERLAY MENU */}
        <div
          className={`mobile-menu-overlay ${mobileMenuOpen ? "open" : ""}`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)} />
          
          <div className="mobile-menu-content">
            <div className="mobile-menu-header">
              <span className="mobile-menu-eyebrow">NAVIGATION</span>
              <button
                className="mobile-menu-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="mobile-nav-links">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`mobile-nav-item ${isActive ? "active" : ""}`}
                    style={{ transitionDelay: `${index * 40}ms` }}
                  >
                    <span className="mobile-nav-index">0{index + 1}</span>
                    <span className="mobile-nav-label">{item.label}</span>
                    {isActive && <span className="mobile-nav-active-dot" />}
                  </button>
                );
              })}
            </div>

            <div className="mobile-menu-footer">
              <div className="mobile-menu-socials">
                <a
                  href="https://github.com/Pawankus6261"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-link"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/pawan-kushwaha-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-link"
                >
                  LinkedIn
                </a>
                <a
                  href="CV_Pawan.pdf"
                  download="Pawan_Kushwaha_CV.pdf"
                  className="mobile-social-link"
                >
                  CV
                </a>
              </div>

              <a
                href="mailto:contact.pawan62@gmail.com"
                className="mobile-menu-cta-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Get in touch</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <style>{`
        /* Header entrance transition */
        header.header-pending {
          opacity: 0;
          transform: translateY(-20px);
          pointer-events: none;
        }

        header.header-entered {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Desktop styles */
        .navbar {
          position: fixed;
          top: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(8, 8, 10, 0.78);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid var(--hairline-strong);
          padding: 0.4rem 0.5rem;
          border-radius: 9999px;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.05) inset;
          transition: padding 0.3s var(--ease-out), top 0.3s var(--ease-out), background 0.3s var(--ease-out);
        }

        .navbar.scrolled {
          top: 1rem;
          padding: 0.32rem 0.4rem;
          background: rgba(8, 8, 10, 0.9);
        }

        .nav-logo-chip {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--bone);
          padding: 0.4rem 0.85rem;
          border-radius: 9999px;
          background: var(--deep-gray);
          border: 1px solid var(--hairline);
          margin-right: 0.2rem;
          letter-spacing: 0.06em;
          transition: border-color 0.2s;
        }

        .nav-logo-chip:hover {
          border-color: var(--accent);
        }

        .nav-links-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.15rem;
        }

        .nav-link {
          position: relative;
          z-index: 2;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--muted-gray);
          padding: 0.42rem 0.95rem;
          border-radius: 9999px;
          transition: color 0.25s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: var(--bone);
        }

        .nav-link.active {
          color: var(--bone);
        }

        .nav-active-pill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: var(--accent);
          border-radius: 9999px;
          z-index: 1;
          pointer-events: none;
          transition: all 0.35s var(--ease-out);
          opacity: 0;
        }

        .nav-contact-btn {
          font-size: 0.8rem;
          font-weight: 600;
          background: var(--bone);
          color: var(--ink);
          padding: 0.42rem 1.1rem;
          border-radius: 9999px;
          margin-left: 0.35rem;
          transition: background 0.25s, transform 0.2s;
          white-space: nowrap;
        }

        .nav-contact-btn:hover {
          background: #ffffff;
          transform: scale(1.03);
        }

        /* Mobile Topbar — Hidden on Desktop */
        .mobile-topbar {
          display: none;
        }
        .mobile-menu-overlay {
          display: none;
        }

        /* Responsive Breakpoint <= 840px */
        @media (max-width: 840px) {
          .desktop-navbar {
            display: none !important;
          }

          .mobile-topbar {
            position: fixed;
            top: 1rem;
            left: 1rem;
            right: 1rem;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.45rem 0.75rem 0.45rem 0.85rem;
            background: rgba(12, 12, 16, 0.85);
            backdrop-filter: blur(20px) saturate(160%);
            -webkit-backdrop-filter: blur(20px) saturate(160%);
            border: 1px solid var(--hairline-strong);
            border-radius: 9999px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
            transition: all 0.25s ease;
          }

          .mobile-topbar.scrolled {
            top: 0.6rem;
            background: rgba(8, 8, 10, 0.94);
            box-shadow: 0 14px 34px rgba(0, 0, 0, 0.8);
          }

          .mobile-brand-chip {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: transparent;
            padding: 0.2rem 0.4rem;
          }

          .mobile-brand-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: var(--accent);
            box-shadow: 0 0 8px var(--accent);
          }

          .mobile-brand-name {
            font-family: var(--font-mono);
            font-size: 0.78rem;
            font-weight: 600;
            letter-spacing: 0.06em;
            color: var(--bone);
          }

          .mobile-topbar-actions {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .mobile-quick-cta {
            font-family: var(--font-body);
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--ink);
            background: var(--bone);
            padding: 0.35rem 0.85rem;
            border-radius: 9999px;
            letter-spacing: -0.01em;
          }

          .mobile-menu-toggle {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: var(--deep-gray);
            border: 1px solid var(--hairline-strong);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;
            cursor: pointer;
            transition: background 0.2s, border-color 0.2s;
          }

          .mobile-menu-toggle:active {
            transform: scale(0.94);
          }

          .toggle-line {
            width: 16px;
            height: 1.5px;
            background: var(--bone);
            border-radius: 2px;
            transition: transform 0.3s ease, width 0.3s ease;
          }

          .mobile-menu-toggle.active .line-1 {
            transform: translateY(3.25px) rotate(45deg);
          }

          .mobile-menu-toggle.active .line-2 {
            transform: translateY(-3.25px) rotate(-45deg);
          }

          /* Fullscreen Mobile Drawer */
          .mobile-menu-overlay {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 10005;
            pointer-events: none;
            visibility: hidden;
            transition: visibility 0.35s;
          }

          .mobile-menu-overlay.open {
            pointer-events: all;
            visibility: visible;
          }

          .mobile-menu-backdrop {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            opacity: 0;
            transition: opacity 0.35s ease;
          }

          .mobile-menu-overlay.open .mobile-menu-backdrop {
            opacity: 1;
          }

          .mobile-menu-content {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            max-width: 360px;
            background: #0d0d12;
            border-left: 1px solid var(--hairline-strong);
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transform: translateX(100%);
            transition: transform 0.38s var(--ease-out);
            box-shadow: -15px 0 40px rgba(0, 0, 0, 0.8);
          }

          .mobile-menu-overlay.open .mobile-menu-content {
            transform: translateX(0%);
          }

          .mobile-menu-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 1.25rem;
            border-bottom: 1px solid var(--hairline);
          }

          .mobile-menu-eyebrow {
            font-family: var(--font-mono);
            font-size: 0.7rem;
            letter-spacing: 0.14em;
            color: var(--accent);
          }

          .mobile-menu-close {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: var(--surface);
            border: 1px solid var(--hairline-strong);
            color: var(--bone);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
          }

          .mobile-nav-links {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            margin: 1.5rem 0;
          }

          .mobile-nav-item {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.85rem 1rem;
            border-radius: 12px;
            text-align: left;
            transition: background 0.2s ease, transform 0.2s ease;
          }

          .mobile-nav-item:active, .mobile-nav-item.active {
            background: rgba(91, 108, 255, 0.12);
          }

          .mobile-nav-index {
            font-family: var(--font-mono);
            font-size: 0.72rem;
            color: var(--muted-gray);
          }

          .mobile-nav-item.active .mobile-nav-index {
            color: var(--accent);
          }

          .mobile-nav-label {
            font-family: var(--font-display);
            font-size: 1.45rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: var(--bone);
            flex: 1;
          }

          .mobile-nav-item.active .mobile-nav-label {
            color: #ffffff;
          }

          .mobile-nav-active-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--accent);
            box-shadow: 0 0 10px var(--accent);
          }

          .mobile-menu-footer {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            padding-top: 1.25rem;
            border-top: 1px solid var(--hairline);
          }

          .mobile-menu-socials {
            display: flex;
            align-items: center;
            gap: 1.25rem;
          }

          .mobile-social-link {
            font-family: var(--font-mono);
            font-size: 0.8rem;
            color: var(--muted-gray);
            transition: color 0.2s;
          }

          .mobile-social-link:hover, .mobile-social-link:active {
            color: var(--bone);
          }

          .mobile-menu-cta-btn {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.9rem 1.4rem;
            border-radius: 9999px;
            background: var(--accent);
            color: #ffffff;
            font-weight: 600;
            font-size: 0.95rem;
            box-shadow: 0 8px 24px var(--accent-glow);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;