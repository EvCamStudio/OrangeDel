"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "@/context/LoadingContext";
import { getLenis } from "@/lib/lenis";
import { NAV_ITEMS } from "@/data/nav";
import styles from "./Navbar.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Tinggi navbar untuk offset scroll
const NAVBAR_HEIGHT = 80;

export default function Navbar() {
  const { isLoading } = useLoading();

  const navRef         = useRef<HTMLElement>(null);
  const logoRef        = useRef<HTMLAnchorElement>(null);
  const linksRef       = useRef<HTMLUListElement>(null);
  const ctaRef         = useRef<HTMLAnchorElement>(null);
  const progressRef    = useRef<HTMLDivElement>(null);
  const mobileMenuRef  = useRef<HTMLDivElement>(null);
  const hamburgerRef   = useRef<HTMLButtonElement>(null);

  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState("hero");

  // ─── Scroll Progress Bar ──────────────────────────────────────
  useEffect(() => {
    const progressEl = progressRef.current;
    if (!progressEl) return;

    const updateProgress = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const progress   = docHeight > 0 ? scrollTop / docHeight : 0;
      progressEl.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // ─── Animate in after loading ─────────────────────────────────
  useEffect(() => {
    if (isLoading) return;

    const nav   = navRef.current;
    const logo  = logoRef.current;
    const links = linksRef.current?.querySelectorAll("li");
    const cta   = ctaRef.current;

    if (!nav) return;

    gsap.set(nav, { opacity: 0, y: -20 });

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(nav, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });

    if (logo) {
      tl.from(logo, { opacity: 0, x: -20, duration: 0.6, ease: "power3.out" }, "-=0.5");
    }
    if (links?.length) {
      tl.from(links, {
        opacity: 0,
        y: -10,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
      }, "-=0.4");
    }
    if (cta) {
      tl.from(cta, { opacity: 0, x: 20, duration: 0.5, ease: "power3.out" }, "-=0.4");
    }
  }, [isLoading]);

  // ─── Scroll state (transparent ↔ solid) ──────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─── Scroll Spy ───────────────────────────────────────────────
  useEffect(() => {
    const sectionIds = ["hero", ...NAV_ITEMS.map((n) => n.href.slice(1))];

    const observers: IntersectionObserver[] = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null as unknown as IntersectionObserver;

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // ─── Escape key closes mobile menu ───────────────────────────
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) toggleMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // ─── Smooth scroll via Lenis ──────────────────────────────────
  const scrollToSection = useCallback((href: string) => {
    const lenis = getLenis();
    const target = document.querySelector(href);
    if (!target) return;

    if (lenis) {
      // Lenis programmatic scroll dengan offset navbar
      lenis.scrollTo(target as HTMLElement, {
        offset: -NAVBAR_HEIGHT,
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      // Fallback native
      const top =
        (target as HTMLElement).getBoundingClientRect().top +
        window.scrollY -
        NAVBAR_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      scrollToSection(href);
      if (menuOpen) toggleMenu();
    },
    [menuOpen, scrollToSection]
  );

  // ─── Mobile menu toggle ───────────────────────────────────────
  const toggleMenu = useCallback(() => {
    const menu   = mobileMenuRef.current;
    if (!menu) return;

    if (!menuOpen) {
      setMenuOpen(true);
      document.body.style.overflow = "hidden";
      gsap.set(menu, { display: "flex" });
      gsap.fromTo(
        menu,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
      const mobileLinks = menu.querySelectorAll(`.${styles.mobileNavItem}`);
      gsap.from(mobileLinks, {
        opacity: 0,
        y: 24,
        duration: 0.4,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.1,
      });
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(menu, { display: "none" });
          setMenuOpen(false);
          document.body.style.overflow = "";
        },
      });
    }
  }, [menuOpen]);

  return (
    <>
      {/* Scroll Progress Bar — paling atas */}
      <div className={styles.progressBarTrack} aria-hidden="true">
        <div ref={progressRef} className={styles.progressBarFill} />
      </div>

      <nav
        ref={navRef}
        className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
        aria-label="Navigasi utama"
      >
        <div className={styles.inner}>

          {/* Logo */}
          <a
            ref={logoRef}
            href="#hero"
            className={styles.logo}
            onClick={(e) => handleNavClick(e, "#hero")}
            aria-label="OrangeDel — Kembali ke atas"
          >
            Orange<em>Del</em>
          </a>

          {/* Desktop nav links */}
          <ul ref={linksRef} className={styles.links} role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className={styles.linkItem}>
                <a
                  href={item.href}
                  className={`${styles.link} ${
                    activeSection === item.href.slice(1) ? styles.active : ""
                  }`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  <span className={styles.linkText}>{item.label}</span>
                  <span className={styles.linkUnderline} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className={styles.actions}>
            <a
              ref={ctaRef}
              href="#kontak"
              className={styles.cta}
              onClick={(e) => handleNavClick(e, "#kontak")}
            >
              Hubungi Kami
            </a>

            <button
              ref={hamburgerRef}
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
              onClick={toggleMenu}
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={menuOpen}
            >
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className={styles.mobileMenu}
        style={{ display: "none" }}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Menu navigasi mobile"
      >
        <ul className={styles.mobileLinks} role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className={styles.mobileNavItem}>
              <a
                href={item.href}
                className={styles.mobileLink}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.mobileTagline}>Kebun Jeruk Premium</p>
      </div>
    </>
  );
}
