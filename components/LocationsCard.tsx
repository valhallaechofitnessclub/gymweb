'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Clock, Calendar, ChevronRight } from 'lucide-react';

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
const translations = {
  en: {
    book: 'Book a Tour',
  },
  ka: {
    book: 'დააჯავშნე ტური',
  },
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

      // Initial entrance animation
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      transition: isVisible
        ? `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`
        : 'none',
    },

    cardHover: {
      boxShadow: '0 12px 40px rgba(163,230,53,0.35)',
      transform: 'translateY(-8px)',
      // Fast hover transition, independent of entrance delay
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },

    locationNumber: {
      fontSize: '14px',
      color: '#a3e635',
      opacity: 0.7,
      marginBottom: '8px',
    },
    locationName: {
      fontSize: '24px',
      fontWeight: 700,
      margin: '0 0 4px 0',
    },
    locationCity: {
      color: '#a3e635',
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
      backgroundColor: 'rgba(163,230,53,0.1)',
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
      backgroundColor: '#a3e635',
    },
    ctaButton: {
      marginTop: '28px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      background: 'linear-gradient(90deg, #a3e635 0%, #bef264 100%)',
      color: '#111',
      border: 'none',
      borderRadius: '12px',
      padding: '12px 18px',
      fontWeight: 700,
      fontSize: '15px',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(163,230,53,0.3)',
      transition: 'all 0.25s ease',
    },
    ctaButtonHover: {
      transform: 'scale(1.04)',
      boxShadow: '0 6px 20px rgba(163,230,53,0.45)',
    },
  };

  return (
    <div
      style={{
        ...styles.card,
        ...(hover.card ? styles.cardHover : {}),
      }}
      onMouseEnter={() => setHover({ ...hover, card: true })}
      onMouseLeave={() => setHover({ ...hover, card: false })}
    >
      <div style={styles.locationNumber}>0{index + 1}</div>
      <h3 style={styles.locationName}>{location.name}</h3>
      <p style={styles.locationCity}>{location.city}</p>

      <div style={styles.infoRow}>
        <div style={styles.iconWrapper}>
          <MapPin size={20} color="#a3e635" />
        </div>
        <span>{location.address}</span>
      </div>

      <div style={styles.infoRow}>
        <div style={styles.iconWrapper}>
          <Phone size={20} color="#a3e635" />
        </div>
        <span>{location.phone}</span>
      </div>

      <div style={styles.infoRow}>
        <div style={styles.iconWrapper}>
          <Clock size={20} color="#a3e635" />
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

      <button
        style={{
          ...styles.ctaButton,
          ...(hover.button ? styles.ctaButtonHover : {}),
        }}
        onMouseEnter={() => setHover({ ...hover, button: true })}
        onMouseLeave={() => setHover({ ...hover, button: false })}
      >
        <Calendar size={18} />
        {translations[lang].book}
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
