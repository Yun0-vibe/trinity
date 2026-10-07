"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cinematic cursor: instant accent dot + trailing difference-blend ring.
 * Inverts over any theme so it always reads as premium, never noise.
 * Native cursor stays visible; hidden on touch / reduced motion.
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a, button, [data-cursor]"));
    };
    const loop = () => {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${hovering ? 1.9 : 1})`;
        ringRef.current.style.opacity = hovering ? "1" : "0.75";
      }
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%) scale(${hovering ? 0.5 : 1})`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [hovering]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-8 w-8 rounded-full mix-blend-difference"
        style={{ border: "1.5px solid #fff", transition: "opacity 0.25s ease" }}
      />
      <div ref={dotRef} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference" />
    </>
  );
}
