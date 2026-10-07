"use client";

import { motion } from "framer-motion";
import type { Player } from "@/data/players";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

/** Youth story + first-game / first-goal / rise fact cards. */
export default function Origins({ player }: { player: Player }) {
  const { paragraphs, facts, act } = player.origins;
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <SectionHeading eyebrow={act} title="Origins" />
      <div className="grid gap-10 md:grid-cols-5">
        <div className="space-y-6 md:col-span-3">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`leading-relaxed text-white/75 md:text-lg ${i === 0 ? "font-display text-xl italic text-white/90 md:text-2xl" : ""}`}
            >
              {p}
            </motion.p>
          ))}
        </div>
        <div className="grid content-start gap-4 md:col-span-2">
          {facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <TiltCard className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-md" maxTilt={5}>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">{f.label}</p>
                <p className="mt-2 font-display text-lg leading-snug md:text-xl">{f.value}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
