'use client';

import React, { useState, useEffect } from 'react';
import TrainerCard from '@/components/TrainerCard';
import { useDictionary } from '@/app/context/DictionaryContext';

interface Trainer {
  id: number;
  name: string;
  title?: string;
  specialty?: string;
  experience?: string | number;
  certifications?: string[];
  bio?: string;
  stats?: {
    clients?: string;
    transformations?: string;
    rating?: string;
  };
  labels?: {
    clients?: string;
    transformations?: string;
    rating?: string;
  };
  buttonText?: string;
  color?: string;
}

interface TrainersDict {
  header: {
    title: string;
    subtitle: string;
    description: string;
  };
  trainers: Trainer[];
}

export default function TrainersPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTrainer, setHoveredTrainer] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { dict } = useDictionary();
  const trainerDict: TrainersDict = dict.trainersPage;

  useEffect(() => {
    setIsVisible(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 864);
    };

    handleResize(); // Run once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      minHeight: '100vh',
      padding: isMobile ? '5rem 1rem 0rem' : '6rem 2rem 4rem',
    },
    header: {
      textAlign: 'center',
      marginBottom: '5rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
    },
    title: {
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      fontWeight: 900,
      color: 'white',
      marginBottom: '1rem',
    },
    subtitle: {
      fontSize: 'clamp(1rem, 2vw, 1.5rem)',
      color: '#a3e635',
      textTransform: 'uppercase',
      marginBottom: '0.5rem',
    },
    description: {
      fontSize: '1.1rem',
      color: '#a1a1aa',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: 1.6,
    },
    grid: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: isMobile
        ? 'auto'
        : 'repeat(auto-fit, minmax(380px, 1fr))',
      gap: isMobile ? '1rem' : '2rem',
      justifyContent: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{trainerDict.header.title}</h1>
        <p style={styles.subtitle}>{trainerDict.header.subtitle}</p>
      </div>

      <div style={styles.grid}>
        {trainerDict.trainers.map((trainer, idx) => (
          <TrainerCard
            key={trainer.id}
            trainer={trainer}
            index={idx}
            isVisible={isVisible}
            isHovered={hoveredTrainer === trainer.id}
            onHover={() => setHoveredTrainer(trainer.id)}
            onLeave={() => setHoveredTrainer(null)}
          />
        ))}
      </div>
    </div>
  );
}
