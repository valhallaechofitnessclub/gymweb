'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Clock, ExternalLink, ChevronRight } from 'lucide-react';

interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  features: string[];
  image: string;
}

interface LocationCardProps {
  location: Location;
  index: number;
  isVisible: boolean;
  lang?: 'en' | 'ka';
}

const MAP_LINKS = [
  'https://www.google.com/maps/place/Valhalla+Echo+Fitness+Club/@41.7161104,44.6885747,12z/data=!4m10!1m2!2m1!1svalhalla+echo+fitness!3m6!1s0x40446d0070363033:0x7110fa5b707e3608!8m2!3d41.7879714!4d44.8150725!15sChV2YWxoYWxsYSBlY2hvIGZpdG5lc3OSAQNneW3gAQA!16s%2Fg%2F11ydz1ny9s?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D',
  'https://www.google.com/maps/place/vallhallaecho+fitness+club/@41.7161104,44.6885747,12z/data=!4m10!1m2!2m1!1svalhalla+echo+fitness!3m6!1s0x404473bd8d8e43bb:0x381ac90e0973cbd2!8m2!3d41.7235847!4d44.7762972!15sChV2YWxoYWxsYSBlY2hvIGZpdG5lc3NaFyIVdmFsaGFsbGEgZWNobyBmaXRuZXNzkgEOZml0bmVzc19jZW50ZXKaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUnNkWFZwU1VGbkVBReABAPoBBQiPARA4!16s%2Fg%2F11s8k7tmd6?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D',
];

const translations = {
  en: { openMap: 'Open on Map' },
  ka: { openMap: 'რუკაზე ნახვა' },
};

const GRADIENT = 'linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf)';
const ACCENT = '#42c2ca';
const RED = '#e11d1d';

export default function LocationCard({ location, index, isVisible, lang = 'en' }: LocationCardProps) {
  return (
    <div
      style={{
        position: 'relative',
        height: '580px',
        borderRadius: '20px',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      {/* Full bleed photo */}
      <Image
        src={location.image}
        alt={location.name}
        fill
        style={{ objectFit: 'cover' }}
        loading="lazy"
      />

      {/* Strong gradient — dark at bottom, clear at top */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.15) 100%)',
      }} />

      {/* Gradient accent line at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: GRADIENT,
        zIndex: 2,
      }} />

      {/* Number badge — top left */}
      <div style={{
        position: 'absolute',
        top: '1.25rem',
        left: '1.25rem',
        zIndex: 2,
        fontSize: '0.65rem',
        fontWeight: 900,
        letterSpacing: '0.3em',
        background: GRADIENT,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        0{index + 1}
      </div>

      {/* All content pinned to bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        padding: '1.75rem',
      }}>
        {/* Name */}
        <h3 style={{
          fontSize: '1.9rem',
          fontWeight: 900,
          color: 'white',
          margin: '0 0 0.15rem',
          letterSpacing: '0.04em',
          lineHeight: 1.1,
          textShadow: '0 2px 20px rgba(0,0,0,0.8)',
        }}>
          {location.name}
        </h3>

        {/* City */}
        <p style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          margin: '0 0 1.25rem',
        }}>
          {location.city}
        </p>

        {/* Info rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
            <MapPin size={14} color={RED} style={{ flexShrink: 0 }} />
            {location.address}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
            <Phone size={14} color={RED} style={{ flexShrink: 0 }} />
            {location.phone}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
            <Clock size={14} color={ACCENT} style={{ flexShrink: 0 }} />
            {location.hours}
          </div>
        </div>

        {/* Feature tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
          {location.features.map((f, i) => (
            <span key={i} style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '6px',
              padding: '0.2rem 0.55rem',
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(4px)',
            }}>
              {f}
            </span>
          ))}
        </div>

        {/* Map button */}
        <a
          href={MAP_LINKS[index] ?? MAP_LINKS[0]}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: GRADIENT,
            color: 'white',
            textDecoration: 'none',
            borderRadius: '10px',
            padding: '0.65rem 1.2rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <ExternalLink size={13} />
          {translations[lang].openMap}
          <ChevronRight size={13} />
        </a>
      </div>
    </div>
  );
}