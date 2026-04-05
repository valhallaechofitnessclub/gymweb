'use client';

import React, { useState } from 'react';
import { Check, Crown, Clock } from 'lucide-react';

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

const translations = {
  en: { month: '/month', popular: 'Most Popular' },
  ka: { month: '/თვე', popular: 'ყველაზე პოპულარული' },
};

const RED = '#cc0000';
const MINT = '#42c2ca';
const RED_RGBA = (a: number) => `rgba(204, 0, 0, ${a})`;
const MINT_RGBA = (a: number) => `rgba(66, 194, 202, ${a})`;

export default function PricingCard({ plan, index, isVisible, lang = 'en' }: PricingCardProps) {
  const [cardHover, setCardHover] = useState(false);
  const isPopular = plan.isPopular;

  const discountPercentage =
    plan.isDiscounted && plan.oldPrice
      ? Math.round(((plan.oldPrice - plan.price) / plan.oldPrice) * 100)
      : 0;

  return (
    <div
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
      style={{
        padding: isPopular ? '38px' : '32px',
        borderRadius: '24px',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        background: isPopular
          ? `linear-gradient(145deg, ${RED_RGBA(0.18)} 0%, rgba(18,18,20,0.97) 50%, ${RED_RGBA(0.08)} 100%)`
          : 'rgba(18, 18, 20, 0.85)',
        backdropFilter: 'blur(10px)',
        border: isPopular
          ? `2px solid ${RED_RGBA(0.55)}`
          : `1px solid rgba(39,39,42,0.9)`,
        boxShadow: cardHover
          ? isPopular
            ? `0 0 50px ${RED_RGBA(0.3)}, 0 16px 50px ${RED_RGBA(0.2)}`
            : `0 20px 50px ${RED_RGBA(0.15)}, 0 4px 20px ${MINT_RGBA(0.1)}`
          : isPopular
            ? `0 0 40px ${RED_RGBA(0.2)}, 0 12px 40px rgba(0,0,0,0.4)`
            : '0 8px 30px rgba(0,0,0,0.4)',
        transform: isVisible
          ? cardHover
            ? isPopular ? 'scale(1.07)' : 'translateY(-8px)'
            : isPopular ? 'scale(1.05)' : 'translateY(0)'
          : 'translateY(50px)',
        opacity: isVisible ? 1 : 0,
        transition: `opacity 0.6s ease-out ${index * 0.15}s, transform 0.3s ease, box-shadow 0.25s ease`,
        position: 'relative',
        overflow: 'hidden',
        zIndex: isPopular ? 2 : 1,
      }}
    >
      {/* Popular badge */}
      {isPopular && (
        <div style={{
          position: 'absolute', top: '20px', right: '20px',
          background: RED,
          color: '#fff',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '12px', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.5px',
          display: 'flex', alignItems: 'center', gap: '5px',
        }}>
          <Crown size={12} />
          {translations[lang].popular}
        </div>
      )}

      {/* Plan number */}
      <div style={{
        fontSize: '13px', fontWeight: 700,
        color: isPopular ? '#ff6666' : MINT,
        opacity: 0.8, marginBottom: '8px',
        letterSpacing: '0.05em',
      }}>
        {plan.badge || `0${index + 1}`}
      </div>

      <h3 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 6px 0', color: '#fff' }}>
        {plan.name}
      </h3>

      {/* Underline accent */}
      <div style={{
        width: '30px', height: '2px',
        background: isPopular ? RED : MINT,
        borderRadius: '2px', marginBottom: '12px', opacity: 0.85,
      }} />

      <p style={{ color: '#a1a1aa', marginBottom: '24px', fontSize: '0.88rem', lineHeight: 1.6 }}>
        {plan.description}
      </p>

      {/* Schedule row */}
      {plan.startTime && plan.endTime && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          marginBottom: '20px', padding: '12px 16px',
          background: MINT_RGBA(0.07),
          borderRadius: '12px',
          border: `1px solid ${MINT_RGBA(0.25)}`,
        }}>
          <Clock size={20} color={MINT} style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#e4e4e7', letterSpacing: '1px' }}>
            {plan.startTime} — {plan.endTime}
          </span>
        </div>
      )}

      {/* Price */}
      <div style={{ marginBottom: '24px' }}>
        {plan.isDiscounted && plan.oldPrice && (
          <div style={{ fontSize: '20px', color: '#71717a', textDecoration: 'line-through', marginBottom: '4px' }}>
            ₾{plan.oldPrice}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: isPopular ? '54px' : '48px',
            fontWeight: 900, lineHeight: 1,
            color: isPopular ? '#ff4444' : MINT,
          }}>
            ₾{plan.price}
          </span>
          <span style={{ fontSize: '16px', color: '#71717a' }}>{plan.duration}</span>
          {plan.isDiscounted && discountPercentage > 0 && (
            <span style={{
              background: RED_RGBA(0.15),
              color: '#ff6666',
              padding: '4px 12px', borderRadius: '12px',
              fontSize: '14px', fontWeight: 700,
              border: `1px solid ${RED_RGBA(0.35)}`,
            }}>
              -{discountPercentage}%
            </span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: isPopular ? RED_RGBA(0.2) : 'rgba(39,39,42,0.8)',
        marginBottom: '20px',
      }} />

      {/* Features list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {plan.features.map((feature, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem' }}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isPopular ? RED_RGBA(0.15) : MINT_RGBA(0.1),
              border: `1px solid ${isPopular ? RED_RGBA(0.35) : MINT_RGBA(0.3)}`,
            }}>
              <Check size={14} color={isPopular ? '#ff4444' : MINT} strokeWidth={3} />
            </div>
            <span style={{ color: '#d4d4d8' }}>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}