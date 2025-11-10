'use client';

import React, { useState, useEffect } from 'react';
import PricingCard from '@/components/PricingCard';

interface PricingPlan {
  name: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  isDiscounted: boolean;
  duration: string;
  features: string[];
  isPopular?: boolean;
  badge?: string;
}

interface PricingPageDict {
  header: { title: string; subtitle: string };
  plans: Record<string, PricingPlan>;
}

interface PricingPageProps {
  dict: PricingPageDict;
  lang?: 'en' | 'ka';
}

export default function PricingPage({ dict, lang = 'en' }: PricingPageProps) {
  const [isVisible, setIsVisible] = useState(false);

  const plans = Object.values(dict.plans).map((plan, i) => ({
    id: i + 1,
    ...plan,
  }));

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '6rem 2rem 4rem',
    },
    header: {
      textAlign: 'center',
      marginBottom: '4rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
      transition: 'all 0.8s ease-out',
    },
    title: {
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      fontWeight: 900,
      color: 'white',
      marginBottom: '1rem',
      textShadow: '0 0 40px rgba(163,230,53,0.3)',
    },
    subtitle: {
      fontSize: 'clamp(1rem, 2vw, 1.5rem)',
      color: '#a3e635',
      textTransform: 'uppercase',
      fontWeight: 300,
      letterSpacing: '0.1em',
    },
    grid: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem',
    },
  } as const;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{dict.header.title}</h1>
        <p style={styles.subtitle}>{dict.header.subtitle}</p>
      </div>

      <div style={styles.grid}>
        {plans.map((plan, idx) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            index={idx}
            isVisible={isVisible}
            lang={lang}
          />
        ))}
      </div>
    </div>
  );
}
