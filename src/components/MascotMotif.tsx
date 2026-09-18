import React from 'react';
import { motion } from 'framer-motion';

export const LeftMascot: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={`${className} drop-shadow-sm`}>
    {/* Body */}
    <path
      d="M20 75 C15 45, 30 20, 50 20 C70 20, 85 45, 80 75 C78 85, 22 85, 20 75 Z"
      fill="#FDFBF7"
      stroke="#2C2224"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Tiny Scarf / Collar */}
    <path
      d="M32 68 Q50 76 68 68 Q50 82 32 68"
      fill="#7A1C2B"
      stroke="#2C2224"
      strokeWidth="2.5"
    />
    {/* Eyes */}
    <circle cx="42" cy="46" r="3.5" fill="#2C2224" />
    <circle cx="58" cy="46" r="3.5" fill="#2C2224" />
    {/* Cheeks */}
    <ellipse cx="34" cy="53" rx="4" ry="2.5" fill="#F7D6CF" />
    <ellipse cx="66" cy="53" rx="4" ry="2.5" fill="#F7D6CF" />
    {/* Happy mouth */}
    <path
      d="M47 52 Q50 56 53 52"
      fill="none"
      stroke="#2C2224"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export const RightMascot: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={`${className} drop-shadow-sm`}>
    {/* Body */}
    <path
      d="M20 75 C15 45, 30 20, 50 20 C70 20, 85 45, 80 75 C78 85, 22 85, 20 75 Z"
      fill="#FCFAF7"
      stroke="#2C2224"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Little Frangipani / Flower on ear */}
    <g transform="translate(62, 18) scale(0.65)">
      <circle cx="15" cy="15" r="7" fill="#FBE8A6" stroke="#2C2224" strokeWidth="2" />
      <circle cx="15" cy="15" r="3" fill="#7A1C2B" />
    </g>
    {/* Eyes (happy curved winks) */}
    <path
      d="M38 48 Q42 43 46 48"
      fill="none"
      stroke="#2C2224"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M54 48 Q58 43 62 48"
      fill="none"
      stroke="#2C2224"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Cheeks */}
    <ellipse cx="34" cy="54" rx="4.5" ry="3" fill="#F7D6CF" />
    <ellipse cx="66" cy="54" rx="4.5" ry="3" fill="#F7D6CF" />
    {/* Sweet smile */}
    <path
      d="M48 53 Q50 57 52 53"
      fill="none"
      stroke="#2C2224"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export const MascotMotif: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSpeechBubble?: boolean;
  speechText?: string;
}> = ({
  className = '',
  size = 'md',
  showSpeechBubble = false,
  speechText = 'Forever & Always',
}) => {
  const sizeClasses = {
    sm: 'w-24 h-16',
    md: 'w-36 h-24',
    lg: 'w-48 h-32',
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {showSpeechBubble && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 px-3 py-1 bg-paper-card border border-maroon/20 rounded-full shadow-sm text-xs font-hand text-maroon font-bold tracking-wide flex items-center gap-1"
        >
          <span>{speechText}</span>
          <span className="text-red-400 text-[10px]">❤️</span>
        </motion.div>
      )}

      <div className={`relative ${sizeClasses[size]} flex items-end justify-center gap-2`}>
        {/* Left Mascot */}
        <motion.div
          animate={{
            y: [0, -3, 0],
            rotate: [0, -1.5, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-16 h-16"
        >
          <LeftMascot />
        </motion.div>

        {/* Little Floating Heart connecting them */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            y: [-2, -8, -2],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-2 text-maroon text-sm font-bold"
        >
          ❤️
        </motion.div>

        {/* Right Mascot */}
        <motion.div
          animate={{
            y: [0, -3.5, 0],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 3.2,
            delay: 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-16 h-16"
        >
          <RightMascot />
        </motion.div>
      </div>
    </div>
  );
};
