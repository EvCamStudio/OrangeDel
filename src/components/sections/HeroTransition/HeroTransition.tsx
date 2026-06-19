"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import styles from "./HeroTransition.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const splitRef = useRef<SplitType | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const sub = subRef.current;
    if (!section || !text || !sub) return;

    // Split text into lines for smooth reveal
    splitRef.current = new SplitType(text, { types: "lines" });
    splitRef.current.lines?.forEach((line) => {
      const wrap = document.createElement("div");
      wrap.style.overflow = "hidden";
      wrap.style.display = "block";
      line.parentNode?.insertBefore(wrap, line);
      wrap.appendChild(line);
    });

    const lines = splitRef.current.lines ?? [];

    // entrance and exit timeline tied to section visibility
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.fromTo(
      sub,
      { opacity: 0, y: 20 },
      { opacity: 0.8, y: 0, duration: 0.6, ease: "power3.out" }
    ).fromTo(
      lines,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "expo.out" },
      "-=0.4"
    );

    // Subtle parallax shift on the text itself as we scroll
    const parallax = gsap.fromTo(
      text,
      { y: 35 },
      {
        y: -35,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );

    return () => {
      tl.kill();
      parallax.scrollTrigger?.kill();
      parallax.kill();
      splitRef.current?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.quoteWrapper}>
          <p ref={subRef} className={styles.quoteSub}>
            Filosofi Kami
          </p>
          <h2 ref={textRef} className={styles.quoteText}>
            Dari kebun yang <em>peduli kualitas</em>,<br />
            langsung ke tangan yang <em>menghargai rasa</em>.
          </h2>
        </div>
      </div>
    </section>
  );
}
