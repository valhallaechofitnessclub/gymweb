'use client';

import React, { useState } from 'react';
import { Check, Zap, Crown, Clock } from 'lucide-react';
import { BRAND_ACCENT, BRAND_GRADIENT, brandRgba } from '@/theme/brand';

// ----------- Types -----------
interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  isDiscounted: boolean;
  duration: string;
  startTime?: string;
  endTime?: string;
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
      padding: plan.isPopular ? '38px' : '32px',
      borderRadius: '24px',
      color: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      background: plan.isPopular
        ? `linear-gradient(145deg, ${brandRgba(0.22)} 0%, rgba(24,24,27,0.97) 50%, ${brandRgba(0.1)} 100%)`
        : 'rgba(24, 24, 27, 0.6)',
      backdropFilter: 'blur(8px)',
      boxShadow: plan.isPopular
        ? `0 0 40px ${brandRgba(0.25)}, 0 12px 40px ${brandRgba(0.3)}`
        : '0 8px 30px rgba(0,0,0,0.4)',
      overflow: 'hidden',
      position: 'relative',
      border: plan.isPopular
        ? `2px solid ${brandRgba(0.6)}`
        : '2px solid transparent',
      transform: isVisible
        ? (plan.isPopular ? 'scale(1.05)' : 'translateY(0)')
        : 'translateY(50px)',
      opacity: isVisible ? 1 : 0,
      transition: isVisible
        ? `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`
        : 'none',
      zIndex: plan.isPopular ? 2 : 1,
    },

    cardHover: {
      boxShadow: plan.isPopular
        ? `0 0 50px ${brandRgba(0.35)}, 0 16px 50px ${brandRgba(0.4)}`
        : `0 12px 40px ${brandRgba(0.35)}`,
      transform: plan.isPopular ? 'scale(1.07)' : 'translateY(-8px)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },

    badge: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: BRAND_GRADIENT,
      color: '#0b0b0b',
      padding: '6px 14px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },

    planNumber: {
      fontSize: '14px',
      color: BRAND_ACCENT,
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

    scheduleRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px',
      padding: '12px 16px',
      background: brandRgba(0.1),
      borderRadius: '12px',
      border: `1px solid ${brandRgba(0.2)}`,
    },

    scheduleIcon: {
      color: BRAND_ACCENT,
      flexShrink: 0,
    },

    scheduleText: {
      fontSize: '18px',
      fontWeight: 700,
      color: '#e4e4e7',
      letterSpacing: '1px',
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
      fontSize: plan.isPopular ? '54px' : '48px',
      fontWeight: 900,
      color: BRAND_ACCENT,
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
      color: BRAND_ACCENT,
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
      flex: 1,
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
      backgroundColor: brandRgba(0.18),
      flexShrink: 0,
    },

    ctaButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      background: plan.isPopular
        ? BRAND_GRADIENT
        : brandRgba(0.12),
      color: plan.isPopular ? '#0b0b0b' : BRAND_ACCENT,
      border: plan.isPopular ? 'none' : `2px solid ${brandRgba(0.3)}`,
      borderRadius: '12px',
      padding: '14px 18px',
      fontWeight: 700,
      fontSize: '15px',
      cursor: 'pointer',
      boxShadow: plan.isPopular ? `0 4px 12px ${brandRgba(0.3)}` : 'none',
      transition: 'all 0.25s ease',
    },

    ctaButtonHover: {
      transform: 'scale(1.04)',
      boxShadow: `0 6px 20px ${brandRgba(0.45)}`,
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

      {plan.startTime && plan.endTime && (
        <div style={styles.scheduleRow}>
          <Clock size={20} style={styles.scheduleIcon} />
          <span style={styles.scheduleText}>{plan.startTime} — {plan.endTime}</span>
        </div>
      )}

      <div style={styles.priceContainer}>
        {plan.isDiscounted && plan.oldPrice && (
          <div style={styles.oldPrice}>₾{plan.oldPrice}</div>
        )}
        <div style={styles.priceRow}>
          <span style={styles.price}>₾{plan.price}</span>
          <span style={styles.duration}>{plan.duration}</span>
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
              <Check size={16} color={BRAND_ACCENT} strokeWidth={3} />
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