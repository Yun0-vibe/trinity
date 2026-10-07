"use client";

import { useEffect, useRef } from "react";

interface Props {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Counts up when scrolled into view. Respects reduced motion. */
export default function AnimatedCounter({ value, suffix = "", duration = 1800, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const render = (v: number) => {
      el.textContent = `${Math.round(v).toLocaleString("en-US")}${suffix}`;
    };

    if (reduced) {
      render(value);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            render(value * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
