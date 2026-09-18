import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';
import { SITE_CONTENT } from '../config/content';
import { COMMON_LIST, FINALE_COMMON } from '../data/common';
import {
  DoodleHeart,
  DoodleFlower,
  DoodleUnderline,
} from './Doodles';

interface CommonSectionProps {
  onPrevScene?: () => void;
  onNextScene?: () => void;
}

// Preset constellation coordinates for the 10 items (percentage-based)
// Carefully scattered in an elliptical constellation around the center (50, 50)
const CONSTELLATION_NODES = [
  // 0: art love (Top Left)
  { x: 18, y: 15, rot: -3, bg: 'bg-pastel-blush/85' },
  // 1: movies (Top Center-Left)
  { x: 38, y: 10, rot: 2, bg: 'bg-pastel-butter/85' },
  // 2: kdrama (formerly 😭) (Top Center-Right)
  { x: 64, y: 11, rot: -2, bg: 'bg-pastel-lavender/85' },
  // 3: psychology (Top Right)
  { x: 84, y: 18, rot: 3, bg: 'bg-paper-card' },
  // 4: philosophy (Left Flank)
  { x: 11, y: 48, rot: -2.5, bg: 'bg-pastel-sky/85' },
  // 5: goals (Right Flank)
  { x: 89, y: 48, rot: 2.5, bg: 'bg-pastel-sage/85' },
  // 6: music taste (Bottom Left)
  { x: 16, y: 80, rot: 3, bg: 'bg-paper-card' },
  // 7: books (maybe? 😭) (Bottom Center-Left)
  { x: 36, y: 86, rot: -2, bg: 'bg-pastel-blush/85' },
  // 8: overthinking (of course) (Bottom Center-Right)
  { x: 66, y: 85, rot: 2, bg: 'bg-pastel-butter/85' },
  // 9: eating ice 😭😭 (Bottom Right)
  { x: 85, y: 78, rot: -3, bg: 'bg-pastel-lavender/85' },
];

// Structural constellation edges connecting related node indices
const CONSTELLATION_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [4, 6],
  [3, 5],
  [5, 9],
  [6, 7],
  [7, 8],
  [8, 9],
  [1, 4],
  [2, 5],
  [4, 7],
  [5, 8],
];

