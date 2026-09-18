import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Check, X, Heart } from 'lucide-react';
import { SITE_CONTENT } from '../config/content';
import {
  DoodleHeart,
  DoodleFlower,
  DoodleSparkle,
} from './Doodles';
import { MascotMotif } from './MascotMotif';

interface GateScreenProps {
  onUnlock: () => void;
}

export const GateScreen: React.FC<GateScreenProps> = ({ onUnlock }) => {
  const [guiltIndex, setGuiltIndex] = useState<number>(-1);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState<number>(1);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const guiltTrips = SITE_CONTENT.gate.guiltTrips;

  // Trigger romantic pastel + maroon confetti burst
  const triggerConfetti = () => {
    // Center burst
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#7A1C2B', '#9E2A3B', '#F7D6CF', '#FBE8A6', '#D7E2D8', '#DFD7EC'],
      shapes: ['circle', 'square'],
      scalar: 1.2,
    });

    // Side bursts
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#7A1C2B', '#F7D6CF', '#FBE8A6'],
      });
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#7A1C2B', '#DFD7EC', '#D7E2D8'],
      });
    }, 150);
  };

  const handleYes = () => {
    triggerConfetti();
    setTimeout(() => {
      onUnlock();
    }, 550);
  };

  const handleNoInteraction = () => {
    setHasInteracted(true);
    // Cycle to next guilt trip
    setGuiltIndex((prev) => (prev + 1) % guiltTrips.length);

    // Grow the YES button
    setYesScale((prev) => Math.min(prev + 0.14, 1.65));

    // Dodge the NO button randomly within a bounding box
    const maxOffset = 75;
    const randomX = (Math.random() - 0.5) * maxOffset * 2;
    const randomY = (Math.random() - 0.5) * maxOffset * 1.5;
    setNoPosition({ x: randomX, y: randomY });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-paper/90 backdrop-blur-sm select-none">
      {/* Background Floating Doodles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-16 right-10 sm:right-24 opacity-40"
        >
          <DoodleFlower className="w-12 h-12 text-maroon" />
        </motion.div>

        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-24 right-16 opacity-40"
        >
          <DoodleSparkle className="w-6 h-6 text-maroon" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-12 opacity-35"
        >
          <DoodleHeart className="w-8 h-8 text-maroon" fill="#F7D6CF" />
        </motion.div>
      </div>

      {/* Main Physical Card */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: -30, filter: 'blur(6px)' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-paper-card border border-paper-border rounded-2xl shadow-paper-float p-6 sm:p-10 text-center"
      >
        {/* Top Washi Tape Strip */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 washi-tape rotate-[-2deg] rounded-sm z-20" />

        {/* Top Badge (Clean, no star emoji) */}
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-maroon-tint text-maroon text-xs font-semibold tracking-wider lowercase first-letter:uppercase mb-4">
          <span>{SITE_CONTENT.gate.badgeText}</span>
        </div>

        {/* Cute Mascot Duo */}
        <div className="my-2">
          <MascotMotif
            size="md"
            showSpeechBubble={guiltIndex === -1}
            speechText="Open me! 💌"
          />
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-maroon leading-tight mt-3 mb-2">
          {SITE_CONTENT.gate.headline}
        </h1>

        {/* Subhead */}
        <p className="text-ink-muted text-sm sm:text-base mb-6 font-sans">
          {SITE_CONTENT.gate.subhead}
        </p>

        {/* Playful Banner (Wifey / Husby or Guilt Trip message) */}
        <div className="min-h-[52px] flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            {guiltIndex >= 0 ? (
              <motion.div
                key={guiltIndex}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="px-4 py-2 bg-pastel-blush/60 border border-maroon/20 rounded-xl text-maroon font-hand text-lg sm:text-xl font-bold shadow-sm"
              >
                {guiltTrips[guiltIndex]}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-paper rounded-full border border-paper-border text-xs font-hand text-maroon font-bold text-base"
              >
                <span>{SITE_CONTENT.couple.partnerNickname.toLowerCase()}</span>
                <span className="text-red-500">❤️</span>
                <span>{SITE_CONTENT.couple.yourNickname.toLowerCase()}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive Action Buttons */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* YES Button (Grows larger, primary action) */}
          <motion.button
            onClick={handleYes}
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.05 }}
            whileTap={{ scale: yesScale * 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="relative z-10 w-full sm:w-auto px-7 py-3.5 bg-maroon text-paper-card font-sans font-bold text-base sm:text-lg rounded-xl shadow-tactile hover:bg-maroon-light transition-colors flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Check className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>{SITE_CONTENT.gate.yesButtonText}</span>
            {hasInteracted && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-yellow-300 ml-1"
              >
                ❤️
              </motion.span>
            )}
          </motion.button>

          {/* NO Button (Dodges away & triggers guilt trips) */}
          <motion.button
            onClick={handleNoInteraction}
            onMouseEnter={handleNoInteraction}
            animate={{
              x: noPosition.x,
              y: noPosition.y,
              rotate: noPosition.x ? (noPosition.x > 0 ? 6 : -6) : 0,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            className="w-full sm:w-auto px-5 py-3 bg-paper-aged text-ink-muted hover:text-maroon border border-paper-border font-sans font-medium text-sm sm:text-base rounded-xl hover:bg-paper-light transition-colors flex items-center justify-center gap-2 cursor-pointer select-none"
          >
            <X className="w-4 h-4 text-ink-muted" />
            <span>{SITE_CONTENT.gate.noButtonText}</span>
          </motion.button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-4 border-t border-paper-border/60 flex items-center justify-between text-[11px] text-ink-faint font-mono">
          <span>FOR: {SITE_CONTENT.couple.partnerNickname.toUpperCase()}</span>
          <span className="flex items-center gap-1">
            <span>FROM: {SITE_CONTENT.couple.yourNickname.toUpperCase()}</span>
            <Heart className="w-3 h-3 text-maroon fill-maroon inline" />
          </span>
        </div>
      </motion.div>
    </div>
  );
};
