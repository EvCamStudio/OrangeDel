"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { setLenis, destroyLenis } from "@/lib/lenis";

/**
 * Hook untuk setup Lenis smooth scroll
 * Instance disimpan di singleton agar bisa diakses dari seluruh app
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    setLenis(lenis); // expose ke seluruh app

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      destroyLenis();
    };
  }, []);

  return lenisRef;
}
