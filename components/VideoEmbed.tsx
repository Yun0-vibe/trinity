"use client";

import { useState } from "react";
import { PlayIcon } from "./icons";
import { useTheme } from "./ThemeProvider";

interface Props {
  youtubeId: string;
  title: string;
}

/**
 * Privacy-friendly YouTube facade: shows the thumbnail + play button and only
 * loads the (nocookie) iframe after the user clicks — fast pages, real video.
 */
export default function VideoEmbed({ youtubeId, title }: Props) {
  const { theme } = useTheme();
  const [play, setPlay] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black/60">
      {!play ? (
        <button
          onClick={() => setPlay(true)}
          className="group/vid relative block h-full w-full"
          aria-label={`Play video: ${title}`}
        >
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
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white/80">
            YouTube
          </span>
        </button>
      ) : (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  );
}
