import type { Metadata } from "next";
import { Bebas_Neue, Fredoka, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Particles from "@/components/Particles";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas", display: "swap" });
const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "THE TRINITY — Messi · Ronaldo · Neymar",
  description:
    "A cinematic tribute to the holy trinity of football: Messi the Creator, Ronaldo the Savior, Neymar the Flair. Choose your legend.",
  openGraph: {
    title: "THE TRINITY — Choose Your Legend",
    description: "La Pulga · SIUUU · Joga Bonito. A movie-like tribute to Messi, Ronaldo and Neymar.",
    type: "website",
    images: ["https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200&auto=format&fit=crop"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${bebas.variable} ${fredoka.variable} ${inter.variable}`}>
      <body>
        <ThemeProvider>
          <SmoothScroll />
          <Particles />
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
