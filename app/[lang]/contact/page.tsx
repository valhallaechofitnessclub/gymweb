'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Clock } from 'lucide-react';
import Hero from '@/components/Hero';
import { useDictionary } from '@/app/context/DictionaryContext';

const GRADIENT = 'linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf)';
const ACCENT = '#42c2ca';
const RED = '#cc0000';
const rgba = (o: number) => `rgba(66, 194, 202, ${o})`;
const rgbaRed = (o: number) => `rgba(204, 0, 0, ${o})`;

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);
  const { dict } = useDictionary();
  const contactDict = dict.contactPage;

  useEffect(() => {
    setIsVisible(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const infoCards = [
    {
      id: 'email',
      icon: <Mail size={28} />,
      label: contactDict.quickContact.email,
      value: 'info@valhallaecho.ge',
      href: 'mailto:info@valhallaecho.ge',
      color: ACCENT,
    },
    {
      id: 'phone',
      icon: <Phone size={28} />,
      label: contactDict.quickContact.phone,
      value: '557 57 37 31',
      href: 'tel:557573731',
      color: RED,
    },
    {
      id: 'hours',
      icon: <Clock size={28} />,
      label: contactDict.quickContact.hours,
      value: contactDict.quickContact.hoursValue,
      href: null,
      color: ACCENT,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', padding: isMobile ? '5rem 1rem 4rem' : '6rem 2rem 6rem' }}>
      <style>{`
        .info-card {
          position: relative;
          background: rgba(15, 15, 15, 0.8);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.4s ease;
          overflow: hidden;
          cursor: default;
        }
        .info-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(204,0,0,0.3), transparent 50%, rgba(66,194,202,0.3));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .info-card:hover::before { opacity: 1; }
        .info-card:hover {
          background: rgba(20, 20, 20, 0.95);
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(66,194,202,0.08);
        }
        .info-card-link {
          text-decoration: none;
          display: block;
        }
        .info-card-link:hover .info-value {
          background: ${GRADIENT};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .location-card {
          position: relative;
          background: rgba(15, 15, 15, 0.8);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.4s ease;
          overflow: hidden;
        }
        .location-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: ${GRADIENT};
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .location-card:hover::after { transform: scaleX(1); }
        .location-card:hover {
          background: rgba(20, 20, 20, 0.95);
          transform: translateY(-8px);
          border-color: ${rgba(0.2)};
          box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${rgba(0.06)};
        }

        .social-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.5rem;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          text-decoration: none;
          color: white;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.03);
          flex: 1;
          justify-content: center;
        }
        .social-btn:hover {
          border-color: ${rgba(0.4)};
          background: ${rgba(0.06)};
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          color: ${ACCENT};
        }

        .section-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          background: ${GRADIENT};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.75rem;
          display: block;
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, ${rgbaRed(0.4)}, ${rgba(0.4)});
          margin: 3rem 0;
          border: none;
        }

        .glow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${GRADIENT};
          flex-shrink: 0;
          box-shadow: 0 0 10px ${rgba(0.6)};
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Hero
          title={contactDict.header.title}
          subtitle={contactDict.header.subtitle}
          isVisible={isVisible}
        />

        {/* Info Cards Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '1.25rem',
          marginBottom: '2rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease 0.3s',
        }}>
          {infoCards.map((card, i) => (
            <div
              key={card.id}
              className="info-card"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.7s ease ${0.3 + i * 0.1}s`,
              }}
            >
              {card.href ? (
                <a href={card.href} className="info-card-link">
                  <div style={{ color: card.color, marginBottom: '1rem' }}>{card.icon}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.4rem' }}>
                    {card.label}
                  </div>
                  <div className="info-value" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', transition: 'all 0.3s' }}>
                    {card.value}
                  </div>
                </a>
              ) : (
                <>
                  <div style={{ color: card.color, marginBottom: '1rem' }}>{card.icon}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.4rem' }}>
                    {card.label}
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>
                    {card.value}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Social Row */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '3rem',
          flexDirection: isMobile ? 'column' : 'row',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease 0.6s',
        }}>
          <a href="https://www.instagram.com/valhallaecho_fitness_club/" target="_blank" rel="noopener noreferrer" className="social-btn">
            <Instagram size={20} />
            Instagram
          </a>
          <a href="https://www.facebook.com/Valhallaechoclub" target="_blank" rel="noopener noreferrer" className="social-btn">
            <Facebook size={20} />
            Facebook
          </a>
        </div>

        <hr className="divider-line" />

        {/* Locations */}
        <div style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease 0.7s',
        }}>
          <span className="section-label">{contactDict.quickContact.ourLocations}</span>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.5rem',
          }}>
            {contactDict.locations.map((location, idx) => (
              <div
                key={idx}
                className="location-card"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.7s ease ${0.8 + idx * 0.15}s`,
                }}
              >
                {/* Location header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: `linear-gradient(135deg, ${rgbaRed(0.2)}, ${rgba(0.2)})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${rgba(0.2)}`,
                    flexShrink: 0,
                  }}>
                    <MapPin size={18} color={ACCENT} />
                  </div>
                  <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800, margin: 0, letterSpacing: '0.05em' }}>
                    {location.name}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div className="glow-dot" style={{ marginTop: '0.4rem' }} />
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                      {location.address}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="glow-dot" />
                    <a href={`tel:${location.phone}`} style={{ color: ACCENT, fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600, transition: 'opacity 0.3s' }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                      {location.phone}
                    </a>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="glow-dot" />
                    <a href={`mailto:${location.email}`} style={{ color: ACCENT, fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600, transition: 'opacity 0.3s' }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                      {location.email}
                    </a>
                  </div>

                  <div style={{
                    marginTop: '0.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <Clock size={14} color={RED} />
                    {location.hours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}