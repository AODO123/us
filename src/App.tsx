import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PaperTexture } from './components/PaperTexture';
import { GateScreen } from './components/GateScreen';
import { CinematicStage } from './components/CinematicStage';

export function App() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  return (
    <PaperTexture>
      {/* ── GATE SCREEN (Prompt 1 Focus) ── */}
      <AnimatePresence>
        {!isUnlocked && (
          <GateScreen key="gate-screen" onUnlock={() => setIsUnlocked(true)} />
        )}
      </AnimatePresence>

      {/* ── IMMERSIVE CINEMATIC STAGE (Scroll-Driven Architecture) ── */}
      {isUnlocked && (
        <motion.main
          key="cinematic-stage"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-screen w-full"
        >
          <CinematicStage onRelockGate={() => setIsUnlocked(false)} />
        </motion.main>
      )}
    </PaperTexture>
  );
}

export default App;
