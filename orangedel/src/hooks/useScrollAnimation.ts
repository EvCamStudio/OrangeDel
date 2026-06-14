"use client";

import { useEffect, useRef, type DependencyList } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register useGSAP hook
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook untuk menjalankan GSAP animasi dengan ScrollTrigger di dalam komponen React
 * Menggunakan @gsap/react useGSAP untuk cleanup otomatis
 *
 * @param animationFn - fungsi yang berisi logika animasi GSAP
 * @param deps        - dependency array (sama seperti useEffect)
 *
 * @example
 * const sectionRef = useScrollAnimation((scope) => {
 *   gsap.from('.title', { opacity: 0, y: 50, scrollTrigger: { trigger: scope, start: 'top 80%' } });
 * });
 */
export function useScrollAnimation(
  animationFn: (scope: HTMLElement) => void | (() => void),
  deps: DependencyList = []
) {
  const scopeRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!scopeRef.current) return;
      return animationFn(scopeRef.current) as void;
    },
    { scope: scopeRef, dependencies: [...deps], revertOnUpdate: true }
  );

  return scopeRef;
}

/**
 * Hook sederhana untuk fade in on scroll sebuah elemen
 *
 * @param options - gsap tween options
 */
export function useFadeInOnScroll(options?: gsap.TweenVars) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.from(ref.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        ...options,
      });
    },
    { scope: ref }
  );

  return ref;
}

/**
 * Hook untuk pin sebuah section dan trigger animasi saat discroll
 *
 * @param end      - kapan pin berakhir, misal: "+=1000" atau "bottom top"
 * @param scrub    - apakah animasi scrub dengan scroll
 */
export function usePinnedSection(
  end: string = "+=500",
  scrub: boolean | number = true
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end,
      pin: true,
      scrub: scrub as number,
      anticipatePin: 1,
    });

    return () => trigger.kill();
  }, [end, scrub]);

  return ref;
}

/**
 * Hook untuk refresh ScrollTrigger saat layout berubah
 * (berguna setelah loading selesai atau konten dinamis)
 */
export function useScrollTriggerRefresh(condition: boolean) {
  useEffect(() => {
    if (condition) {
      // Delay sedikit untuk memastikan layout sudah settle
      const timeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [condition]);
}
