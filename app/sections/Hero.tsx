'use client';

import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      padding: '1rem',
      overflow: 'hidden',
    },
    content: {
      position: 'relative',
      zIndex: 1,
    },
    title: {
      fontSize: 'clamp(4rem, 15vw, 12rem)',
      fontWeight: 900,
      color: 'white',
      marginBottom: '1rem',
      letterSpacing: '0.05em',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
      transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
      textShadow: '0 0 40px rgba(163, 230, 53, 0.2), 0 0 80px rgba(163, 230, 53, 0.1)',
      position: 'relative',
      marginTop: 0
    },
    subtitle: {
      fontSize: 'clamp(1.5rem, 5vw, 3rem)',
      fontWeight: 300,
      color: '#a3e635',
      textTransform: 'uppercase',
      letterSpacing: '0.3em',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
      textShadow: '0 0 20px rgba(163, 230, 53, 0.5)',
      position: 'relative'
    },
    glowLine: {
      position: 'absolute',
      bottom: '-20px',
      left: '50%',
      transform: `translateX(-50%) scaleX(${isVisible ? 1 : 0})`,
      width: '200px',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #a3e635, transparent)',
      boxShadow: '0 0 20px #a3e635',
      transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s',
    },
  };

  return (
    <section style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>REFORM</h2>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <p style={styles.subtitle}>your limits</p>
          <div style={styles.glowLine} />
        </div>
      </div>
    </section>
  );
}