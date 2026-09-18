import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Home, Plane, Film, Infinity, ChevronLeft, ChevronRight } from 'lucide-react';
import { SITE_CONTENT } from '../config/content';
import { DREAMS_LIST, DreamItem } from '../data/dreams';
import {
  DoodleHeart,
  DoodleFlower,
  DoodlePlane,
  DoodleUnderline,
} from './Doodles';

interface DreamsSectionProps {
  onPrevScene?: () => void;
  onNextScene?: () => void;
}

// Map dream icons matched specifically to each goal
const DREAM_ICONS: Record<string, React.ReactNode> = {
  'dream-1': <Plane className="w-3.5 h-3.5 text-maroon" />, // Meeting in Indonesia / Flight
  'dream-2': <Compass className="w-3.5 h-3.5 text-maroon" />, // Travelling where we want
  'dream-3': <Home className="w-3.5 h-3.5 text-maroon" />, // Marrying & Forever Home
  'dream-4': <Film className="w-3.5 h-3.5 text-maroon" />, // Film making dreams / Watching films
  'dream-5': <Infinity className="w-3.5 h-3.5 text-maroon" />, // Standing by you forever in every lifetime
};

// Pastel washi tape color presets
const WASHI_TAPES = [
  'bg-pastel-blush/90 border-t border-b border-maroon/20',
  'bg-pastel-butter/90 border-t border-b border-amber-600/20',
  'bg-pastel-sky/90 border-t border-b border-sky-600/20',
  'bg-pastel-sage/90 border-t border-b border-emerald-600/20',
  'bg-pastel-lavender/90 border-t border-b border-purple-600/20',
];

