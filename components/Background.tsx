'use client';

import React, { useEffect, useState } from 'react';

const STAR_COLORS = [
  '#CC3300',
  '#E03A00',
  '#FF6A00',
  '#FF9A3C',
  '#FFFFFF',
];

export default function Background() {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      left: string;
      top: string;
      delay: number;
      duration: number;
      color: string;
      size: string;
    }>
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 5,
      color: STAR_COLORS[i % STAR_COLORS.length],
      size: `${0.8 + Math.random() * 2}px`,
    }));

    setParticles(generated);
  }, []);

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%   { transform: translate(0, 0) scale(1);    opacity: 0; }
          20%  { opacity: 0.7; }
          50%  { transform: translate(-8px, -18px) scale(1.2); opacity: 0.4; }
          80%  { opacity: 0.8; }
          100% { transform: translate(4px, -28px) scale(0.9); opacity: 0; }
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: '#080808',
          overflow: 'hidden',
        }}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              opacity: 0,
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow:
                p.color === '#FFFFFF'
                  ? `0 0 6px 1px rgba(255,255,255,0.8)`
                  : `0 0 10px 2px ${p.color}99`,
              animation: `twinkle ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}