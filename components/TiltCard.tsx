"use client";

import { useRef, useState } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glow?: string;
}

/** 3D perspective tilt card. Disabled for touch + reduced motion. */
export default function TiltCard({ children, className = "", maxTilt = 9, glow }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  const fine = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: MouseEvent) => {
    if (!fine() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(1000px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) translateZ(6px)`,
      transition: "transform 0.08s linear",
      boxShadow: glow ? `0 24px 70px -18px ${glow}` : undefined,
    });
  };

  const onLeave = () => setStyle({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)", transition: "transform 0.5s ease" });

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={style} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
