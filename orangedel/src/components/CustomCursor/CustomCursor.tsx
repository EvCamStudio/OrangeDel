"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const trailRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };

    // Modern API support
    mediaQuery.addEventListener("change", handleMediaChange);

    if (!mediaQuery.matches) {
      return () => {
        mediaQuery.removeEventListener("change", handleMediaChange);
      };
    }

    const trail = trailRef.current;
    if (!trail) return;

    // Set initial position off-screen
    gsap.set(trail, { xPercent: -50, yPercent: -50 });

    // GSAP quickTo for ultra-smooth lagging cursor trail
    const xTo = gsap.quickTo(trail, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(trail, "y", { duration: 0.35, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Hover effect delegation on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Hide custom cursor trail when mouse enters an iframe (like Google Maps) to fallback to native cursor only
      if (target.tagName === "IFRAME" || target.closest("iframe")) {
        setIsVisible(false);
        return;
      }

      // Scale trail when hovering over links, buttons, images, gallery items or elements with pointer cursors
      const isInteractive = target.closest("a, button, [role='button'], .clickable, [data-cursor='pointer']");
      
      if (isInteractive) {
        gsap.to(trail, {
          scale: 1.8,
          backgroundColor: "rgba(255, 107, 0, 0.08)",
          borderColor: "var(--color-primary)",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(trail, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 107, 0, 0.45)",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    // Subtle scale down on click
    const handleMouseDown = () => {
      gsap.to(trail, { scale: 1.2, duration: 0.15 });
    };

    const handleMouseUp = () => {
      gsap.to(trail, { scale: 1.8, duration: 0.15 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isVisible]);

  if (isMobile) return null;

  return (
    <div className={`${styles.cursorContainer} ${isVisible ? styles.visible : ""}`}>
      <div ref={trailRef} className={styles.cursorTrail} />
    </div>
  );
}
