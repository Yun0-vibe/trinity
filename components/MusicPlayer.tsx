"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { MicIcon, MusicNoteIcon, MuteIcon, PauseIcon, PlayIcon, VolumeIcon } from "./icons";

const BASE_VOLUME = 0.14;

/**
 * Lo-fi ambient widget, mixed to sit *under* the experience:
 * very low default volume, smooth fade-in (never blasts), manual volume
 * slider, and an opt-in 🎙 commentary voice that speaks the iconic lines
 * ("Encara Messi... GOOOL!") over the bed via the browser speech engine.
 */
export default function MusicPlayer() {
  const { theme } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);
  const [volume, setVolume] = useState(BASE_VOLUME);
  const [commentary, setCommentary] = useState(false);
  /** Once the user toggles playback manually, gestures stop auto-starting. */
  const manualRef = useRef(false);
  const volumeRef = useRef(BASE_VOLUME);
  const ttsSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  const tryPlay = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    const wasPaused = a.paused;
    try {
      // Audible playback (needs a user gesture — browsers block it otherwise).
      a.muted = false;
      if (wasPaused) {
        // Smooth fade-in from silence to the (low) target volume.
        a.volume = 0;
        await a.play();
        const target = volumeRef.current;
        const ramp = window.setInterval(() => {
          a.volume = Math.min(target, a.volume + 0.015);
          if (a.volume >= target) window.clearInterval(ramp);
        }, 100);
      } else {
        // Already playing (muted fallback) — just unmute at target volume.
        a.volume = volumeRef.current;
      }
      setPlaying(true);
      setMuted(false);
    } catch {
      // No gesture yet: fall back to SILENT playback (always allowed), so the
      // track is loaded and rolling — the next tap unmutes it instantly.
      try {
        a.muted = true;
        a.volume = volumeRef.current;
        await a.play();
        setPlaying(true);
        setMuted(true);
      } catch {
        setPlaying(false);
      }
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

  // Commentary voice: cycles the theme's iconic lines while music plays.
  useEffect(() => {
    if (!commentary || !playing || error || !ttsSupported) return;
    const lines = theme.music.commentary;
    if (!lines.length) return;
    let i = 0;
    const speak = () => {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(lines[i % lines.length]);
      u.rate = 0.95;
      u.volume = 0.8;
      u.pitch = theme.id === "ronaldo" ? 0.85 : theme.id === "neymar" ? 1.15 : 1;
      window.speechSynthesis.speak(u);
      i += 1;
    };
    speak();
    const timer = window.setInterval(speak, 20000);
    return () => {
      window.clearInterval(timer);
      window.speechSynthesis.cancel();
    };
  }, [commentary, playing, error, theme, ttsSupported]);

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

  const changeVolume = (v: number) => {
    const next = Math.min(1, Math.max(0, v / 100));
    volumeRef.current = next;
    setVolume(next);
    const a = audioRef.current;
    if (a) a.volume = next;
  };

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex items-center gap-2.5 rounded-2xl border border-white/15 bg-black/70 px-4 py-3 shadow-2xl backdrop-blur-xl md:bottom-6 md:right-6">
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
      <div className="min-w-0 max-w-[140px] md:max-w-[180px]">
        <p className="flex items-center gap-1.5 truncate text-[11px] font-bold" style={{ color: theme.colors.primary }}>
          <MusicNoteIcon className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{error ? "Audio missing" : theme.music.title}</span>
        </p>
        <p className="truncate text-[10px] text-white/50">
          {error ? "Add files to public/audio/ — see data/players.ts" : !playing ? "Click anywhere for sound" : muted ? "Tap anywhere for sound" : "Lo-fi bed · loop"}
        </p>
      </div>
      <button
        onClick={toggle}
        disabled={error}
        aria-label={playing ? "Pause music" : "Play music"}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-black transition-transform hover:scale-110 disabled:opacity-40"
        style={{ background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})` }}
      >
        {playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="ml-0.5 h-4 w-4" />}
      </button>
      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute" : "Mute"}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
      >
        {muted ? <MuteIcon className="h-4 w-4" /> : <VolumeIcon className="h-4 w-4" />}
      </button>
      <input
        type="range"
        min={0}
        max={40}
        value={Math.round(volume * 100)}
        onChange={(e) => changeVolume(Number(e.target.value))}
        aria-label="Music volume"
        className="accent-accent hidden h-1 w-16 cursor-pointer sm:block"
      />
      {ttsSupported && (
        <button
          onClick={() => {
            // Enabling commentary is an explicit request for sound:
            // start the music too (this click is a valid gesture).
            if (!commentary) {
              manualRef.current = true;
              void tryPlay();
            }
            setCommentary((c) => !c);
          }}
          aria-pressed={commentary}
          aria-label={commentary ? "Turn off commentary voice" : "Turn on commentary voice"}
          title="Iconic commentary voice"
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${
            commentary ? "border-transparent text-black" : "border-white/20 text-white/70 hover:bg-white/10"
          }`}
          style={commentary ? { background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})` } : undefined}
        >
          <MicIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
