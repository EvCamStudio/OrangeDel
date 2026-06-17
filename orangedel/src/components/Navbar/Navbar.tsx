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
  const linksRef       = useRef<HTMLUListElement>(null);
  const ctaRef         = useRef<HTMLAnchorElement>(null);
  const progressRef    = useRef<HTMLDivElement>(null);
  const mobileMenuRef  = useRef<HTMLDivElement>(null);
  const hamburgerRef   = useRef<HTMLButtonElement>(null);
  const heroSTRef      = useRef<ScrollTrigger | null>(null);

  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState("hero");
  const [isHero,         setIsHero]         = useState(true);

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

  // ─── Scroll Progress Bar (GSAP ScrollTrigger) ─────────────────
  useEffect(() => {
    if (isLoading) return;

    const progressEl = progressRef.current;
    if (!progressEl) return;

    // Reset awal: translasi penuh ke kiri (-100%) dan opacity 0
    gsap.set(progressEl, { xPercent: -100, opacity: 0 });

    const anim = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      }
    });

    anim.to(progressEl, {
      xPercent: 0,
      ease: "none",
    }, 0);

    // Fade in bar (dan bulatannya) dengan cepat setelah mulai scroll agar tidak terlihat menyembul saat di paling atas
    anim.fromTo(progressEl,
      { opacity: 0 },
      { opacity: 1, duration: 0.02, ease: "none" },
      0
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [isLoading]);

  // ─── Animate in after loading ─────────────────────────────────
  useEffect(() => {
    if (isLoading) return;

    const nav   = navRef.current;
    const links = linksRef.current?.querySelectorAll("li");
    const cta   = ctaRef.current;

    if (!nav) return;

    // Fade nav in (right-sidebar mode — no y movement)
    gsap.set(nav, { opacity: 0 });
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(nav, { opacity: 1, duration: 0.7, ease: "power3.out" });

    // Links slide in from right
    if (links?.length) {
      tl.from(links, {
        opacity: 0,
        x: 24,
        duration: 0.6,
        stagger: 0.09,
        ease: "power3.out",
      }, "-=0.3");
    }
    if (cta) {
      tl.from(cta, { opacity: 0, x: 24, duration: 0.6, ease: "power3.out" }, "-=0.3");
    }
  }, [isLoading]);

  // ─── Scroll state + isHero (scrollY-based, presisi untuk pinned hero) ───
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      // Hero di-pin untuk +=100% (window.innerHeight px scroll)
      // Beralih ke floating saat 48% dari hero pin selesai
      setIsHero(scrollY < window.innerHeight * 0.48);
    };
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
  }, [menuOpen, toggleMenu]);

  // ─── Hero parallax: navbar terserap ke atas saat scroll ──────
  useEffect(() => {
    if (isLoading) return;
    const nav   = navRef.current;
    const heroEl = document.getElementById("hero");
    if (!nav || !heroEl) return;

    gsap.set(nav, { yPercent: 0, y: 0, x: 0 });

    // Parallax: navbar bergerak ke atas + sedikit ke kiri (menuju tengah)
    const anim = gsap.to(nav, { yPercent: -120, x: -40, ease: "none", paused: true });

    const st = ScrollTrigger.create({
      animation: anim,
      trigger: heroEl,
      start: "top top",
      end: `+=${Math.round(window.innerHeight * 0.48)}`,
      scrub: 1.2,
    });

    heroSTRef.current = st;

    return () => {
      st.kill();
      anim.kill();
      heroSTRef.current = null;
    };
  }, [isLoading]);

  // ─── Hero → Floating transition (dan kembali ke hero) ─────────
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || isLoading) return;

    if (!isHero) {
      // Kill parallax, lalu floating navbar terbang masuk dari kanan → tengah atas
      heroSTRef.current?.kill();
      heroSTRef.current = null;
      gsap.killTweensOf(nav);

      // Reset semua transform GSAP dari parallax
      gsap.set(nav, { yPercent: 0, x: 0, opacity: 0, scale: 1, y: 0 });

      // Floating navbar terbang dari kanan (meneruskan gerakan sidebar hero)
      // — objek yang sama berpindah dari kanan → tengah atas
      const fromX = Math.min(window.innerWidth * 0.26, 300);
      gsap.fromTo(
        nav,
        { x: fromX, y: -44, opacity: 0, scale: 0.88 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "expo.out",
        }
      );
    } else {
      // Kembali ke hero mode (scroll ke atas)
      gsap.killTweensOf(nav);
      gsap.set(nav, { clearProps: "x,y,yPercent,opacity,scale" });
    }
  }, [isHero, isLoading]);

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
    [menuOpen, scrollToSection, toggleMenu]
  );

  return (
    <>
      {/* Scroll Progress Bar — paling atas */}
      <div className={styles.progressBarTrack} aria-hidden="true">
        <div ref={progressRef} className={styles.progressBarFill} />
      </div>

      <nav
        ref={navRef}
        className={`${styles.nav} ${isHero ? styles.navHero : styles.navFloating}`}
        aria-label="Navigasi utama"
      >
        <div className={styles.inner}>

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
