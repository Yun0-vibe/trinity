"use client";

import { motion } from "framer-motion";
import type { Player } from "@/data/players";
import SectionHeading from "./SectionHeading";
import AnimatedCounter from "./AnimatedCounter";

const fmt = (n: number) => n.toLocaleString("en-US");

/** Animated counters + goals-per-club bar race + records wall. */
export default function StatsDeepDive({ player }: { player: Player }) {
  const { totals, journey } = player;
  const { clubs } = journey;
  const maxGoals = Math.max(...clubs.map((c) => c.goals));

  const counters = [
    { label: "Career goals", value: totals.goals },
    { label: "Career assists", value: totals.assists },
    { label: "Appearances", value: totals.apps },
    { label: "Major trophies", value: totals.trophies },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <SectionHeading eyebrow="By the numbers" title="Stats Deep Dive" intro="Every number below is a scene in the film. Watch them count themselves up." />

      {/* counters */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {counters.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 text-center backdrop-blur-md"
          >
            <div className="text-glow font-display text-4xl text-accent md:text-6xl">
              <AnimatedCounter value={c.value} />
            </div>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">{c.label}</p>
          </motion.div>
        ))}
      </div>

      {/* bar race */}
      <div className="mt-12 rounded-2xl border border-white/12 bg-black/40 p-6 md:p-8">
        <h3 className="mb-6 font-display text-2xl md:text-3xl">Goals per shirt — the bar race</h3>
        <div className="space-y-5">
          {clubs.map((c, i) => (
            <div key={c.club + c.years}>
              <div className="mb-1.5 flex items-baseline justify-between text-sm">
                <span className="font-bold text-white/90">{c.club} <span className="ml-1 text-xs font-normal text-white/40">{c.years}</span></span>
                <span className="font-display text-lg text-accent">{fmt(c.goals)}</span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.max((c.goals / maxGoals) * 100, 3)}%` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1.1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, var(--c-primary), var(--c-accent))`, boxShadow: "0 0 16px var(--c-glow)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* records */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {player.records.map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="rounded-2xl border-l-4 border-accent bg-white/[0.04] p-5"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/55">{r.label}</p>
            <p className="mt-1.5 font-display text-xl leading-snug text-white md:text-2xl">{r.value}</p>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-xs text-white/40">Stats as of October 2026. Assists vary between Opta and club counts; totals are career approximations.</p>
    </section>
  );
}
