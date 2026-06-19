import { gsap } from "gsap";

/**
 * Parallax vertikal dasar — elemen bergerak lebih lambat/cepat dari scroll
 *
 * @param target   - elemen yang diberi efek parallax
 * @param trigger  - elemen pemicu ScrollTrigger (biasanya parent section)
 * @param yRange   - seberapa jauh elemen bergerak (px), negatif = naik
 * @param scrub    - true/number: seberapa smooth (true = instan, angka = delay)
 */
export function parallaxY(
  target: gsap.TweenTarget,
  trigger: Element,
  yRange: number = -100,
  scrub: number | boolean = 1.5
) {
  return gsap.to(target, {
    y: yRange,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub,
    },
  });
}

/**
 * Parallax untuk background image / overlay
 * Bergerak lebih lambat dari konten — efek depth
 *
 * @param target   - elemen background
 * @param trigger  - section container
 * @param scrub    - smoothness
 */
export function parallaxBackground(
  target: gsap.TweenTarget,
  trigger: Element,
  scrub: number = 2
) {
  return gsap.fromTo(
    target,
    { y: "-15%" },
    {
      y: "15%",
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub,
      },
    }
  );
}

/**
 * Parallax horizontal — elemen bergerak ke kiri/kanan saat scroll
 *
 * @param target  - elemen target
 * @param trigger - elemen trigger
 * @param xRange  - jarak gerak horizontal (px)
 */
export function parallaxX(
  target: gsap.TweenTarget,
  trigger: Element,
  xRange: number = -80,
  scrub: number | boolean = 1.5
) {
  return gsap.to(target, {
    x: xRange,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub,
    },
  });
}

/**
 * Parallax scale — elemen membesar/mengecil saat discroll
 * Cocok untuk gambar hero atau background element
 *
 * @param target     - elemen target
 * @param trigger    - elemen trigger
 * @param scaleRange - scale akhir (misal: 1.2 = membesar 20%)
 */
export function parallaxScale(
  target: gsap.TweenTarget,
  trigger: Element,
  scaleRange: number = 1.15,
  scrub: number = 2
) {
  return gsap.fromTo(
    target,
    { scale: 1 },
    {
      scale: scaleRange,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub,
      },
    }
  );
}

/**
 * Parallax opacity — elemen fade in/out bersamaan dengan scroll
 *
 * @param target  - elemen target
 * @param trigger - elemen trigger
 * @param from    - opacity awal (0 = transparent)
 * @param to      - opacity akhir (1 = opaque)
 */
export function parallaxOpacity(
  target: gsap.TweenTarget,
  trigger: Element,
  from: number = 0,
  to: number = 1,
  scrub: number = 1
) {
  return gsap.fromTo(
    target,
    { opacity: from },
    {
      opacity: to,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top 80%",
        end: "center 50%",
        scrub,
      },
    }
  );
}

/**
 * Multi-layer parallax — beberapa elemen dengan kecepatan berbeda
 * Cocok untuk scene dengan depth (foreground, midground, background)
 *
 * @param layers - array of { element, speed } dimana speed: -1 (fast) to 1 (slow)
 * @param trigger
 */
export function parallaxLayers(
  layers: { element: Element; speed: number }[],
  trigger: Element,
  scrub: number = 1.5
) {
  return layers.map(({ element, speed }) =>
    gsap.to(element, {
      y: `${speed * 100}px`,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub,
      },
    })
  );
}
