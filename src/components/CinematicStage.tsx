import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ChevronUp, ChevronDown } from 'lucide-react';
import { HeroSection } from './HeroSection';
import { DistanceMapSection } from './DistanceMapSection';
import { SongsSection } from './SongsSection';
import { ReasonsSection } from './ReasonsSection';
import { CommonSection } from './CommonSection';
import { DreamsSection } from './DreamsSection';
import { FinalLetterSection } from './FinalLetterSection';

interface CinematicStageProps {
  onRelockGate: () => void;
}

const SCENE_NAMES = [
  { id: 'hero', title: 'Forever Us', label: '01' },
  { id: 'distance', title: 'Across Distance', label: '02' },
  { id: 'songs', title: 'Our Soundtrack', label: '03' },
  { id: 'reasons', title: 'Reasons Why', label: '04' },
  { id: 'common', title: 'Common in Us', label: '05' },
  { id: 'dreams', title: 'Future & Dreams', label: '06' },
  { id: 'letter', title: 'My Letter', label: '07' },
];

export const CinematicStage: React.FC<CinematicStageProps> = ({ onRelockGate }) => {
  const [activeScene, setActiveScene] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1); // 1 = forward, -1 = backward
  const isTransitioningRef = useRef<boolean>(false);
  const touchStartYRef = useRef<number>(0);

  const totalScenes = SCENE_NAMES.length;

  const goToScene = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= totalScenes || newIndex === activeScene) return;
      if (isTransitioningRef.current) return;

      isTransitioningRef.current = true;
      setDirection(newIndex > activeScene ? 1 : -1);
      setActiveScene(newIndex);

      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 750);
    },
    [activeScene, totalScenes]
  );

  const nextScene = useCallback(() => {
    if (activeScene < totalScenes - 1) {
      goToScene(activeScene + 1);
    }
  }, [activeScene, totalScenes, goToScene]);

  const prevScene = useCallback(() => {
    if (activeScene > 0) {
      goToScene(activeScene - 1);
    }
  }, [activeScene, goToScene]);

  // ── Wheel Scroll Controller (In-place scene transitions, zero vertical window scroll) ──
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioningRef.current) return;

      // Sensitive threshold for trackpads & mice
      if (e.deltaY > 25) {
        nextScene();
      } else if (e.deltaY < -25) {
        prevScene();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [nextScene, prevScene]);

  // ── Touch Swipe Controller (Mobile gestures) ──
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioningRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartYRef.current - touchEndY;

      if (deltaY > 40) {
        nextScene();
      } else if (deltaY < -40) {
        prevScene();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextScene, prevScene]);

  // ── Keyboard Arrows / Space Navigation ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextScene();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        prevScene();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextScene, prevScene]);

  // ── Animation Variants for In-Place Viewport Transitions ──
  const sceneVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? 50 : -50,
      scale: 0.98,
    }),
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? -50 : 50,
      scale: 0.98,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <div className="relative w-full h-screen max-h-screen overflow-hidden bg-paper text-ink selection:bg-maroon-tint selection:text-maroon">
      {/* ── Fixed Floating Top Bar ── */}
      <div className="fixed top-5 left-6 right-6 z-40 flex items-center justify-between pointer-events-none">
        {/* Subtle Current Chapter Pill */}
        <div className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-card/85 backdrop-blur-md border border-paper-border text-[11px] font-mono text-ink-muted shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-maroon" />
          <span>Chapter {SCENE_NAMES[activeScene].label} / {SCENE_NAMES[activeScene].title}</span>
        </div>

        {/* Replay Gate Button */}
        <button
          onClick={onRelockGate}
          className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-paper-card/85 backdrop-blur-md border border-paper-border text-ink-muted hover:text-maroon hover:border-maroon/30 text-xs font-mono transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
          title="Re-lock gate"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Replay Intro</span>
        </button>
      </div>

      {/* ── Fixed Floating Right Pagination Dots ── */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
        {SCENE_NAMES.map((scene, idx) => {
          const isActive = idx === activeScene;
          return (
            <button
              key={scene.id}
              onClick={() => goToScene(idx)}
              className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
              aria-label={`Jump to scene ${scene.label}: ${scene.title}`}
            >
              {/* Tooltip on hover */}
              <span className="absolute right-7 px-2 py-0.5 rounded-md bg-maroon text-paper text-[10px] font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm">
                {scene.label} • {scene.title}
              </span>

              {/* Dot indicator */}
              <motion.div
                animate={{
                  scale: isActive ? 1.25 : 1,
                  height: isActive ? 20 : 8,
                }}
                className={`w-2 rounded-full transition-colors duration-300 ${
                  isActive ? 'bg-maroon' : 'bg-paper-border hover:bg-maroon/50'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* ── Quick Scene Navigation Arrows (Bottom-Right / Side) ── */}
      <div className="fixed bottom-5 right-6 z-40 hidden sm:flex items-center gap-1">
        <button
          onClick={prevScene}
          disabled={activeScene === 0}
          className="p-1.5 rounded-full bg-paper-card/80 border border-paper-border text-ink-muted hover:text-maroon disabled:opacity-30 disabled:hover:text-ink-muted transition-all cursor-pointer disabled:cursor-not-allowed shadow-xs"
          aria-label="Previous scene"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={nextScene}
          disabled={activeScene === totalScenes - 1}
          className="p-1.5 rounded-full bg-paper-card/80 border border-paper-border text-ink-muted hover:text-maroon disabled:opacity-30 disabled:hover:text-ink-muted transition-all cursor-pointer disabled:cursor-not-allowed shadow-xs"
          aria-label="Next scene"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* ── ACTIVE SCENE RENDERER (In-Place Window Viewport) ── */}
      <main className="relative w-full h-full">
        <AnimatePresence mode="wait" custom={direction}>
          {activeScene === 0 && (
            <motion.div
              key="scene-hero"
              custom={direction}
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <HeroSection onScrollToNext={nextScene} />
            </motion.div>
          )}

          {activeScene === 1 && (
            <motion.div
              key="scene-distance"
              custom={direction}
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <DistanceMapSection onPrevScene={prevScene} onNextScene={nextScene} />
            </motion.div>
          )}

          {activeScene === 2 && (
            <motion.div
              key="scene-songs"
              custom={direction}
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <SongsSection onPrevScene={prevScene} onNextScene={nextScene} />
            </motion.div>
          )}

          {activeScene === 3 && (
            <motion.div
              key="scene-reasons"
              custom={direction}
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <ReasonsSection onPrevScene={prevScene} onNextScene={nextScene} />
            </motion.div>
          )}

          {activeScene === 4 && (
            <motion.div
              key="scene-common"
              custom={direction}
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <CommonSection onPrevScene={prevScene} onNextScene={nextScene} />
            </motion.div>
          )}

          {activeScene === 5 && (
            <motion.div
              key="scene-dreams"
              custom={direction}
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <DreamsSection onPrevScene={prevScene} onNextScene={nextScene} />
            </motion.div>
          )}

          {activeScene === 6 && (
            <motion.div
              key="scene-letter"
              custom={direction}
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <FinalLetterSection onPrevScene={prevScene} onGoToScene={goToScene} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
