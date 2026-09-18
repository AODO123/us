import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';
import { SITE_CONTENT } from '../config/content';
import { useTimeTogether } from '../hooks/useTimeTogether';
import {
  DoodleHeart,
  DoodleFlower,
  DoodleSparkle,
  DoodleUnderline,
} from './Doodles';
import { LeftMascot, RightMascot } from './MascotMotif';

interface HeroSectionProps {
  onScrollToNext?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToNext }) => {
  // ── [MEET_DATE] Live Ticking Counter ──────────────────────────────────────
  const timeTogether = useTimeTogether(SITE_CONTENT.couple.relationshipStartDate);

  return (
    <section className="relative w-full h-full min-h-screen max-h-screen flex flex-col justify-between items-center px-4 sm:px-8 py-6 sm:py-8 overflow-hidden select-none">
      {/* ── Ambient Background Parallax Doodles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Soft pastel flower */}
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-6 sm:left-20 opacity-35"
        >
          <DoodleFlower className="w-16 h-16 sm:w-20 sm:h-20 text-maroon" />
        </motion.div>

        {/* Floating Heart */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -12, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 right-8 sm:right-24 opacity-35"
        >
          <DoodleHeart className="w-14 h-14 sm:w-16 sm:h-16 text-maroon" fill="#F7D6CF" />
        </motion.div>

        {/* Twinkling Sparkles */}
        <motion.div
          animate={{ opacity: [0.2, 0.75, 0.2], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/5 opacity-30"
        >
          <DoodleSparkle className="w-6 h-6 text-maroon" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.15, 0.6, 0.15], scale: [1, 1.2, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/3 left-1/6 opacity-25"
        >
          <DoodleSparkle className="w-5 h-5 text-maroon" />
        </motion.div>
      </div>

      {/* ── TOP BADGE: FOREVER ME AND YOU ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative z-10 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper-card border border-paper-border text-maroon font-mono text-xs tracking-widest uppercase shadow-sm">
          <span>FOREVER.. ME AND YOU</span>
        </div>
      </motion.div>

      {/* ── CENTERPIECE: INTERTWINED NAMES, COUPLE PHOTO & LIVE COUNTER ── */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center justify-center my-auto w-full py-2 sm:py-3">
        {/* Couple Photo Snapshot ("us.png") Flanked by Cute Mascots */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-4 md:gap-6"
        >
          {/* Left Mascot (Costa Mochi with scarf) */}
          <motion.div
            animate={{
              y: [0, -4, 0],
              rotate: [-3, -1, -3],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 shrink-0"
          >
            <LeftMascot />
          </motion.div>

          {/* Centerpiece Photo Frame with Washi Tape */}
          <div className="relative group cursor-pointer">
            {/* Top Washi Tape */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 washi-tape rotate-[-1.5deg] rounded-xs z-20 pointer-events-none" />

            {/* Paper Frame */}
            <div className="relative p-1.5 sm:p-2 bg-paper-card border border-paper-border/90 rounded-2xl shadow-paper group-hover:shadow-paper-float group-hover:rotate-0 transition-all duration-300 transform -rotate-1">
              <img
                src={SITE_CONTENT.assets.us}
                alt={`${SITE_CONTENT.couple.yourName} & ${SITE_CONTENT.couple.partnerName}`}
                className="w-18 h-18 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-xl border border-paper-border/60"
              />
              {/* Heart Accent Badge */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-maroon-tint border border-maroon/30 flex items-center justify-center text-maroon shadow-xs">
                <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-maroon text-maroon" />
              </div>
            </div>
          </div>

          {/* Right Mascot (Daria Mochi with flower) */}
          <motion.div
            animate={{
              y: [0, -4, 0],
              rotate: [3, 1, 3],
            }}
            transition={{
              duration: 3.5,
              delay: 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 shrink-0"
          >
            <RightMascot />
          </motion.div>
        </motion.div>

        {/* ── INTERTWINED NAMES TYPOGRAPHY ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center mb-4 sm:mb-6"
        >
          {/* Main Visual Headline: [YOUR_NAME] & [PARTNER_NAME] */}
          <div className="relative inline-flex flex-wrap items-baseline justify-center gap-x-3 sm:gap-x-5 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-maroon tracking-tight leading-[0.95]">
            <span className="relative">
              {/* [YOUR_NAME] */}
              {SITE_CONTENT.couple.yourName}
            </span>

            {/* Delicate Interlocking Ampersand */}
            <span className="font-serif italic font-light text-ink/80 text-3xl sm:text-5xl md:text-6xl lg:text-7xl select-none -my-2 transform -rotate-6">
              &
            </span>

            <span className="relative italic font-serif font-semibold text-maroon">
              {/* [PARTNER_NAME] */}
              {SITE_CONTENT.couple.partnerName}
            </span>
          </div>

          {/* Hand-drawn underline accent */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1.5 sm:mt-2.5"
          >
            <DoodleUnderline className="w-52 sm:w-72 md:w-96 h-3.5 sm:h-4 text-maroon/50" />
          </motion.div>

          {/* First Meeting Story Snippet [FIRST_MEET_SNIPPET] */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-sm sm:text-lg md:text-xl font-hand text-ink-muted max-w-xl mx-auto mt-2 sm:mt-3 px-4 leading-relaxed"
          >
            "{SITE_CONTENT.couple.firstMeetingStorySnippet}"
          </motion.p>
        </motion.div>

        {/* ── LIVE TIME TOGETHER COUNTER ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl px-2"
        >
          <div className="relative bg-paper-card border border-paper-border/90 rounded-2xl p-4 sm:p-6 shadow-paper">
            {/* Top Washi Tape Accent */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape rotate-[-1.5deg] rounded-sm z-20" />

            {/* Counter Header Pill */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-maroon opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-maroon" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-maroon font-semibold">
                Together in Forever Mode
              </span>
            </div>

            {/* Ticking Time Blocks Grid */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {/* Days */}
              <div className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 bg-paper rounded-xl border border-paper-border/80">
                <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-maroon tracking-tight">
                  {timeTogether.formatted.days}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-ink-muted mt-1">
                  Days
                </span>
              </div>

              {/* Hours */}
              <div className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 bg-paper rounded-xl border border-paper-border/80">
                <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-maroon tracking-tight">
                  {timeTogether.formatted.hours}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-ink-muted mt-1">
                  Hours
                </span>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 bg-paper rounded-xl border border-paper-border/80">
                <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-maroon tracking-tight">
                  {timeTogether.formatted.minutes}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-ink-muted mt-1">
                  Mins
                </span>
              </div>

              {/* Seconds */}
              <div className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 bg-paper rounded-xl border border-paper-border/80">
                <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-maroon tracking-tight tabular-nums">
                  {timeTogether.formatted.seconds}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-ink-muted mt-1">
                  Secs
                </span>
              </div>
            </div>

            {/* Sub-label with [MEET_DATE] */}
            <div className="mt-3 pt-3 border-t border-paper-border/60 flex items-center justify-center gap-1.5 text-xs text-ink-muted font-sans">
              <span>Since</span>
              <span className="font-mono text-maroon font-bold">
                {/* [MEET_DATE: 2026-7-4] */}
                {SITE_CONTENT.couple.relationshipStartDate}
              </span>
              <span>— counting every precious second with you</span>
              <Heart className="w-3 h-3 text-maroon fill-maroon inline ml-0.5" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── BOTTOM CINEMATIC SCROLL CUE ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.85 }}
        onClick={onScrollToNext}
        className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-[11px] font-mono tracking-widest text-ink-faint uppercase group-hover:text-maroon transition-colors">
          Scroll to bridge the distance
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-maroon/70 group-hover:text-maroon transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
};
