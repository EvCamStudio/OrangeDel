"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "@/context/LoadingContext";
import styles from "./LoadingScreen.module.css";

// Register plugin to ensure ScrollTrigger exists
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LoadingScreen() {
  const { setIsLoading } = useLoading();

  const wrapperRef        = useRef<HTMLDivElement>(null);
  const logoRef           = useRef<HTMLHeadingElement>(null);
  const taglineRef        = useRef<HTMLParagraphElement>(null);
  const counterRef        = useRef<HTMLSpanElement>(null);
  const counterWrapperRef = useRef<HTMLDivElement>(null);
  const barFillRef        = useRef<HTMLDivElement>(null);
  const lineLeftRef       = useRef<HTMLDivElement>(null);
  const lineRightRef      = useRef<HTMLDivElement>(null);
  const barTrackRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper        = wrapperRef.current;
    const logo           = logoRef.current;
    const tagline        = taglineRef.current;
    const counter        = counterRef.current;
    const counterWrapper = counterWrapperRef.current;
    const barFill        = barFillRef.current;
    const lineLeft       = lineLeftRef.current;
    const lineRight      = lineRightRef.current;

    if (!wrapper || !logo || !tagline || !counter || !counterWrapper || !barFill) return;

    // Prevent body scroll selama loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        if (wrapper) {
          wrapper.style.display = "none";
        }
        // Refresh ScrollTrigger setelah layout settle dan scrollbar muncul
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      },
    });

    // --- Set initial state ---
    gsap.set(wrapper, { clipPath: "circle(150% at 50% 100%)" });
    gsap.set([logo, tagline], { opacity: 0, y: 30 });
    gsap.set(barFill, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(counterWrapper, { opacity: 0 });
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
    tl.to(counterWrapper, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    }, 0.9);

    // --- Phase 2: Progress & Counter ---
    // Counter angka naik 0 → 100 (selesai pada 2.8s)
    tl.to({ val: 0 }, {
      val: 100,
      duration: 1.8,
      ease: "power1.inOut",
      onUpdate: function () {
        if (counter) {
          counter.textContent = String(Math.round(this.targets()[0].val)).padStart(2, "0");
        }
      },
    }, 1.0);

    // Bar fill progress (selesai pada 2.8s)
    tl.to(barFill, {
      scaleX: 1,
      duration: 1.8,
      ease: "power1.inOut",
    }, 1.0);

    // --- Phase 3: Exit animation ---

    // --- Phase 3: Droplet Condensation & Ripple Splash Reveal ---
    // 1. Matikan garis kiri/kanan
    tl.to([lineLeft, lineRight], {
      scaleX: 0,
      duration: 0.4,
      ease: "power2.out"
    }, 2.8);

    // 2. Logo dan tagline memudar sambil turun mengembun ke arah progress bar
    tl.to([logo, tagline], {
      opacity: 0,
      y: 15,
      duration: 0.4,
      ease: "power2.in",
    }, 2.8);

    // 3. Counter memudar sambil naik mengembun ke arah progress bar
    tl.to(counterWrapper, {
      opacity: 0,
      y: -15,
      duration: 0.4,
      ease: "power2.in"
    }, 2.8);

    // 4. Progress bar mengerut jadi lingkaran kecil (tetesan air jeruk) di tengah dengan glow
    const barTrack = barTrackRef.current;
    if (barTrack) {
      tl.to(barTrack, {
        width: 22,
        height: 22,
        borderRadius: "50%",
        boxShadow: "0 0 20px rgba(255, 107, 0, 0.8)",
        overflow: "visible", // prevent shadow clipping
        duration: 0.6,
        ease: "back.out(1.4)",
      }, 2.8);

      // 5. Tetesan air jeruk meregang/lonjong ke bawah (tension sebelum jatuh)
      tl.to(barTrack, {
        scaleY: 1.6,
        scaleX: 0.6,
        y: 12,
        duration: 0.28,
        ease: "power2.in",
      }, ">");

      // 6. Tetesan air jatuh bebas ke bawah off-screen
      tl.to(barTrack, {
        y: "55vh",
        scaleY: 2.2,
        scaleX: 0.4,
        opacity: 0,
        duration: 0.42,
        ease: "power3.in",
      }, ">");
    }

    // 7. Ripple Splash: Saat tetesan jatuh mendekati bawah (3.9s), riak lingkaran menyapu layar ke atas dengan sangat halus
    tl.to(wrapper, {
      clipPath: "circle(0% at 50% 100%)",
      duration: 1.4,
      ease: "expo.inOut",
      onStart: () => {
        setIsLoading(false); // Mulai animasi hero
        document.body.style.overflow = ""; // Enable scrollbar early so it can fade in during splash
        
        // Refresh ScrollTrigger agar layout/dimensi halaman dihitung ulang SEBELUM user mulai men-scroll
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);

        // Animasikan CSS variables untuk scrollbar agar muncul secara smooth (fade-in)
        gsap.to(document.documentElement, {
          "--scrollbar-track": "#080804", // cocokan dengan var(--color-bg)
          "--scrollbar-thumb": "#ff6b00", // cocokan dengan var(--color-primary)
          duration: 1.6,
          ease: "power2.out",
        });
      }
    }, 3.9);

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [setIsLoading]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {/* Background grain texture */}
      <div className={styles.grain} />

      {/* Ambient glow */}
      <div className={styles.glow} />

      {/* Content */}
      <div className={styles.content}>

        {/* Logo */}
        <h1 ref={logoRef} className={styles.logo} style={{ opacity: 0, transform: "translateY(30px)" }}>
          Orange<em>Del</em>
        </h1>

        {/* Tagline */}
        <p ref={taglineRef} className={styles.tagline} style={{ opacity: 0, transform: "translateY(30px)" }}>
          Kebun Jeruk Premium
        </p>

        {/* Progress Bar */}
        <div className={styles.progressWrapper}>
          <div ref={lineLeftRef}  className={styles.lineLeft} style={{ transform: "scaleX(0)", transformOrigin: "right center" }} />
          <div ref={barTrackRef} className={styles.barTrack}>
            <div ref={barFillRef} className={styles.barFill} style={{ transform: "scaleX(0)", transformOrigin: "left center" }} />
          </div>
          <div ref={lineRightRef} className={styles.lineRight} style={{ transform: "scaleX(0)", transformOrigin: "left center" }} />
        </div>

        {/* Counter */}
        <div ref={counterWrapperRef} className={styles.counterWrapper} style={{ opacity: 0 }}>
          <span ref={counterRef} className={styles.counter}>00</span>
          <span className={styles.counterLabel}>%</span>
        </div>

      </div>
    </div>
  );
}
