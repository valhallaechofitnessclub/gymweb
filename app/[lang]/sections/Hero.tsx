'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useDictionary } from '@/app/context/DictionaryContext';

const BRAND_GRADIENT = 'linear-gradient(90deg, #FF6A00, #FF9A3C, #FFB347, #FFFFFF)';

export default function Hero() {
  const { dict } = useDictionary();
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1] || 'en';

  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredChip, setHoveredChip] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const navChips = [
    { id: 'pricing',    label: dict.cards?.card2?.title ?? 'Prices',     path: `/${currentLang}/pricing`    },
    { id: 'activities', label: dict.cards?.card3?.title ?? 'Activities', path: `/${currentLang}/activities` },
    { id: 'contact',    label: 'Contact',                                 path: `/${currentLang}/contact`    },
  ];

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      position: 'relative',
      width: '100%',
      maxWidth: '100vw',
      height: '100dvh',
      maxHeight: '100dvh',
      overflow: 'hidden',
      background: 'transparent',
      display: 'flex',
      alignItems: isMobile ? 'flex-end' : 'center',
      boxSizing: 'border-box',
    },
    imageWrapper: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: isMobile ? '100%' : '55%',
      marginLeft: isMobile ? 0 : 'auto',
    },
    imageGradientLeft: {
      position: 'absolute',
      inset: 0,
      zIndex: 1,
    },
    imageGradientBottom: {
      position: 'absolute',
      inset: 0,
      zIndex: 1,
    },
    content: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: isMobile ? '0.85rem' : '1rem',
      padding: isMobile ? '0 1.5rem 3.5rem 1.5rem' : '0 6vw',
      width: isMobile ? '100%' : 'auto',
      maxWidth: isMobile ? '100%' : '640px',
      boxSizing: 'border-box',
    },
    title: {
      fontSize: isMobile ? 'clamp(3rem, 15vw, 5rem)' : 'clamp(4rem, 10vw, 9rem)',
      fontWeight: 900,
      lineHeight: 0.95,
      letterSpacing: '-0.02em',
      color: '#ffffff',
      margin: 0,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
      textShadow: isMobile ? '0 2px 20px rgba(0,0,0,0.8)' : 'none',
    },
    titleAccent: {
      display: 'block',
      background: BRAND_GRADIENT,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      filter: 'drop-shadow(0 0 18px rgba(255,106,0,0.45))',
    },
    divider: {
      width: isVisible ? '80px' : '0px',
      height: '3px',
      background: 'linear-gradient(90deg, #FF6A00, #FFB347)',
      borderRadius: '2px',
      boxShadow: '0 0 12px rgba(255,106,0,0.6)',
      transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s',
      flexShrink: 0,
    },
    subtitle: {
      fontSize: isMobile ? '0.9rem' : 'clamp(0.95rem, 1.4vw, 1.15rem)',
      fontWeight: 300,
      color: isMobile ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.55)',
      lineHeight: 1.7,
      margin: 0,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 1s ease 0.45s',
    },
    chipRow: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '0.5rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
      transition: 'all 1s ease 0.6s',
      marginTop: '0.15rem',
    },
  };

  const getChipStyle = (id: string): React.CSSProperties => ({
    padding: '0.4rem 1rem',
    background: hoveredChip === id ? 'linear-gradient(90deg, #FF6A00, #FF9A3C)' : 'transparent',
    color: hoveredChip === id ? '#fff' : 'rgba(255,255,255,0.55)',
    fontWeight: 600,
    fontSize: '0.72rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    border: `1px solid ${hoveredChip === id ? 'transparent' : 'rgba(255,255,255,0.18)'}`,
    borderRadius: '100px',
    cursor: 'pointer',
    transition: 'all 0.22s ease',
    boxShadow: hoveredChip === id ? '0 2px 16px rgba(255,106,0,0.35)' : 'none',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    flexShrink: 0,
  });

  return (
    <>
      <style>{`
        html, body { max-width: 100%; overflow-x: hidden; }
      `}</style>

      <section style={styles.container}>
        {/* Hero image */}
        <div style={styles.imageWrapper}>
          <Image
            src="/assets/images/heroImage.png"
            alt="Athlete"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: isMobile ? 'center top' : 'top',
            }}
            priority
          />
          <div style={styles.imageGradientLeft} />
          <div style={styles.imageGradientBottom} />
        </div>

        {/* Content */}
        <div style={styles.content}>
          <h1 style={styles.title}>
            {dict.hero.title.split(' ').slice(0, 2).join(' ')}
            <span style={styles.titleAccent}>
              {dict.hero.title.split(' ').slice(2).join(' ')}
            </span>
          </h1>

          <div style={styles.divider} />

          <p style={styles.subtitle}>{dict.hero.subtitle}</p>

          {/* Nav chips */}
          <div style={styles.chipRow}>
            {navChips.map((chip) => (
              <button
                key={chip.id}
                style={getChipStyle(chip.id)}
                onMouseEnter={() => setHoveredChip(chip.id)}
                onMouseLeave={() => setHoveredChip(null)}
                onClick={() => router.push(chip.path)}
              >
                <span style={{
                  display: 'inline-block',
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: hoveredChip === chip.id ? '#fff' : '#FF6A00',
                  flexShrink: 0,
                  transition: 'background 0.22s ease',
                }} />
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}