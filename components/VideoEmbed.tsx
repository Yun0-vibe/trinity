"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "./icons";
import { useTheme } from "./ThemeProvider";

interface Props {
  youtubeId: string;
  title: string;
}

/**
 * Inline YouTube player, no outbound links.
 * Desktop: auto-loads (muted autoplay) when scrolled into view — cinema feel.
 * Touch: stays a featherweight thumbnail until tapped — with sound, no jank.
 */
export default function VideoEmbed({ youtubeId, title }: Props) {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [withSound, setWithSound] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Touch devices: never preload iframes, wait for an explicit tap.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoaded(true);
          io.disconnect();
        }
      },
      { rootMargin: "240px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const tap = () => {
    setWithSound(true);
    setLoaded(true);
  };

  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0${withSound ? "" : "&mute=1"}`;

  return (
    <div ref={ref} className="relative aspect-video w-full overflow-hidden bg-black/60">
      {!loaded ? (
        <button onClick={tap} className="group/vid relative block h-full w-full" aria-label={`Play video: ${title}`}>
          {imgOk && (
            <img
              src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              onError={() => setImgOk(false)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/vid:scale-105"
            />
          )}
          <span
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.65) 100%)" }}
            aria-hidden
          />
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
            <span
              className="flex h-14 w-14 items-center justify-center rounded-full text-black transition-transform duration-300 group-hover/vid:scale-110"
              style={{ background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`, boxShadow: `0 0 30px ${theme.colors.glow}` }}
            >
              <PlayIcon className="ml-0.5 h-6 w-6" />
            </span>
          </span>
        </button>
      ) : (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  );
}
