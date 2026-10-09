"use client";

import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

const VOLUME = 0.14;

/**
 * Headless themed ambience — no panel, no buttons, just sound.
 * Attempts audible autoplay, falls back to muted playback, and fades in
 * gently on the first user gesture. Track follows the active theme.
 */
export default function AmbientAudio() {
  const { theme } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null);

  const tryPlay = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    const wasPaused = a.paused;
    try {
      a.muted = false;
      if (wasPaused) {
        a.volume = 0;
        await a.play();
        const ramp = window.setInterval(() => {
          a.volume = Math.min(VOLUME, a.volume + 0.015);
          if (a.volume >= VOLUME) window.clearInterval(ramp);
        }, 100);
      } else {
        a.volume = VOLUME;
      }
    } catch {
      // No gesture yet: silent playback (always allowed) so the track is
      // loaded and rolling — the next tap unmutes it instantly.
      try {
        a.muted = true;
        a.volume = VOLUME;
        await a.play();
      } catch {
        /* stays silent until a gesture */
      }
    }
  }, []);

  // Swap track on theme change + attempt autoplay.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
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

  // First interaction anywhere starts/unmutes the sound.
  useEffect(() => {
    const onGesture = () => void tryPlay();
    const events = ["pointerdown", "keydown", "touchend"] as const;
    events.forEach((e) => window.addEventListener(e, onGesture, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, onGesture));
  }, [tryPlay]);

  return <audio ref={audioRef} loop preload="none" />;
}
