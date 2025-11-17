'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Hero from '@/components/Hero';
import { useDictionary } from '@/app/context/DictionaryContext';

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
      border: '1px solid rgba(163, 230, 53, 0.1)',
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
      color: '#a3e635',
      fontSize: '0.95rem',
      fontWeight: 600,
      marginBottom: '0.5rem',
      letterSpacing: '0.05em',
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(163, 230, 53, 0.2)',
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
      border: '1px solid rgba(163, 230, 53, 0.2)',
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
      backgroundColor: '#a3e635',
      color: '#000',
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
      border: '1px solid rgba(163, 230, 53, 0.1)',
      borderRadius: '15px',
      padding: isMobile ? '1.5rem' : '2rem',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    },
    locationName: {
      fontSize: '1.3rem',
      fontWeight: 700,
      color: '#a3e635',
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
      color: '#a3e635',
      flexShrink: 0,
    },
    infoLink: {
      color: '#a3e635',
      textDecoration: 'none',
      transition: 'opacity 0.3s ease',
    },
    successMessage: {
      backgroundColor: 'rgba(163, 230, 53, 0.1)',
      border: '1px solid rgba(163, 230, 53, 0.3)',
      color: '#a3e635',
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
          border-color: rgba(163, 230, 53, 0.5);
          box-shadow: 0 0 15px rgba(163, 230, 53, 0.2);
        }

        button:hover:not(:disabled) {
          background-color: #b8f635;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(163, 230, 53, 0.3);
        }

        button:active:not(:disabled) {
          transform: translateY(0);
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-section:hover {
          border-color: #a3e635;
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
                {loading ? 'Sending...' : contactDict.form.submit}
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
                Quick Contact
              </div>
              <div style={styles.locationInfo}>
                <div style={styles.infoItem}>
                  <Mail size={20} style={styles.infoIcon} />
                  <div>
                    <div style={{ color: '#a3e635', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      Email
                    </div>
                    <a
                      href={`mailto:${contactDict.contactInfo.email}`}
                      style={styles.infoLink}
                    >
                      {contactDict.contactInfo.email}
                    </a>
                  </div>
                </div>

                <div style={styles.infoItem}>
                  <Phone size={20} style={styles.infoIcon} />
                  <div>
                    <div style={{ color: '#a3e635', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      Phone
                    </div>
                    <a
                      href={`tel:${contactDict.contactInfo.phone}`}
                      style={styles.infoLink}
                    >
                      {contactDict.contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(163, 230, 53, 0.1)' }}>
                  <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                    Hours
                  </h3>
                  <div style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    <div>Monday - Friday: 5AM - 11PM</div>
                    <div>Saturday - Sunday: 7AM - 9PM</div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(163, 230, 53, 0.1)' }}>
                  <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                    Follow Us
                  </h3>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href="https://www.instagram.com/reform_sport_club/" target="_blank" rel="noopener noreferrer" style={{
                      color: '#a3e635',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'opacity 0.3s',
                    }} onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                      Instagram
                    </a>
                    <a href="https://www.facebook.com/reformsportclub" target="_blank" rel="noopener noreferrer" style={{
                      color: '#a3e635',
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
            Our Locations
          </h2>
          <div style={styles.locationsGrid}>
            {contactDict.locations.map((location, idx) => (
              <div 
                key={idx} 
                style={{
                  ...styles.locationCard,
                  border: hoveredLocation === idx 
                    ? '1px solid rgba(163, 230, 53, 0.4)' 
                    : '1px solid rgba(163, 230, 53, 0.1)',
                  transform: hoveredLocation === idx 
                    ? 'translateY(-8px)' 
                    : isVisible 
                    ? 'translateY(0)' 
                    : 'translateY(30px)',
                  boxShadow: hoveredLocation === idx 
                    ? '0 20px 60px rgba(163, 230, 53, 0.2)' 
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
                  <div style={{ ...styles.infoItem, marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(163, 230, 53, 0.1)' }}>
                    <div style={{ fontSize: '0.85rem', color: '#a3e635' }}>
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
