"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

/** Themed trailing cursor ring. Native cursor stays visible; hidden on touch/reduced motion. */
export default function CustomCursor() {
  const { theme } = useTheme();
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
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${hovering ? 1.8 : 1})`;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
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
        className="pointer-events-none fixed left-0 top-0 z-[80] h-9 w-9 rounded-full transition-[scale] duration-200"
        style={{ border: `2px solid ${theme.colors.accent}`, boxShadow: `0 0 18px ${theme.colors.glow}` }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 rounded-full"
        style={{ background: theme.colors.accent }}
      />
    </>
  );
}
