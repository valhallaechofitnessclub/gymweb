'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Hero from '@/components/Hero';
import { useDictionary } from '@/app/context/DictionaryContext';
import { BRAND_ACCENT, BRAND_GRADIENT, brandRgba } from '@/theme/brand';

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { dict } = useDictionary();
  const contactDict = dict.contactPage;

  useEffect(() => {
    setIsVisible(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      minHeight: '100vh',
      padding: isMobile ? '5rem 1rem 3rem' : '6rem 2rem 4rem',
      backgroundColor: 'black',
    },
    maxWidth: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: isMobile ? '1.5rem' : '3rem',
      marginBottom: isMobile ? '2rem' : '4rem',
    },
    formSection: {
      background: 'rgba(24, 24, 27, 0.6)',
      backdropFilter: 'blur(10px)',
      border: `1px solid ${brandRgba(0.16)}`,
      borderRadius: '20px',
      padding: isMobile ? '1.5rem' : '2rem',
      transition: 'all 0.3s ease',
    },
    formTitle: {
      fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
      fontWeight: 700,
      color: 'white',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      color: BRAND_ACCENT,
      fontSize: '0.95rem',
      fontWeight: 600,
      marginBottom: '0.5rem',
      letterSpacing: '0.05em',
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: `1px solid ${brandRgba(0.28)}`,
      borderRadius: '10px',
      color: 'white',
      fontSize: '1rem',
      fontFamily: 'inherit',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box' as const,
    },
    textarea: {
      width: '100%',
      padding: '0.75rem 1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: `1px solid ${brandRgba(0.28)}`,
      borderRadius: '10px',
      color: 'white',
      fontSize: '1rem',
      fontFamily: 'inherit',
      minHeight: '120px',
      resize: 'vertical' as const,
      transition: 'all 0.3s ease',
      boxSizing: 'border-box' as const,
    },
    submitBtn: {
      width: '100%',
      padding: '0.875rem 1.5rem',
      background: BRAND_GRADIENT,
      color: '#0b0b0b',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    locationsSection: {
      marginTop: isMobile ? '2rem' : '4rem',
    },
    sectionTitle: {
      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
      fontWeight: 700,
      color: 'white',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      textAlign: 'center' as const,
    },
    locationsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: isMobile ? '1rem' : '2rem',
    },
    locationCard: {
      background: 'rgba(24, 24, 27, 0.6)',
      backdropFilter: 'blur(10px)',
      border: `1px solid ${brandRgba(0.16)}`,
      borderRadius: '15px',
      padding: isMobile ? '1.5rem' : '2rem',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    },
    locationName: {
      fontSize: '1.3rem',
      fontWeight: 700,
      color: BRAND_ACCENT,
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    locationInfo: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.75rem',
    },
    infoItem: {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'flex-start',
      fontSize: '0.95rem',
      color: '#a1a1aa',
    },
    infoIcon: {
      marginTop: '0.2rem',
      color: BRAND_ACCENT,
      flexShrink: 0,
    },
    infoLink: {
      color: BRAND_ACCENT,
      textDecoration: 'none',
      transition: 'opacity 0.3s ease',
    },
    successMessage: {
      backgroundColor: brandRgba(0.12),
      border: `1px solid ${brandRgba(0.35)}`,
      color: BRAND_ACCENT,
      padding: '1rem 1.5rem',
      borderRadius: '10px',
      marginBottom: '1.5rem',
      textAlign: 'center' as const,
      fontSize: '0.95rem',
      fontWeight: 600,
    },
  };

  return (
    <div style={styles.container}>
      <style>{`
        input:focus, textarea:focus {
          outline: none;
          background-color: rgba(255, 255, 255, 0.08);
          border-color: ${brandRgba(0.55)};
          box-shadow: 0 0 15px ${brandRgba(0.22)};
        }

        button:hover:not(:disabled) {
          filter: brightness(1.05);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px ${brandRgba(0.28)};
        }

        button:active:not(:disabled) {
          transform: translateY(0);
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-section:hover {
          border-color: ${brandRgba(0.6)};
          background: rgba(24, 24, 27, 0.8);
        }
      `}</style>

      <div style={styles.maxWidth}>
        <Hero
          title={contactDict.header.title}
          subtitle={contactDict.header.subtitle}
          isVisible={isVisible}
        />

        <div style={styles.contactGrid}>
          {/* Contact Form */}
          <div 
            style={{
              ...styles.formSection,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s ease-out 0.4s',
            }} 
            className="form-section"
          >
            <div style={styles.formTitle}>
              <Mail size={24} />
              {contactDict.form.title}
            </div>

            {submitted && <div style={styles.successMessage}>{contactDict.form.success}</div>}

            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>{contactDict.form.name}</label>
                <input
                  style={styles.input}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>{contactDict.form.email}</label>
                <input
                  style={styles.input}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>{contactDict.form.phone}</label>
                <input
                  style={styles.input}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>{contactDict.form.message}</label>
                <textarea
                  style={styles.textarea}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your fitness goals..."
                />
              </div>

              <button
                style={styles.submitBtn}
                type="submit"
                disabled={loading}
              >
                <Send size={18} />
                {loading ? contactDict.quickContact.sending : contactDict.form.submit}
              </button>
            </form>
          </div>

          {/* Quick Contact Info */}
          <div>
            <div 
              style={{
                ...styles.formSection,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.6s ease-out 0.6s',
              }} 
              className="form-section"
            >
              <div style={styles.formTitle}>
                <Phone size={24} />
                {contactDict.quickContact.title}
              </div>
              <div style={styles.locationInfo}>
                <div style={styles.infoItem}>
                  <Mail size={20} style={styles.infoIcon} />
                  <div>
                    <div style={{ color: BRAND_ACCENT, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {contactDict.quickContact.email}
                    </div>
                    <a
                      href="mailto:info@valhallaecho.ge"
                      style={styles.infoLink}
                    >
                      info@valhallaecho.ge
                    </a>
                  </div>
                </div>

                <div style={styles.infoItem}>
                  <Phone size={20} style={styles.infoIcon} />
                  <div>
                    <div style={{ color: BRAND_ACCENT, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {contactDict.quickContact.phone}
                    </div>
                    <a
                      href="tel:557573731"
                      style={styles.infoLink}
                    >
                      557 57 37 31
                    </a>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: `1px solid ${brandRgba(0.16)}` }}>
                  <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                    {contactDict.quickContact.hours}
                  </h3>
                  <div style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    <div>{contactDict.quickContact.hoursValue}</div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: `1px solid ${brandRgba(0.16)}` }}>
                  <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                    {contactDict.quickContact.followUs}
                  </h3>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href="https://www.instagram.com/valhallaecho_fitness_club/" target="_blank" rel="noopener noreferrer" style={{
                      color: BRAND_ACCENT,
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'opacity 0.3s',
                    }} onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                      Instagram
                    </a>
                    <a href="https://www.facebook.com/Valhallaechoclub" target="_blank" rel="noopener noreferrer" style={{
                      color: BRAND_ACCENT,
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'opacity 0.3s',
                    }} onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Locations Section */}
        <div style={styles.locationsSection}>
          <h2 
            style={{
              ...styles.sectionTitle,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s ease-out 0.8s',
            }}
          >
            {contactDict.quickContact.ourLocations}
          </h2>
          <div style={styles.locationsGrid}>
            {contactDict.locations.map((location, idx) => (
              <div 
                key={idx} 
                style={{
                  ...styles.locationCard,
                  border: hoveredLocation === idx 
                    ? `1px solid ${brandRgba(0.45)}` 
                    : `1px solid ${brandRgba(0.16)}`,
                  transform: hoveredLocation === idx 
                    ? 'translateY(-8px)' 
                    : isVisible 
                    ? 'translateY(0)' 
                    : 'translateY(30px)',
                  boxShadow: hoveredLocation === idx 
                    ? `0 20px 60px ${brandRgba(0.22)}` 
                    : '0 4px 20px rgba(0, 0, 0, 0.4)',
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.2s ease, opacity 0.6s ease-out ${1 + idx * 0.15}s, transform 0.6s ease-out ${1 + idx * 0.15}s`,
                }}
                className="location-card"
                onMouseEnter={() => setHoveredLocation(idx)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                <div style={styles.locationName}>
                  <MapPin size={22} />
                  {location.name}
                </div>
                <div style={styles.locationInfo}>
                  <div style={styles.infoItem}>
                    <MapPin size={16} style={styles.infoIcon} />
                    <div>{location.address}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <Phone size={16} style={styles.infoIcon} />
                    <a href={`tel:${location.phone}`} style={styles.infoLink}>
                      {location.phone}
                    </a>
                  </div>
                  <div style={styles.infoItem}>
                    <Mail size={16} style={styles.infoIcon} />
                    <a href={`mailto:${location.email}`} style={styles.infoLink}>
                      {location.email}
                    </a>
                  </div>
                  <div style={{ ...styles.infoItem, marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: `1px solid ${brandRgba(0.16)}` }}>
                    <div style={{ fontSize: '0.85rem', color: BRAND_ACCENT }}>
                      {location.hours}
                    </div>
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
