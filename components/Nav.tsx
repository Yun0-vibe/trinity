"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PLAYER_ORDER, PLAYERS } from "@/data/players";
import { useTheme } from "./ThemeProvider";

/** Fixed nav. The site name itself changes with the active theme. */
export default function Nav() {
  const { theme, themeId } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [{ href: "/", label: "TRINITY", id: "landing" as const }, ...PLAYER_ORDER.map((id) => ({ href: `/${id}`, label: PLAYERS[id].name, id }))];

  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b border-white/10 bg-black/45 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-black transition-transform duration-300 group-hover:rotate-[20deg]"
            style={{ background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})` }}
          >
            ✦
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm tracking-wider md:text-base" style={{ color: theme.colors.primary }}>
              {theme.siteName}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.3em] text-white/40 sm:block">{theme.tagline}</span>
          </span>
        </Link>

        {/* desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && themeId === l.id);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] transition-colors ${
                  active ? "text-black" : "text-white/70 hover:text-white"
                }`}
                style={active ? { background: `linear-gradient(120deg, ${theme.colors.primary}, ${theme.colors.accent})` } : undefined}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-[0.25em] text-white/80 hover:bg-white/10"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
