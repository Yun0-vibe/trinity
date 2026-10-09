"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { ArrowLeftIcon } from "./icons";

/** Credits, CC BY-SA image attribution, disclaimer, back-to-landing link. */
export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="border-t border-white/10 bg-black/60 py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl" style={{ color: theme.colors.primary }}>
              {theme.siteName}
            </p>
            <p className="mt-2 text-sm text-white/55">{theme.tagline}</p>
            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-2.5 text-xs font-black uppercase tracking-[0.3em] transition-all hover:-translate-y-0.5 hover:border-white/60"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" /> Back to the Trinity
            </Link>
          </div>
          <div className="text-sm leading-relaxed text-white/55">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-white/80">Image credits</p>
            <p>
              Player portraits via{" "}
              <a href="https://commons.wikimedia.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                Wikimedia Commons
              </a>{" "}
              under{" "}
              <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                CC BY-SA
              </a>
              . Stadium photography via{" "}
              <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                Unsplash
              </a>
              . All photos remain © their respective creators.
            </p>
          </div>
          <div className="text-sm leading-relaxed text-white/55">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-white/80">Disclaimer</p>
            <p>
              An unofficial fan-made cinematic tribute. Not affiliated with, endorsed by, or connected to Lionel Messi,
              Cristiano Ronaldo, Neymar Jr, or any club, federation, or rights holder. Stats compiled from public
              sources as of October 2026.
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row">
          <p>© 2026 THE TRINITY — a love letter to the beautiful game.</p>
          <p>
            Built with Next.js 14 · Framer Motion · GSAP · Lenis · canvas-confetti — deploy-ready for{" "}
            <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
              Vercel
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
