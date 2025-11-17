'use client';

import React, { useState } from 'react';
import { Calendar, ChevronRight, Clock, TrendingUp, Users } from 'lucide-react';

interface Activity {
  id: number;
  name: string;
  description: string;
  duration: string;
  level: string;
  schedule: string;
  image?: string;
  color?: string;
}

interface ActivityCardProps {
  activity: Activity;
  index: number;
  isVisible: boolean;
  lang?: 'en' | 'ka';
}

const translations = {
  en: { bookClass: 'Book a Class' },
  ka: { bookClass: 'დაჯავშნე კლასი' },
};

export default function ActivityCard({
  activity,
  index,
  isVisible,
  lang = 'en',
}: ActivityCardProps) {
  const [hover, setHover] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);

  const styles: { [key: string]: React.CSSProperties } = {
    card: {
      position: 'relative',
      borderRadius: '20px',
      overflow: 'hidden',
      minHeight: '480px',
      cursor: 'pointer',
      opacity: isVisible ? 1 : 0,
      transform: isVisible
        ? hover ? 'translateY(-8px)' : 'translateY(0)'
        : 'translateY(30px)',
      boxShadow: hover
        ? '0 20px 60px rgba(163,230,53,0.3), 0 0 0 1px rgba(163,230,53,0.4)'
        : '0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(39,39,42,1)',
      transition: `transform 0.3s ease ${index * 0.15}s, opacity 0.4s ease-out ${index * 0.15}s, box-shadow 0.2s ease, border 0.2s ease`,
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(24, 24, 27, 0.6)',
      backdropFilter: 'blur(12px)',
      border: hover ? '1px solid rgba(163, 230, 53, 0.4)' : '1px solid rgba(39, 39, 42, 1)',
    },
    imageSection: {
      height: '240px',
      position: 'relative',
      overflow: 'hidden',
      background: activity.image
        ? `url('/assets/images/${activity.image}')`
        : `linear-gradient(135deg, ${activity.color || '#1f2937'}, rgba(24, 24, 27, 0.8))`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    imageOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, transparent 0%, rgba(24, 24, 27, 0.85) 100%)',
      zIndex: 1,
    },
    indexBadge: {
      position: 'absolute',
      top: '1rem',
      left: '1rem',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(163, 230, 53, 0.4)',
      color: '#a3e635',
      padding: '0.5rem 0.9rem',
      borderRadius: '10px',
      fontSize: '0.8rem',
      fontWeight: 700,
      zIndex: 2,
    },
    levelBadge: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(163, 230, 53, 0.4)',
      color: '#a3e635',
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
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    name: {
      fontSize: '1.75rem',
      fontWeight: 800,
      marginBottom: '0.75rem',
      color: '#fff',
      lineHeight: 1.2,
    },
    description: {
      fontSize: '0.9rem',
      color: '#d4d4d8',
      lineHeight: 1.6,
      marginBottom: '1.25rem',
      flex: 1,
    },
    metaInfo: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.25rem',
      flexWrap: 'wrap',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'rgba(163, 230, 53, 0.08)',
      border: '1px solid rgba(163, 230, 53, 0.2)',
      color: '#a3e635',
      padding: '0.5rem 0.75rem',
      borderRadius: '8px',
      fontSize: '0.8rem',
      fontWeight: 500,
    },
    button: {
      width: '100%',
      padding: '0.95rem',
      borderRadius: '10px',
      border: 'none',
      background: buttonHover
        ? '#a3e635'
        : 'rgba(163, 230, 53, 0.1)',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#a3e635',
      color: buttonHover ? 'black' : '#a3e635',
      fontWeight: 700,
      fontSize: '0.9rem',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.5rem',
      transform: buttonHover ? 'scale(1.02)' : 'scale(1)',
      transition: 'all 0.2s ease',
    },
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={styles.imageSection}>
        <div style={styles.imageOverlay} />
        <div style={styles.indexBadge}>
          #{String(index + 1).padStart(2, '0')}
        </div>
        <div style={styles.levelBadge}>
          <TrendingUp size={14} />
          {activity.level}
        </div>
      </div>

      <div style={styles.content}>
        <h3 style={styles.name}>{activity.name}</h3>

        <p style={styles.description}>{activity.description}</p>

        <div style={styles.metaInfo}>
          <div style={styles.metaItem}>
            <Clock size={14} />
            {activity.duration}
          </div>
          <div style={styles.metaItem}>
            <Users size={14} />
            {activity.schedule}
          </div>
        </div>

        <button
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => setButtonHover(false)}
          style={styles.button}
        >
          <Calendar size={18} />
          {translations[lang].bookClass}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}