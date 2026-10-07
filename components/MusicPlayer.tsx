"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { MusicNoteIcon, MuteIcon, PauseIcon, PlayIcon, VolumeIcon } from "./icons";

/**
 * Fixed music widget with TRUE auto-enable: it attempts audible autoplay on
 * load, and the first click / keypress / tap anywhere on the site starts the
 * music — no extra "tap to enable" pill. Manual pause hands control to the
 * user permanently. Missing files still show the public/audio/ hint.
 */
export default function MusicPlayer() {
  const { theme } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);
  /** Once the user toggles playback manually, gestures stop auto-starting. */
  const manualRef = useRef(false);

  const tryPlay = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      a.muted = false;
      await a.play();
      setPlaying(true);
    } catch {
      setPlaying(false); // still blocked — a later gesture will start it
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

  // Auto-enable: first interaction anywhere starts the music.
  useEffect(() => {
    const onGesture = () => {
      if (!manualRef.current) void tryPlay();
    };
    const events = ["pointerdown", "keydown", "touchend"] as const;
    events.forEach((e) => window.addEventListener(e, onGesture, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, onGesture));
  }, [tryPlay]);

  const toggle = () => {
    manualRef.current = true;
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
    <div className="fixed bottom-4 right-4 z-[70] flex items-center gap-3 rounded-2xl border border-white/15 bg-black/70 px-4 py-3 shadow-2xl backdrop-blur-xl md:bottom-6 md:right-6">
      <audio ref={audioRef} loop preload="none" onError={() => { setError(true); setPlaying(false); }} />
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
        <p className="flex items-center gap-1.5 truncate text-[11px] font-bold" style={{ color: theme.colors.primary }}>
          <MusicNoteIcon className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{error ? "Audio missing" : theme.music.title}</span>
        </p>
        <p className="truncate text-[10px] text-white/50">
          {error ? "Add files to public/audio/ — see data/players.ts" : playing ? "Now playing · loop" : "Click anywhere for sound"}
        </p>
      </div>
      <button
        onClick={toggle}
        disabled={error}
        aria-label={playing ? "Pause music" : "Play music"}
        className="flex h-11 w-11 items-center justify-center rounded-full text-black transition-transform hover:scale-110 disabled:opacity-40"
        style={{ background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})` }}
      >
        {playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="ml-0.5 h-4 w-4" />}
      </button>
      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute" : "Mute"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
      >
        {muted ? <MuteIcon className="h-4 w-4" /> : <VolumeIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}
