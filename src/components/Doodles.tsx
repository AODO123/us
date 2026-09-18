import React from 'react';

// Delicate hand-drawn heart doodle
export const DoodleHeart: React.FC<{
  className?: string;
  fill?: string;
  stroke?: string;
}> = ({
  className = 'w-6 h-6',
  fill = 'none',
  stroke = 'currentColor',
}) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    fill={fill}
    stroke={stroke}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M24 38.5 C16 32 6 24 6 15.5 C6 9.5 10.5 5 16.5 5 C20.2 5 22.8 7 24 9 C25.2 7 27.8 5 31.5 5 C37.5 5 42 9.5 42 15.5 C42 24 32 32 24 38.5 Z" />
  </svg>
);

// Little soft flower doodle
export const DoodleFlower: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'w-8 h-8', color = '#7A1C2B' }) => (
  <svg
    viewBox="0 0 60 60"
    className={className}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
  >
    {/* 5 rounded petals */}
    <circle cx="30" cy="20" r="7" fill="#F7D6CF" opacity="0.8" />
    <circle cx="39.5" cy="27" r="7" fill="#FBE8A6" opacity="0.8" />
    <circle cx="36" cy="38" r="7" fill="#DFD7EC" opacity="0.8" />
    <circle cx="24" cy="38" r="7" fill="#D7E2D8" opacity="0.8" />
    <circle cx="20.5" cy="27" r="7" fill="#D3E4EC" opacity="0.8" />
    {/* Center dot */}
    <circle cx="30" cy="30" r="4.5" fill="#7A1C2B" />
  </svg>
);

// Cute paper airplane with looping dotted trail
export const DoodlePlane: React.FC<{
  className?: string;
  strokeColor?: string;
}> = ({ className = 'w-24 h-16', strokeColor = '#7A1C2B' }) => (
  <svg
    viewBox="0 0 120 60"
    className={className}
    fill="none"
    stroke={strokeColor}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Flight trail loop */}
    <path
      d="M10 45 C30 50, 45 40, 40 25 C35 12, 18 20, 28 35 C38 48, 70 30, 85 20"
      strokeDasharray="4 4"
      opacity="0.6"
    />
    {/* Plane */}
    <g transform="translate(80, 10) rotate(-10)">
      <polygon
        points="0,15 28,0 20,24 12,18"
        fill="#FCFAF7"
        stroke={strokeColor}
        strokeWidth="2"
      />
      <line x1="28" y1="0" x2="12" y2="18" stroke={strokeColor} strokeWidth="1.5" />
    </g>
  </svg>
);

// Hand-drawn curved underline swoosh
export const DoodleUnderline: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'w-48 h-4', color = '#7A1C2B' }) => (
  <svg
    viewBox="0 0 200 16"
    className={className}
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M 5 8 Q 50 15 100 8 T 195 10" />
    <path d="M 25 12 Q 70 16 115 11 T 175 14" opacity="0.5" strokeWidth="1.5" />
  </svg>
);

// Hand-drawn Map Pin with heart inside
export const DoodlePin: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'w-8 h-10', color = '#7A1C2B' }) => (
  <svg
    viewBox="0 0 40 50"
    className={className}
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 45 C20 45 6 30 6 18 C6 10 12.2 4 20 4 C27.8 4 34 10 34 18 C34 30 20 45 20 45 Z" fill="#FCFAF7" />
    {/* Tiny heart inside pin */}
    <path
      d="M20 22 C17 19 13 16 13 13 C13 10.5 15 9 17 9 C18.5 9 19.5 9.8 20 10.5 C20.5 9.8 21.5 9 23 9 C25 9 27 10.5 27 13 C27 16 23 19 20 22 Z"
      fill={color}
      stroke="none"
    />
  </svg>
);

// Sparkle / Star doodle
export const DoodleSparkle: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'w-5 h-5', color = '#7A1C2B' }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    fill={color}
    stroke="none"
  >
    <path d="M16 0 C16 8 24 16 32 16 C24 16 16 24 16 32 C16 24 8 16 0 16 C8 16 16 8 16 0 Z" />
  </svg>
);

// Minimal hand-drawn cute paper cloud
export const DoodleCloud: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'w-16 h-10', color = '#E4DBD0' }) => (
  <svg
    viewBox="0 0 64 40"
    className={className}
    fill="#FCFAF7"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 30 C7 30 4 26 4 21 C4 16 8 13 13 13 C14 8 19 4 26 4 C33 4 38 8 40 12 C43 10 47 10 50 13 C54 16 56 20 55 24 C58 25 60 28 60 31 C60 35 56 38 52 38 L14 38 C10 38 7 35 7 31" />
  </svg>
);

// Hand-drawn Music Note doodle
export const DoodleMusicNote: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'w-6 h-6', color = '#7A1C2B' }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 28 C14 31 11 33 8 33 C5 33 3 31 3 28 C3 25 5 23 8 23 C11 23 14 25 14 28 Z" fill={color} />
    <path d="M34 24 C34 27 31 29 28 29 C25 29 23 27 23 24 C23 21 25 19 28 19 C31 19 34 21 34 24 Z" fill={color} />
    <path d="M14 28 L14 10 L34 6 L34 24" />
    <path d="M14 15 L34 11" strokeWidth="2" />
  </svg>
);

// Vintage Vinyl Record SVG
export const DoodleVinylRecord: React.FC<{
  className?: string;
  isSpinning?: boolean;
}> = ({ className = 'w-24 h-24', isSpinning = false }) => (
  <div
    className={`rounded-full bg-[#1C1819] border-2 border-[#2A2426] relative flex items-center justify-center shadow-lg select-none ${
      className
    } ${isSpinning ? 'animate-spin' : ''}`}
    style={{ animationDuration: '3.5s', animationTimingFunction: 'linear' }}
  >
    {/* Concentric grooves */}
    <div className="absolute inset-1.5 rounded-full border border-white/10" />
    <div className="absolute inset-3.5 rounded-full border border-white/5" />
    <div className="absolute inset-5 rounded-full border border-white/10" />
    {/* Center label */}
    <div className="w-8 h-8 rounded-full bg-pastel-blush border border-maroon flex items-center justify-center">
      <div className="w-2.5 h-2.5 rounded-full bg-[#1C1819] border border-maroon" />
    </div>
  </div>
);

// Vintage Postage Stamp Motif
export const PostageStamp: React.FC<{
  text?: string;
  date?: string;
  from?: string;
  to?: string;
}> = ({
  text = 'AIR MAIL',
  date = 'PAR AVION',
  from = 'CAI',
  to = 'JOG',
}) => (
  <div className="w-24 h-28 border-2 border-dashed border-maroon/30 rounded-md bg-paper-card p-2 flex flex-col justify-between items-center rotate-[-3deg] shadow-stamp select-none">
    <div className="text-[10px] uppercase font-mono tracking-widest text-maroon/70 font-bold">
      {text}
    </div>
    <div className="flex flex-col items-center justify-center my-1">
      <div className="text-base font-serif font-bold text-maroon flex items-center gap-1">
        <span>{from}</span>
        <span className="text-xs text-ink-muted">✈️</span>
        <span>{to}</span>
      </div>
      <div className="text-[9px] font-mono text-ink-muted uppercase">{date}</div>
    </div>
    <div className="w-full border-t border-maroon/20 pt-1 flex justify-center">
      <DoodleHeart className="w-3.5 h-3.5 text-maroon/80" fill="#7A1C2B" />
    </div>
  </div>
);
