"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ABOUT_CHAPTERS, ABOUT_STATS } from "@/data/about";
import styles from "./About.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Foto Unsplash per chapter (berganti saat chapter berganti)
const CHAPTER_PHOTOS = [
  // Ch01 — Asal Usul: petani memetik jeruk
  "/images/gallery_panen.png",
  // Ch02 — Lahan: kebun jeruk di perbukitan
  "/images/keunggulan_karo.png",
  // Ch03 — Kualitas: pohon penuh jeruk
  "/images/gallery_dedikasi.png",
  // Ch04 — Komunitas: tangan memetik jeruk
  "/images/proses_panen.png",
];

const STEP_HEIGHT = 700; // px scroll per chapter

export default function About() {
  const sectionRef    = useRef<HTMLElement>(null);

  // Intro refs
  const introRef      = useRef<HTMLDivElement>(null);
  const introLabelRef = useRef<HTMLParagraphElement>(null);
  const introHeadRef  = useRef<HTMLHeadingElement>(null);
  const introDescRef  = useRef<HTMLParagraphElement>(null);

  // Pinned story refs
  const storyWrapRef  = useRef<HTMLDivElement>(null);
  const storyPinRef   = useRef<HTMLDivElement>(null);
  const stepRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const photoRefs     = useRef<(HTMLDivElement | null)[]>([]);

  // Right panel refs
  const statNumRef    = useRef<HTMLSpanElement>(null);
  const statLabelRef  = useRef<HTMLSpanElement>(null);
  const progressBarRef= useRef<HTMLDivElement>(null);
  const chapterNumRef = useRef<HTMLSpanElement>(null);

  // Stats row ref
  const statsRef      = useRef<HTMLDivElement>(null);

  // ─── Intro text reveal ────────────────────────────────────────
  useEffect(() => {
    const label   = introLabelRef.current;
    const heading = introHeadRef.current;
    const desc    = introDescRef.current;
    if (!label || !heading || !desc) return;

    const splitHead = new SplitType(heading, { types: "lines" });
    splitHead.lines?.forEach((line) => {
      const wrap = document.createElement("div");
      wrap.style.overflow = "hidden";
      wrap.style.display  = "block";
      line.parentNode?.insertBefore(wrap, line);
      wrap.appendChild(line);
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: introRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl.from(label, { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" })
      .from(splitHead.lines ?? [], {
        yPercent: 110,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      }, "-=0.3")
      .from(desc, { opacity: 0, y: 24, duration: 0.8, ease: "power3.out" }, "-=0.4");

    return () => {
      tl.kill();
      splitHead.revert();
    };
  }, []);

  // ─── Pinned Scroll Storytelling ───────────────────────────────
  useEffect(() => {
    const storyWrap = storyWrapRef.current;
    const storyPin  = storyPinRef.current;
    const statNum   = statNumRef.current;
    const statLabel = statLabelRef.current;
    const progress  = progressBarRef.current;
    const chapNum   = chapterNumRef.current;

    if (!storyWrap || !storyPin) return;

    // Inisialisasi foto — semua opacity 0 kecuali pertama
    photoRefs.current.forEach((photo, i) => {
      if (!photo) return;
      if (i === 0) {
        photo.classList.add(styles.active);
      }
    });

    // Pin the visual container
    const pinTrigger = ScrollTrigger.create({
      trigger: storyWrap,
      start: "top top",
      end: `+=${ABOUT_CHAPTERS.length * STEP_HEIGHT}`,
      pin: storyPin,
      anticipatePin: 1,
    });

    // Progress bar scrub
    let progressAnim: gsap.core.Tween | null = null;
    if (progress) {
      progressAnim = gsap.to(progress, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: storyWrap,
          start: "top top",
          end: `+=${ABOUT_CHAPTERS.length * STEP_HEIGHT}`,
          scrub: 0.5,
        },
      });
    }

    // Per-step transitions
    const stepTriggers: ScrollTrigger[] = [];

    ABOUT_CHAPTERS.forEach((chapter, i) => {
      const stepEl  = stepRefs.current[i];
      const photoEl = photoRefs.current[i];
      if (!stepEl) return;

      const trigger = ScrollTrigger.create({
        trigger: storyWrap,
        start: `top+=${i * STEP_HEIGHT} top`,
        end:   `top+=${(i + 1) * STEP_HEIGHT} top`,

        onEnter: () => animateToStep(i, chapter, stepEl, photoEl),
        onEnterBack: () => animateToStep(i, chapter, stepEl, photoEl),
      });

      stepTriggers.push(trigger);
    });

    function animateToStep(
      i: number,
      chapter: (typeof ABOUT_CHAPTERS)[0],
      stepEl: HTMLDivElement,
      photoEl: HTMLDivElement | null
    ) {
      // Switch active class on steps
      stepRefs.current.forEach((step, idx) => {
        if (step) {
          if (idx === i) {
            step.classList.add(styles.active);
          } else {
            step.classList.remove(styles.active);
          }
        }
      });

      // Switch foto: hapus semua active, aktifkan yang sesuai
      photoRefs.current.forEach((p) => p?.classList.remove(styles.active));
      photoEl?.classList.add(styles.active);

      // Update stat + chapter number
      if (statNum && statLabel && chapNum) {
        const tl = gsap.timeline();
        tl.to([statNum, statLabel], {
          opacity: 0, y: -16,
          duration: 0.22, ease: "power2.in",
        })
        .call(() => {
          if (statNum)   statNum.textContent   = chapter.stat;
          if (statLabel) statLabel.textContent = chapter.statLabel;
          if (chapNum)   chapNum.textContent   = chapter.num;
        })
        .to([statNum, statLabel], {
          opacity: 1, y: 0,
          duration: 0.38, ease: "power3.out",
        });
      }
    }

    return () => {
      pinTrigger.kill();
      progressAnim?.scrollTrigger?.kill();
      stepTriggers.forEach((t) => t.kill());
    };
  }, []);

  // ─── Stats row reveal ──────────────────────────────────────────
  useEffect(() => {
    const statsEl = statsRef.current;
    if (!statsEl) return;

    const items = statsEl.querySelectorAll(`.${styles.statItem}`);

    gsap.from(items, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: statsEl,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.section}>

      {/* ── Intro ───────────────────────────────────────────── */}
      <div ref={introRef} className={styles.intro}>
        <div className={styles.container}>
          <div className={styles.introGrid}>

            <div className={styles.introLeft}>
              <p ref={introLabelRef} className={styles.label}>
                Tentang Kami
              </p>
              <h2 ref={introHeadRef} className={styles.introHeading}>
                Lebih dari sekadar<br />
                <em>kebun jeruk.</em>
              </h2>
            </div>

            <div className={styles.introRight}>
              <p ref={introDescRef} className={styles.introDesc}>
                OrangeDel adalah cerita tentang cinta pada tanah, dedikasi pada kualitas,
                dan komitmen untuk menghadirkan yang terbaik dari alam Indonesia
                langsung ke tangan Anda.
              </p>
              <div className={styles.introDivider} />
            </div>

          </div>
        </div>
      </div>

      {/* ── Pinned Scroll Storytelling ───────────────────────── */}
      <div
        ref={storyWrapRef}
        className={styles.storyWrap}
        style={{ height: `calc(${ABOUT_CHAPTERS.length * STEP_HEIGHT}px + 100vh)` }}
      >
        <div ref={storyPinRef} className={styles.storyPin}>
          <div className={styles.storyInner}>

            {/* Left: Text steps */}
            <div className={styles.storyLeft}>

              {/* Chapter number */}
              <div className={styles.chapterNum}>
                <span ref={chapterNumRef} className={styles.chapterNumText}>
                  {ABOUT_CHAPTERS[0].num}
                </span>
                <span className={styles.chapterTotal}>
                  / {String(ABOUT_CHAPTERS.length).padStart(2, "0")}
                </span>
              </div>

              {/* Steps — stacked, shown one at a time */}
              <div className={styles.stepsContainer}>
                {ABOUT_CHAPTERS.map((chapter, i) => (
                  <div
                    key={i}
                    ref={(el) => { stepRefs.current[i] = el; }}
                    className={`${styles.step} ${i === 0 ? styles.active : ""}`}
                  >
                    <p className={styles.stepLabel}>{chapter.label}</p>
                    <h3 className={styles.stepHeading}>
                      {chapter.heading.split("\n").map((line, j) => (
                        <span key={j} className={styles.stepHeadingLine}>
                          {j === 1 ? <em>{line}</em> : line}
                          <br />
                        </span>
                      ))}
                    </h3>
                    <p className={styles.stepBody}>{chapter.body}</p>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className={styles.progressTrack}>
                <div ref={progressBarRef} className={styles.progressFill} />
              </div>

            </div>

            {/* Right: Photo frame dengan foto per chapter */}
            <div className={styles.storyRight}>
              <div className={styles.chapterPhotoWrap}>
                {CHAPTER_PHOTOS.map((url, i) => (
                  <div
                    key={i}
                    ref={(el) => { photoRefs.current[i] = el; }}
                    className={styles.chapterPhoto}
                    style={{ backgroundImage: `url(${url})` }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Stat overlay di atas foto */}
              <div className={styles.statVisual}>
                <span ref={statNumRef}   className={styles.statNumber}>
                  {ABOUT_CHAPTERS[0].stat}
                </span>
                <span ref={statLabelRef} className={styles.statLabel}>
                  {ABOUT_CHAPTERS[0].statLabel}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Stats Row ─────────────────────────────────────── */}
      <div ref={statsRef} className={styles.statsRow}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {ABOUT_STATS.map((s, i) => (
              <div key={i} className={styles.statItem}>
                <span className={styles.statItemNum}>{s.number}</span>
                <span className={styles.statItemLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
