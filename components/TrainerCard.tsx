'use client';

import React, { useState } from 'react';
import { Award, Mail, ChevronRight, Zap } from 'lucide-react';

// Mata Fitness brand colors
const BRAND_ORANGE = '#FF6A00';
const BRAND_GRADIENT = 'linear-gradient(135deg, #FF6A00 0%, #FF9A3C 50%, #FFFFFF 100%)';
const brandRgba = (alpha: number) => `rgba(255, 106, 0, ${alpha})`;

interface Trainer {
  name: string;
  color?: string;
  image?: string;
  experience?: string | number;
  specialty?: string;
  title?: string;
  bio?: string;
  certifications?: string[];
  buttonText?: string;
}

interface Props {
  trainer: Trainer;
  index?: number;
  isVisible?: boolean;
  isHovered?: boolean;
  onHover?: React.MouseEventHandler<HTMLDivElement>;
  onLeave?: React.MouseEventHandler<HTMLDivElement>;
  transitionSpeed?: string;
}

export default function TrainerCard({
  trainer,
  index = 0,
  isVisible,
  isHovered,
  onHover,
  onLeave,
  transitionSpeed = '0.2s',
}: Props) {
  const [buttonHovered, setButtonHovered] = useState(false);

  const styles: { [key: string]: React.CSSProperties } = {
    card: {
      background: 'rgba(24, 24, 27, 0.6)',
      backdropFilter: 'blur(12px)',
      border: isHovered
        ? `1px solid ${brandRgba(0.45)}`
        : '1px solid rgba(39, 39, 42, 1)',
      borderRadius: '20px',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      opacity: isVisible ? 1 : 0,
      transform: isVisible
        ? isHovered ? 'translateY(-8px)' : 'translateY(0)'
        : 'translateY(30px)',
      transition: `opacity 0.4s ease-out ${index * 0.15}s, transform ${transitionSpeed} ease ${index * 0.15}s, border ${transitionSpeed} ease, box-shadow ${transitionSpeed} ease`,
      boxShadow: isHovered
        ? `0 20px 60px ${brandRgba(0.22)}`
        : '0 4px 20px rgba(0, 0, 0, 0.4)',
    },
    imageSection: {
      height: '220px',
      background: trainer.image
        ? `url('/assets/images/${trainer.image}') center/cover no-repeat`
        : `linear-gradient(135deg, ${trainer.color ?? '#1f1f1f'}, rgba(24, 24, 27, 0.8))`,
      position: 'relative',
      overflow: 'hidden',
    },
    imageOverlay: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'linear-gradient(to bottom, transparent 0%, rgba(24, 24, 27, 0.7) 100%)',
      zIndex: 1,
    },
    imageLetter: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '7rem',
      fontWeight: 900,
      color: 'rgba(255, 255, 255, 0.1)',
      zIndex: 0,
    },
    experienceBadge: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      border: `1px solid ${brandRgba(0.45)}`,
      color: BRAND_ORANGE,
      padding: '0.5rem 0.9rem',
      borderRadius: '10px',
      fontSize: '0.8rem',
      fontWeight: 600,
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
    },
    specialtyBadge: {
      position: 'absolute',
      bottom: '1rem',
      left: '1rem',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      border: `1px solid ${brandRgba(0.45)}`,
      color: BRAND_ORANGE,
      padding: '0.5rem 0.9rem',
      borderRadius: '10px',
      fontSize: '0.8rem',
      fontWeight: 600,
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
    },
    content: {
      padding: '1.5rem',
    },
    name: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: 'white',
      marginBottom: '0.25rem',
    },
    title: {
      fontSize: '0.85rem',
      color: '#a1a1aa',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '1rem',
    },
    bio: {
      color: '#d4d4d8',
      fontSize: '0.9rem',
      lineHeight: 1.5,
      marginBottom: '1rem',
    },
    certifications: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.4rem',
      marginBottom: '1.25rem',
    },
    cert: {
      background: brandRgba(0.1),
      border: `1px solid ${brandRgba(0.22)}`,
      color: BRAND_ORANGE,
      padding: '0.3rem 0.6rem',
      borderRadius: '6px',
      fontSize: '0.75rem',
      fontWeight: 500,
    },
    actions: {
      display: 'flex',
      gap: '0.75rem',
    },
    button: {
      padding: '0.85rem',
      borderRadius: '10px',
      fontSize: '0.85rem',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.4rem',
      cursor: 'pointer',
      border: 'none',
      transition: `all ${transitionSpeed} ease`,
    },
    primaryButton: {
      flex: 1,
      background: buttonHovered ? BRAND_GRADIENT : brandRgba(0.12),
      border: `1px solid ${brandRgba(0.6)}`,
      color: buttonHovered ? '#0b0b0b' : BRAND_ORANGE,
    },
    iconButton: {
      background: brandRgba(0.1),
      border: `1px solid ${brandRgba(0.22)}`,
      color: BRAND_ORANGE,
      width: '44px',
    },
  };

  return (
    <div style={styles.card} onMouseEnter={onHover} onMouseLeave={onLeave}>
      <div style={styles.imageSection}>
        {!trainer.image && (
          <div style={styles.imageLetter}>
            {trainer.name.split(' ')[0].charAt(0)}
          </div>
        )}
        <div style={styles.imageOverlay} />
        <div style={styles.experienceBadge}>
          <Award size={14} />
          {trainer.experience}
        </div>
        <div style={styles.specialtyBadge}>
          <Zap size={14} />
          {trainer.specialty}
        </div>
      </div>

      <div style={styles.content}>
        <h3 style={styles.name}>{trainer.name}</h3>
        <p style={styles.title}>{trainer.title}</p>
        <p style={styles.bio}>{trainer.bio}</p>

        <div style={styles.certifications}>
          {trainer.certifications?.map((cert: string, i: number) => (
            <span key={i} style={styles.cert}>{cert}</span>
          ))}
        </div>

        <div style={styles.actions}>
          <button
            style={{ ...styles.button, ...styles.primaryButton }}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
          >
            {trainer.buttonText}
            <ChevronRight size={16} />
          </button>
          <button style={{ ...styles.button, ...styles.iconButton }}>
            <Mail size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}