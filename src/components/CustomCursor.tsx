import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Touch detection - disabled on mobile/touch screens
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;
    let lastX = -100;
    let lastY = -100;

    // Helper: Determine if cursor is in clean zone or out of viewport
    const isCleanZone = (clientX: number, clientY: number, target?: EventTarget | null): boolean => {
      // 1. Outside viewport bounds
      if (
        clientX <= 0 ||
        clientY <= 0 ||
        clientX >= window.innerWidth ||
        clientY >= window.innerHeight
      ) {
        return true;
      }

      // 2. Navigation bar / clean area detection
      const el = (target as HTMLElement | null) || (document.elementFromPoint(clientX, clientY) as HTMLElement | null);
      if (
        el?.closest(
          "header, nav, #navbar, .desktop-navbar, .mobile-topbar, [data-clean-top], [data-no-custom-cursor]"
        )
      ) {
        return true;
      }

      return false;
    };

    const hideCursor = () => {
      document.body.classList.remove("custom-cursor-visible", "cursor-hover", "cursor-labeled");
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
      if (labelRef.current) labelRef.current.textContent = "";
    };

    const showCursor = () => {
      document.body.classList.add("custom-cursor-visible");
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
      if (spotlightRef.current) spotlightRef.current.style.opacity = "1";
    };

    const onMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;

      if (isCleanZone(e.clientX, e.clientY, e.target)) {
        hideCursor();
        return;
      }

      showCursor();
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${mouseX}px`;
        spotlightRef.current.style.top = `${mouseY}px`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      animId = requestAnimationFrame(animateRing);
    };

    const onMouseOver = (e: MouseEvent) => {
      if (isCleanZone(e.clientX, e.clientY, e.target)) {
        hideCursor();
        return;
      }

      const target = e.target as HTMLElement | null;
      const customEl = target?.closest("[data-cursor]") as HTMLElement | null;

      if (customEl) {
        const text = customEl.getAttribute("data-cursor") || "";
        if (labelRef.current) {
          labelRef.current.textContent = text;
        }
        document.body.classList.add("cursor-labeled");
        document.body.classList.remove("cursor-hover");
      } else if (
        target?.closest(
          'a, button, [role="button"], input, textarea, .cloud-tag, .project-row, .exp-item'
        )
      ) {
        document.body.classList.add("cursor-hover");
        document.body.classList.remove("cursor-labeled");
        if (labelRef.current) labelRef.current.textContent = "";
      } else {
        document.body.classList.remove("cursor-hover", "cursor-labeled");
        if (labelRef.current) labelRef.current.textContent = "";
      }
    };

    const onScroll = () => {
      if (isCleanZone(lastX, lastY)) {
        hideCursor();
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", hideCursor);
    window.addEventListener("blur", hideCursor);
    animId = requestAnimationFrame(animateRing);

    // Ensure hidden initially on mount
    hideCursor();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
      cancelAnimationFrame(animId);
      hideCursor();
    };
  }, []);

  return (
    <>
      <div className="cursor-spotlight" ref={spotlightRef} aria-hidden="true" />
      <div className="custom-cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="custom-cursor-ring" ref={ringRef} aria-hidden="true">
        <span className="cursor-label-text" ref={labelRef} />
      </div>
      <div className="film-grain" aria-hidden="true" />

      <style>{`
        .cursor-label-text {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #efece6;
          opacity: 0;
          transform: scale(0.6);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          user-select: none;
        }

        body.cursor-labeled .custom-cursor-ring {
          width: 76px;
          height: 76px;
          border-color: rgba(91, 108, 255, 0.8);
          background: rgba(18, 18, 24, 0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(91, 108, 255, 0.35);
        }

        body.cursor-labeled .cursor-label-text {
          opacity: 1;
          transform: scale(1);
        }

        body.cursor-labeled .custom-cursor-dot {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.2);
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
