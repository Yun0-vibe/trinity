"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Smooth scrolling (Lenis) + GSAP ScrollTrigger integration.
 * Lenis owns the scroll position, so every reset must go through
 * lenis.scrollTo(0, { immediate: true }) — plain window.scrollTo gets
 * overridden by Lenis and the next page would open mid-scroll.
 */
export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  const scrollTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Touch devices scroll natively — Lenis only smooths wheel input.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Every route change starts at the top.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    scrollTop();
    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(t);
  }, [pathname, scrollTop]);

  // PlayerPage dispatches this when the preloader countdown finishes,
  // so each film always starts from its own landing (hero), never mid-page.
  useEffect(() => {
    const handler = () => scrollTop();
    window.addEventListener("trinity:scroll-top", handler);
    return () => window.removeEventListener("trinity:scroll-top", handler);
  }, [scrollTop]);

  return null;
}
