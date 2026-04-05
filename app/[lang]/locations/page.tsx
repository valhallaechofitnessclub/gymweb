'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import LocationCard from '@/components/LocationsCard';
import Hero from '@/components/Hero';
import Link from 'next/link';
import Image from 'next/image';
import { useDictionary } from '@/app/context/DictionaryContext';

const ACCENT = '#42c2ca';
const GRADIENT = 'linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf)';

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

  const locationImages = [
    '/assets/images/gldaniGym.png',
    '/assets/images/saburtaloGym.png',
  ];

  const locations = Object.values(dictData.cards).map((card, i) => ({
    id: i + 1,
    ...card,
    image: locationImages[i] ?? '/assets/images/gldaniGym.png',
  }));

  return (
    <div style={{
      minHeight: '100dvh',
      padding: isMobile ? '5rem 1rem 2rem' : '6rem 2rem 4rem',
      backgroundColor: 'black',
    }}>
      <Hero
        title={dictData.header.title}
        subtitle={dictData.header.subtitle}
        isVisible={isVisible}
      />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: isMobile ? '1rem' : '1.5rem',
      }}>
        {locations.map((location, idx) => (
          <LocationCard
            key={location.id}
            location={location}
            index={idx}
            isVisible={isVisible}
          />
        ))}
      </div>

      {/* Map section — bothGym.png as full background */}
      <div style={{
        maxWidth: '1400px',
        margin: '4rem auto 0',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        height: isMobile ? '340px' : '500px',
      }}>
        {/* Photo */}
        <Image
          src="/assets/images/bothGym.png"
          alt="Both gym locations"
          fill
          style={{ objectFit: 'cover' }}
          loading="lazy"
        />

        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.75) 100%)',
        }} />

        {/* Gradient accent line at bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: GRADIENT,
          zIndex: 2,
        }} />

        {/* Content */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '2rem 1.5rem' : '3rem',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            color: 'white',
            marginBottom: '0.75rem',
            marginTop: 0,
            letterSpacing: '0.04em',
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
          }}>
            {dictData.mapSection.title}
          </h2>

          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: isMobile ? '0.9rem' : '1.05rem',
            marginBottom: '2rem',
            maxWidth: '480px',
            lineHeight: 1.6,
          }}>
            {dictData.mapSection.text}
          </p>

          <Link
            href="https://www.google.com/maps/search/valhalla+echo+fitness/@41.7161693,44.6885749,12z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: GRADIENT,
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              padding: isMobile ? '0.75rem 1.5rem' : '0.875rem 2rem',
              fontSize: isMobile ? '0.875rem' : '1rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
            }}
          >
            <MapPin size={16} />
            View on Google Maps
            <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}