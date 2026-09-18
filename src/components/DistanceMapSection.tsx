import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Clock, MapPin, Heart } from 'lucide-react';
import { SITE_CONTENT } from '../config/content';
import { MinimalWorldMap } from './MinimalWorldMap';
import {
  DoodleHeart,
  DoodleSparkle,
  DoodleFlower,
} from './Doodles';

interface DistanceMapSectionProps {
  onPrevScene?: () => void;
  onNextScene?: () => void;
}

export const DistanceMapSection: React.FC<DistanceMapSectionProps> = () => {
  const { me, her, approxDistanceKm, timeDifferenceHours } = SITE_CONTENT.locations;

  return (
    <div className="relative w-full h-full min-h-screen max-h-screen flex flex-col justify-between items-center px-4 sm:px-8 py-6 sm:py-10 overflow-hidden select-none bg-paper/70">
      {/* ── Ambient Background Floating Doodles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <motion.div
          animate={{ rotate: [0, 8, 0], y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 right-8 sm:right-20 opacity-30"
        >
          <DoodleFlower className="w-14 h-14 text-maroon" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-12 left-6 sm:left-16 opacity-30"
        >
          <DoodleHeart className="w-12 h-12 text-maroon" fill="#F7D6CF" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/5 opacity-25"
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
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-maroon-tint text-maroon font-mono text-xs font-semibold tracking-wider uppercase mb-2 shadow-sm">
          <Compass className="w-3.5 h-3.5" />
          <span>Across The Distance</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-maroon tracking-tight leading-tight flex items-center justify-center gap-2 sm:gap-3.5">
          <span>{me.city}</span>
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-maroon text-maroon inline" />
          <span>{her.city}</span>
        </h2>

        <p className="text-xs sm:text-base font-hand text-ink-muted mt-1 leading-snug">
          {/* [MAP_SUBTITLE] */}
          "{SITE_CONTENT.placeholders.mapSubtitle}"
        </p>
      </motion.div>

      {/* ── 2. CENTERPIECE: TACTILE MAP CARD WITH MINIMAL WORLD MAP & AVATARS ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl bg-paper-card border border-paper-border rounded-3xl p-4 sm:p-7 shadow-paper-float overflow-hidden my-auto flex flex-col justify-between"
      >
        {/* Washi Tape accents */}
        <div className="absolute -top-3 left-10 w-24 h-6 washi-tape rotate-[-2deg] rounded-sm z-20" />
        <div className="absolute -top-3 right-10 w-24 h-6 washi-tape rotate-[2deg] rounded-sm z-20" />

        {/* ── EMBEDDED MINIMAL WORLD MAP BACKGROUND ── */}
        <div className="relative w-full h-44 sm:h-64 md:h-72 rounded-2xl bg-paper border border-paper-border/60 overflow-hidden flex items-center justify-center p-2 shadow-inner">
          <MinimalWorldMap className="w-full h-full object-contain" />

          {/* Central Distance Badge floating over the map */}
          <motion.div
            initial={{ scale: 0, rotate: -6 }}
            animate={{ scale: 1, rotate: -1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.4 }}
            className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 bg-paper-card/95 backdrop-blur-md rounded-xl border border-maroon/30 shadow-tactile text-center"
          >
            <div className="flex items-center justify-center text-xs font-mono font-bold text-maroon tracking-wider">
              {/* [DISTANCE_KM] */}
              <span>{approxDistanceKm.toLocaleString()} KM APART</span>
            </div>
            <div className="flex items-center justify-center gap-1 text-[11px] font-hand text-ink-muted mt-0.5">
              <span>not a single kilometer matters</span>
              <Heart className="w-3 h-3 fill-maroon text-maroon inline" />
            </div>
          </motion.div>
        </div>

        {/* ── TWO AVATARS & LOCATION STATS STRIP ── */}
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-paper-border/70 items-center">
          {/* Costa (Cairo) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3"
          >
            {/* Circled Avatar */}
            <div className="relative shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-paper border-2 border-maroon/40 shadow-sm overflow-hidden">
                {/* [ASSET_ME2] */}
                <img
                  src={SITE_CONTENT.assets.me2}
                  alt={`${SITE_CONTENT.couple.yourName} in ${me.city}`}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = SITE_CONTENT.assets.me;
                  }}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-maroon text-paper flex items-center justify-center shadow-xs">
                <MapPin className="w-3 h-3" />
              </div>
            </div>

            {/* Label */}
            <div>
              <div className="font-serif font-bold text-base sm:text-lg text-maroon leading-tight">
                {me.city}, {me.country}
              </div>
              <div className="text-[11px] sm:text-xs font-hand text-ink-muted font-bold">
                {SITE_CONTENT.couple.yourName} ({SITE_CONTENT.couple.yourNickname})
              </div>
              <div className="inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-full bg-paper border border-paper-border text-[10px] font-mono text-ink-muted">
                <Clock className="w-2.5 h-2.5 text-maroon" />
                <span>GMT+3</span>
              </div>
            </div>
          </motion.div>

          {/* Daria (Bukittinggi) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-end gap-3 text-right"
          >
            {/* Label */}
            <div>
              <div className="font-serif font-bold text-base sm:text-lg text-maroon leading-tight">
                {her.city}, {her.country}
              </div>
              <div className="text-[11px] sm:text-xs font-hand text-ink-muted font-bold">
                {SITE_CONTENT.couple.partnerName} ({SITE_CONTENT.couple.partnerNickname})
              </div>
              <div className="inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-full bg-paper border border-paper-border text-[10px] font-mono text-ink-muted">
                <Clock className="w-2.5 h-2.5 text-maroon" />
                <span>GMT+7 ({timeDifferenceHours}h ahead)</span>
              </div>
            </div>

            {/* Circled Avatar */}
            <div className="relative shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-paper border-2 border-maroon/40 shadow-sm overflow-hidden">
                {/* [ASSET_HER2] */}
                <img
                  src={SITE_CONTENT.assets.her2}
                  alt={`${SITE_CONTENT.couple.partnerName} in ${her.city}`}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = SITE_CONTENT.assets.her;
                  }}
                />
              </div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-maroon text-paper flex items-center justify-center shadow-xs">
                <MapPin className="w-3 h-3" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── 3. BOTTOM CHAPTER NAVIGATION / FOOTER HINT ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 flex items-center justify-between w-full max-w-4xl px-2 text-[11px] font-mono text-ink-muted"
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
          <span>Two locations, one heartbeat</span>
        </div>

        <div className="flex items-center gap-1.5 font-hand text-sm text-maroon font-bold">
          <span>{me.city}</span>
          <Heart className="w-3.5 h-3.5 fill-maroon text-maroon inline" />
          <span>{her.city}</span>
        </div>
      </motion.div>
    </div>
  );
};
