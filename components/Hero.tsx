'use client';

import React from 'react';
import { BRAND_GRADIENT, brandRgba } from '@/theme/brand';

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
          background: BRAND_GRADIENT,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: subtitle ? '1rem' : '0',
          filter: `drop-shadow(0 0 40px ${brandRgba(0.25)})`,
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            background: BRAND_GRADIENT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textTransform: 'uppercase',
            fontWeight: 300,
            letterSpacing: '0.1em',
            filter: `drop-shadow(0 0 20px ${brandRgba(0.3)})`,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
