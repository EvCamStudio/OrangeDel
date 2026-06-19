import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register semua GSAP plugins (gratis)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

/**
 * Konfigurasi default ScrollTrigger untuk Lenis
 * Panggil ini sekali di root component setelah Lenis diinisialisasi
 */
export function syncLenisWithGSAP(lenis: { on: (event: string, cb: (...args: unknown[]) => void) => void }) {
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add(() => {
    // Lenis akan diupdate via RAF di hook useLenis
    // Ini hanya memastikan ScrollTrigger sinkron
  });

  gsap.ticker.lagSmoothing(0);
}

/**
 * Fade in dari bawah
 */
export function fadeInUp(target: gsap.TweenTarget, options?: gsap.TweenVars) {
  return gsap.from(target, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    ...options,
  });
}

/**
 * Fade in dari bawah dengan ScrollTrigger
 */
export function fadeInOnScroll(
  target: gsap.TweenTarget,
  triggerEl: Element,
  options?: gsap.TweenVars
) {
  return gsap.from(target, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: triggerEl,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    ...options,
  });
}

/**
 * Stagger animation untuk sekumpulan elemen
 */
export function staggerIn(
  target: gsap.TweenTarget,
  triggerEl: Element,
  options?: gsap.TweenVars
) {
  return gsap.from(target, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: {
      trigger: triggerEl,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    ...options,
  });
}

/**
 * Scale in dari kecil
 */
export function scaleIn(
  target: gsap.TweenTarget,
  triggerEl: Element,
  options?: gsap.TweenVars
) {
  return gsap.from(target, {
    scale: 0.85,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: triggerEl,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    ...options,
  });
}

/**
 * Clip path reveal dari kiri ke kanan
 */
export function clipReveal(
  target: gsap.TweenTarget,
  triggerEl: Element,
  options?: gsap.TweenVars
) {
  return gsap.from(target, {
    clipPath: "inset(0 100% 0 0)",
    duration: 1.2,
    ease: "power4.inOut",
    scrollTrigger: {
      trigger: triggerEl,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    ...options,
  });
}

export { gsap, ScrollTrigger, TextPlugin };
