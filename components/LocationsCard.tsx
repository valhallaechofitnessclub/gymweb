'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, ChevronRight } from 'lucide-react';

// Mata Fitness brand colors
const BRAND_GRADIENT = 'linear-gradient(90deg, #FF6A00, #FF9A3C, #FFB347, #FFFFFF)';
const BRAND_ORANGE = '#FF6A00';
const brandRgba = (alpha: number) => `rgba(255, 106, 0, ${alpha})`;

// ----------- Types -----------
interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  features: string[];
  image: string;
}

interface LocationCardProps {
  location: Location;
  index: number;
  isVisible: boolean;
  lang?: 'en' | 'ka';
}

// ----------- Translations -----------
const MAP_LINKS = [
  'https://maps.google.com/?q=Moscow+Ave+29,+Tbilisi',
  'https://maps.google.com/?q=Ilia+Vekua+St+4,+Tbilisi',
];

const translations = {
  en: { openMap: 'Open on Map' },
  ka: { openMap: 'რუკაზე ნახვა' },
};

// ----------- Component -----------
export default function LocationCard({
  location,
  index,
  isVisible,
  lang = 'en',
}: LocationCardProps) {
  const [hover, setHover] = useState({ card: false, button: false });

  const styles: { [key: string]: React.CSSProperties } = {
    card: {
      padding: '32px',
      borderRadius: '24px',
      color: '#f8fafc',
      background: location.image,
      backdropFilter: 'blur(8px)',
      boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
      overflow: 'hidden',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      transition: isVisible
        ? `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`
        : 'none',
    },
    cardHover: {
      boxShadow: `0 12px 40px ${brandRgba(0.35)}`,
      transform: 'translateY(-8px)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    locationNumber: {
      fontSize: '14px',
      background: BRAND_GRADIENT,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      opacity: 0.9,
      marginBottom: '8px',
    },
    locationName: {
      fontSize: '24px',
      fontWeight: 700,
      margin: '0 0 4px 0',
    },
    locationCity: {
      background: BRAND_GRADIENT,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '16px',
      fontWeight: 500,
    },
    infoRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '8px',
      fontSize: '15px',
      opacity: 0.9,
    },
    iconWrapper: {
      width: '28px',
      height: '28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      backgroundColor: brandRgba(0.1),
    },
    featuresGrid: {
      marginTop: '20px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '10px',
    },
    feature: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      opacity: 0.95,
    },
    featureDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: 'linear-gradient(90deg, #FF6A00, #FF9A3C)',
    },
    ctaWrapper: {
      marginTop: '32px',
      display: 'flex',
      justifyContent: 'center',
    },
    ctaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: BRAND_GRADIENT,
      color: '#0b0b0b',
      border: 'none',
      borderRadius: '12px',
      padding: '12px 28px',
      fontWeight: 700,
      fontSize: '15px',
      cursor: 'pointer',
      boxShadow: `0 4px 12px ${brandRgba(0.3)}`,
      transition: 'all 0.25s ease',
    },
    ctaButtonHover: {
      transform: 'scale(1.04)',
      boxShadow: `0 6px 20px ${brandRgba(0.45)}`,
    },
  };

  return (
    <div
      style={{ ...styles.card, ...(hover.card ? styles.cardHover : {}) }}
      onMouseEnter={() => setHover({ ...hover, card: true })}
      onMouseLeave={() => setHover({ ...hover, card: false })}
    >
      <div style={styles.locationNumber}>0{index + 1}</div>
      <h3 style={styles.locationName}>{location.name}</h3>
      <p style={styles.locationCity}>{location.city}</p>

      <div style={styles.infoRow}>
        <div style={styles.iconWrapper}>
          <MapPin size={20} color={BRAND_ORANGE} />
        </div>
        <span>{location.address}</span>
      </div>

      <div style={styles.infoRow}>
        <div style={styles.iconWrapper}>
          <Phone size={20} color={BRAND_ORANGE} />
        </div>
        <span>{location.phone}</span>
      </div>

      <div style={styles.infoRow}>
        <div style={styles.iconWrapper}>
          <Clock size={20} color={BRAND_ORANGE} />
        </div>
        <span>{location.hours}</span>
      </div>

      <div style={styles.featuresGrid}>
        {location.features.map((feature, i) => (
          <div key={i} style={styles.feature}>
            <div style={styles.featureDot} />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div style={styles.ctaWrapper}>
        <a
          href={MAP_LINKS[index] ?? MAP_LINKS[0]}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...styles.ctaButton,
            ...(hover.button ? styles.ctaButtonHover : {}),
            textDecoration: 'none',
          }}
          onMouseEnter={() => setHover({ ...hover, button: true })}
          onMouseLeave={() => setHover({ ...hover, button: false })}
        >
          <ExternalLink size={15} />
          {translations[lang].openMap}
          <ChevronRight size={15} />
        </a>
      </div>
    </div>
  );
}