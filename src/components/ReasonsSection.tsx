import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';
import { SITE_CONTENT } from '../config/content';
import { REASONS_LIST, FINALE_REASON } from '../data/reasons';
import {
  DoodleHeart,
  DoodleFlower,
  DoodleUnderline,
} from './Doodles';

interface ReasonsSectionProps {
  onPrevScene?: () => void;
  onNextScene?: () => void;
}

// Preset scatter coordinates for desktop constellation (percentage-based)
// Carefully placed in a halo around the canvas, leaving the center open for the Finale!
const SCATTER_POSITIONS = [
  // Top band (0 - 6)
  { x: 3, y: 3, rot: -2, bg: 'bg-paper-card' },
  { x: 17, y: 5, rot: 2.5, bg: 'bg-pastel-blush/70' },
  { x: 32, y: 2, rot: -1.5, bg: 'bg-pastel-butter/70' },
  { x: 49, y: 4, rot: 3, bg: 'bg-paper-card' },
  { x: 65, y: 2, rot: -2.5, bg: 'bg-pastel-lavender/70' },
  { x: 79, y: 5, rot: 1.5, bg: 'bg-pastel-sage/70' },
  { x: 92, y: 3, rot: -3, bg: 'bg-pastel-blush/70' },

  // Left flank (7 - 12)
  { x: 2, y: 22, rot: 2, bg: 'bg-pastel-sky/70' },
  { x: 13, y: 27, rot: -2, bg: 'bg-paper-card' },
  { x: 2, y: 43, rot: -3, bg: 'bg-pastel-butter/70' },
  { x: 12, y: 53, rot: 2.5, bg: 'bg-pastel-lavender/70' },
  { x: 2, y: 65, rot: 1, bg: 'bg-paper-card' },
  { x: 13, y: 75, rot: -2.5, bg: 'bg-pastel-blush/70' },

  // Right flank (13 - 18)
  { x: 86, y: 21, rot: -2, bg: 'bg-pastel-butter/70' },
  { x: 94, y: 34, rot: 3, bg: 'bg-paper-card' },
  { x: 85, y: 46, rot: -1.5, bg: 'bg-pastel-blush/70' },
  { x: 94, y: 58, rot: 2, bg: 'bg-pastel-sky/70' },
  { x: 86, y: 70, rot: -3, bg: 'bg-pastel-sage/70' },
  { x: 94, y: 82, rot: 1.5, bg: 'bg-paper-card' },

  // Bottom band (19 - 25)
  { x: 3, y: 88, rot: 2, bg: 'bg-pastel-lavender/70' },
  { x: 18, y: 91, rot: -2.5, bg: 'bg-paper-card' },
  { x: 32, y: 89, rot: 1.5, bg: 'bg-pastel-blush/70' },
  { x: 48, y: 92, rot: -1, bg: 'bg-pastel-butter/70' },
  { x: 63, y: 88, rot: 3, bg: 'bg-paper-card' },
  { x: 77, y: 91, rot: -2, bg: 'bg-pastel-sky/70' },
  { x: 88, y: 93, rot: 2.5, bg: 'bg-pastel-lavender/70' },

  // Inner framing halo (26 - 33)
  { x: 26, y: 16, rot: 1, bg: 'bg-paper-card' },
  { x: 71, y: 17, rot: -2, bg: 'bg-pastel-blush/70' },
  { x: 22, y: 37, rot: -1.5, bg: 'bg-pastel-sage/70' },
  { x: 76, y: 36, rot: 2.5, bg: 'bg-pastel-butter/70' },
  { x: 24, y: 62, rot: 2, bg: 'bg-paper-card' },
  { x: 74, y: 61, rot: -1, bg: 'bg-pastel-lavender/70' },
  { x: 38, y: 80, rot: -2.5, bg: 'bg-pastel-sage/70' },
  { x: 60, y: 80, rot: 1.5, bg: 'bg-paper-card' },
];

