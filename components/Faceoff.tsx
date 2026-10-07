"use client";

import { motion } from "framer-motion";
import { COMPARISON, PLAYER_ORDER, PLAYERS } from "@/data/players";
import SectionHeading from "./SectionHeading";

const HEADER_COLORS: Record<string, string> = {
  messi: "#75AADB",
  ronaldo: "#DA291C",
  neymar: "#FFDF00",
};

/** Head-to-head comparison of the three legends with animated bars. */
export default function Faceoff() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <SectionHeading
        eyebrow="Head to head"
        title="The Faceoff"
        intro="Father, Son, Holy Spirit — measured side by side. No arguments, only numbers (as of October 2026)."
        align="center"
      />
      <div className="space-y-10">
        {COMPARISON.map((row, ri) => {
          const max = Math.max(row.messi, row.ronaldo, row.neymar);
          return (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: Math.min(ri * 0.05, 0.3) }}
            >
              <h3 className="mb-4 text-center text-xs font-black uppercase tracking-[0.4em] text-white/60">{row.label}</h3>
              <div className="grid gap-3 md:grid-cols-3">
                {PLAYER_ORDER.map((id) => {
                  const v = row[id];
                  const pct = max === 0 ? 0 : (v / max) * 100;
                  return (
                    <div key={id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="mb-2 flex items-baseline justify-between">
                        <span className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: HEADER_COLORS[id] }}>
                          {PLAYERS[id].name}
                        </span>
                        <span className="font-display text-2xl tabular-nums">{v.toLocaleString("en-US")}{row.suffix ?? ""}</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.max(pct, 2)}%` }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full"
                          style={{ background: HEADER_COLORS[id] }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-10 text-center text-xs text-white/40">Assists vary between Opta and club counts. International numbers include October 2026 fixtures.</p>
    </section>
  );
}
