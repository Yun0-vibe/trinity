"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { PLAYER_ORDER, PLAYERS, VOTE_SEED, VOTE_STORAGE_KEY } from "@/data/players";
import type { Player, PlayerId } from "@/data/players";
import { useTheme } from "./ThemeProvider";
import SectionHeading from "./SectionHeading";
import { CheckIcon } from "./icons";

const fmt = (n: number) => n.toLocaleString("en-US");

/** GOAT vote: pick your legend, confetti erupts, results persist in localStorage. */
export default function Vote({ player }: { player: Player }) {
  const { theme } = useTheme();
  const [myVote, setMyVote] = useState<PlayerId | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(VOTE_STORAGE_KEY);
      if (saved === "messi" || saved === "ronaldo" || saved === "neymar") setMyVote(saved);
    } catch {
      /* private mode — voting still works for the session */
    }
  }, []);

  const counts: Record<PlayerId, number> = {
    messi: VOTE_SEED.messi + (myVote === "messi" ? 1 : 0),
    ronaldo: VOTE_SEED.ronaldo + (myVote === "ronaldo" ? 1 : 0),
    neymar: VOTE_SEED.neymar + (myVote === "neymar" ? 1 : 0),
  };
  const total = counts.messi + counts.ronaldo + counts.neymar;

  const vote = (id: PlayerId) => {
    setMyVote(id);
    try {
      localStorage.setItem(VOTE_STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      void confetti({
        particleCount: 180,
        spread: 80,
        origin: { y: 0.65 },
        colors: theme.confettiColors,
        disableForReducedMotion: true,
      });
      setTimeout(() => void confetti({ particleCount: 90, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: theme.confettiColors }), 250);
      setTimeout(() => void confetti({ particleCount: 90, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: theme.confettiColors }), 400);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <SectionHeading
        eyebrow="The eternal debate"
        title="Cast Your GOAT Vote"
        intro={`You just watched the ${player.nickname} story. Now settle it: who rules the Trinity? Your vote is saved on this device.`}
        align="center"
      />

      <div className="grid gap-4 md:grid-cols-3">
        {PLAYER_ORDER.map((id, i) => {
          const p = PLAYERS[id];
          const pct = ((counts[id] / total) * 100).toFixed(1);
          const mine = myVote === id;
          return (
            <motion.button
              key={id}
              onClick={() => vote(id)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-colors ${
                mine ? "border-accent" : "border-white/12 hover:border-white/40"
              } bg-white/[0.04] backdrop-blur-md`}
            >
              {mine && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black">
                  Your vote <CheckIcon className="h-3 w-3" />
                </span>
              )}
              <div className="flex items-center gap-4">
                <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white/20">
                  <Image src={p.image} alt={p.fullName} fill className="object-cover object-top" sizes="64px" loading="lazy" />
                </span>
                <span>
                  <span className="block font-display text-2xl">{p.name}</span>
                  <span className="block text-xs uppercase tracking-[0.25em] text-white/55">{p.nickname}</span>
                </span>
              </div>
              <div className="mt-5">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-black tabular-nums text-accent">{fmt(counts[id])}</span>
                  <span className="tabular-nums text-white/60">{pct}%</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent})` }}
                  />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
      <p className="mt-6 text-center text-xs text-white/40">{fmt(total)} votes counted across the Trinity (community seed + yours).</p>
    </section>
  );
}
