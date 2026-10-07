"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import { THEMES } from "@/data/players";
import type { ParticleKind } from "@/data/players";

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  alpha: number;
  color: string;
  tw: number;
}

const PALETTES: Record<ParticleKind, string[]> = {
  // Messi: soft sky-blue/white light dust drifting upward
  dust: ["#bfe0ff", "#ffffff", "#75AADB", "#FFD700"],
  // Ronaldo: fire embers rising fast
  embers: ["#DA291C", "#ff5a2a", "#FFDE00", "#ff8c42"],
  // Neymar: carnival confetti falling
  confetti: ["#FFDF00", "#009C3B", "#00D1A1", "#ff6fa5", "#ffffff"],
  // Landing: mixed trinity stardust
  stardust: ["#FFD700", "#75AADB", "#DA291C", "#FFDF00", "#ffffff"],
};

/** Fullscreen canvas particle field, themed per legend. Skipped on reduced motion. */
export default function Particles() {
  const { themeId } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const kind: ParticleKind = THEMES[themeId].particles;
    const colors = PALETTES[kind];
    // Mobile diet: few particles, zero shadowBlur (the GPU killer on phones).
    const coarse =
      window.matchMedia("(pointer: coarse)").matches || Math.min(window.innerWidth, window.innerHeight) < 640;
    const count = coarse ? 24 : kind === "embers" ? 70 : 90;
    const glow = !coarse;
    const parts: P[] = [];

    const spawn = (initial: boolean): P => ({
      x: Math.random() * w,
      y: kind === "confetti" ? (initial ? Math.random() * h : -20) : initial ? Math.random() * h : h + 20,
      vx: kind === "confetti" ? (Math.random() - 0.5) * 0.8 : (Math.random() - 0.5) * 0.4,
      vy: kind === "confetti" ? 0.8 + Math.random() * 1.6 : -(0.2 + Math.random() * (kind === "embers" ? 1.4 : 0.5)),
      size: kind === "confetti" ? 4 + Math.random() * 6 : 1 + Math.random() * (kind === "embers" ? 3.5 : 2.5),
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.08,
      alpha: 0.3 + Math.random() * 0.7,
      color: colors[Math.floor(Math.random() * colors.length)],
      tw: Math.random() * Math.PI * 2,
    });

    for (let i = 0; i < count; i++) parts.push(spawn(true));

    let raf = 0;
    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx + (kind === "embers" ? Math.sin(t * 3 + p.tw) * 0.5 : Math.sin(t + p.tw) * 0.15);
        p.y += p.vy;
        p.rot += p.vr;
        if (kind === "confetti") {
          if (p.y > h + 20) Object.assign(p, spawn(false));
        } else if (p.y < -20) {
          Object.assign(p, spawn(false));
        }
        const twinkle = kind === "dust" || kind === "stardust" ? 0.55 + 0.45 * Math.sin(t * 2 + p.tw) : 1;
        ctx.save();
        ctx.globalAlpha = p.alpha * twinkle;
        ctx.translate(p.x, p.y);
        if (kind === "confetti") {
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.fillStyle = p.color;
          if (glow) {
            ctx.shadowBlur = kind === "embers" ? 12 : 8;
            ctx.shadowColor = p.color;
          }
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [themeId]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[1]" aria-hidden />;
}
