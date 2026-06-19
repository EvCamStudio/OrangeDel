import Lenis from "lenis";

/**
 * Singleton Lenis instance
 * Accessible across the entire app without prop drilling
 */
let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function setLenis(lenis: Lenis): void {
  lenisInstance = lenis;
}

export function destroyLenis(): void {
  lenisInstance?.destroy();
  lenisInstance = null;
}
