"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type { Player } from "@/data/players";
import { PLAYER_ORDER, PLAYERS } from "@/data/players";
import SectionHeading from "./SectionHeading";
import AnimatedCounter from "./AnimatedCounter";
import { ArrowRightIcon, ChevronDownIcon, TrophyIcon } from "./icons";

/**
 * The Trophy Cabinet: every honour itemized by team with its winning years.
 * Tap a shelf to expand it — the total always equals the visible list.
 */
export default function Legacy({ player }: { player: Player }) {
  const { act, cabinet, footnote, impact, whatIf } = player.legacy;
  const [open, setOpen] = useState<number | null>(0);
  const others = PLAYER_ORDER.filter((id) => id !== player.id);

  const total = cabinet.reduce((a, g) => a + g.items.reduce((x, i) => x + i.years.length, 0), 0);

  return (
    <section className="border-t border-white/10 bg-black/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={act} title="Legacy" />

        {/* total hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col items-center gap-2 rounded-3xl border border-accent/30 bg-gradient-to-b from-accent/10 to-transparent p-8 text-center md:p-10"
        >
          <TrophyIcon className="h-12 w-12 text-accent" />
          <p className="text-glow font-display text-6xl text-accent md:text-8xl">
            <AnimatedCounter value={total} />
          </p>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-white/70">team honours — every one listed below</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-white/45">tap a shelf to inspect each title + year</p>
        </motion.div>

        {/* cabinet shelves */}
        <div className="grid items-start gap-4 lg:grid-cols-2">
          {cabinet.map((group, gi) => {
            const subtotal = group.items.reduce((a, i) => a + i.years.length, 0);
            const isOpen = open === gi;
            return (
              <motion.div
                key={group.team}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (gi % 2) * 0.08 }}
                className={`overflow-hidden rounded-2xl border bg-white/[0.04] backdrop-blur-md transition-colors ${
                  isOpen ? "border-accent/60" : "border-white/12 hover:border-white/35"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : gi)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 p-5 text-left md:p-6"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-black"
                    style={{ background: "linear-gradient(135deg, var(--c-primary), var(--c-accent))" }}
                  >
                    <TrophyIcon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-xl md:text-2xl">{group.team}</span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.25em] text-white/50">
                      {group.items.length} competitions
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full bg-accent px-3.5 py-1.5 font-display text-lg text-black">
                    ×{subtotal}
                  </span>
                  <ChevronDownIcon className={`h-5 w-5 shrink-0 text-white/60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="space-y-3 border-t border-white/10 p-5 md:p-6">
                        {group.items.map((item) => (
                          <div key={item.name} className="rounded-xl bg-black/40 p-4">
                            <div className="flex items-baseline justify-between gap-3">
                              <p className="font-bold text-white/90">{item.name}</p>
                              <p className="shrink-0 font-display text-lg text-accent">×{item.years.length}</p>
                            </div>
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                              {item.years.map((y) => (
                                <span
                                  key={y}
                                  className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] font-bold tabular-nums text-white/80"
                                >
                                  {y}
                                </span>
                              ))}
                            </div>
                            {item.note && <p className="mt-2 text-xs italic text-white/45">{item.note}</p>}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        <p className="mt-5 text-center text-xs leading-relaxed text-white/40">{footnote} Counts cross-checked with Wikipedia (Oct 2026).</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 md:p-8"
          >
            <h3 className="font-display text-2xl text-primary md:text-3xl">The impact</h3>
            <p className="mt-4 leading-relaxed text-white/75 md:text-lg">{impact}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-dashed border-accent/50 bg-accent/[0.06] p-6 md:p-8"
          >
            <h3 className="font-display text-2xl italic text-accent md:text-3xl">What if…</h3>
            <p className="mt-4 leading-relaxed text-white/75 md:text-lg">{whatIf}</p>
          </motion.div>
        </div>

        {/* portals to the other legends */}
        <div className="mt-14 text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.4em] text-white/50">The story continues with…</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            {others.map((id) => (
              <Link
                key={id}
                href={`/${id}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-black uppercase tracking-[0.25em] text-white/85 transition-all hover:-translate-y-1 hover:border-white/60 hover:shadow-[0_16px_50px_-12px_var(--c-glow)]"
              >
                {PLAYERS[id].nickname} <ArrowRightIcon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
