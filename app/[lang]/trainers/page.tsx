'use client';

import React, { useState, useEffect } from 'react';
import TrainerCard from '@/components/TrainerCard';
import Hero from '@/components/Hero';
import { useDictionary } from '@/app/context/DictionaryContext';

interface Trainer {
  id: number;
  name: string;
  specialty?: string;
  location?: string;
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
  image?: string;
}

interface TrainersDict {
  header: {
    title: string;
    subtitle: string;
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
      padding: isMobile ? '5rem 1rem 3rem' : '6rem 2rem 4rem',
      backgroundColor: 'black',
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
      <Hero
        title={trainerDict.header.title}
        subtitle={trainerDict.header.subtitle}
        isVisible={isVisible}
      />

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
