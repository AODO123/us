import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Heart } from 'lucide-react';
import { LETTER_DATA } from '../data/letter';
import {
  DoodleHeart,
  DoodleFlower,
  DoodlePlane,
} from './Doodles';

interface FinalLetterSectionProps {
  onPrevScene?: () => void;
  onGoToScene?: (sceneIndex: number) => void;
}

export const FinalLetterSection: React.FC<FinalLetterSectionProps> = ({
  onGoToScene,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const letterScrollRef = useRef<HTMLDivElement>(null);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
  };

  const handleReseal = () => {
    setIsOpen(false);
    if (letterScrollRef.current) {
      letterScrollRef.current.scrollTop = 0;
    }
  };

  // Prevent wheel events inside the letter content from triggering global scene transitions
  const handleLetterWheel = (e: React.WheelEvent) => {
    const el = letterScrollRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const isScrollable = scrollHeight > clientHeight;

    if (isScrollable) {
      const atTop = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 2 && e.deltaY > 0;

      // Stop propagation unless we are already at absolute top scrolling up or bottom scrolling down
      if (!atTop && !atBottom) {
        e.stopPropagation();
      }
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen max-h-screen flex flex-col justify-between items-center px-3 sm:px-6 py-3 sm:py-7 overflow-hidden select-none bg-paper/75">
      {/* ── Ambient Background Floating Doodles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <motion.div
          animate={{ rotate: [0, 8, 0], y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-8 sm:right-24 opacity-30"
        >
          <DoodleFlower className="w-14 h-14 text-maroon" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-12 left-6 sm:left-20 opacity-30"
        >
          <DoodleHeart className="w-12 h-12 text-maroon" fill="#F7D6CF" />
        </motion.div>
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 sm:left-28 opacity-25"
        >
          <DoodlePlane className="w-24 h-14" strokeColor="#7A1C2B" />
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
          <DoodleHeart className="w-3.5 h-3.5 text-maroon fill-maroon" />
          <span>{LETTER_DATA.badge}</span>
        </div>

        <h2 className="text-2xl sm:text-5xl font-serif font-bold text-maroon tracking-tight leading-tight">
          {LETTER_DATA.title}
        </h2>

        <p className="text-xs sm:text-base font-hand text-ink-muted mt-0.5 leading-snug">
          "{LETTER_DATA.subtitle}"
        </p>
      </motion.div>

      {/* ── 2. CENTERPIECE: ENVELOPE / UNFOLDED LETTER ── */}
      <div className="relative z-20 w-full max-w-4xl h-[62vh] sm:h-[70vh] my-auto flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ── STATE A: CLOSED VINTAGE ENVELOPE WITH WAX SEAL ── */
            <motion.div
              key="closed-envelope"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg mx-auto flex flex-col items-center"
            >
              {/* Envelope Body Card */}
              <div
                onClick={handleOpenEnvelope}
                className="group relative w-full bg-[#FAF5EE] border-2 border-paper-border rounded-2xl p-4 sm:p-8 shadow-paper-float hover:shadow-paper-lg cursor-pointer transition-all duration-300 overflow-hidden"
              >
                {/* Washi tape on corners */}
                <div className="absolute -top-3 left-8 w-24 h-6 washi-tape rotate-[-3deg] rounded-sm z-20" />
                <div className="absolute -top-3 right-8 w-24 h-6 washi-tape rotate-[3deg] rounded-sm z-20" />

                {/* Airmail Vintage Border Accent */}
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-maroon via-pastel-blush to-maroon opacity-70" />

                {/* Big Heart on top-right */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-6">
                  <DoodleHeart className="w-10 h-10 sm:w-14 sm:h-14 text-maroon fill-pastel-blush -rotate-12 drop-shadow-xs" fill="#F7D6CF" />
                </div>

                {/* Envelope Flap Fold Illusion */}
                <div className="relative z-10 pt-2 sm:pt-4 pb-4 sm:pb-8 flex flex-col items-center text-center">
                  <h3 className="font-hand font-bold text-xl sm:text-3xl text-maroon tracking-wide mb-2 sm:mb-3">
                    {LETTER_DATA.envelopeLabel}
                  </h3>

                  <p className="text-xs sm:text-sm font-serif italic text-ink-muted max-w-xs mb-4 sm:mb-8">
                    A handwritten letter from my heart, sealed exclusively for your eyes.
                  </p>

                  {/* ── 3D TACTILE WAX SEAL BUTTON ── */}
                  <div className="relative mt-2">
                    {/* Pulsing glow behind seal */}
                    <motion.div
                      animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 rounded-full bg-maroon blur-md"
                    />

                    {/* Wax Seal Circle */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleOpenEnvelope}
                      className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#8E2234] via-[#7A1C2B] to-[#59141F] text-paper-card border-4 border-[#9E2A3B]/40 shadow-tactile flex flex-col items-center justify-center cursor-pointer transition-transform"
                      aria-label="Break wax seal and read letter"
                    >
                      {/* Wax Stamp Rim Effect */}
                      <div className="absolute inset-1 rounded-full border border-white/20 pointer-events-none" />

                      {/* Monogram Seal */}
                      <span className="font-serif font-bold text-lg sm:text-xl tracking-wider text-[#FAF5EE] drop-shadow-sm">
                        {LETTER_DATA.sealText}
                      </span>
                      <DoodleHeart className="w-4 h-4 text-pastel-blush fill-pastel-blush mt-0.5" />
                    </motion.button>
                  </div>

                  {/* Gentle call to action hint */}
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="mt-4 sm:mt-6 inline-flex items-center gap-1.5 text-xs font-hand font-bold text-maroon bg-pastel-blush/60 px-3.5 py-1 rounded-full border border-maroon/20"
                  >
                    <span>Click the wax seal to open 💌</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── STATE B: UNFOLDED LETTER SHEET (SCROLLABLE CONTAINER) ── */
            <motion.div
              key="unfolded-letter"
              initial={{ opacity: 0, scaleY: 0.2, y: 30 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              exit={{ opacity: 0, scaleY: 0.2, y: 30 }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: 'top center' }}
              className="relative w-full max-w-3xl h-full bg-[#FAF7F2] border-2 border-paper-border/90 rounded-2xl sm:rounded-3xl shadow-paper-float flex flex-col overflow-hidden"
            >
              {/* Top Washi Tape accents holding the parchment */}
              <div className="absolute -top-3 left-12 w-28 h-6 washi-tape rotate-[-2deg] rounded-sm z-30 pointer-events-none" />
              <div className="absolute -top-3 right-12 w-28 h-6 washi-tape rotate-[2deg] rounded-sm z-30 pointer-events-none" />

              {/* Top Parchment Bar with Controls */}
              <div className="relative z-20 flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-paper-border/70 bg-[#FAF7F2]/90 backdrop-blur-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-maroon-tint border border-maroon/30 flex items-center justify-center">
                    <DoodleHeart className="w-4 h-4 text-maroon fill-maroon" />
                  </div>
                  <div>
                    <span className="text-xs font-serif font-bold text-maroon block leading-tight">
                      Costa to Daria
                    </span>
                    <span className="text-[10px] font-mono text-ink-muted block">
                      {LETTER_DATA.dateString}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleReseal}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-paper border border-paper-border hover:border-maroon/30 text-ink-muted hover:text-maroon text-xs font-mono transition-all shadow-xs cursor-pointer hover:scale-105"
                  title="Re-fold and seal letter"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Re-seal</span>
                </button>
              </div>

              {/* Scrollable Letter Content Container */}
              <div
                ref={letterScrollRef}
                onWheel={handleLetterWheel}
                className="relative z-10 flex-1 overflow-y-auto px-5 sm:px-10 md:px-14 py-6 sm:py-8 space-y-6 select-text custom-letter-scroll"
              >
                {/* Salutation */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="font-serif font-bold text-xl sm:text-2xl text-maroon tracking-tight"
                >
                  {LETTER_DATA.salutation}
                </motion.div>

                {/* Letter Body Paragraphs */}
                <div className="space-y-4 font-serif text-sm sm:text-base md:text-[17px] text-ink/90 leading-relaxed sm:leading-loose">
                  {LETTER_DATA.paragraphs.map((para, pIdx) => (
                    <motion.p
                      key={pIdx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + pIdx * 0.15, duration: 0.6 }}
                      className="indent-4 sm:indent-6"
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                {/* Handwritten Signature Block */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.6 }}
                  className="pt-4 border-t border-paper-border/60 flex flex-col items-end text-right"
                >
                  <div className="font-hand font-bold text-2xl sm:text-3xl text-maroon tracking-wide">
                    {LETTER_DATA.signatureName}
                  </div>
                  {LETTER_DATA.signatureSubtitle ? (
                    <div className="text-xs sm:text-sm font-mono text-ink-muted mt-0.5">
                      {LETTER_DATA.signatureSubtitle}
                    </div>
                  ) : null}
                </motion.div>

                {/* ── GRAND FINALE POSTSCRIPT WITH 5 UNIQUE DOODLE HEARTS ── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                  className="mt-6 p-4 sm:p-6 rounded-2xl bg-pastel-blush/40 border border-maroon/30 shadow-sm text-center relative overflow-hidden"
                >
                  {/* Subtle decorative tape */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-4 washi-tape rotate-[-1deg] rounded-xs" />

                  <div className="font-serif font-bold text-xl sm:text-3xl text-maroon tracking-wider uppercase mb-3">
                    {LETTER_DATA.postscript}
                  </div>

                  {/* ── 5 UNIQUE HAND-DRAWN HEARTS ── */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
                    {[0, 1, 2, 3, 4].map((hIndex) => (
                      <motion.div
                        key={`heart-${hIndex}`}
                        animate={{
                          scale: [1, 1.22, 1],
                          y: [0, -3, 0],
                        }}
                        transition={{
                          duration: 2.2,
                          delay: hIndex * 0.18,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="cursor-pointer"
                        title="Forever My Love"
                      >
                        <DoodleHeart
                          className="w-6 h-6 sm:w-8 sm:h-8 text-maroon fill-maroon drop-shadow-xs"
                          fill="#7A1C2B"
                        />
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-[11px] sm:text-xs font-mono text-ink-muted mt-2">
                    I won't let go ma wifey, we are forever
                  </p>
                </motion.div>

                {/* End of Letter Spacer */}
                <div className="h-4" />
              </div>

              {/* Bottom Subtle Navigation Bar within Letter */}
              {onGoToScene && (
                <div className="relative z-20 px-5 sm:px-8 py-2.5 bg-paper/60 border-t border-paper-border/60 flex items-center justify-between text-[11px] font-mono text-ink-muted">
                  <span>End of Chapter 07</span>
                  <button
                    onClick={() => onGoToScene(0)}
                    className="flex items-center gap-1 text-maroon hover:underline cursor-pointer font-medium"
                  >
                    <span>Back to Start (Forever Us)</span>
                    <Heart className="w-3 h-3 fill-maroon text-maroon inline" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 3. BOTTOM FOOTER BAR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 flex items-center justify-between w-full max-w-4xl px-2 text-[11px] font-mono text-ink-muted"
      >
        <div className="flex items-center gap-1.5">
          <DoodleHeart className="w-3.5 h-3.5 text-maroon fill-maroon" />
          <span>My Letter • Forever Mode</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 font-hand text-sm text-maroon font-bold">
          <span>Costa & Daria Forever</span>
          <Heart className="w-3.5 h-3.5 fill-maroon text-maroon inline" />
        </div>
      </motion.div>
    </div>
  );
};
