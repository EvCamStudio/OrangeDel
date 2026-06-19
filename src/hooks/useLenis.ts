"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { setLenis, destroyLenis } from "@/lib/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Hook untuk setup Lenis smooth scroll
 * Instance disimpan di singleton agar bisa diakses dari seluruh app
 */
export function useLenis(isLoading: boolean) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (isLoading) return;

    // Pastikan ScrollTrigger terdaftar di client-side
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    setLenis(lenis); // expose ke seluruh app

    // Sinkronkan update ScrollTrigger dengan event scroll Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Integrasi RAF Lenis dengan ticker GSAP agar sinkron
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000); // GSAP ticker memberikan waktu dalam detik, Lenis butuh milidetik
    };

    gsap.ticker.add(updateLenis);
    
    // Matikan lagSmoothing agar GSAP tidak memicu lonjakan frame saat scroll cepat
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.off("scroll", ScrollTrigger.update);
      destroyLenis();
    };
  }, [isLoading]);

  return lenisRef;
}
