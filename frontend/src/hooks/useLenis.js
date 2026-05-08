import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

export default function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
      lerp: 0.08,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    });
    lenisInstance = lenis;
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    document.documentElement.classList.add("lenis-smooth");
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
      document.documentElement.classList.remove("lenis-smooth");
    };
  }, [enabled]);
}
