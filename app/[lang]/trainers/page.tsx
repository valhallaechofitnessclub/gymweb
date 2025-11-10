'use client';

import React, { useState, useEffect } from 'react';
import TrainerCard from '@/components/TrainerCard';
import en from '@/dictionary/en.json';
import ge from '@/dictionary/ge.json';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1] as 'en' | 'ge';
  const dict: TrainersDict =
    currentLang === 'ge' ? ge.trainersPage : en.trainersPage;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      minHeight: '100vh',
      padding: '6rem 2rem 4rem',
    },
    header: {
      textAlign: 'center',
      marginBottom: '5rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
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
      gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
      gap: '2.5rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{dict.header.title}</h1>
        <p style={styles.subtitle}>{dict.header.subtitle}</p>
        <p style={styles.description}>{dict.header.description}</p>
      </div>

      <div style={styles.grid}>
        {dict.trainers.map((trainer, idx) => (
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
