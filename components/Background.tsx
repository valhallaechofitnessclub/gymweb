'use client';

import React from 'react';

export default function Background() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
  }));

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      background: 'linear-gradient(to bottom, black, #18181b, black)',
      overflow: 'hidden',
    },
    particle: {
      position: 'absolute' as const,
      width: '2px',
      height: '2px',
      background: '#a3e635',
      borderRadius: '50%',
      boxShadow: '0 0 10px #a3e635',
      opacity: 0.6,
    },
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-20px) translateX(10px); 
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-10px) translateX(-10px); 
            opacity: 0.4;
          }
          75% { 
            transform: translateY(-30px) translateX(5px); 
            opacity: 0.7;
          }
        }
      `}</style>

      <div style={styles.container}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            style={{
              ...styles.particle,
              left: particle.left,
              top: particle.top,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}