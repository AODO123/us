import React from 'react';

export const PaperTexture: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full paper-texture overflow-x-hidden">
      {/* Real SVG Paper Grain overlay for tactile card realism */}
      <div className="paper-grain-overlay" aria-hidden="true" />

      {/* Ambient subtle vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 60%, rgba(228, 219, 208, 0.45) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
