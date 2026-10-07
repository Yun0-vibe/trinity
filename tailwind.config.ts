import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Theme-driven CSS variables (RGB triplets), swapped live by ThemeProvider.
        // The `<alpha-value>` placeholder keeps opacity modifiers (bg-primary/10) working.
        primary: "rgb(var(--c-primary-rgb) / <alpha-value>)",
        secondary: "rgb(var(--c-secondary-rgb) / <alpha-value>)",
        accent: "rgb(var(--c-accent-rgb) / <alpha-value>)",
        ink: "rgb(var(--c-bg-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-rev": "marquee-rev 40s linear infinite",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.6s ease-in-out infinite",
        "bounce-soft": "bounce-soft 1.8s ease-in-out infinite",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "marquee-rev": { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.72", transform: "scale(1.04)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.9" },
          "50%": { transform: "translateY(10px)", opacity: "0.4" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
