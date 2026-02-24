'use client';

import React, { useEffect, useState } from 'react';

// Mata Fitness brand colors
const BRAND_ORANGE = '#FF6A00';
const BRAND_WHITE = '#FFFFFF';
const BRAND_GRADIENT = `linear-gradient(135deg, ${BRAND_ORANGE} 0%, #FF9A3C 50%, ${BRAND_WHITE} 100%)`;
const brandRgba = (alpha: number) => `rgba(255, 106, 0, ${alpha})`;

interface HeroProps {
  title: string;
  subtitle?: string;
  isVisible?: boolean;
}

export default function Hero({ title, subtitle, isVisible = true }: HeroProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
          fontSize: isMobile ? 'clamp(2.2rem, 10vw, 4.5rem)' : 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 900,
          background: BRAND_GRADIENT,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: subtitle ? '1rem' : '0',
          filter: `drop-shadow(0 0 40px ${brandRgba(0.35)})`,
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontSize: isMobile ? 'clamp(1rem, 4vw, 1.5rem)' : 'clamp(1rem, 2vw, 1.5rem)',
            background: BRAND_GRADIENT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textTransform: 'uppercase',
            fontWeight: 300,
            letterSpacing: '0.1em',
            filter: `drop-shadow(0 0 20px ${brandRgba(0.4)})`,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}