export const DreamsSection: React.FC<DreamsSectionProps> = () => {
  const { dreams } = SITE_CONTENT;
  const [selectedDream, setSelectedDream] = useState<DreamItem | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div className="relative w-full h-screen max-h-screen overflow-hidden bg-paper text-ink flex flex-col justify-between p-2.5 sm:p-5 md:p-6 select-none">
      {/* ── Background Scrapbook Atmosphere Doodles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(#7A1C2B 1px, transparent 1px), radial-gradient(#7A1C2B 1px, #F6F1EB 1px)',
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        />

        {/* Paper airplane looping across top right */}
        <div className="absolute top-12 sm:top-14 right-8 sm:right-24 opacity-60">
          <DoodlePlane className="w-24 sm:w-32 h-14 sm:h-18" strokeColor="#7A1C2B" />
        </div>

        {/* Delicate hand-drawn hearts & flowers floating */}
        <div className="absolute bottom-16 left-6 sm:left-14 opacity-40">
          <DoodleHeart className="w-7 h-7 text-maroon fill-maroon-tint" />
        </div>
        <div className="absolute top-28 left-8 sm:left-20 opacity-40">
          <DoodleFlower className="w-6 h-6" />
        </div>
        <div className="absolute bottom-20 right-12 sm:right-28 opacity-40">
          <DoodleHeart className="w-5 h-5 text-maroon" />
        </div>
      </div>

      {/* ── Header: Section Title & Subtitle ── */}
      <div className="relative z-10 text-center max-w-2xl mx-auto pt-3 sm:pt-5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-paper-card border border-paper-border text-[11px] font-mono tracking-wider text-ink-muted shadow-xs mb-1.5"
        >
          <DoodleHeart className="w-3.5 h-3.5 text-maroon fill-maroon-tint" />
          <span>{dreams.sectionBadge}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative inline-block"
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-maroon tracking-tight">
            {dreams.title}
          </h2>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-32 sm:w-44 opacity-85">
            <DoodleUnderline className="w-full h-3" color="#7A1C2B" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-xs sm:text-sm text-ink-muted mt-3 max-w-lg mx-auto font-sans line-clamp-2 px-4"
        >
          {dreams.subtitle}
        </motion.p>
      </div>

      {/* ── Main Vision Board Stage ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-auto w-full max-w-6xl mx-auto px-2 sm:px-4">
        {/* DESKTOP / TABLET VISION BOARD (Grid of 4 items + small bottom bar for 5th item) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex flex-col w-full"
        >
          {/* Top 4 Cards Grid */}
          <div className="grid grid-cols-6 gap-3.5 lg:gap-4.5 w-full items-stretch">
            {/* 1. Airport Reunion (Costa Photo Polaroid - Span 2) */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.015, rotate: 0 }}
              className="col-span-2 relative group cursor-pointer"
              onClick={() => setSelectedDream(DREAMS_LIST[0])}
              style={{ transform: `rotate(${DREAMS_LIST[0].rotation}deg)` }}
            >
              {/* Top washi tape */}
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5.5 ${WASHI_TAPES[0]} rotate-[-2deg] z-20 shadow-xs rounded-[1px] opacity-90`}
              />

              <div className="h-full bg-paper-card border border-paper-border rounded-xl p-3.5 shadow-paper flex flex-col justify-between transition-shadow group-hover:shadow-paper-lg">
                <div>
                  {/* Tag & Icon */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-medium tracking-wider text-maroon uppercase bg-maroon-tint px-2 py-0.5 rounded-md">
                      {DREAMS_LIST[0].tag}
                    </span>
                    <div className="p-1 rounded-full bg-paper-aged/60">{DREAM_ICONS['dream-1']}</div>
                  </div>

                  {/* Polaroid Frame for Costa Photo - Raised crop to top */}
                  <div className="relative bg-paper-light p-2 rounded-lg border border-paper-border/80 shadow-inner mb-2.5">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-paper-aged">
                      <img
                        src={DREAMS_LIST[0].image}
                        alt={DREAMS_LIST[0].imageAlt}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[11px] font-hand text-center text-ink-muted mt-1.5 font-bold tracking-wide">
                      {DREAMS_LIST[0].imageLabel}
                    </p>
                  </div>

                  <h3 className="font-serif font-bold text-sm lg:text-base text-ink leading-snug">
                    {DREAMS_LIST[0].title}
                  </h3>
                </div>

                <p className="text-xs text-ink-muted font-sans mt-2 italic leading-relaxed line-clamp-2">
                  "{DREAMS_LIST[0].caption}"
                </p>
              </div>
            </motion.div>

            {/* Center Column: Travelling (Top) & Film Dreams (Bottom) - Span 2 */}
            <div className="col-span-2 flex flex-col gap-3.5 lg:gap-4.5 justify-between">
              {/* 2. Travelling Note */}
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.015, rotate: 0 }}
                className="relative group cursor-pointer flex-1"
                onClick={() => setSelectedDream(DREAMS_LIST[1])}
                style={{ transform: `rotate(${DREAMS_LIST[1].rotation}deg)` }}
              >
                <div
                  className={`absolute -top-2.5 left-8 w-16 h-5 ${WASHI_TAPES[1]} rotate-[1deg] z-20 shadow-xs rounded-[1px] opacity-90`}
                />
                <div className="h-full bg-paper-card border border-paper-border rounded-xl p-3.5 shadow-paper flex flex-col justify-between transition-shadow group-hover:shadow-paper-lg">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-medium tracking-wider text-amber-800 uppercase bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
                        {DREAMS_LIST[1].tag}
                      </span>
                      <div className="p-1 rounded-full bg-paper-aged/60">{DREAM_ICONS['dream-2']}</div>
                    </div>
                    <h3 className="font-serif font-bold text-sm lg:text-base text-ink leading-snug">
                      {DREAMS_LIST[1].title}
                    </h3>
                  </div>
                  <p className="text-xs text-ink-muted font-sans mt-2 italic leading-relaxed line-clamp-3">
                    "{DREAMS_LIST[1].caption}"
                  </p>
                </div>
              </motion.div>

              {/* 4. Film Making Dreams Note */}
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.015, rotate: 0 }}
                className="relative group cursor-pointer flex-1"
                onClick={() => setSelectedDream(DREAMS_LIST[3])}
                style={{ transform: `rotate(${DREAMS_LIST[3].rotation}deg)` }}
              >
                <div
                  className={`absolute -top-2.5 right-8 w-16 h-5 ${WASHI_TAPES[3]} rotate-[-2deg] z-20 shadow-xs rounded-[1px] opacity-90`}
                />
                <div className="h-full bg-paper-card border border-paper-border rounded-xl p-3.5 shadow-paper flex flex-col justify-between transition-shadow group-hover:shadow-paper-lg">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-medium tracking-wider text-emerald-800 uppercase bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/50">
                        {DREAMS_LIST[3].tag}
                      </span>
                      <div className="p-1 rounded-full bg-paper-aged/60">{DREAM_ICONS['dream-4']}</div>
                    </div>
                    <h3 className="font-serif font-bold text-sm lg:text-base text-ink leading-snug">
                      {DREAMS_LIST[3].title}
                    </h3>
                  </div>
                  <p className="text-xs text-ink-muted font-sans mt-2 italic leading-relaxed line-clamp-3">
                    "{DREAMS_LIST[3].caption}"
                  </p>
                </div>
              </motion.div>
            </div>

            {/* 3. Marrying & Forever Home (Daria Photo Polaroid - Span 2) */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.015, rotate: 0 }}
              className="col-span-2 relative group cursor-pointer"
              onClick={() => setSelectedDream(DREAMS_LIST[2])}
              style={{ transform: `rotate(${DREAMS_LIST[2].rotation}deg)` }}
            >
              {/* Top washi tape */}
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5.5 ${WASHI_TAPES[2]} rotate-[2deg] z-20 shadow-xs rounded-[1px] opacity-90`}
              />

              <div className="h-full bg-paper-card border border-paper-border rounded-xl p-3.5 shadow-paper flex flex-col justify-between transition-shadow group-hover:shadow-paper-lg">
                <div>
                  {/* Tag & Icon */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-medium tracking-wider text-sky-800 uppercase bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200/50">
                      {DREAMS_LIST[2].tag}
                    </span>
                    <div className="p-1 rounded-full bg-paper-aged/60">{DREAM_ICONS['dream-3']}</div>
                  </div>

                  {/* Polaroid Frame for Daria Photo - Raised crop to top */}
                  <div className="relative bg-paper-light p-2 rounded-lg border border-paper-border/80 shadow-inner mb-2.5">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-paper-aged">
                      <img
                        src={DREAMS_LIST[2].image}
                        alt={DREAMS_LIST[2].imageAlt}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[11px] font-hand text-center text-ink-muted mt-1.5 font-bold tracking-wide">
                      {DREAMS_LIST[2].imageLabel}
                    </p>
                  </div>

                  <h3 className="font-serif font-bold text-sm lg:text-base text-ink leading-snug">
                    {DREAMS_LIST[2].title}
                  </h3>
                </div>

                <p className="text-xs text-ink-muted font-sans mt-2 italic leading-relaxed line-clamp-2">
                  "{DREAMS_LIST[2].caption}"
                </p>
              </div>
            </motion.div>
          </div>

          {/* 5. Forever & Always - Small Bar Under Them */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.01, y: -2 }}
            className="w-full mt-3 sm:mt-3.5 p-2.5 sm:px-4 sm:py-2 bg-paper-card border border-paper-border rounded-xl shadow-paper flex items-center justify-between gap-3 cursor-pointer hover:border-maroon/30 transition-all group"
            onClick={() => setSelectedDream(DREAMS_LIST[4])}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-[10px] font-mono font-medium tracking-wider text-purple-900 uppercase bg-pastel-lavender/90 px-2 py-0.5 rounded-md shrink-0">
                {DREAMS_LIST[4].tag}
              </span>
              <span className="text-xs sm:text-sm font-serif font-bold text-ink truncate">
                {DREAMS_LIST[4].title}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="hidden lg:inline text-xs font-hand text-ink-muted italic">
                "{DREAMS_LIST[4].caption}"
              </span>
              <div className="p-1 rounded-full bg-paper-aged/60">{DREAM_ICONS['dream-5']}</div>
            </div>
          </motion.div>
        </motion.div>

        {/* MOBILE / SMALL SCREEN INTERACTIVE CAROUSEL VIEW */}
        <div className="md:hidden w-full max-w-sm mx-auto flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={DREAMS_LIST[activeMobileIndex].id}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              transition={{ duration: 0.35 }}
              className="relative w-full bg-paper-card border border-paper-border rounded-2xl p-3 sm:p-4 shadow-paper-lg"
            >
              {/* Tape */}
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5.5 ${WASHI_TAPES[activeMobileIndex % WASHI_TAPES.length]} rotate-[-1deg] z-20 shadow-xs rounded-[1px]`}
              />

              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-medium tracking-wider text-maroon uppercase bg-maroon-tint px-2.5 py-0.5 rounded-md">
                  {DREAMS_LIST[activeMobileIndex].tag}
                </span>
                <span className="text-[10px] font-mono text-ink-faint">
                  {activeMobileIndex + 1} / {DREAMS_LIST.length}
                </span>
              </div>

              {/* If photo exists - Raised crop to top */}
              {DREAMS_LIST[activeMobileIndex].image && (
                <div className="bg-paper-light p-1.5 rounded-xl border border-paper-border shadow-inner mb-2">
                  <div className="aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-lg bg-paper-aged">
                    <img
                      src={DREAMS_LIST[activeMobileIndex].image}
                      alt={DREAMS_LIST[activeMobileIndex].imageAlt}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {DREAMS_LIST[activeMobileIndex].imageLabel && (
                    <p className="text-xs font-hand text-center text-ink-muted mt-1.5 font-bold">
                      {DREAMS_LIST[activeMobileIndex].imageLabel}
                    </p>
                  )}
                </div>
              )}

              <h3 className="font-serif font-bold text-sm sm:text-base text-ink mb-1">
                {DREAMS_LIST[activeMobileIndex].title}
              </h3>
              <p className="text-xs text-ink-muted font-sans italic leading-relaxed">
                "{DREAMS_LIST[activeMobileIndex].caption}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Step Indicators & Controls */}
          <div className="flex items-center justify-between w-full mt-3 px-2">
            <button
              onClick={() => setActiveMobileIndex((prev) => (prev > 0 ? prev - 1 : DREAMS_LIST.length - 1))}
              className="p-2 rounded-full bg-paper-card border border-paper-border text-ink-muted active:scale-95 cursor-pointer shadow-xs"
              aria-label="Previous dream"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {DREAMS_LIST.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMobileIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeMobileIndex === idx ? 'w-5 bg-maroon' : 'w-2 bg-paper-border'
                  }`}
                  aria-label={`Jump to dream ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveMobileIndex((prev) => (prev < DREAMS_LIST.length - 1 ? prev + 1 : 0))}
              className="p-2 rounded-full bg-paper-card border border-paper-border text-ink-muted active:scale-95 cursor-pointer shadow-xs"
              aria-label="Next dream"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Lightbox / Expanded Modal for Card Details ── */}
      <AnimatePresence>
        {selectedDream && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDream(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-xs cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-paper-card border border-paper-border rounded-2xl p-6 shadow-paper-float cursor-default"
            >
              {/* Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-pastel-blush/90 border-t border-b border-maroon/20 rotate-[-1.5deg] z-20 shadow-xs rounded-[1px]" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-medium tracking-wider text-maroon uppercase bg-maroon-tint px-2.5 py-1 rounded-md">
                  {selectedDream.tag}
                </span>
                <button
                  onClick={() => setSelectedDream(null)}
                  className="text-xs font-mono text-ink-faint hover:text-maroon px-2 py-1 rounded-md cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              {selectedDream.image && (
                <div className="bg-paper-light p-2.5 rounded-xl border border-paper-border shadow-inner mb-4">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-paper-aged">
                    <img
                      src={selectedDream.image}
                      alt={selectedDream.imageAlt}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {selectedDream.imageLabel && (
                    <p className="text-sm font-hand text-center text-ink-muted mt-2 font-bold">
                      {selectedDream.imageLabel}
                    </p>
                  )}
                </div>
              )}

              <h3 className="font-serif font-bold text-lg text-ink mb-2">
                {selectedDream.title}
              </h3>
              <p className="text-sm text-ink-muted font-sans italic leading-relaxed">
                "{selectedDream.caption}"
              </p>

              <div className="mt-5 pt-3 border-t border-paper-border flex items-center justify-between text-xs text-ink-faint font-mono">
                <span>Vision Board • Forever Us</span>
                <span className="text-maroon font-bold">Costa & Daria 💌</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom Bar: Clean Handwritten Footer ── */}
      <div className="relative z-10 flex items-center justify-center max-w-4xl mx-auto w-full pt-2 sm:pt-2.5 border-t border-paper-border/50 text-[11px] font-mono text-ink-faint">
        <div className="flex items-center gap-1.5">
          <DoodleHeart className="w-3.5 h-3.5 text-maroon fill-maroon" />
          <span>Handcrafted with all my love</span>
        </div>
      </div>
    </div>
  );
};
