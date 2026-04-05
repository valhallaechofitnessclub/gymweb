'use client';

import React from 'react';
import { Clock, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';

interface Activity {
  id: number;
  name: string;
  description: string;
  duration: string;
  level: string;
  schedule: string;
  image?: string;
  color?: string;
}

interface ActivityCardProps {
  activity: Activity;
  index: number;
  isVisible: boolean;
  lang?: 'en' | 'ka';
}

const GRADIENT = 'linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf)';
const RED = '#e11d1d';
const MINT = '#42c2ca';
const MINT_RGBA = (a: number) => `rgba(66, 194, 202, ${a})`;
const RED_RGBA = (a: number) => `rgba(225, 29, 29, ${a})`;

export default function ActivityCard({ activity, index, isVisible }: ActivityCardProps) {
  return (
    <div
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
        background: 'rgba(14, 14, 16, 0.95)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Image — wide horizontal */}
      <div style={{ position: 'relative', height: '200px', width: '100%', overflow: 'hidden' }}>
        {activity.image ? (
          <Image
            src={`/assets/images/${activity.image}`}
            alt={activity.name}
            fill
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, ${RED} 0%, #1a1a1e 60%, #1a2e30 100%)`,
          }} />
        )}

        {/* Bottom fade into card */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(14,14,16,0.85) 100%)',
          zIndex: 1,
        }} />

        {/* Level badge — top left */}
        <div style={{
          position: 'absolute', top: '1rem', left: '1rem', zIndex: 2,
          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
          background: RED_RGBA(0.15), border: `1px solid ${RED_RGBA(0.4)}`,
          color: RED, padding: '0.3rem 0.7rem', borderRadius: '6px',
          fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase',
          backdropFilter: 'blur(6px)',
        }}>
          <TrendingUp size={11} />
          {activity.level}
        </div>

        {/* Duration + schedule — top right */}
        <div style={{
          position: 'absolute', top: '1rem', right: '1rem', zIndex: 2,
          display: 'flex', gap: '0.4rem',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            background: 'rgba(0,0,0,0.45)', border: `1px solid ${MINT_RGBA(0.25)}`,
            color: MINT, padding: '0.3rem 0.65rem', borderRadius: '6px',
            fontSize: '0.72rem', fontWeight: 600,
            backdropFilter: 'blur(6px)',
          }}>
            <Clock size={11} />
            {activity.duration}
          </div>
        </div>

        {/* Name overlaid on bottom of image */}
        <div style={{
          position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', zIndex: 2,
        }}>
          <h3 style={{
            fontSize: '1.5rem', fontWeight: 900,
            color: 'white', margin: 0,
            letterSpacing: '0.03em', lineHeight: 1.1,
            textShadow: '0 2px 12px rgba(0,0,0,0.8)',
          }}>
            {activity.name}
          </h3>
        </div>
      </div>

      {/* Gradient line */}
      <div style={{ height: '2px', background: GRADIENT }} />

      {/* Content below */}
      <div style={{ padding: '1.25rem 1.25rem 1.5rem' }}>
        <p style={{
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.65,
          margin: '0 0 1rem',
        }}>
          {activity.description}
        </p>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)',
        }}>
          <Users size={12} style={{ color: MINT, flexShrink: 0 }} />
          {activity.schedule}
        </div>
      </div>
    </div>
  );
}