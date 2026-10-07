"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { THEMES } from "@/data/players";
import type { ThemeConfig, ThemeId } from "@/data/players";

/** #RRGGBB -> "R G B" so Tailwind can apply opacity modifiers. */
const toRgbTriplet = (hex: string) => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};

interface ThemeContextValue {
  themeId: ThemeId;
  theme: ThemeConfig;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  themeId: "landing",
  theme: THEMES.landing,
  setTheme: () => undefined,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>("landing");
  const theme = THEMES[themeId];

  // Live CSS variables: the ENTIRE site re-skins when the theme changes.
  const cssVars = useMemo(
    () =>
      ({
        "--c-primary": theme.colors.primary,
        "--c-secondary": theme.colors.secondary,
        "--c-accent": theme.colors.accent,
        "--c-bg": theme.colors.bg,
        "--c-glow": theme.colors.glow,
        "--c-primary-rgb": toRgbTriplet(theme.colors.primary),
        "--c-secondary-rgb": toRgbTriplet(theme.colors.secondary),
        "--c-accent-rgb": toRgbTriplet(theme.colors.accent),
        "--c-bg-rgb": toRgbTriplet(theme.colors.bg),
        "--font-display": theme.fontFamily,
      }) as CSSProperties,
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ themeId, theme, setTheme: setThemeId }}>
      <div data-theme={themeId} style={cssVars} className="grain min-h-screen bg-[var(--c-bg)] font-body text-white">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
