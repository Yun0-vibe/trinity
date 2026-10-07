"use client";

import { useTheme } from "./ThemeProvider";
import { SparkIcon } from "./icons";

interface Props {
  items: string[];
  reverse?: boolean;
}

/** Infinite marquee strip. Duplicate content = seamless loop. */
export default function Marquee({ items, reverse = false }: Props) {
  const { theme } = useTheme();
  const row = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black/50 py-4" aria-hidden>
      <div className={`marquee-track gap-0 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center whitespace-nowrap">
                <span className="px-6 font-display text-xl tracking-wider text-white/85 md:text-3xl">{item}</span>
                <span style={{ color: theme.colors.accent }} aria-hidden>
                  <SparkIcon className="h-4 w-4" />
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
