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

  /* Build array and reorder so the popular plan sits in the centre */
  const allPlans = Object.values(dictData.plans).map((plan, i) => ({
    id: i + 1,
    ...plan,
  }));

  const popular = allPlans.filter((p) => (p as { isPopular?: boolean }).isPopular);
  const others  = allPlans.filter((p) => !(p as { isPopular?: boolean }).isPopular);
  const plans   = others.length >= 2
    ? [others[0], ...popular, ...others.slice(1)]
    : [...others, ...popular];

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
        : 'repeat(3, 1fr)',
      gap: isMobile ? '1rem' : '2rem',
      alignItems: 'stretch',
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
