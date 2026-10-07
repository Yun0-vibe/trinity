"use client";

import { motion } from "framer-motion";
import type { Player } from "@/data/players";
import SectionHeading from "./SectionHeading";

/** Player quotes + voices around him (coaches, peers, legends). */
export default function QuotesWall({ player }: { player: Player }) {
  return (
    <section className="border-y border-white/10 bg-black/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow="In their own words" title="Quotes Wall" />

        <div className="grid gap-5 md:grid-cols-3">
          {player.quotes.map((q, i) => (
            <motion.figure
              key={q.text}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/10 to-transparent p-6"
            >
              <span className="font-display text-5xl leading-none text-accent" aria-hidden>“</span>
              <blockquote className="font-display text-xl italic leading-snug md:text-2xl">{q.text}</blockquote>
              <figcaption className="mt-4 text-xs font-black uppercase tracking-[0.3em] text-accent">— {q.author}</figcaption>
            </motion.figure>
          ))}
        </div>

        <h3 className="mb-6 mt-14 font-display text-2xl text-white/90 md:text-3xl">Voices around him</h3>
        <div className="grid gap-5 md:grid-cols-3">
          {player.voices.map((q, i) => (
            <motion.figure
              key={q.text}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="rounded-2xl border border-white/12 bg-white/[0.04] p-6"
            >
              <blockquote className="text-base italic leading-relaxed text-white/80">“{q.text}”</blockquote>
              <figcaption className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">— {q.author}</figcaption>
              {q.context && <p className="mt-1 text-xs text-white/45">{q.context}</p>}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
