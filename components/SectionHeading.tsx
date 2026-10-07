"use client";

import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}

/** Cinematic section heading: roman-numeral act eyebrow + giant display title. */
export default function SectionHeading({ eyebrow, title, intro, align = "left" }: Props) {
  const centered = align === "center";
  return (
    <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-accent md:text-sm"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.08 }}
        className="font-display text-4xl leading-[1.05] md:text-6xl lg:text-7xl"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className={`mt-6 h-[3px] w-24 bg-gradient-to-r from-primary to-accent ${centered ? "mx-auto" : ""}`}
        style={{ transformOrigin: centered ? "center" : "left" }}
      />
      {intro && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg ${centered ? "mx-auto" : ""}`}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}
