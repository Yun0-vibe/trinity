"use client";

import { motion } from "framer-motion";
import type { Player } from "@/data/players";
import { useTheme } from "./ThemeProvider";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import VideoEmbed from "./VideoEmbed";
import { ArrowUpRightIcon } from "./icons";

/** Craziest moments: inline playable videos + direct YouTube links. */
export default function Moments({ player }: { player: Player }) {
  const { theme } = useTheme();
  const { act, intro, items } = player.moments;
  return (
    <section className="border-y border-white/10 bg-black/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={act} title="Craziest Moments" intro={intro} />
        <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.08 }}
              className="h-full"
            >
              <TiltCard
                glow={theme.colors.glow}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-b from-white/[0.07] to-transparent transition-colors hover:border-primary/70"
                maxTilt={6}
              >
                <VideoEmbed youtubeId={m.youtubeId} title={m.title} />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl leading-tight md:text-2xl">{m.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">{m.text}</p>
                  <a
                    href={m.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.25em] text-accent transition-transform hover:translate-x-1"
                  >
                    Watch on YouTube <ArrowUpRightIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
