'use client';

import React, { useEffect, useState } from 'react';

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

  const gradient = 'linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf)';

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
          background: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.2,
          marginBottom: subtitle ? '1rem' : '0',
          filter: 'drop-shadow(0 0 40px rgba(200, 0, 0, 0.25))',
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontSize: isMobile ? 'clamp(1rem, 4vw, 1.5rem)' : 'clamp(1rem, 2vw, 1.5rem)',
            background: gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textTransform: 'uppercase',
            fontWeight: 300,
            letterSpacing: '0.1em',
            filter: 'drop-shadow(0 0 20px rgba(66, 194, 202, 0.3))',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}