'use client';

import React from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  isVisible?: boolean;
}

export default function Hero({ title, subtitle, isVisible = true }: HeroProps) {
  return (
    <div
      style={{
        textAlign: 'center',
        marginBottom: '4rem',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
        transition: 'all 0.8s ease-out',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 900,
          color: 'white',
          marginBottom: subtitle ? '1rem' : '0',
          textShadow: '0 0 40px rgba(163,230,53,0.3)',
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            color: '#a3e635',
            textTransform: 'uppercase',
            fontWeight: 300,
            letterSpacing: '0.1em',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
