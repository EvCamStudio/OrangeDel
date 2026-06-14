import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * PINNED SCROLL SECTION
 * Section ter-pin saat discroll — konten berganti di dalam frame yang sama
 *
 * Cara pakai:
 * const { tl } = createPinnedSection(sectionEl, panelEls);
 * → Setiap panel dalam section muncul bergantian saat user scroll
 *
 * @param section  - container section yang akan di-pin
 * @param panels   - array elemen konten yang akan berganti
 * @param duration - panjang scroll per panel (pixels)
 */
export function createPinnedSection(
  section: Element,
  panels: Element[],
  duration: number = 300
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: `+=${panels.length * duration}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  });

  // Sembunyikan semua panel kecuali pertama
  gsap.set(panels.slice(1), { opacity: 0, y: 40 });

  panels.forEach((panel, i) => {
    if (i === 0) return; // Skip panel pertama (sudah visible)

    // Panel sebelumnya fade out
    tl.to(
      panels[i - 1],
      {
        opacity: 0,
        y: -40,
        duration: 0.4,
        ease: "power2.in",
      },
      `panel${i}`
    );

    // Panel sekarang fade in
    tl.from(
      panel,
      {
        opacity: 0,
        y: 40,
        duration: 0.4,
        ease: "power2.out",
      },
      `panel${i}+=0.1`
    );
  });

  return { tl };
}

/**
 * HORIZONTAL SCROLL SECTION (Gallery)
 * Section di-pin dan konten scroll horizontal
 * Cocok untuk gallery foto
 *
 * @param section    - container yang akan di-pin
 * @param track      - elemen horizontal track yang bergerak ke kiri
 */
export function createHorizontalScroll(section: Element, track: Element) {
  const trackEl = track as HTMLElement;
  const totalWidth = trackEl.scrollWidth - trackEl.clientWidth;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${totalWidth}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  tl.to(track, {
    x: () => -totalWidth,
    ease: "none",
  });

  return { tl };
}

/**
 * SCROLL STORYTELLING — Text + Visual berubah seiring scroll
 * Cocok untuk About section dengan narasi bergulir
 *
 * @param section   - container section
 * @param steps     - array of { textEl, visualEl } — pasangan teks & visual
 * @param stepHeight - panjang scroll per step (px)
 */
export function createScrollStory(
  section: Element,
  steps: { textEl: Element; visualEl?: Element }[],
  stepHeight: number = 400
) {
  const triggers: ScrollTrigger[] = [];

  // Pin section selama keseluruhan story
  const pinTrigger = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: `+=${steps.length * stepHeight}`,
    pin: true,
    anticipatePin: 1,
  });

  triggers.push(pinTrigger);

  steps.forEach((step, i) => {
    const start = i * stepHeight;
    const end = (i + 1) * stepHeight;

    // Animasi teks masuk & keluar
    const textTrigger = ScrollTrigger.create({
      trigger: section,
      start: `top+=${start} top`,
      end: `top+=${end} top`,
      onEnter: () => {
        gsap.to(step.textEl, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
        if (step.visualEl) {
          gsap.to(step.visualEl, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" });
        }
      },
      onLeave: () => {
        gsap.to(step.textEl, { opacity: 0, y: -30, duration: 0.4, ease: "power3.in" });
        if (step.visualEl) {
          gsap.to(step.visualEl, { opacity: 0, scale: 0.95, duration: 0.4 });
        }
      },
      onEnterBack: () => {
        gsap.to(step.textEl, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
        if (step.visualEl) {
          gsap.to(step.visualEl, { opacity: 1, scale: 1, duration: 0.6 });
        }
      },
      onLeaveBack: () => {
        gsap.to(step.textEl, { opacity: 0, y: 30, duration: 0.4 });
        if (step.visualEl) {
          gsap.to(step.visualEl, { opacity: 0, scale: 0.95, duration: 0.4 });
        }
      },
    });

    triggers.push(textTrigger);

    // Set state awal (tersembunyi kecuali step pertama)
    if (i !== 0) {
      gsap.set(step.textEl, { opacity: 0, y: 30 });
      if (step.visualEl) gsap.set(step.visualEl, { opacity: 0, scale: 0.95 });
    }
  });

  return { triggers };
}

/**
 * PROGRESS BAR SCROLL
 * Bar progress yang bergerak seiring scroll dalam sebuah section
 *
 * @param progressEl - elemen bar (width akan dianimasikan dari 0 ke 100%)
 * @param trigger    - section trigger
 */
export function createScrollProgress(progressEl: Element, trigger: Element) {
  return gsap.to(progressEl, {
    width: "100%",
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });
}

/**
 * Cleanup semua ScrollTrigger dalam sebuah array
 */
export function cleanupTriggers(triggers: ScrollTrigger[]) {
  triggers.forEach((t) => t.kill());
}
