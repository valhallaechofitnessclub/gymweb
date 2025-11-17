'use client';

import React, { useState, useEffect } from 'react';
import PricingCard from '@/components/PricingCard';
import Hero from '@/components/Hero';
import { useDictionary } from '@/app/context/DictionaryContext';

export default function Pricing() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { dict, lang } = useDictionary();

  useEffect(() => {
    setIsVisible(true);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dictData = dict.pricingPage;

  const plans = Object.values(dictData.plans).map((plan, i) => ({
    id: i + 1,
    ...plan,
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
        {plans.map((plan, idx) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            index={idx}
            isVisible={isVisible}
            lang={lang === 'ge' ? 'ka' : 'en'}
          />
        ))}
      </div>
    </div>
  );
}
