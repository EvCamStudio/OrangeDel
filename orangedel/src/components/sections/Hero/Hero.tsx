"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useLoading } from "@/context/LoadingContext";
import HeroCanvas from "./HeroCanvas";
import styles from "./Hero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const { isLoading } = useLoading();

  const sectionRef    = useRef<HTMLElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const contentRef    = useRef<HTMLDivElement>(null);
  const labelRef      = useRef<HTMLParagraphElement>(null);
  const titleOrangeRef= useRef<HTMLSpanElement>(null);
  const titleDelRef   = useRef<HTMLElement>(null);
  const subtitleRef   = useRef<HTMLParagraphElement>(null);
  const descRef       = useRef<HTMLParagraphElement>(null);
  const ctaRowRef     = useRef<HTMLDivElement>(null);
  const scrollIndRef  = useRef<HTMLDivElement>(null);
  const splitRef      = useRef<SplitType | null>(null);

  // ─── Entrance Animation (setelah loading selesai) ────────────
  useEffect(() => {
    if (isLoading) return;

    const label      = labelRef.current;
    const wordOrange = titleOrangeRef.current;
    const wordDel    = titleDelRef.current;
    const subtitle   = subtitleRef.current;
    const desc       = descRef.current;
    const ctaRow     = ctaRowRef.current;
    const scrollInd  = scrollIndRef.current;
    const canvas     = canvasWrapRef.current;

    if (!wordOrange || !wordDel) return;

    // Initial states
    gsap.set([wordOrange, wordDel], { yPercent: 110 });
    gsap.set([label, desc, ctaRow, scrollInd], { opacity: 0, y: 24 });
    gsap.set(canvas, { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.4 });

    // Canvas fade in
    tl.to(canvas, { opacity: 1, duration: 1.4, ease: "power2.out" }, 0);

    // Label fade
    tl.to(label, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.4);

    // Title words slide up dari mask — stagger antar kata
    tl.to([wordOrange, wordDel], {
      yPercent: 0,
      duration: 1.1,
      stagger: 0.14,
      ease: "power4.out",
    }, 0.55);

    // Subtitle line reveal (split-type per line)
    if (subtitle) {
      splitRef.current = new SplitType(subtitle, { types: "lines" });
      splitRef.current.lines?.forEach((line) => {
        const wrap = document.createElement("div");
        wrap.style.overflow = "hidden";
        wrap.style.display  = "block";
        line.parentNode?.insertBefore(wrap, line);
        wrap.appendChild(line);
      });
      tl.from(splitRef.current.lines ?? [], {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.1,
        ease: "power4.out",
      }, 1.0);
    }

    // Description + CTA + scroll indicator
    tl.to(desc,      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 1.3);
    tl.to(ctaRow,    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 1.45);
    tl.to(scrollInd, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 1.6);

    return () => {
      tl.kill();
      splitRef.current?.revert();
    };
  }, [isLoading]);

  // ─── Scroll Parallax + Exit Animation ───────────────────────
  useEffect(() => {
    if (isLoading) return;

    const section  = sectionRef.current;
    const content  = contentRef.current;
    const canvas   = canvasWrapRef.current;

    if (!section || !content || !canvas) return;

    // Title parallax — bergerak lebih lambat dari scroll
    const titleParallax = gsap.to(content, {
      yPercent: -25,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Canvas parallax — sedikit lebih lambat dari content
    const canvasParallax = gsap.to(canvas, {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });

    // Content fade out saat mendekati ujung section
    const fadeOut = gsap.to(content, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "65% top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      titleParallax.scrollTrigger?.kill();
      canvasParallax.scrollTrigger?.kill();
      fadeOut.scrollTrigger?.kill();
    };
  }, [isLoading]);

  // ─── Scroll Indicator bounce animation ───────────────────────
  useEffect(() => {
    if (isLoading) return;
    const ind = scrollIndRef.current;
    if (!ind) return;

    const anim = gsap.to(ind.querySelector(`.${styles.scrollLine}`), {
      scaleY: 0.4,
      yPercent: 60,
      duration: 0.9,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => { anim.kill(); };
  }, [isLoading]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={styles.section}
      aria-label="Hero — OrangeDel"
    >
      {/* WebGL Canvas */}
      <div ref={canvasWrapRef} className={styles.canvasWrap}>
        <HeroCanvas />
      </div>

      {/* Gradient overlays */}
      <div className={styles.gradientBottom} aria-hidden="true" />
      <div className={styles.gradientLeft}   aria-hidden="true" />
      <div className={styles.grain}          aria-hidden="true" />

      {/* Content */}
      <div ref={contentRef} className={styles.content}>
        <div className={styles.contentInner}>

          {/* Label */}
          <p ref={labelRef} className={styles.label}>
            Kebun Jeruk Premium
          </p>

          {/* Main Title — 2 kata dalam mask terpisah */}
          <h1 className={styles.title}>
            <span className={styles.titleLine}>
              <span ref={titleOrangeRef} className={styles.titleWord}>Orange</span>
            </span>
            <span className={styles.titleLine}>
              <em ref={titleDelRef as React.RefObject<HTMLElement>} className={styles.titleWordGold}>Del</em>
            </span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className={styles.subtitle}>
            Segar dari alam,<br />
            dipersembahkan untuk Anda.
          </p>

          {/* Description */}
          <p ref={descRef} className={styles.desc}>
            Kebun jeruk kami menghadirkan buah pilihan<br className={styles.brDesktop} />
            berkualitas tinggi langsung dari sumbernya.
          </p>

          {/* CTA Row */}
          <div ref={ctaRowRef} className={styles.ctaRow}>
            <a href="#produk" className={styles.ctaPrimary}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#produk")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Lihat Produk
            </a>
            <a href="#about" className={styles.ctaSecondary}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Tentang Kami
            </a>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndRef} className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>

    </section>
  );
}
