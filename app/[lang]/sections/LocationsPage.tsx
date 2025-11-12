'use client';

import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import LocationCard from '@/components/LocationsCard';
import Link from 'next/link';

interface LocationCardType {
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  features: string[];
  image: string;
}

interface LocationsPageProps {
  dict: {
    header: { title: string; subtitle: string };
    cards: Record<string, LocationCardType>;
    mapSection: { title: string; text: string };
  };
}

export default function LocationsPage({ dict }: LocationsPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const locations = Object.values(dict.cards).map((card, i) => ({
    id: i + 1,
    ...card,
  }));

  useEffect(() => {
    setIsVisible(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Run once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      padding: isMobile ? '5rem 1rem 2rem' : '6rem 2rem 4rem',
    },
    header: {
      textAlign: 'center',
      marginBottom: '4rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
      transition: 'all 0.8s ease-out',
    },
    title: {
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      fontWeight: 900,
      color: 'white',
      marginBottom: '1rem',
      textShadow: '0 0 40px rgba(163,230,53,0.3)',
    },
    subtitle: {
      fontSize: 'clamp(1rem, 2vw, 1.5rem)',
      color: '#a3e635',
      textTransform: 'uppercase',
      fontWeight: 300,
      letterSpacing: '0.1em',
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
      border: '2px dashed rgba(163, 230, 53, 0.2)',
    },
  } as const;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{dict.header.title}</h1>
        <p style={styles.subtitle}>{dict.header.subtitle}</p>
      </div>

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
        <h2 style={styles.mapTitle}>{dict.mapSection.title}</h2>
        <p style={styles.mapText}>{dict.mapSection.text}</p>

        <Link
          href="https://www.google.com/maps?sca_esv=25e6345522a98859&output=search&q=რეფორმა&source=lnms&fbs=AIIjpHzZzB2ZqEE71Te1HhZB2eS5CB8DXh_Vz1MtU1PbrsfE5evFSw0z9rcUb0iAP2Q2MBk54AvObt4DR69vsBH9RvnhpA50etHoLGYWuDeKcLgleW_bn8eYGMm1Lq5RNyVbNpuLdPfYZFgi2wegriqEteXBu6eqmZpa2gZBSGEM8gYdZUCjcgvmUWFW6IczUu4RKMyB9CHOYDFoMFfM5Wt0ofMDGSNa4qh1gtzNUSiDTbYL-DIQjmMJ_MMzIL2WkM_7nVp-LHQj&entry=mc&ved=1t:200715&ictx=111"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block' }}
        >
          <div style={styles.mapPlaceholder}>
            <MapPin size={isMobile ? 50 : 80} color="#a3e635" opacity={0.3} />
          </div>
        </Link>
      </div>
    </div>
  );
}
