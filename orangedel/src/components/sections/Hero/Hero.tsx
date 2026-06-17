"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useLoading } from "@/context/LoadingContext";
import styles from "./Hero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const { isLoading } = useLoading();

  const sectionRef    = useRef<HTMLElement>(null);
  const bgImgParentRef = useRef<HTMLDivElement>(null);
  const bgImgRef      = useRef<HTMLDivElement>(null);
  const bgImg2Ref     = useRef<HTMLDivElement>(null);
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
  const hasScrolledRef = useRef(false);
  const hasAnimatedRef = useRef(false);

  // ─── Entrance Animation (setelah loading selesai) ────────────
  useEffect(() => {
    const label      = labelRef.current;
    const wordOrange = titleOrangeRef.current;
    const wordDel    = titleDelRef.current;
    const subtitle   = subtitleRef.current;
    const desc       = descRef.current;
    const ctaRow     = ctaRowRef.current;
    const scrollInd  = scrollIndRef.current;
    const canvas     = canvasWrapRef.current;
    const bgImg      = bgImgRef.current;

    if (!wordOrange || !wordDel) return;

    if (isLoading) {
      if (!hasAnimatedRef.current) {
        gsap.set([wordOrange, wordDel], { yPercent: 110, y: 0 });
        gsap.set([label, desc, ctaRow, scrollInd], { opacity: 0 });
        gsap.set(canvas, { opacity: 0 });
        gsap.set(bgImg, { opacity: 1, scale: 1.06 }); // Terlihat di balik overlay loading saat diangkat

        if (subtitle && !splitRef.current) {
          splitRef.current = new SplitType(subtitle, { types: "lines" });
          splitRef.current.lines?.forEach((line) => {
            const wrap = document.createElement("div");
            wrap.style.overflow = "hidden";
            wrap.style.display  = "block";
            line.parentNode?.insertBefore(wrap, line);
            wrap.appendChild(line);
          });
          gsap.set(splitRef.current.lines ?? [], { yPercent: 110 });
        }
      }
      return;
    }

    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const tl = gsap.timeline({ delay: 0.05 });

    // Background image zoom out perlahan (sudah memiliki opacity 1)
    tl.to(bgImg, {
      opacity: 1,
      scale: 1,
      duration: 2.2,
      ease: "power3.out",
    }, 0);

    // Canvas fade in (slow)
    tl.to(canvas, { opacity: 1, duration: 1.8, ease: "power2.inOut" }, 0.3);

    // Title words slide up dari mask
    tl.to([wordOrange, wordDel], {
      yPercent: 0,
      y: 0,
      duration: 1.6,
      stagger: 0.08,
      ease: "expo.out",
    }, 0.1);

    // Label fade in
    tl.to(label, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0.2);

    // Subtitle line reveal
    if (subtitle) {
      tl.set(subtitle, { opacity: 1 }, 0.3);
    }
    tl.to(splitRef.current?.lines ?? [], {
      yPercent: 0,
      duration: 1.3,
      stagger: 0.06,
      ease: "expo.out",
    }, 0.3);

    // Desc + CTA + scroll indicator
    tl.to(desc,      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0.5);
    tl.to(ctaRow,    { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0.65);
    tl.to(scrollInd, { opacity: 1, duration: 1.2, ease: "power3.out" }, 0.9);

    return () => { tl.kill(); };
  }, [isLoading]);

  // Clean up split on unmount
  useEffect(() => {
    return () => { splitRef.current?.revert(); };
  }, []);

  // ─── Pinned Hero + Sinematik Scroll Transition ───────────────
  useEffect(() => {
    if (isLoading) return;

    const section     = sectionRef.current;
    const content     = contentRef.current;
    const canvas      = canvasWrapRef.current;
    const bgImg       = bgImgRef.current;
    const bgImgParent = bgImgParentRef.current;
    const bgImg2      = bgImg2Ref.current;
    const scrollInd   = scrollIndRef.current;

    if (!section || !content || !canvas || !bgImg || !bgImgParent) return;

    // Create a unified scroll timeline mapping over the first 200vh (Hero + HeroTransition)
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%", // Covers Hero (100vh) and HeroTransition (100vh)
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    // 1. Zoom in the background image over the entire 200vh scroll
    scrollTl.to(bgImgParent, {
      scale: 1.25,
      ease: "none",
      duration: 2,
    }, 0);

    // Ensure it is visible at the start, and set visibility to hidden at the end
    scrollTl.to(bgImgParent, {
      visibility: "visible",
      duration: 0,
    }, 0);
    scrollTl.to(bgImgParent, {
      visibility: "hidden",
      duration: 0,
    }, 2);

    // 2. Fade out the scroll indicator quickly (0% to 15% scroll, duration: 0.3)
    if (scrollInd) {
      scrollTl.to(scrollInd, {
        opacity: 0,
        y: -10,
        ease: "power1.out",
        duration: 0.3,
      }, 0);
    }

    // 3. Fade out and slide up content during the first half (0% to 50% scroll, duration: 1.0)
    scrollTl.to(content, {
      yPercent: -22,
      opacity: 0,
      ease: "none",
      duration: 1.0,
    }, 0);

    // 4. Parallax WebGL canvas (fast fade out and move up)
    scrollTl.to(canvas, {
      yPercent: -18,
      opacity: 0,
      ease: "none",
      duration: 1.0,
    }, 0);

    // 5. Darken overlay (bgImg2) gradually
    if (bgImg2) {
      // Darken over the first 100vh
      scrollTl.to(bgImg2, {
        opacity: 0.8,
        ease: "none",
        duration: 1.0,
      }, 0);
      
      // Fully dark by the end of transition
      scrollTl.to(bgImg2, {
        opacity: 1.0,
        ease: "none",
        duration: 1.0,
      }, 1.0);
    }

    // 6. Smoothly cross-fade the background image to opacity 0 during the second half (100vh to 200vh)
    scrollTl.to(bgImg, {
      opacity: 0,
      ease: "power2.inOut",
      duration: 1.0,
    }, 1.0);

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section) t.kill();
      });
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
      {/* ── Background photo — layer paling belakang */}
      <div ref={bgImgParentRef} className={styles.bgImageParent}>
        <div
          ref={bgImgRef}
          className={styles.bgImage}
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=1920&q=80&fit=crop&auto=format)`,
            opacity: 0,
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Dark overlay yang muncul saat scroll */}
      <div
        ref={bgImg2Ref}
        className={styles.bgOverlayScroll}
        style={{ opacity: 0 }}
        aria-hidden="true"
      />

      {/* ── WebGL Canvas Wrap (Left empty as 3D model is disabled per user request) */}
      <div ref={canvasWrapRef} className={styles.canvasWrap} style={{ opacity: 0 }} />

      {/* ── Gradient overlays */}
      <div className={styles.gradientBottom} aria-hidden="true" />
      <div className={styles.gradientLeft}   aria-hidden="true" />
      <div className={styles.grain}          aria-hidden="true" />

      {/* ── Content */}
      <div ref={contentRef} className={styles.content}>
        <div className={styles.contentInner}>

          {/* Label */}
          <p ref={labelRef} className={styles.label} style={{ opacity: 0 }}>
            Kebun Jeruk Premium
          </p>

          {/* Main Title */}
          <h1 className={styles.title}>
            <span className={styles.titleLine}>
              <span ref={titleOrangeRef} className={styles.titleWord} style={{ transform: "translateY(110%)" }}>Orange</span>
            </span>
            <span className={styles.titleLine}>
              <em ref={titleDelRef as React.RefObject<HTMLElement>} className={styles.titleWordGold} style={{ transform: "translateY(110%)" }}>Del</em>
            </span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className={styles.subtitle} style={{ opacity: 0 }}>
            Segar dari alam,<br />
            dipersembahkan untuk Anda.
          </p>

          {/* Description */}
          <p ref={descRef} className={styles.desc} style={{ opacity: 0 }}>
            Kebun jeruk kami menghadirkan buah pilihan<br className={styles.brDesktop} />
            berkualitas tinggi langsung dari sumbernya.
          </p>

          {/* CTA Row */}
          <div ref={ctaRowRef} className={styles.ctaRow} style={{ opacity: 0 }}>
            <a href="#hasil-kebun" className={styles.ctaPrimary}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#hasil-kebun")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Lihat Hasil Kebun
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
      <div ref={scrollIndRef} className={styles.scrollIndicator} style={{ opacity: 0 }} aria-hidden="true">
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>

    </section>
  );
}
