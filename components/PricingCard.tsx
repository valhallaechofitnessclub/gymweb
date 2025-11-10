'use client';

import React, { useState } from 'react';
import { Check, Zap, Crown } from 'lucide-react';

// ----------- Types -----------
interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  isDiscounted: boolean;
  duration: string;
  features: string[];
  isPopular?: boolean;
  badge?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
  isVisible: boolean;
  lang?: 'en' | 'ka';
}

// ----------- Translations -----------
const translations = {
  en: {
    month: '/month',
    selectPlan: 'Select Plan',
    popular: 'Most Popular',
  },
  ka: {
    month: '/თვე',
    selectPlan: 'აირჩიე პაკეტი',
    popular: 'ყველაზე პოპულარული',
  },
};

// ----------- Component -----------
export default function PricingCard({
  plan,
  index,
  isVisible,
  lang = 'en',
}: PricingCardProps) {
  const [hover, setHover] = useState({ card: false, button: false });

  const discountPercentage =
    plan.isDiscounted && plan.oldPrice
      ? Math.round(((plan.oldPrice - plan.price) / plan.oldPrice) * 100)
      : 0;

  const styles: { [key: string]: React.CSSProperties } = {
    card: {
      padding: '32px',
      borderRadius: '24px',
      color: '#f8fafc',
      background: plan.isPopular
        ? 'linear-gradient(135deg, rgba(163,230,53,0.15) 0%, rgba(24,24,27,0.95) 100%)'
        : 'rgba(24, 24, 27, 0.6)',
      backdropFilter: 'blur(8px)',
      boxShadow: plan.isPopular
        ? '0 8px 30px rgba(163,230,53,0.3)'
        : '0 8px 30px rgba(0,0,0,0.4)',
      overflow: 'hidden',
      position: 'relative',
      border: plan.isPopular
        ? '2px solid rgba(163,230,53,0.5)'
        : '2px solid transparent',

      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      transition: isVisible
        ? `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`
        : 'none',
    },

    cardHover: {
      boxShadow: '0 12px 40px rgba(163,230,53,0.35)',
      transform: 'translateY(-8px)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },

    badge: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'linear-gradient(90deg, #a3e635 0%, #bef264 100%)',
      color: '#111',
      padding: '6px 14px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },

    planNumber: {
      fontSize: '14px',
      color: '#a3e635',
      opacity: 0.7,
      marginBottom: '8px',
    },

    planName: {
      fontSize: '28px',
      fontWeight: 700,
      margin: '0 0 8px 0',
    },

    description: {
      color: '#a1a1aa',
      marginBottom: '24px',
      fontSize: '15px',
      lineHeight: '1.5',
    },

    priceContainer: {
      marginBottom: '24px',
    },

    oldPrice: {
      fontSize: '20px',
      color: '#71717a',
      textDecoration: 'line-through',
      marginBottom: '4px',
    },

    priceRow: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '12px',
      flexWrap: 'wrap',
    },

    price: {
      fontSize: '48px',
      fontWeight: 900,
      color: '#a3e635',
      lineHeight: '1',
    },

    duration: {
      fontSize: '16px',
      color: '#a1a1aa',
    },

    discountBadge: {
      background: 'rgba(239, 68, 68, 0.2)',
      color: '#fca5a5',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: 700,
      border: '1px solid rgba(239, 68, 68, 0.3)',
    },

    featuresTitle: {
      fontSize: '14px',
      color: '#a3e635',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '16px',
      fontWeight: 600,
    },

    featuresList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '28px',
    },

    feature: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '15px',
      opacity: 0.95,
    },

    checkIcon: {
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: 'rgba(163,230,53,0.15)',
      flexShrink: 0,
    },

    ctaButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      background: plan.isPopular
        ? 'linear-gradient(90deg, #a3e635 0%, #bef264 100%)'
        : 'rgba(163,230,53,0.1)',
      color: plan.isPopular ? '#111' : '#a3e635',
      border: plan.isPopular ? 'none' : '2px solid rgba(163,230,53,0.3)',
      borderRadius: '12px',
      padding: '14px 18px',
      fontWeight: 700,
      fontSize: '15px',
      cursor: 'pointer',
      boxShadow: plan.isPopular ? '0 4px 12px rgba(163,230,53,0.3)' : 'none',
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
      {plan.isPopular && (
        <div style={styles.badge}>
          <Crown size={12} style={{ display: 'inline', marginRight: '4px' }} />
          {translations[lang].popular}
        </div>
      )}

      <div style={styles.planNumber}>{plan.badge || `0${index + 1}`}</div>
      <h3 style={styles.planName}>{plan.name}</h3>
      <p style={styles.description}>{plan.description}</p>

      <div style={styles.priceContainer}>
        {plan.isDiscounted && plan.oldPrice && (
          <div style={styles.oldPrice}>₾{plan.oldPrice}</div>
        )}
        <div style={styles.priceRow}>
          <span style={styles.price}>₾{plan.price}</span>
          <span style={styles.duration}>{translations[lang].month}</span>
          {plan.isDiscounted && discountPercentage > 0 && (
            <div style={styles.discountBadge}>-{discountPercentage}%</div>
          )}
        </div>
      </div>

      <div style={styles.featuresTitle}>{plan.duration}</div>

      <div style={styles.featuresList}>
        {plan.features.map((feature, i) => (
          <div key={i} style={styles.feature}>
            <div style={styles.checkIcon}>
              <Check size={16} color="#a3e635" strokeWidth={3} />
            </div>
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
        <Zap size={18} />
        {translations[lang].selectPlan}
      </button>
    </div>
  );
}