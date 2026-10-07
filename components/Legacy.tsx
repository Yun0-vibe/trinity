"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Player } from "@/data/players";
import { PLAYER_ORDER, PLAYERS } from "@/data/players";
import SectionHeading from "./SectionHeading";
import AnimatedCounter from "./AnimatedCounter";
import { ArrowRightIcon, TrophyIcon } from "./icons";

/** Trophies, impact, what-if — plus portals to the other two legends. */
export default function Legacy({ player }: { player: Player }) {
  const { act, trophies, impact, whatIf } = player.legacy;
  const others = PLAYER_ORDER.filter((id) => id !== player.id);

  return (
    <section className="border-t border-white/10 bg-black/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={act} title="Legacy" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trophies.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5"
            >
              <span className="shrink-0" aria-hidden><TrophyIcon className="h-10 w-10 text-accent" /></span>
              <span>
                <span className="block font-display text-3xl text-accent">
                  ×<AnimatedCounter value={t.count} />
                </span>
                <span className="block text-sm font-bold uppercase tracking-[0.2em] text-white/70">{t.name}</span>
              </span>
            </motion.div>
          ))}
        </div>

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
