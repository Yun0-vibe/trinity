"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Player } from "@/data/players";
import { THEMES } from "@/data/players";

interface Props {
  player: Player;
  onComplete: () => void;
}

/**
 * Themed preloader: counts down from the player's number
 * (Messi 10 · Ronaldo 7 · Neymar 10), then a PLAY button
 * reveals the film — and starts the music (a user gesture).
 */
export default function Preloader({ player, onComplete }: Props) {
  // Derive from data, not context — the context theme may still be switching
  // on first paint, but the preloader must already wear the player's colors.
  const theme = THEMES[player.id];
  const [count, setCount] = useState(theme.preloaderNumber);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(0);
      return;
    }
    if (count <= 0) return;
    const t = setTimeout(() => setCount((c) => c - 1), 320);
    return () => clearTimeout(t);
  }, [count]);

  const play = () => {
    if (exiting) return;
    setExiting(true);
    // Let the music player know: user gesture happened — safe to autoplay.
    window.dispatchEvent(new CustomEvent("trinity:music-start"));
    setTimeout(onComplete, 650);
  };

  return (
    <motion.div
      exit={{ y: "-100%", transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: `radial-gradient(ellipse at center, ${theme.colors.bg} 0%, #000 75%)` }}
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute h-[60vmin] w-[60vmin] rounded-full blur-[120px]"
        style={{ background: theme.colors.glow }}
      />
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.5em] text-white/50">The Trinity presents</p>
      <h1 className="font-display text-2xl tracking-wide text-white/90 md:text-4xl">{player.fullName}</h1>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={count}
          initial={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.4, filter: "blur(10px)" }}
          transition={{ duration: 0.25 }}
          className="number-pulse my-6 font-display leading-none"
          style={{ fontSize: "clamp(7rem, 22vw, 15rem)", color: theme.colors.primary, textShadow: `0 0 60px ${theme.colors.glow}` }}
        >
          {count}
        </motion.div>
      </AnimatePresence>

      <p className="mb-8 text-xs uppercase tracking-[0.4em] text-white/60">{player.nickname}</p>

      <button
        onClick={play}
        className={`group relative overflow-hidden rounded-full px-12 py-4 text-sm font-black uppercase tracking-[0.35em] transition-transform duration-300 hover:scale-105 active:scale-95 ${
          count > 0 ? "cursor-wait opacity-40" : "animate-pulse-glow cursor-pointer"
        }`}
        style={{ background: `linear-gradient(120deg, ${theme.colors.primary}, ${theme.colors.accent})`, color: "#000" }}
      >
        ▶ &nbsp;Play the film
      </button>
      <p className="mt-6 max-w-xs text-center text-[11px] leading-relaxed text-white/40">
        Headphones on. {theme.music.title}
      </p>
    </motion.div>
  );
}
