import React from 'react';
import { motion } from 'framer-motion';

interface MinimalWorldMapProps {
  className?: string;
  cairoCoords?: { x: number; y: number };
  jogjaCoords?: { x: number; y: number };
}

/**
 * Minimalist Handcrafted World Map Silhouette
 * Soft paper tones, organic simplified continents, zero technical clutter.
 */
export const MinimalWorldMap: React.FC<MinimalWorldMapProps> = ({
  className = 'w-full h-full',
  cairoCoords = { x: 310, y: 155 },
  jogjaCoords = { x: 575, y: 240 },
}) => {
  return (
    <svg
      viewBox="0 0 800 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft paper gradient for continents */}
        <linearGradient id="continentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EFE7DC" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#E6DCD0" stopOpacity="0.6" />
        </linearGradient>

        {/* Flight Arc Gradient */}
        <linearGradient id="flightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7A1C2B" />
          <stop offset="50%" stopColor="#9E2A3B" />
          <stop offset="100%" stopColor="#7A1C2B" />
        </linearGradient>

        <filter id="mapShadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2C2224" floodOpacity="0.04" />
        </filter>
      </defs>

      {/* ── SUBTLE LAT/LONG GRID LINES (MINIMAL) ── */}
      <g stroke="#E8DFD5" strokeWidth="0.75" strokeDasharray="3 5" opacity="0.6">
        <line x1="50" y1="100" x2="750" y2="100" />
        <line x1="50" y1="200" x2="750" y2="200" /> {/* Equator */}
        <line x1="50" y1="300" x2="750" y2="300" />
        <line x1="200" y1="40" x2="200" y2="360" />
        <line x1="400" y1="40" x2="400" y2="360" />
        <line x1="600" y1="40" x2="600" y2="360" />
      </g>

      {/* ── SIMPLIFIED CONTINENT SILHOUETTES ── */}
      <g fill="url(#continentGrad)" stroke="#DFD4C5" strokeWidth="1.2" strokeLinejoin="round" filter="url(#mapShadow)">
        {/* Europe */}
        <path d="M 270 90 Q 290 80 320 85 Q 345 75 355 95 Q 330 115 310 110 Q 285 125 270 90 Z" />
        {/* Scandinavia & UK */}
        <path d="M 255 75 Q 265 65 275 70 Q 270 85 255 75 Z" />
        <path d="M 290 55 Q 315 45 325 65 Q 305 75 290 55 Z" />

        {/* Africa (with Cairo region highlighted) */}
        <path d="M 265 140 Q 305 130 330 145 Q 360 160 350 200 Q 345 250 325 285 Q 295 300 280 270 Q 255 230 250 185 Q 245 155 265 140 Z" />

        {/* Middle East */}
        <path d="M 330 135 Q 365 130 380 155 Q 375 180 350 175 Q 335 155 330 135 Z" />

        {/* Asia Main */}
        <path d="M 370 95 Q 430 75 510 80 Q 580 95 620 130 Q 600 175 550 190 Q 480 215 440 180 Q 390 170 370 140 Q 365 110 370 95 Z" />

        {/* India Subcontinent */}
        <path d="M 440 175 Q 470 170 480 200 Q 465 235 450 240 Q 435 210 440 175 Z" />

        {/* Southeast Asia Mainland */}
        <path d="M 520 185 Q 545 180 555 210 Q 535 235 520 220 Z" />

        {/* Indonesia Archipelago & Malaysia (Jogja region) */}
        {/* Sumatra */}
        <path d="M 525 225 Q 545 240 540 260 Q 520 245 525 225 Z" />
        {/* Java (Jogja is here!) */}
        <path d="M 545 255 Q 585 258 600 265 Q 580 270 545 262 Z" />
        {/* Borneo */}
        <path d="M 555 220 Q 580 215 585 240 Q 565 250 555 220 Z" />
        {/* Sulawesi */}
        <path d="M 595 225 Q 610 220 610 245 Q 595 240 595 225 Z" />

        {/* Australia */}
        <path d="M 600 275 Q 670 265 690 310 Q 675 360 620 355 Q 585 330 600 275 Z" />

        {/* Americas (Minimal Left Backdrop) */}
        <path d="M 80 70 Q 140 65 150 110 Q 120 150 90 145 Q 70 110 80 70 Z" />
        <path d="M 110 170 Q 155 185 160 240 Q 140 310 115 320 Q 95 270 100 210 Z" />
      </g>

      {/* ── FLIGHT TRAJECTORY ARC (Cairo -> Bukittinggi) ── */}
      <g>
        {/* Glow behind the line */}
        <path
          d={`M ${cairoCoords.x} ${cairoCoords.y} Q 435 90 ${jogjaCoords.x} ${jogjaCoords.y}`}
          stroke="#F7D6CF"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />

        {/* Main dashed flight arc */}
        <motion.path
          d={`M ${cairoCoords.x} ${cairoCoords.y} Q 435 90 ${jogjaCoords.x} ${jogjaCoords.y}`}
          stroke="url(#flightGrad)"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />

        {/* Animated Flying Paper Plane */}
        <motion.g
          animate={{
            offsetDistance: ['0%', '100%'],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            offsetPath: `path("M ${cairoCoords.x} ${cairoCoords.y} Q 435 90 ${jogjaCoords.x} ${jogjaCoords.y}")`,
          }}
        >
          <g transform="translate(-10, -10) scale(0.65)">
            <polygon
              points="0,15 28,0 20,24 12,18"
              fill="#FCFAF7"
              stroke="#7A1C2B"
              strokeWidth="2"
            />
            <line x1="28" y1="0" x2="12" y2="18" stroke="#7A1C2B" strokeWidth="1.5" />
          </g>
        </motion.g>
      </g>

      {/* ── CAIRO BEACON (Pulsing marker) ── */}
      <g transform={`translate(${cairoCoords.x}, ${cairoCoords.y})`}>
        {/* Pulse ripple */}
        <motion.circle
          r="12"
          fill="#7A1C2B"
          initial={{ opacity: 0.6, scale: 0.5 }}
          animate={{ opacity: 0, scale: 2.2 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
        <circle r="4.5" fill="#7A1C2B" stroke="#FCFAF7" strokeWidth="2" />
      </g>

      {/* ── BUKITTINGGI BEACON (Pulsing marker) ── */}
      <g transform={`translate(${jogjaCoords.x}, ${jogjaCoords.y})`}>
        {/* Pulse ripple */}
        <motion.circle
          r="12"
          fill="#7A1C2B"
          initial={{ opacity: 0.6, scale: 0.5 }}
          animate={{ opacity: 0, scale: 2.2 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
        />
        <circle r="4.5" fill="#7A1C2B" stroke="#FCFAF7" strokeWidth="2" />
      </g>
    </svg>
  );
};
