"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

/**
 * Fixed music widget. Autoplays the active theme's track; if the browser
 * blocks autoplay it shows a "tap to enable" overlay instead. If the audio
 * file is missing/broken it tells the owner where to drop replacements.
 */
export default function MusicPlayer() {
  const { theme } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [error, setError] = useState(false);

  const tryPlay = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      a.muted = false;
      await a.play();
      setPlaying(true);
      setBlocked(false);
    } catch {
      setBlocked(true);
      setPlaying(false);
    }
  }, []);

  // Swap track on theme change + attempt autoplay.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    setError(false);
    setPlaying(false);
    a.src = theme.music.url;
    a.load();
    const t = setTimeout(() => void tryPlay(), 600);
    return () => clearTimeout(t);
  }, [theme.music.url, tryPlay]);

  // Preloader PLAY dispatches this after a real user gesture.
  useEffect(() => {
    const handler = () => void tryPlay();
    window.addEventListener("trinity:music-start", handler);
    return () => window.removeEventListener("trinity:music-start", handler);
  }, [tryPlay]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a || error) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      void tryPlay();
    }
  };

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !muted;
    setMuted(!muted);
  };

  return (
    <>
      <audio ref={audioRef} loop preload="none" onError={() => { setError(true); setPlaying(false); setBlocked(false); }} />

      {/* autoplay-blocked fallback */}
      {blocked && !error && (
        <button
          onClick={() => void tryPlay()}
          className="animate-pulse-glow fixed bottom-24 right-4 z-[70] rounded-full px-5 py-3 text-[11px] font-black uppercase tracking-[0.25em] text-black shadow-2xl md:right-6"
          style={{ background: `linear-gradient(120deg, ${theme.colors.primary}, ${theme.colors.accent})` }}
        >
          🔊 Tap to enable music
        </button>
      )}

      {/* widget */}
      <div className="fixed bottom-4 right-4 z-[70] flex items-center gap-3 rounded-2xl border border-white/15 bg-black/70 px-4 py-3 shadow-2xl backdrop-blur-xl md:bottom-6 md:right-6">
        <div className={`flex h-7 items-end gap-[3px] ${playing ? "" : "viz-paused"}`} aria-hidden>
          {[0.5, 0.9, 0.35, 0.7, 1, 0.6, 0.85].map((d, i) => (
            <span
              key={i}
              className="viz-bar w-[3px] rounded-full"
              style={{ height: "100%", background: theme.colors.accent, animationDelay: `${d}s`, animationDuration: `${0.7 + d * 0.5}s` }}
            />
          ))}
        </div>
        <div className="min-w-0 max-w-[150px] md:max-w-[200px]">
          <p className="truncate text-[11px] font-bold" style={{ color: theme.colors.primary }}>
            {error ? "⚠ Audio missing" : theme.music.title}
          </p>
          <p className="truncate text-[10px] text-white/50">
            {error ? "Add files to public/audio/ — see data/players.ts" : playing ? "Now playing · loop" : "Paused"}
          </p>
        </div>
        <button
          onClick={toggle}
          disabled={error}
          aria-label={playing ? "Pause music" : "Play music"}
          className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-black transition-transform hover:scale-110 disabled:opacity-40"
          style={{ background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})` }}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-sm transition-colors hover:bg-white/10"
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>
    </>
  );
}
