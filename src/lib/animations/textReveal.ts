import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

/**
 * Reveal teks per LINE — slide naik dari bawah mask
 * Efek klasik premium: teks "muncul" dari bawah
 */
export function revealLines(
  target: string | HTMLElement | HTMLElement[],
  options?: { scrollTrigger?: ScrollTrigger.Vars } & Omit<gsap.TweenVars, "scrollTrigger">
) {
  const elements: HTMLElement[] =
    typeof target === "string"
      ? Array.from(document.querySelectorAll<HTMLElement>(target))
      : Array.isArray(target)
      ? target
      : [target];

  const splits: SplitType[] = [];
  const timelines: gsap.core.Timeline[] = [];

  elements.forEach((el) => {
    const split = new SplitType(el, { types: "lines" });
    splits.push(split);

    // Wrap setiap line dalam mask div agar overflow tersembunyi
    split.lines?.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "block";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    const { scrollTrigger: stConfig, ...tweenVars } = options ?? {};

    const tl = gsap.timeline({
      scrollTrigger: stConfig
        ? {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            ...stConfig,
          }
        : undefined,
    });

    tl.from(split.lines ?? [], {
      yPercent: 110,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.08,
      ...tweenVars,
    });

    timelines.push(tl);
  });

  return { splits, timelines };
}

/**
 * Reveal teks per WORD — setiap kata muncul berurutan
 */
export function revealWords(
  target: string | HTMLElement,
  options?: { scrollTrigger?: ScrollTrigger.Vars } & Omit<gsap.TweenVars, "scrollTrigger">
) {
  const el =
    typeof target === "string"
      ? (document.querySelector<HTMLElement>(target) as HTMLElement)
      : target;

  const split = new SplitType(el, { types: "words" });
  const { scrollTrigger: stConfig, ...tweenVars } = options ?? {};

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
      ...stConfig,
    },
  });

  tl.from(split.words ?? [], {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.05,
    ...tweenVars,
  });

  return { split, tl };
}

/**
 * Reveal teks per KARAKTER — dramatis, cocok untuk judul besar
 */
export function revealChars(
  target: string | HTMLElement,
  options?: { scrollTrigger?: ScrollTrigger.Vars } & Omit<gsap.TweenVars, "scrollTrigger">
) {
  const el =
    typeof target === "string"
      ? (document.querySelector<HTMLElement>(target) as HTMLElement)
      : target;

  const split = new SplitType(el, { types: "chars" });
  const { scrollTrigger: stConfig, ...tweenVars } = options ?? {};

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
      ...stConfig,
    },
  });

  tl.from(split.chars ?? [], {
    opacity: 0,
    y: 50,
    rotateX: -90,
    duration: 0.6,
    ease: "back.out(1.7)",
    stagger: 0.03,
    ...tweenVars,
  });

  return { split, tl };
}

/**
 * Scramble text effect — teks "decode" secara acak
 */
export function scrambleReveal(
  target: string | HTMLElement,
  finalText: string,
  speed: number = 30
) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const el =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(target)
      : target;

  if (!el) return;

  let iteration = 0;
  const interval = setInterval(() => {
    el.innerText = finalText
      .split("")
      .map((_, index) => {
        if (index < iteration) return finalText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (iteration >= finalText.length) clearInterval(interval);
    iteration += 1 / 3;
  }, speed);

  return () => clearInterval(interval);
}

/**
 * Typing cursor effect
 */
export function typewriterReveal(
  target: string | HTMLElement,
  finalText: string,
  speed: number = 50
) {
  const el =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(target)
      : target;

  if (!el) return;

  el.innerText = "";
  let i = 0;

  const type = () => {
    if (i < finalText.length) {
      el.innerText += finalText.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };

  type();
}

/**
 * Cleanup split-type instance
 */
export function cleanupSplit(split: SplitType) {
  split.revert();
}
