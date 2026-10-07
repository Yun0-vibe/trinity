"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Player } from "@/data/players";
import { useTheme } from "./ThemeProvider";
import AnimatedCounter from "./AnimatedCounter";

interface Props {
  player: Player;
}

/** Fullscreen parallax hero: stadium backdrop, floating portrait, giant name, key stats. */
export default function Hero({ player }: Props) {
  const { theme } = useTheme();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const words = player.heroTitle.split(" ");

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* backdrop */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <Image src={player.bgImage} alt="" fill priority className="object-cover opacity-40" sizes="100vw" />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${theme.colors.bg}CC 0%, ${theme.colors.bg}66 40%, ${theme.colors.bg} 100%), radial-gradient(ellipse at 50% 120%, ${theme.colors.glow} 0%, transparent 60%)`,
          }}
        />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: fade }} className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-24 md:grid-cols-2 md:px-8">
        {/* portrait */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="order-2 flex justify-center md:order-1"
        >
          <div className="animate-float relative">
            <div className="absolute -inset-6 rounded-[2rem] blur-3xl" style={{ background: theme.colors.glow }} />
            <div className="relative h-[46vh] w-[72vw] overflow-hidden rounded-[2rem] border-2 sm:h-[52vh] sm:w-80 md:h-[58vh] md:w-96" style={{ borderColor: theme.colors.primary }}>
              <Image src={player.image} alt={player.imageAlt} fill className="object-cover object-top" sizes="(max-width: 768px) 72vw, 400px" priority />
              <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 55%, ${theme.colors.bg}E6 100%)` }} />
            </div>
            <div
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-6 py-2 text-xs font-black uppercase tracking-[0.3em] text-black"
              style={{ background: `linear-gradient(120deg, ${theme.colors.primary}, ${theme.colors.accent})` }}
            >
              {player.nickname}
            </div>
          </div>
        </motion.div>

        {/* headline */}
        <div className="order-1 text-center md:order-2 md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4 text-xs font-bold uppercase tracking-[0.5em] text-white/60"
          >
            The Trinity · {player.id === "messi" ? "The Father" : player.id === "ronaldo" ? "The Son" : "The Holy Spirit"}
          </motion.p>
          <h1 className="font-display leading-[0.95]">
            {words.map((w, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-[17vw] md:text-[7.5rem] lg:text-[8.5rem]"
                  style={{ color: theme.colors.primary, textShadow: `0 0 60px ${theme.colors.glow}` }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-4 font-display text-xl italic text-white/80 md:text-3xl"
          >
            “{player.heroSubtitle}”
          </motion.p>

          {/* key stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 grid grid-cols-3 gap-3"
          >
            {player.keyStats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/15 bg-white/5 px-2 py-4 backdrop-blur-md">
                <div className="font-display text-2xl md:text-4xl" style={{ color: theme.colors.accent }}>
                  <AnimatedCounter value={s.value} suffix={s.suffix ?? ""} />
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 md:text-xs">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* scroll CTA */}
      <motion.div style={{ opacity: fade }} className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">Scroll</p>
        <div className="animate-bounce-soft mx-auto h-10 w-6 rounded-full border-2 border-white/40 p-1.5">
          <div className="mx-auto h-2 w-1 rounded-full" style={{ background: theme.colors.accent }} />
        </div>
      </motion.div>
    </section>
  );
}
