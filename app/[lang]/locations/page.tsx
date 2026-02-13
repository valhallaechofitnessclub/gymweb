'use client';

import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import LocationCard from '@/components/LocationsCard';
import Hero from '@/components/Hero';
import Link from 'next/link';
import { useDictionary } from '@/app/context/DictionaryContext';
import { BRAND_ACCENT, brandRgba } from '@/theme/brand';

export default function LocationsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { dict } = useDictionary();

  useEffect(() => {
    setIsVisible(true);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dictData = dict.locationsPage;

  const locations = Object.values(dictData.cards).map((card, i) => ({
    id: i + 1,
    ...card,
  }));

  const styles = {
    container: {
      minHeight: '100dvh',
      padding: isMobile ? '5rem 1rem 2rem' : '6rem 2rem 4rem',
      backgroundColor: 'black',
    },
    grid: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: isMobile
        ? '1fr'
        : 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: isMobile ? '1rem' : '2rem',
    },
    mapSection: {
      maxWidth: '1400px',
      margin: '4rem auto 0',
      padding: isMobile ? '1rem' : '3rem',
      background: 'rgba(24, 24, 27, 0.6)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      textAlign: 'center',
    },
    mapTitle: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 700,
      color: 'white',
      marginBottom: '1rem',
      marginTop: '1rem',
    },
    mapText: {
      color: '#a1a1aa',
      fontSize: '1.1rem',
      marginBottom: '2rem',
    },
    mapPlaceholder: {
      height: isMobile ? '200px' : '400px',
      background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px dashed ${brandRgba(0.25)}`,
    },
  } as const;

  return (
    <div style={styles.container}>
      <Hero
        title={dictData.header.title}
        subtitle={dictData.header.subtitle}
        isVisible={isVisible}
      />

      <div style={styles.grid}>
        {locations.map((location, idx) => (
          <LocationCard
            key={location.id}
            location={location}
            index={idx}
            isVisible={isVisible}
          />
        ))}
      </div>

      <div style={styles.mapSection}>
        <h2 style={styles.mapTitle}>{dictData.mapSection.title}</h2>
        <p style={styles.mapText}>{dictData.mapSection.text}</p>

        <Link
          href="https://www.google.com/maps/search/valhalla+echo+fitness/@41.7161693,44.6885749,12z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block' }}
        >
          <div style={styles.mapPlaceholder}>
            <MapPin size={isMobile ? 50 : 80} color={BRAND_ACCENT} opacity={0.3} />
          </div>
        </Link>
      </div>
    </div>
  );
}
