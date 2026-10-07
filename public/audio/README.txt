THE TRINITY — theme music folder
=====================================

Drop your own tracks here as:

  messi.mp3     → La Pulga's hymn (e.g. a stadium chant / ambient hype)
  ronaldo.mp3   → The Champion's anthem (e.g. epic orchestral hype)
  neymar.mp3    → Samba funk / Brazilian funk instrumental

Then update the `music.url` fields in data/players.ts, e.g.:

  music: { title: "Encara Messi", url: "/audio/messi.mp3" }

Right now the site streams royalty-free placeholders from SoundHelix so the
music player, visualizer and "tap to enable" fallback all work out of the box.
Swap in real tracks anytime — the player handles play/pause, mute and errors.