export const CommonSection: React.FC<CommonSectionProps> = () => {
  const { common } = SITE_CONTENT;
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [showFinale, setShowFinale] = useState<boolean>(false);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null);
  const [replayKey, setReplayKey] = useState<number>(0);

  const totalItems = COMMON_LIST.length;

  // Staggered sequential reveal timer for the constellation
  useEffect(() => {
    setRevealedCount(0);
    setShowFinale(false);
    setActiveNodeIndex(null);

    let current = 0;
    const intervalTime = 160; // 160ms per constellation node = ~1.6s for all 10

    const timer = window.setInterval(() => {
      current++;
      setRevealedCount(current);

      if (current >= totalItems) {
        window.clearInterval(timer);
        // Trigger "OUR HEARTS" centerpiece after all constellation stars light up
        window.setTimeout(() => {
          setShowFinale(true);
        }, 400);
      }
    }, intervalTime);

    return () => {
      window.clearInterval(timer);
    };
  }, [replayKey, totalItems]);

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  return (
    <div className="relative w-full h-full min-h-screen max-h-screen flex flex-col justify-between items-center px-3 sm:px-8 py-5 sm:py-7 overflow-hidden select-none bg-paper/60">
      {/* ── Ambient Background Floating Doodles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <motion.div
          animate={{ rotate: [0, -8, 0], y: [0, -10, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 right-10 sm:right-28 opacity-25"
        >
          <DoodleFlower className="w-14 h-14 text-maroon" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-12 left-8 sm:left-24 opacity-30"
        >
          <DoodleHeart className="w-14 h-14 text-maroon" fill="#F7D6CF" />
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
          <span>{common.sectionBadge}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-maroon tracking-tight leading-tight lowercase">
          {/* [COMMON_TITLE] */}
          {common.title}
        </h2>

        <p className="text-xs sm:text-base font-hand text-ink-muted mt-0.5 leading-snug">
          {/* [COMMON_SUBTITLE] */}
          "{common.subtitle}"
        </p>
      </motion.div>

      {/* ── 2. CENTERPIECE: CONSTELLATION WEB + "OUR HEARTS" FINALE ── */}
      <div className="relative z-10 w-full max-w-5xl h-[64vh] sm:h-[68vh] my-auto flex items-center justify-center">
        {/* ── DESKTOP CONSTELLATION CANVAS (hidden on mobile, visible sm+) ── */}
        <div className="hidden sm:block absolute inset-0 w-full h-full">
          {/* Constellation SVG Lines Canvas */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Inter-node connecting web threads */}
            {CONSTELLATION_EDGES.map(([fromIdx, toIdx], edgeIdx) => {
              const fromPos = CONSTELLATION_NODES[fromIdx];
              const toPos = CONSTELLATION_NODES[toIdx];
              const isVisible = fromIdx < revealedCount && toIdx < revealedCount;
              const isHighlighted = activeNodeIndex === fromIdx || activeNodeIndex === toIdx;

              if (!isVisible) return null;

              return (
                <motion.line
                  key={`edge-${replayKey}-${edgeIdx}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: isHighlighted ? 0.85 : showFinale ? 0.25 : 0.45,
                    strokeWidth: isHighlighted ? 0.6 : 0.35,
                  }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke="#7A1C2B"
                  strokeDasharray={isHighlighted ? 'none' : '1.5 1.5'}
                />
              );
            })}

            {/* Converging threads to center (50, 50) when Finale arrives */}
            {showFinale &&
              CONSTELLATION_NODES.map((node, nIdx) => {
                if (nIdx >= revealedCount) return null;
                const isHovered = activeNodeIndex === nIdx;
                return (
                  <motion.line
                    key={`converge-${replayKey}-${nIdx}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: isHovered ? 0.9 : 0.35,
                      strokeWidth: isHovered ? 0.7 : 0.35,
                    }}
                    transition={{ duration: 0.8, delay: nIdx * 0.05 }}
                    x1={node.x}
                    y1={node.y}
                    x2={50}
                    y2={50}
                    stroke="#7A1C2B"
                    strokeDasharray="2 2"
                  />
                );
              })}

            {/* Glowing star dots at node anchor positions */}
            {CONSTELLATION_NODES.map((pos, pIdx) => {
              if (pIdx >= revealedCount) return null;
              return (
                <motion.circle
                  key={`dot-${replayKey}-${pIdx}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: pIdx * 0.2 }}
                  cx={pos.x}
                  cy={pos.y}
                  r="0.5"
                  fill="#7A1C2B"
                  opacity="0.6"
                />
              );
            })}
          </svg>

          {/* Floating Sticker Nodes */}
          {COMMON_LIST.map((item, index) => {
            const isRevealed = index < revealedCount;
            const pos = CONSTELLATION_NODES[index % CONSTELLATION_NODES.length];
            const isHovered = activeNodeIndex === index;

            // Organic bobbing parameters
            const floatDuration = 4 + (index % 4) * 0.7;
            const floatDelay = (index % 5) * 0.3;

            return (
              <AnimatePresence key={`node-${replayKey}-${index}`}>
                {isRevealed && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.3,
                      y: 15,
                    }}
                    animate={{
                      opacity: showFinale ? (isHovered ? 1 : 0.45) : 1,
                      scale: isHovered ? 1.14 : 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
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
                    onMouseEnter={() => setActiveNodeIndex(index)}
                    onMouseLeave={() => setActiveNodeIndex(null)}
                    onClick={() => setActiveNodeIndex(index)}
                  >
                    {/* Gentle continuous float */}
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
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-paper-border/90 shadow-paper hover:shadow-paper-float transition-all duration-300 ${
                        pos.bg
                      } ${
                        isHovered
                          ? 'border-maroon ring-2 ring-maroon/20 bg-paper-card shadow-paper-lg scale-105'
                          : ''
                      }`}
                    >
                      {/* Little constellation star dot */}
                      <span className="w-1.5 h-1.5 rounded-full bg-maroon/70" />

                      {/* Common item text (with emojis preserved!) */}
                      <span className="text-xs sm:text-sm font-serif font-medium text-ink tracking-tight whitespace-nowrap">
                        {item}
                      </span>

                      {/* Heart accent on hover */}
                      {isHovered && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-block ml-0.5"
                        >
                          <Heart className="w-3.5 h-3.5 fill-maroon text-maroon inline" />
                        </motion.span>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {/* ── MOBILE RESPONSIVE WRAPPED CONSTELLATION CLOUD (visible <sm) ── */}
        <div className="sm:hidden absolute inset-0 w-full h-full flex flex-wrap content-start justify-center gap-2 p-3 overflow-y-auto no-scrollbar pb-24">
          {COMMON_LIST.map((item, index) => {
            const isRevealed = index < revealedCount;
            const pos = CONSTELLATION_NODES[index % CONSTELLATION_NODES.length];
            const isHovered = activeNodeIndex === index;

            return (
              <AnimatePresence key={`mobile-node-${replayKey}-${index}`}>
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                    animate={{
                      opacity: showFinale ? (isHovered ? 1 : 0.45) : 1,
                      scale: 1,
                      y: 0,
                    }}
                    transition={{ duration: 0.35 }}
                    onClick={() => setActiveNodeIndex(index)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-paper-border text-xs shadow-xs cursor-pointer ${
                      pos.bg
                    } ${isHovered ? 'border-maroon ring-1 ring-maroon/30 bg-paper-card' : ''}`}
                    style={{ transform: `rotate(${pos.rot * 0.6}deg)` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-maroon/70" />
                    <span className="font-serif font-medium text-ink">{item}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {/* ── 3. GRAND FINALE CENTERPIECE: "OUR HEARTS" + FLANKING HAND-HEARTS ── */}
        <AnimatePresence>
          {showFinale && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 25 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 22,
              }}
              className="relative z-30 max-w-4xl w-full mx-auto flex items-center justify-center gap-2 sm:gap-4 md:gap-6 px-1 sm:px-2"
            >
              {/* ── LEFT HAND-HEART POLAROID (Costa / heartme.jpeg) ── */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotate: -14, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, rotate: 4, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 20,
                  delay: 0.15,
                }}
                whileHover={{ scale: 1.08, rotate: 1, zIndex: 40 }}
                className="group relative cursor-pointer shrink-0"
              >
                {/* Continuous Gentle Floating Animation */}
                <motion.div
                  animate={{ y: [0, -4, 0, 4, 0], rotate: [4, 5.5, 4, 2.5, 4] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative bg-paper-card border border-paper-border/90 p-1.5 sm:p-2.5 pb-2.5 sm:pb-3.5 rounded-xl sm:rounded-2xl shadow-paper-float hover:shadow-paper-lg transition-all"
                >
                  {/* Top Washi Tape Strip */}
                  <div className="absolute -top-2 sm:-top-2.5 left-1/2 -translate-x-1/2 w-12 sm:w-20 h-3.5 sm:h-5 washi-tape rotate-[-3deg] rounded-xs shadow-xs z-10" />

                  {/* Photo Frame Container */}
                  <div className="relative w-16 h-20 sm:w-24 sm:h-32 md:w-30 md:h-38 rounded-lg sm:rounded-xl overflow-hidden bg-paper-border/30 border border-paper-border/60">
                    <img
                      src={SITE_CONTENT.assets.heartMe}
                      alt={`${SITE_CONTENT.couple.yourName}'s hand heart`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = SITE_CONTENT.assets.me;
                      }}
                    />
                    {/* Subtle warm tint overlay */}
                    <div className="absolute inset-0 bg-maroon-tint/10 pointer-events-none" />
                  </div>

                  {/* Handwritten Caption */}
                  <div className="mt-1 sm:mt-1.5 text-center">
                    <span className="font-hand font-bold text-[11px] sm:text-sm text-maroon block leading-tight">
                      his half 🤍
                    </span>
                    <span className="font-mono text-[8px] sm:text-[10px] text-ink-muted uppercase tracking-wider block">
                      {SITE_CONTENT.couple.yourName}
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* ── CENTERPIECE PAPER CARD: "OUR HEARTS" ── */}
              <div className="relative bg-paper-card border-2 border-maroon/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 shadow-paper-float overflow-hidden flex-1 max-w-[240px] sm:max-w-sm md:max-w-md">
                {/* Top Center Washi Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-5 sm:h-6 washi-tape rotate-[-1deg] rounded-sm z-20" />

                {/* Subtle warm background glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-maroon-tint/40 via-transparent to-pastel-blush/20 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  {/* Heart Icon Badge with gentle rhythmic beat */}
                  <motion.div
                    animate={{ scale: [1, 1.18, 1, 1.12, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-maroon-tint border border-maroon/30 flex items-center justify-center text-maroon mb-1.5 sm:mb-2 shadow-inner"
                  >
                    <DoodleHeart className="w-6 h-6 sm:w-7 sm:h-7 text-maroon" fill="#7A1C2B" />
                  </motion.div>

                  {/* Badge Label */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full bg-pastel-blush/80 border border-maroon/20 text-maroon font-mono text-[9px] sm:text-[11px] font-bold uppercase tracking-wider mb-1 sm:mb-1.5">
                    <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-maroon text-maroon" />
                    <span>The Ultimate Connection</span>
                  </div>

                  {/* "OUR HEARTS" Title */}
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-maroon tracking-tight leading-tight my-0.5 sm:my-1">
                    {/* [FINALE_COMMON] */}
                    "{FINALE_COMMON}"
                  </h3>

                  {/* Doodle Underline */}
                  <DoodleUnderline className="w-32 sm:w-44 h-3 sm:h-4 text-maroon -mt-0.5 mb-1 sm:mb-1.5 opacity-80" color="#7A1C2B" />

                  {/* Emotional Subtext */}
                  <p className="text-[11px] sm:text-xs md:text-sm font-hand text-ink leading-relaxed max-w-[210px] sm:max-w-xs mx-auto">
                    Out of all the interests, jokes, and quirks we share... it is our hearts that belong to one another forever.
                  </p>

                  {/* Replay Constellation Button */}
                  <button
                    onClick={handleReplay}
                    className="mt-2.5 sm:mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-paper hover:bg-maroon-tint border border-paper-border hover:border-maroon/30 text-ink-muted hover:text-maroon text-[11px] sm:text-xs font-mono font-medium transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
                    title="Replay constellation sequence"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Replay Constellation</span>
                  </button>
                </div>
              </div>

              {/* ── RIGHT HAND-HEART POLAROID (Daria / hearther.jpeg) ── */}
              <motion.div
                initial={{ opacity: 0, x: 50, rotate: 14, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, rotate: -4, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 20,
                  delay: 0.15,
                }}
                whileHover={{ scale: 1.08, rotate: -1, zIndex: 40 }}
                className="group relative cursor-pointer shrink-0"
              >
                {/* Continuous Gentle Floating Animation */}
                <motion.div
                  animate={{ y: [0, 4, 0, -4, 0], rotate: [-4, -2.5, -4, -5.5, -4] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative bg-paper-card border border-paper-border/90 p-1.5 sm:p-2.5 pb-2.5 sm:pb-3.5 rounded-xl sm:rounded-2xl shadow-paper-float hover:shadow-paper-lg transition-all"
                >
                  {/* Top Washi Tape Strip */}
                  <div className="absolute -top-2 sm:-top-2.5 left-1/2 -translate-x-1/2 w-12 sm:w-20 h-3.5 sm:h-5 washi-tape rotate-[3deg] rounded-xs shadow-xs z-10" />

                  {/* Photo Frame Container */}
                  <div className="relative w-16 h-20 sm:w-24 sm:h-32 md:w-30 md:h-38 rounded-lg sm:rounded-xl overflow-hidden bg-paper-border/30 border border-paper-border/60">
                    <img
                      src={SITE_CONTENT.assets.heartHer}
                      alt={`${SITE_CONTENT.couple.partnerName}'s hand heart`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = SITE_CONTENT.assets.her;
                      }}
                    />
                    {/* Subtle warm tint overlay */}
                    <div className="absolute inset-0 bg-maroon-tint/10 pointer-events-none" />
                  </div>

                  {/* Handwritten Caption */}
                  <div className="mt-1 sm:mt-1.5 text-center">
                    <span className="font-hand font-bold text-[11px] sm:text-sm text-maroon block leading-tight">
                      her half 🤍
                    </span>
                    <span className="font-mono text-[8px] sm:text-[10px] text-ink-muted uppercase tracking-wider block">
                      {SITE_CONTENT.couple.partnerName}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
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
              <span>connected in every single way... babe</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-maroon animate-pulse" />
              <span>
                Connecting {revealedCount} of {totalItems} stars...
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5 font-hand text-sm text-maroon font-bold">
          <span>forever yours, honey</span>
          <Heart className="w-3.5 h-3.5 fill-maroon text-maroon inline" />
        </div>
      </motion.div>
    </div>
  );
};
