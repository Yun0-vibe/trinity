"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PLAYER_ORDER, PLAYERS } from "@/data/players";
import type { PlayerId } from "@/data/players";
import { useTheme } from "@/components/ThemeProvider";
import { THEMES } from "@/data/players";
import { ArrowRightIcon, SparkIcon } from "@/components/icons";
import Marquee from "@/components/Marquee";
import Faceoff from "@/components/Faceoff";
import Footer from "@/components/Footer";

const CARD_ACCENT: Record<PlayerId, { from: string; to: string; glow: string }> = {
  messi: { from: "#0A1931", to: "#75AADB", glow: "rgba(117,170,219,0.5)" },
  ronaldo: { from: "#0B0B0E", to: "#DA291C", glow: "rgba(218,41,28,0.6)" },
  neymar: { from: "#04180F", to: "#009C3B", glow: "rgba(0,209,161,0.45)" },
};

const ROLE: Record<PlayerId, string> = {
  messi: "The Father — the Creator",
  ronaldo: "The Son — the Savior",
  neymar: "The Holy Spirit — the Flair",
};

/** Landing: CHOOSE YOUR LEGEND — three massive themed portals + faceoff. */
export default function LandingPage() {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setTheme("landing");
  }, [setTheme]);

  return (
    <>
      {/* hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-14 pb-16">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(115deg, #0A1931 0%, #0A1931 30%, #0B0B0E 30%, #0B0B0E 62%, #04180F 62%, #04180F 100%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-transparent to-[#07070d]" aria-hidden />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-4 text-center text-xs font-bold uppercase tracking-[0.5em] text-white/60"
        >
          Father · Son · Holy Spirit of football
        </motion.p>

        <h1 className="text-center font-display leading-[0.9]">
          {"THE TRINITY".split(" ").map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="gold-text block text-[18vw] md:text-[9rem]"
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-6 rounded-full border border-white/25 bg-black/50 px-8 py-3 backdrop-blur-md"
        >
          <p className="flex items-center justify-center gap-3 text-center text-sm font-black uppercase tracking-[0.45em] text-white md:text-base">
            <SparkIcon className="h-4 w-4 shrink-0 text-accent" /> Choose your legend <SparkIcon className="h-4 w-4 shrink-0 text-accent" />
          </p>
        </motion.div>

        {/* the three portals */}
        <div className="mt-12 grid w-full max-w-7xl items-stretch gap-5 md:grid-cols-3">
          {PLAYER_ORDER.map((id, i) => {
            const p = PLAYERS[id];
            const c = CARD_ACCENT[id];
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.7 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <Link
                  href={`/${id}`}
                  className="group relative block h-full min-h-[52vh] overflow-hidden rounded-3xl border border-white/15 md:min-h-[58vh]"
                >
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={i === 0}
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ background: `linear-gradient(180deg, transparent 30%, ${c.from}F2 75%, #000 100%)` }}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `linear-gradient(180deg, transparent 40%, ${c.glow} 130%)`, boxShadow: `inset 0 0 0 3px ${c.to}` }}
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/60">{ROLE[id]}</p>
                    <p className="mt-1 font-display text-5xl leading-none md:text-6xl" style={{ color: c.to === "#DA291C" ? "#ff6a5e" : c.to }}>
                      {p.name}
                    </p>
                    <p className="mt-1 font-display text-lg italic text-white/85">{p.nickname}</p>
                    <p className="mt-2 text-sm text-white/60">
                      {p.totals.goals} goals · {p.totals.assists} assists · {p.totals.trophies} trophies
                    </p>
                    <span
                      className="mt-4 inline-flex translate-y-2 items-center gap-2 rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-[0.3em] text-black opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                      style={{ background: `linear-gradient(120deg, ${c.to}, #FFD700)` }}
                    >
                      Enter the story <ArrowRightIcon className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10 max-w-xl text-center text-sm leading-relaxed text-white/55"
        >
          Three boys. Three movies. One religion. Click a legend and the entire site — colors, music, mood, even its
          name — transforms into their world.
        </motion.p>
      </section>

      <Marquee items={theme.marquee} />
      <Faceoff />
      <Marquee items={THEMES.messi.marquee.slice(0, 3).concat(THEMES.ronaldo.marquee.slice(0, 2))} reverse />
      <Footer />
    </>
  );
}
