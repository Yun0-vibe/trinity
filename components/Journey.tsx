"use client";

import { motion } from "framer-motion";
import type { Player } from "@/data/players";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import { BoltIcon, TrophyIcon } from "./icons";

const fmt = (n: number) => n.toLocaleString("en-US");

/** Club-by-club table (Apps/Goals/Assists/G+A/Trophies) + season peaks. */
export default function Journey({ player }: { player: Player }) {
  const { act, intro, clubs, peaks } = player.journey;
  const totals = clubs.reduce(
    (a, c) => ({ apps: a.apps + c.apps, goals: a.goals + c.goals, assists: a.assists + c.assists, ga: a.ga + c.goals + c.assists, trophies: a.trophies + c.trophies }),
    { apps: 0, goals: 0, assists: 0, ga: 0, trophies: 0 }
  );

  return (
    <section className="border-y border-white/10 bg-black/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={act} title="Career Journey" intro={intro} />

        {/* table */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="overflow-x-auto rounded-2xl border border-white/12"
        >
          <table className="w-full min-w-[720px] text-left text-sm md:text-base">
            <thead>
              <tr className="bg-white/[0.06] text-[11px] uppercase tracking-[0.25em] text-white/60">
                {["Club", "Years", "Apps", "Goals", "Assists", "G+A", "Trophies"].map((h, i) => (
                  <th key={h} className={`px-4 py-4 font-bold md:px-6 ${i > 1 ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clubs.map((c) => (
                <tr key={c.club + c.years} className="border-t border-white/8 transition-colors hover:bg-primary/10">
                  <td className="px-4 py-4 font-display text-base md:px-6 md:text-lg" style={{ color: "var(--c-primary)" }}>{c.club}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-white/60 md:px-6">{c.years}</td>
                  <td className="px-4 py-4 text-right tabular-nums md:px-6">{fmt(c.apps)}</td>
                  <td className="px-4 py-4 text-right font-black tabular-nums text-accent md:px-6">{fmt(c.goals)}</td>
                  <td className="px-4 py-4 text-right tabular-nums md:px-6">{fmt(c.assists)}</td>
                  <td className="px-4 py-4 text-right font-bold tabular-nums md:px-6">{fmt(c.goals + c.assists)}</td>
                  <td className="px-4 py-4 text-right tabular-nums md:px-6">
                    <span className="inline-flex items-center justify-end gap-1.5"><TrophyIcon className="h-4 w-4 text-accent" />{c.trophies}</span>
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-accent/40 bg-white/[0.05] font-bold">
                <td className="px-4 py-4 md:px-6">TOTAL</td>
                <td className="px-4 py-4 md:px-6" />
                <td className="px-4 py-4 text-right tabular-nums md:px-6">{fmt(totals.apps)}</td>
                <td className="px-4 py-4 text-right tabular-nums text-accent md:px-6">{fmt(totals.goals)}</td>
                <td className="px-4 py-4 text-right tabular-nums md:px-6">{fmt(totals.assists)}</td>
                <td className="px-4 py-4 text-right tabular-nums md:px-6">{fmt(totals.ga)}</td>
                <td className="px-4 py-4 text-right tabular-nums md:px-6">
                  <span className="inline-flex items-center justify-end gap-1.5"><TrophyIcon className="h-4 w-4 text-accent" />{totals.trophies}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* peaks */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {peaks.map((p, i) => (
            <motion.div
              key={p.season}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <TiltCard className="h-full rounded-2xl border border-white/12 bg-gradient-to-b from-white/[0.07] to-transparent p-6" maxTilt={7}>
                <p className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.3em] text-accent"><BoltIcon className="h-3.5 w-3.5" /> Peak</p>
                <p className="mt-2 font-display text-xl leading-tight">{p.season}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{p.text}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
