# THE TRINITY — Messi · Ronaldo · Neymar

A cinematic, movie-like tribute to the holy trinity of football — **Messi the Creator, Ronaldo the Savior, Neymar the Flair** — built with **Next.js 14 App Router + TypeScript**.

Each legend owns a fully re-skinned page: colors, fonts, particles, music, site name and mood all transform.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass with zero TS errors
```

## Deploy to Vercel

```bash
vercel --prod
```

No env vars, no database — works out of the box.

## Routes

| Route      | Film                                |
| ---------- | ----------------------------------- |
| `/`        | CHOOSE YOUR LEGEND + head-to-head   |
| `/messi`   | LA PULGA — The Flea's Tale          |
| `/ronaldo` | SIUUU — The Champion's Code         |
| `/neymar`  | JOGA BONITO — The Samba Prince      |

## Theme system

`components/ThemeProvider.tsx` holds the global theme in React Context and
publishes live CSS variables (`--c-primary`, `--c-accent`, `--font-display`…).
Every section reads them, so switching legends re-skins the whole site.

All content + per-theme config lives in `data/players.ts`.

## Sound

Headless themed ambience — a calm lo-fi bed per legend, no player UI.
It starts muted on load and fades in gently on first interaction.
Drop your own MP3s in `public/audio/` and point `music.url` at them
in `data/players.ts` to swap tracks.

## Credits

- Portraits: Wikimedia Commons (CC BY-SA) — see footer for attribution.
- Stadiums: Unsplash.
- Unofficial fan tribute. Not affiliated with any player or club.
