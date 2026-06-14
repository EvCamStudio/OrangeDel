"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLoading } from "@/context/LoadingContext";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
  const { setIsLoading } = useLoading();

  const wrapperRef   = useRef<HTMLDivElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLHeadingElement>(null);
  const taglineRef   = useRef<HTMLParagraphElement>(null);
  const counterRef   = useRef<HTMLSpanElement>(null);
  const barFillRef   = useRef<HTMLDivElement>(null);
  const lineLeftRef  = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper   = wrapperRef.current;
    const logo      = logoRef.current;
    const tagline   = taglineRef.current;
    const counter   = counterRef.current;
    const barFill   = barFillRef.current;
    const lineLeft  = lineLeftRef.current;
    const lineRight = lineRightRef.current;

    if (!wrapper || !logo || !tagline || !counter || !barFill) return;

    // Prevent body scroll selama loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setIsLoading(false);
      },
    });

    // --- Set initial state ---
    gsap.set([logo, tagline], { opacity: 0, y: 30 });
    gsap.set(barFill, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(counter, { opacity: 0 });
    if (lineLeft)  gsap.set(lineLeft,  { scaleX: 0, transformOrigin: "right center" });
    if (lineRight) gsap.set(lineRight, { scaleX: 0, transformOrigin: "left center" });

    // --- Phase 1: Logo masuk ---
    tl.to(logo, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }, 0.3);

    // Tagline masuk sedikit setelah logo
    tl.to(tagline, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, 0.6);

    // Line kiri & kanan expand dari tengah
    if (lineLeft && lineRight) {
      tl.to([lineLeft, lineRight], {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
      }, 0.7);
    }

    // Counter muncul
    tl.to(counter, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    }, 0.9);

    // --- Phase 2: Progress & Counter ---
    // Counter angka naik 0 → 100
    tl.to({ val: 0 }, {
      val: 100,
      duration: 2,
      ease: "power1.inOut",
      onUpdate: function () {
        if (counter) {
          counter.textContent = String(Math.round(this.targets()[0].val)).padStart(2, "0");
        }
      },
    }, 1.0);

    // Bar fill progress
    tl.to(barFill, {
      scaleX: 1,
      duration: 2,
      ease: "power1.inOut",
    }, 1.0);

    // --- Phase 3: Exit animation ---
    // Semua konten fade out
    tl.to([logo, tagline, counter], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power3.in",
      stagger: 0.05,
    }, 3.2);

    // Overlay slide up keluar
    tl.to(wrapper, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
    }, 3.6);

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {/* Background grain texture */}
      <div className={styles.grain} />

      {/* Ambient glow */}
      <div className={styles.glow} />

      {/* Content */}
      <div className={styles.content}>

        {/* Logo */}
        <h1 ref={logoRef} className={styles.logo}>
          Orange<em>Del</em>
        </h1>

        {/* Tagline */}
        <p ref={taglineRef} className={styles.tagline}>
          Kebun Jeruk Premium
        </p>

        {/* Progress Bar */}
        <div className={styles.progressWrapper}>
          <div ref={lineLeftRef}  className={styles.lineLeft} />
          <div className={styles.barTrack}>
            <div ref={barFillRef} className={styles.barFill} />
          </div>
          <div ref={lineRightRef} className={styles.lineRight} />
        </div>

        {/* Counter */}
        <div className={styles.counterWrapper}>
          <span ref={counterRef} className={styles.counter}>00</span>
          <span className={styles.counterLabel}>%</span>
        </div>

      </div>
    </div>
  );
}
