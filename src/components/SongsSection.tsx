import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Disc3, Play, Pause, ExternalLink, Heart, Music } from 'lucide-react';
import { SITE_CONTENT } from '../config/content';
import {
  DoodleHeart,
  DoodleFlower,
  DoodleSparkle,
  DoodleMusicNote,
  DoodleVinylRecord,
} from './Doodles';

interface SongsSectionProps {
  onPrevScene?: () => void;
  onNextScene?: () => void;
}

export const SongsSection: React.FC<SongsSectionProps> = () => {
  const { songs } = SITE_CONTENT;
  const [activeTrack, setActiveTrack] = useState<'track1' | 'track2' | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // Stop synthetic melodies
  const stopSynthMelody = () => {
    if (synthIntervalRef.current) {
      window.clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  // Play pleasant romantic chords via Web Audio API if local mp3 is missing
  const playRomanticChords = (trackId: 'track1' | 'track2') => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      stopSynthMelody();

      // Soft Lofi / Acoustic chords progression (F major / C major romantically tuned)
      const chordSets =
        trackId === 'track1'
          ? [
              [349.23, 440.0, 523.25, 659.25], // Fmaj7
              [329.63, 392.0, 493.88, 587.33], // Em7
              [293.66, 349.23, 440.0, 523.25], // Dm7
              [261.63, 329.63, 392.0, 493.88], // Cmaj7
            ]
          : [
              [261.63, 329.63, 392.0, 523.25], // Cmaj
              [220.0, 261.63, 329.63, 440.0],  // Am7
              [174.61, 220.0, 261.63, 349.23], // Fmaj
              [196.0, 246.94, 293.66, 392.0],  // Gmaj
            ];

      let chordIdx = 0;
      const playNextChord = () => {
        const chord = chordSets[chordIdx % chordSets.length];
        chordIdx++;

        chord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Gentle soft envelope
          const now = ctx.currentTime + i * 0.08;
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.045, now + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 2.3);
        });
      };

      playNextChord();
      synthIntervalRef.current = window.setInterval(playNextChord, 2400);
    } catch {
      // Audio context silently blocked
    }
  };

  const handleTogglePlay = (trackId: 'track1' | 'track2') => {
    if (activeTrack === trackId) {
      // Pause
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSynthMelody();
      setActiveTrack(null);
    } else {
      // Play new track
      const trackData = trackId === 'track1' ? songs.track1 : songs.track2;
      setActiveTrack(trackId);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = trackData.audioSrc;
        audioRef.current.loop = true;

        audioRef.current
          .play()
          .catch(() => {
            // Local mp3 placeholder missing: fallback to ambient audio synth
            playRomanticChords(trackId);
          });
      }
    }
  };

  useEffect(() => {
    return () => {
      stopSynthMelody();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen max-h-screen flex flex-col justify-between items-center px-4 sm:px-8 py-6 sm:py-8 overflow-hidden select-none bg-paper/60">
      {/* Hidden Audio Tag for local clips */}
      <audio ref={audioRef} preload="none" />

      {/* ── Ambient Background Floating Doodles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <motion.div
          animate={{ rotate: [0, 12, 0], y: [0, -14, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-14 left-8 sm:left-24 opacity-30"
        >
          <DoodleFlower className="w-14 h-14 text-maroon" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.25, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-12 right-10 sm:right-28 opacity-30"
        >
          <DoodleHeart className="w-14 h-14 text-maroon" fill="#F7D6CF" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.2, 0.7, 0.2], y: [0, 8, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/6 opacity-25"
        >
          <DoodleMusicNote className="w-8 h-8 text-maroon" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.15, 0.65, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 left-1/5 opacity-25"
        >
          <DoodleSparkle className="w-6 h-6 text-maroon" />
        </motion.div>
      </div>

      {/* ── 1. HEADER (Top of viewport) ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-maroon-tint text-maroon font-mono text-xs font-semibold tracking-wider uppercase mb-1.5 shadow-sm">
          <Disc3 className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
          <span>{songs.sectionBadge}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-maroon tracking-tight leading-tight">
          {/* [PLAYLIST_TITLE] */}
          {songs.title}
        </h2>

        <p className="text-xs sm:text-base font-hand text-ink-muted mt-0.5 leading-snug">
          {/* [PLAYLIST_SUBTITLE] */}
          "{songs.subtitle}"
        </p>
      </motion.div>

      {/* ── 2. CENTERPIECE: DUAL VINYL SLEEVES / TICKET CARDS ── */}
      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-auto px-2">
        {/* ── CARD 1: ART GALLERY (Her First Song to Him) ── */}
        <motion.div
          initial={{ opacity: 0, x: -30, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-paper-card border border-paper-border rounded-3xl p-5 sm:p-6 shadow-paper-float flex flex-col justify-between group overflow-hidden"
        >
          {/* Top Washi Tape */}
          <div className="absolute -top-3 left-8 w-24 h-6 washi-tape rotate-[-2deg] rounded-sm z-20" />

          <div>
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-blush/70 border border-maroon/20 text-maroon text-[11px] font-bold font-sans tracking-wide mb-3">
              <Heart className="w-3 h-3 fill-maroon text-maroon" />
              <span>{songs.track1.tag}</span>
            </div>

            {/* Vinyl Record Sleeve Preview Area */}
            <div className="relative flex items-center justify-between gap-4 p-3.5 bg-paper rounded-2xl border border-paper-border/80 shadow-inner mb-3.5">
              {/* Sleeve Visual with Vinyl popping out */}
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                {/* Sliding Spinning Vinyl */}
                <motion.div
                  animate={{
                    x: activeTrack === 'track1' ? 24 : 0,
                    rotate: activeTrack === 'track1' ? 360 : 0,
                  }}
                  transition={{
                    x: { duration: 0.5, ease: 'easeOut' },
                    rotate: { duration: 3.5, repeat: Infinity, ease: 'linear' },
                  }}
                  className="absolute inset-0 z-0"
                >
                  <DoodleVinylRecord className="w-20 h-20" isSpinning={activeTrack === 'track1'} />
                </motion.div>

                {/* Sleeve Cover Face */}
                <div className="relative z-10 w-20 h-20 rounded-xl bg-pastel-blush/80 border border-maroon/30 shadow-md flex flex-col items-center justify-center p-2 text-center overflow-hidden">
                  <div className="text-[10px] font-mono font-bold text-maroon uppercase leading-tight">
                    MRLD
                  </div>
                  <DoodleHeart className="w-4 h-4 text-maroon mt-1" fill="#7A1C2B" />
                  <div className="text-[8px] font-serif italic text-ink-muted mt-1">
                    Art Gallery
                  </div>
                </div>
              </div>

              {/* Title & Artist */}
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-maroon leading-snug line-clamp-2">
                  {/* [SONG_1_TITLE] */}
                  {songs.track1.title}
                </h3>
                <div className="text-xs font-sans font-semibold text-ink-muted mt-0.5">
                  {/* [SONG_1_ARTIST] */}
                  {songs.track1.artist}
                </div>

                {/* Live Waveform Indicator when playing */}
                {activeTrack === 'track1' && (
                  <div className="flex items-center gap-1 mt-2">
                    {[0.6, 1, 0.4, 0.9, 0.7, 1.2, 0.5].map((scale, i) => (
                      <motion.span
                        key={i}
                        animate={{ scaleY: [0.3, scale, 0.3] }}
                        transition={{
                          duration: 0.6 + i * 0.1,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="w-1 h-3.5 bg-maroon rounded-full origin-bottom inline-block"
                      />
                    ))}
                    <span className="text-[10px] font-mono text-maroon font-bold ml-1.5 uppercase">
                      Playing Clip
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Handwritten Quote Caption */}
            <p className="text-sm font-hand text-ink leading-relaxed px-1">
              "{songs.track1.caption}"
            </p>
          </div>

          {/* Action Buttons (Play Preview + Spotify Link) */}
          <div className="flex items-center justify-between gap-3 mt-4 pt-3.5 border-t border-paper-border/70">
            {/* Play/Pause Button */}
            <button
              onClick={() => handleTogglePlay('track1')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-tactile cursor-pointer hover:scale-105 active:scale-95 ${
                activeTrack === 'track1'
                  ? 'bg-maroon text-paper'
                  : 'bg-paper text-maroon border border-maroon/40 hover:bg-maroon-tint'
              }`}
            >
              {activeTrack === 'track1' ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause Clip</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Best Part Preview</span>
                </>
              )}
            </button>

            {/* Spotify External Pill */}
            <a
              href={songs.track1.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-paper hover:bg-paper-light border border-paper-border text-ink-muted hover:text-green-700 text-xs font-mono font-medium transition-all shadow-xs group/spot"
            >
              <Music className="w-3.5 h-3.5 text-green-600 group-hover/spot:scale-110 transition-transform" />
              <span>Spotify</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </motion.div>

        {/* ── CARD 2: MY NAME (Costa's Pick / Signature Song) ── */}
        <motion.div
          initial={{ opacity: 0, x: 30, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-paper-card border border-paper-border rounded-3xl p-5 sm:p-6 shadow-paper-float flex flex-col justify-between group overflow-hidden"
        >
          {/* Top Washi Tape */}
          <div className="absolute -top-3 right-8 w-24 h-6 washi-tape rotate-[2deg] rounded-sm z-20" />

          <div>
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-butter/70 border border-maroon/20 text-maroon text-[11px] font-bold font-sans tracking-wide mb-3">
              <Heart className="w-3 h-3 fill-maroon text-maroon" />
              <span>{songs.track2.tag}</span>
            </div>

            {/* Vinyl Record Sleeve Preview Area */}
            <div className="relative flex items-center justify-between gap-4 p-3.5 bg-paper rounded-2xl border border-paper-border/80 shadow-inner mb-3.5">
              {/* Sleeve Visual with Vinyl popping out */}
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                {/* Sliding Spinning Vinyl */}
                <motion.div
                  animate={{
                    x: activeTrack === 'track2' ? 24 : 0,
                    rotate: activeTrack === 'track2' ? 360 : 0,
                  }}
                  transition={{
                    x: { duration: 0.5, ease: 'easeOut' },
                    rotate: { duration: 3.5, repeat: Infinity, ease: 'linear' },
                  }}
                  className="absolute inset-0 z-0"
                >
                  <DoodleVinylRecord className="w-20 h-20" isSpinning={activeTrack === 'track2'} />
                </motion.div>

                {/* Sleeve Cover Face */}
                <div className="relative z-10 w-20 h-20 rounded-xl bg-pastel-butter/90 border border-maroon/30 shadow-md flex flex-col items-center justify-center p-2 text-center overflow-hidden">
                  <div className="text-[10px] font-mono font-bold text-maroon uppercase leading-tight">
                    REED
                  </div>
                  <DoodleMusicNote className="w-4 h-4 text-maroon mt-1" />
                  <div className="text-[8px] font-serif italic text-ink-muted mt-1">
                    My Name
                  </div>
                </div>
              </div>

              {/* Title & Artist */}
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-maroon leading-snug line-clamp-2">
                  {/* [SONG_2_TITLE] */}
                  {songs.track2.title}
                </h3>
                <div className="text-xs font-sans font-semibold text-ink-muted mt-0.5">
                  {/* [SONG_2_ARTIST] */}
                  {songs.track2.artist}
                </div>

                {/* Live Waveform Indicator when playing */}
                {activeTrack === 'track2' && (
                  <div className="flex items-center gap-1 mt-2">
                    {[0.6, 1, 0.4, 0.9, 0.7, 1.2, 0.5].map((scale, i) => (
                      <motion.span
                        key={i}
                        animate={{ scaleY: [0.3, scale, 0.3] }}
                        transition={{
                          duration: 0.6 + i * 0.1,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="w-1 h-3.5 bg-maroon rounded-full origin-bottom inline-block"
                      />
                    ))}
                    <span className="text-[10px] font-mono text-maroon font-bold ml-1.5 uppercase">
                      Playing Clip
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Handwritten Quote Caption */}
            <p className="text-sm font-hand text-ink leading-relaxed px-1">
              "{songs.track2.caption}"
            </p>
          </div>

          {/* Action Buttons (Play Preview + Spotify Link) */}
          <div className="flex items-center justify-between gap-3 mt-4 pt-3.5 border-t border-paper-border/70">
            {/* Play/Pause Button */}
            <button
              onClick={() => handleTogglePlay('track2')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-tactile cursor-pointer hover:scale-105 active:scale-95 ${
                activeTrack === 'track2'
                  ? 'bg-maroon text-paper'
                  : 'bg-paper text-maroon border border-maroon/40 hover:bg-maroon-tint'
              }`}
            >
              {activeTrack === 'track2' ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause Clip</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Best Part Preview</span>
                </>
              )}
            </button>

            {/* Spotify External Pill */}
            <a
              href={songs.track2.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-paper hover:bg-paper-light border border-paper-border text-ink-muted hover:text-green-700 text-xs font-mono font-medium transition-all shadow-xs group/spot"
            >
              <Music className="w-3.5 h-3.5 text-green-600 group-hover/spot:scale-110 transition-transform" />
              <span>Spotify</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── 3. BOTTOM FOOTER ROMANTIC NOTE ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 flex items-center justify-between w-full max-w-4xl px-2 text-[11px] font-mono text-ink-muted"
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-maroon animate-pulse" />
          <span>listening together... forever</span>
        </div>

        <div className="flex items-center gap-1.5 font-hand text-sm text-maroon font-bold">
          <span>our playlist on repeat forever</span>
          <Heart className="w-3.5 h-3.5 fill-maroon text-maroon inline" />
        </div>
      </motion.div>
    </div>
  );
};
