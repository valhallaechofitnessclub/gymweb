'use client';

import React, { useState, useEffect } from 'react';
import ActivityCard from '@/components/ActivityCard';
import Hero from '@/components/Hero';
import { useDictionary } from '@/app/context/DictionaryContext';

export default function Activities() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { dict, lang } = useDictionary();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 864);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const dictData = dict.activitiesPage;

  const activities = Object.values(dictData.activities).map((activity, i) => ({
    id: i + 1,
    ...activity,
  }));

  const styles = {
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
        ? '1fr'
        : 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: isMobile ? '1rem' : '2rem',
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
        {activities.map((activity, idx) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            index={idx}
            isVisible={isVisible}
            lang={lang === 'ge' ? 'ka' : 'en'}
          />
        ))}
      </div>
    </div>
  );
}
