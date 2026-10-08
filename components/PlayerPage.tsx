"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Player } from "@/data/players";
import Preloader from "./Preloader";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Origins from "./Origins";
import Journey from "./Journey";
import Timeline from "./Timeline";
import Moments from "./Moments";
import StatsDeepDive from "./StatsDeepDive";
import QuotesWall from "./QuotesWall";
import Vote from "./Vote";
import Legacy from "./Legacy";
import Footer from "./Footer";
import { useTheme } from "./ThemeProvider";

/** Assembles a full themed player film: preloader → all acts → vote → legacy. */
export default function PlayerPage({ player }: { player: Player }) {
  const { theme } = useTheme();
  const [ready, setReady] = useState(false);

  // After the countdown the film must start from the top (hero) —
  // SPA navigation otherwise resumes the previous page's scroll depth.
  const handleReady = () => {
    setReady(true);
    window.dispatchEvent(new Event("trinity:scroll-top"));
  };

  return (
    <>
      <AnimatePresence>{!ready && <Preloader key="preloader" player={player} onComplete={handleReady} />}</AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        aria-hidden={!ready}
      >
        <Hero player={player} />
        <Marquee items={theme.marquee} />
        <Origins player={player} />
        <Journey player={player} />
        <Marquee items={theme.marquee} reverse />
        <Timeline player={player} />
        <Moments player={player} />
        <StatsDeepDive player={player} />
        <QuotesWall player={player} />
        <Vote player={player} />
        <Legacy player={player} />
        <Footer />
      </motion.div>
    </>
  );
}
