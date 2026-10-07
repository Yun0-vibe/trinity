"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Player } from "@/data/players";
import SectionHeading from "./SectionHeading";

/** Vertical timeline with a GSAP ScrollTrigger-scrubbed fill line. */
export default function Timeline({ player }: { player: Player }) {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const { act, intro, events } = player.timeline;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (fillRef.current) fillRef.current.style.transform = "scaleY(1)";
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <SectionHeading eyebrow={act} title="The Timeline" intro={intro} align="center" />

      <div className="relative mx-auto max-w-4xl">
        {/* track */}
        <div className="absolute bottom-0 left-4 top-0 w-[3px] -translate-x-1/2 rounded-full bg-white/10 md:left-1/2" aria-hidden />
        <div
          ref={fillRef}
          className="absolute bottom-0 left-4 top-0 w-[3px] -translate-x-1/2 rounded-full"
          style={{ background: "linear-gradient(var(--c-primary), var(--c-accent))", boxShadow: "0 0 20px var(--c-glow)", transformOrigin: "top" }}
          aria-hidden
        />

        <div className="space-y-8 md:space-y-12">
          {events.map((e, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={e.year + e.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex ${left ? "md:justify-start" : "md:justify-end"} justify-start pl-12 md:pl-0`}
              >
                {/* node */}
                <span
                  className="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-black md:left-1/2"
                  style={{ background: "var(--c-accent)", boxShadow: "0 0 16px var(--c-glow)" }}
                  aria-hidden
                />
                <div className={`w-full rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-md transition-colors hover:border-primary/60 md:w-[46%] md:p-6 ${left ? "md:mr-auto" : "md:ml-auto"}`}>
                  <span className="inline-block rounded-full bg-accent/15 px-3 py-1 font-display text-sm tracking-widest text-accent">
                    {e.year}
                  </span>
                  <h3 className="mt-2 font-display text-xl md:text-2xl">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65 md:text-base">{e.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
