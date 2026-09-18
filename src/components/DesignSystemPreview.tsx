import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, RefreshCw, Heart, Compass, CheckCircle2 } from 'lucide-react';
import { SITE_CONTENT } from '../config/content';
import {
  DoodleHeart,
  PostageStamp,
} from './Doodles';
import { MascotMotif } from './MascotMotif';

interface DesignSystemPreviewProps {
  onRelockGate: () => void;
}

export const DesignSystemPreview: React.FC<DesignSystemPreviewProps> = ({ onRelockGate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top Bar / Navigation Preview */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between pb-6 border-b border-paper-border mb-10"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-maroon text-paper-card flex items-center justify-center font-serif font-bold text-lg shadow-sm">
            C&D
          </div>
          <div>
            <div className="font-serif font-bold text-maroon text-lg leading-tight">
              {SITE_CONTENT.couple.yourName} & {SITE_CONTENT.couple.partnerName}
            </div>
            <div className="text-xs text-ink-muted flex items-center gap-1 font-mono">
              <span>Cairo</span>
              <span className="text-maroon">✈️</span>
              <span>Bukittinggi</span>
            </div>
          </div>
        </div>

        {/* Re-test Gate Button */}
        <button
          onClick={onRelockGate}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-paper-card border border-paper-border text-ink-muted hover:text-maroon hover:border-maroon/30 text-xs font-medium transition-all shadow-sm cursor-pointer"
          title="Re-lock to test gate screen"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Test Gate Screen</span>
        </button>
      </motion.header>

      {/* Main Hero Card (Foundation Preview) */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative bg-paper-card border border-paper-border rounded-2xl p-6 sm:p-10 shadow-paper-lg mb-12 overflow-hidden"
      >
        {/* Washi tape accents */}
        <div className="absolute -top-3 right-12 w-24 h-7 washi-tape rotate-[3deg] rounded-sm z-20" />

        {/* Ambient Doodles */}
        <div className="absolute top-4 right-4 hidden md:block opacity-75">
          <PostageStamp
            text="PAR AVION"
            date="FOUNDATION"
            from="CAI"
            to="JOG"
          />
        </div>

        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-maroon-tint text-maroon text-xs font-semibold tracking-wider uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Forever Mode • Stage 1 Initialized</span>
          </div>

          {/* Bold Serif Headline */}
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-maroon leading-[1.15] mb-4">
            Across 8,740 Kilometers, <br />
            <span className="italic font-normal text-ink">You Are My Home.</span>
          </h1>

          <p className="text-ink-muted text-base sm:text-lg leading-relaxed mb-6 font-sans">
            Welcome to the live foundation for our website. This space is handcrafted
            with care, built to celebrate every moment between Cairo and Bukittinggi.
          </p>

          {/* Quick Stats Pill Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2 px-3.5 py-2 bg-paper rounded-xl border border-paper-border text-xs font-mono text-ink">
              <MapPin className="w-3.5 h-3.5 text-maroon" />
              <span>
                {SITE_CONTENT.locations.me.city} ↔ {SITE_CONTENT.locations.her.city}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 bg-paper rounded-xl border border-paper-border text-xs font-mono text-ink">
              <Compass className="w-3.5 h-3.5 text-maroon" />
              <span>{SITE_CONTENT.locations.approxDistanceKm.toLocaleString()} KM</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 bg-pastel-blush/40 rounded-xl border border-maroon/20 text-xs font-hand text-maroon text-sm font-bold">
              <Heart className="w-3.5 h-3.5 fill-maroon" />
              <span>{SITE_CONTENT.couple.relationshipStartDate}</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Hand-Heart Photo Pair Showcase */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-maroon flex items-center gap-2">
              <span>Two Halves, One Heart</span>
              <DoodleHeart className="w-5 h-5 text-maroon" fill="#7A1C2B" />
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted font-sans">
              Seamlessly pairing heartme.jpeg & hearther.jpeg from /assets/
            </p>
          </div>
          <span className="text-xs font-mono text-ink-faint hidden sm:inline-block">
            /assets/heartme.jpeg + hearther.jpeg
          </span>
        </div>

        <div className="relative bg-paper-card border border-paper-border rounded-2xl p-4 sm:p-6 shadow-paper flex flex-col sm:flex-row items-center justify-center gap-0 max-w-lg mx-auto">
          {/* Top Washi Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape rotate-[-1deg] rounded-sm z-20" />

          {/* Left Half (Costa's Hand) */}
          <div className="relative w-48 h-56 rounded-l-xl overflow-hidden border-2 border-r-0 border-maroon/20 bg-paper-aged group">
            <img
              src={SITE_CONTENT.assets.heartMe}
              alt="Costa hand heart half"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-paper/85 rounded text-[10px] font-mono text-maroon font-bold backdrop-blur-xs">
              CAIRO 🇪🇬
            </div>
          </div>

          {/* Right Half (Daria's Hand) */}
          <div className="relative w-48 h-56 rounded-r-xl overflow-hidden border-2 border-l-0 border-maroon/20 bg-paper-aged group">
            <img
              src={SITE_CONTENT.assets.heartHer}
              alt="Daria hand heart half"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-paper/85 rounded text-[10px] font-mono text-maroon font-bold backdrop-blur-xs">
              JOGJA 🇮🇩
            </div>
          </div>
        </div>
      </motion.section>

      {/* Design System & Polish Specs Card */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="bg-paper-card border border-paper-border rounded-2xl p-6 sm:p-8 shadow-paper"
      >
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle2 className="w-5 h-5 text-maroon" />
          <h2 className="text-xl font-serif font-bold text-maroon">
            Design System Foundation Verification
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Color Tokens */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-ink-muted">
              1. Color Palette Swatches
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-[#7A1C2B] text-paper-card text-xs flex flex-col justify-between h-18 shadow-sm">
                <span className="font-bold">Deep Maroon</span>
                <span className="font-mono text-[10px] opacity-80">#7A1C2B</span>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF8F5] border border-paper-border text-ink text-xs flex flex-col justify-between h-18 shadow-sm">
                <span className="font-bold">Cream Paper</span>
                <span className="font-mono text-[10px] text-ink-muted">#FAF8F5</span>
              </div>
              <div className="p-3 rounded-lg bg-[#F7D6CF] text-maroon text-xs flex flex-col justify-between h-18 shadow-sm">
                <span className="font-bold">Blush Pastel</span>
                <span className="font-mono text-[10px] opacity-80">#F7D6CF</span>
              </div>
              <div className="p-3 rounded-lg bg-[#FBE8A6] text-ink text-xs flex flex-col justify-between h-18 shadow-sm">
                <span className="font-bold">Warm Butter</span>
                <span className="font-mono text-[10px] text-ink-muted">#FBE8A6</span>
              </div>
            </div>
          </div>

          {/* Typography Tokens */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-ink-muted">
              2. Typography Hierarchy
            </h3>
            <div className="p-4 bg-paper rounded-xl border border-paper-border space-y-2">
              <div>
                <span className="text-[10px] font-mono text-ink-faint block uppercase">
                  Headline (Fraunces / Serif)
                </span>
                <span className="font-serif text-xl font-bold text-maroon">
                  Costa & Daria Forever
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-ink-faint block uppercase">
                  Body (Plus Jakarta Sans)
                </span>
                <span className="font-sans text-xs text-ink-muted">
                  Crisp, modern, highly legible editorial copy.
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-ink-faint block uppercase">
                  Annotation (Caveat / Hand)
                </span>
                <span className="font-hand text-lg text-maroon font-bold">
                  "Cairo to Bukittinggi, no distance can stop us."
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mascot Note */}
        <div className="mt-8 pt-6 border-t border-paper-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MascotMotif size="sm" />
            <div className="text-xs text-ink-muted">
              <span className="font-bold text-maroon block font-sans">Recurring Mascot Pair</span>
              <span>Cozy Cairo Buddy 🇪🇬 + Tropical Jogja Buddy 🇮🇩</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-maroon font-bold bg-maroon-tint px-3 py-1.5 rounded-md inline-block">
              READY FOR PROMPT 2
            </span>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