export const ReasonsSection: React.FC<ReasonsSectionProps> = () => {
  const { reasons } = SITE_CONTENT;
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [showFinale, setShowFinale] = useState<boolean>(false);
  const [activeReasonIndex, setActiveReasonIndex] = useState<number | null>(null);
  const [replayKey, setReplayKey] = useState<number>(0);

  const totalReasons = REASONS_LIST.length;

  // Staggered sequential reveal timer
  useEffect(() => {
    setRevealedCount(0);
    setShowFinale(false);
    setActiveReasonIndex(null);

    let current = 0;
    const intervalTime = 75; // Fast and smooth ~75ms per tag = ~2.5s for all 34

    const timer = window.setInterval(() => {
      current++;
      setRevealedCount(current);

      if (current >= totalReasons) {
        window.clearInterval(timer);
        // Trigger the grand finale right after the last tag floats in
        window.setTimeout(() => {
          setShowFinale(true);
        }, 350);
      }
    }, intervalTime);

    return () => {
      window.clearInterval(timer);
    };
  }, [replayKey, totalReasons]);

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  return (
    <div className="relative w-full h-full min-h-screen max-h-screen flex flex-col justify-between items-center px-3 sm:px-8 py-3 sm:py-7 overflow-hidden select-none bg-paper/60">
      {/* ── Ambient Floating Doodles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <motion.div
          animate={{ rotate: [0, 10, 0], y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-6 sm:left-20 opacity-30"
        >
          <DoodleFlower className="w-14 h-14 text-maroon" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 right-8 sm:right-24 opacity-30"
        >
          <DoodleHeart className="w-14 h-14 text-maroon" fill="#F7D6CF" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -10, 0], y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-1/3 right-1/12 opacity-25"
        >
          <DoodleFlower className="w-10 h-10 text-maroon" />
        </motion.div>
      </div>

      {/* ── 1. HEADER (Top of viewport) ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-maroon-tint text-maroon font-mono text-xs font-semibold tracking-wider uppercase mb-1 shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-maroon text-maroon" />
          <span>{reasons.sectionBadge}</span>
        </div>

        <h2 className="text-2xl sm:text-5xl font-serif font-bold text-maroon tracking-tight leading-tight">
          {/* [REASONS_TITLE] */}
          {reasons.title}
        </h2>

        <p className="text-xs sm:text-base font-hand text-ink-muted mt-0.5 leading-snug">
          {/* [REASONS_SUBTITLE] */}
          "{reasons.subtitle}"
        </p>
      </motion.div>

      {/* ── 2. CENTERPIECE: FLOATING STAGGERED TAGS CONSTELLATION + FINALE ── */}
      <div className="relative z-10 w-full max-w-5xl h-[58vh] sm:h-[68vh] my-auto flex items-center justify-center">
        {/* ── DESKTOP SCATTERED CONSTELLATION CANVAS (hidden on mobile, visible sm+) ── */}
        <div className="hidden sm:block absolute inset-0 w-full h-full">
          {REASONS_LIST.map((reason, index) => {
            const isRevealed = index < revealedCount;
            const pos = SCATTER_POSITIONS[index % SCATTER_POSITIONS.length];
            const isHovered = activeReasonIndex === index;

            // Vary floating duration organically
            const floatDuration = 4.5 + (index % 5) * 0.6;
            const floatDelay = (index % 7) * 0.25;

            return (
              <AnimatePresence key={`scatter-${replayKey}-${index}`}>
                {isRevealed && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.4,
                      y: 20,
                    }}
                    animate={{
                      opacity: showFinale ? (isHovered ? 1 : 0.42) : 1,
                      scale: isHovered ? 1.12 : 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      position: 'absolute',
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: isHovered ? 35 : 15,
                    }}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveReasonIndex(index)}
                    onMouseLeave={() => setActiveReasonIndex(null)}
                    onClick={() => setActiveReasonIndex(index)}
                  >
                    {/* Gentle continuous bobbing animation */}
                    <motion.div
                      animate={{
                        y: [0, -3.5, 0, 3.5, 0],
                        rotate: [pos.rot, pos.rot + 1, pos.rot, pos.rot - 1, pos.rot],
                      }}
                      transition={{
                        duration: floatDuration,
                        delay: floatDelay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-xl border border-paper-border/90 shadow-paper hover:shadow-paper-float transition-all duration-300 ${
                        pos.bg
                      } ${
                        isHovered
                          ? 'border-maroon ring-2 ring-maroon/20 bg-paper-card shadow-paper-lg'
                          : ''
                      }`}
                    >
                      {/* Number (#) in mono maroon */}
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold text-maroon opacity-85">
                        ({index + 1})
                      </span>

                      {/* Reason text in warm serif font */}
                      <span className="text-xs sm:text-[13px] font-serif font-medium text-ink tracking-tight whitespace-nowrap">
                        {reason}
                      </span>

                      {/* Little heart accent when hovered */}
                      {isHovered && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-block ml-0.5"
                        >
                          <Heart className="w-3 h-3 fill-maroon text-maroon inline" />
                        </motion.span>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {/* ── MOBILE RESPONSIVE SCATTER CLOUD (visible <sm, scrollable/wrapped cloud) ── */}
        <div className="sm:hidden absolute inset-0 w-full h-full flex flex-wrap content-start justify-center gap-1.5 p-2 overflow-y-auto no-scrollbar pb-24">
          {REASONS_LIST.map((reason, index) => {
            const isRevealed = index < revealedCount;
            const pos = SCATTER_POSITIONS[index % SCATTER_POSITIONS.length];
            const isHovered = activeReasonIndex === index;

            return (
              <AnimatePresence key={`mobile-${replayKey}-${index}`}>
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                    animate={{
                      opacity: showFinale ? (isHovered ? 1 : 0.4) : 1,
                      scale: 1,
                      y: 0,
                    }}
                    transition={{ duration: 0.35 }}
                    onClick={() => setActiveReasonIndex(index)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border border-paper-border text-[11px] shadow-xs cursor-pointer ${
                      pos.bg
                    } ${isHovered ? 'border-maroon ring-1 ring-maroon/30' : ''}`}
                    style={{ transform: `rotate(${pos.rot * 0.6}deg)` }}
                  >
                    <span className="font-mono font-bold text-maroon text-[9px]">
                      ({index + 1})
                    </span>
                    <span className="font-serif font-medium text-ink">{reason}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {/* ── 3. GRAND FINALE CENTERPIECE: "YOU ARE HOME" ── */}
        <AnimatePresence>
          {showFinale && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 25 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
              className="relative z-30 max-w-sm sm:max-w-md w-full mx-auto text-center"
            >
              {/* Centerpiece Paper Card */}
              <div className="relative bg-paper-card border-2 border-maroon/40 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-paper-float overflow-hidden">
                {/* Top Center Washi Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape rotate-[-1deg] rounded-sm z-20" />

                {/* Subtle background glow circle */}
                <div className="absolute inset-0 bg-gradient-to-b from-maroon-tint/40 via-transparent to-pastel-blush/20 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center justify-center">
                  {/* Heart Icon Badge */}
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-12 h-12 rounded-full bg-maroon-tint border border-maroon/30 flex items-center justify-center text-maroon mb-3 shadow-inner"
                  >
                    <DoodleHeart className="w-7 h-7 text-maroon" fill="#7A1C2B" />
                  </motion.div>

                  {/* Finale Tag Label */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pastel-blush/80 border border-maroon/20 text-maroon font-mono text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Heart className="w-3 h-3 fill-maroon text-maroon" />
                    <span>The Ultimate Reason</span>
                  </div>

                  {/* "YOU ARE HOME" Title */}
                  <h3 className="text-2xl sm:text-5xl font-serif font-bold text-maroon tracking-tight leading-tight capitalize my-1">
                    {/* [FINALE_REASON] */}
                    "{FINALE_REASON}"
                  </h3>

                  {/* Doodle Underline */}
                  <DoodleUnderline className="w-44 h-4 text-maroon -mt-1 mb-2 opacity-80" color="#7A1C2B" />

                  {/* Emotional Subtext */}
                  <p className="text-xs sm:text-sm font-hand text-ink leading-relaxed max-w-xs mx-auto">
                    Out of all the reasons in the world... being with you is where my heart belongs forever.
                  </p>

                  {/* Replay Button */}
                  <button
                    onClick={handleReplay}
                    className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-paper hover:bg-maroon-tint border border-paper-border hover:border-maroon/30 text-ink-muted hover:text-maroon text-xs font-mono font-medium transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
                    title="Replay reasons cascade"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Replay Sequence</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 4. BOTTOM FOOTER BAR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 flex items-center justify-between w-full max-w-4xl px-2 text-[11px] font-mono text-ink-muted"
      >
        <div className="flex items-center gap-1.5">
          {showFinale ? (
            <>
              <Heart className="w-3.5 h-3.5 fill-maroon text-maroon inline" />
              <span>there are infinite reasons why i love you... babe</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-maroon animate-pulse" />
              <span>
                Revealing {revealedCount} of {totalReasons}...
              </span>
            </>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-1.5 font-hand text-sm text-maroon font-bold">
          <span>forever yours, honey</span>
          <Heart className="w-3.5 h-3.5 fill-maroon text-maroon inline" />
        </div>
      </motion.div>
    </div>
  );
};
