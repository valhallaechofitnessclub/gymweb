'use client';

import React, { useEffect, useState } from 'react';

const GRADIENT_COLORS = [
  '#ec4899',
  '#d946ef',
  '#a855f7',
  '#6366f1',
  '#3b82f6',
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
    }>
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 4,
      // cycle through the SAME gradient colors as the title
      color: GRADIENT_COLORS[i % GRADIENT_COLORS.length],
    }));

    setParticles(generated);
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      background:
        'linear-gradient(to bottom, #0a0a0a, #1a0a1f, #0f0a1f, #0a0a0a)',
      overflow: 'hidden',
    },
    particle: {
      position: 'absolute',
      width: '2px',
      height: '2px',
      borderRadius: '50%',
      opacity: 0.6,
    },
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); opacity: 0.6; }
          25% { transform: translate(10px, -20px); opacity: 0.8; }
          50% { transform: translate(-10px, -10px); opacity: 0.4; }
          75% { transform: translate(5px, -30px); opacity: 0.7; }
        }
      `}</style>

      <div style={styles.container}>
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              ...styles.particle,
              left: p.left,
              top: p.top,
              background: p.color,
              boxShadow: `0 0 12px ${p.color}`,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
