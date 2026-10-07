/* Crisp inline SVG icon set — replaces emoji glyphs site-wide. */

interface IconProps {
  className?: string;
}

export function PlayIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

export function PauseIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <rect x="6.5" y="5" width="4" height="14" rx="1" />
      <rect x="13.5" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

export function VolumeIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" fill="currentColor" stroke="none" />
      <path d="M15 9.5a4 4 0 0 1 0 5M17.5 7a7.5 7.5 0 0 1 0 10" />
    </svg>
  );
}

export function MuteIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" fill="currentColor" stroke="none" />
      <path d="m15.5 9.5 5 5m0-5-5 5" />
    </svg>
  );
}

export function TrophyIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 21h8M12 16.5V21M7 3.5h10V9a5 5 0 0 1-10 0V3.5Z" />
      <path d="M7 5.5H4.2A.7.7 0 0 0 3.5 6.2c0 2.6 2 4.8 4.6 5.1M17 5.5h2.8a.7.7 0 0 1 .7.7c0 2.6-2 4.8-4.6 5.1" />
    </svg>
  );
}

export function BoltIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z" />
    </svg>
  );
}

export function SparkIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2c.7 5.6 4.4 9.3 10 10-5.6.7-9.3 4.4-10 10-.7-5.6-4.4-9.3-10-10 5.6-.7 9.3-4.4 10-10Z" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 12h15m-6-7 7 7-7 7" />
    </svg>
  );
}

export function ArrowLeftIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 12H5m6-7-7 7 7 7" />
    </svg>
  );
}

export function CheckIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function MusicNoteIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 18V5.5L20 3.5V16" />
      <circle cx="6.8" cy="18" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="17.8" cy="16" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** The Trinity mark: three points, one triangle — Creator · Savior · Flair. */
export function TrinityMark({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <path d="M16 8.5 26.5 25h-21L16 8.5Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="16" cy="8.5" r="3.2" fill="currentColor" />
      <circle cx="26.5" cy="25" r="3.2" fill="currentColor" />
      <circle cx="5.5" cy="25" r="3.2" fill="currentColor" />
    </svg>
  );
}
