'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Link from 'next/link';

// Mata Fitness brand colors
const BRAND_GRADIENT = 'linear-gradient(90deg, #FF6A00, #FF9A3C, #FFB347, #FFFFFF)';

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, '/assets/images/earth.jpg');

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} metalness={0.1} roughness={0.8} />
    </mesh>
  );
}

function Moon() {
  const moonRef = useRef<THREE.Mesh>(null);
  const pivotRef = useRef<THREE.Group>(null);
  const moonTexture = useLoader(THREE.TextureLoader, '/assets/images/moon.jpg');

  useFrame(({ clock }) => {
    if (pivotRef.current) {
      pivotRef.current.rotation.y = clock.getElapsedTime() * 0.6;
      // Strong diagonal tilt — orbit runs top-right to bottom-left
      pivotRef.current.rotation.z = 0.9;
      pivotRef.current.rotation.x = 0.5;
    }
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={pivotRef}>
      {/* Tight orbit — just clearing the Earth surface */}
      <mesh ref={moonRef} position={[2.6, 0, 0]}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial
          map={moonTexture}
          metalness={0.0}
          roughness={0.95}
        />
      </mesh>
    </group>
  );
}

function EarthScene({ isHovering }: { isHovering: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const targetScale = isHovering ? 1.1 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <Earth />
      <Moon />
    </group>
  );
}

function RotatingEarth({ isVisible, isHovering }: { isVisible: boolean; isHovering: boolean }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="locations-earth-container"
      style={{
        width: '77%',
        height: '400px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 3, 5]} intensity={3} />
        <pointLight position={[-5, 0, 5]} intensity={1} />
        <pointLight position={[0, -5, 0]} intensity={0.5} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />
        <EarthScene isHovering={isHovering} />
        {!isMobile && <OrbitControls enableZoom={false} enablePan={false} />}
      </Canvas>
    </div>
  );
}

interface LocationsProps {
  dict: {
    title: string;
    text: string;
    button: string;
  };
  lang: 'en' | 'ge';
}

export default function Locations({ dict, lang }: LocationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    section: {
      height: '100dvh',
      maxHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 2rem',
      overflow: 'hidden',
      boxSizing: 'border-box',
    },
    container: {
      maxWidth: '1400px',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '5rem',
      alignItems: 'center',
    },
    contentSide: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
    },
    title: {
      fontSize: 'clamp(3rem, 8vw, 8rem)',
      fontWeight: 900,
      background: BRAND_GRADIENT,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '1.5rem',
      marginTop: '0',
      letterSpacing: '0.05em',
      lineHeight: 1.1,
      paddingBottom: '0.08em',
      filter: 'drop-shadow(0 0 20px rgba(255, 106, 0, 0.3))',
    },
    description: {
      fontSize: 'clamp(1rem, 2vw, 1.25rem)',
      color: '#aaa',
      lineHeight: 1.8,
      marginBottom: '2rem',
      maxWidth: '500px',
    },
    link: {
      display: 'inline-block',
      fontSize: 'clamp(0.9rem, 2vw, 1.125rem)',
      background: BRAND_GRADIENT,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textDecoration: 'none',
      fontWeight: 600,
      letterSpacing: '0.1em',
      position: 'relative',
      paddingBottom: '5px',
      cursor: 'pointer',
    },
    underline: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: isHovering ? '100%' : '40px',
      height: '2px',
      background: BRAND_GRADIENT,
      transition: 'width 0.3s ease',
      boxShadow: '0 0 10px rgba(255, 106, 0, 0.5)',
    },
  };

  return (
    <>
      <style>{`
        @media (min-width: 1024px) and (max-width: 1280px) {
          .locations-title {
            font-size: clamp(2.5rem, 5vw, 4rem) !important;
          }
          .locations-description {
            font-size: 1rem !important;
            margin-bottom: 1.25rem !important;
          }
          .locations-earth-container {
            width: 100% !important;
            height: 320px !important;
          }
          .locations-container {
            gap: 3rem !important;
          }
        }
        @media (max-width: 1280px) {
          .locations-earth-container {
            width: 100% !important;
            height: 400px !important;
          }
        }
        @media (max-width: 1024px) {
          .locations-section {
            height: 100dvh !important;
          }
          .locations-container {
            grid-template-columns: 1fr !important;
            gap: 0rem !important;
            text-align: center;
          }
          .locations-title {
            font-size: clamp(2.5rem, 10vw, 5rem) !important;
            margin-top: 0;
          }
          .locations-content {
            transform: ${isVisible ? 'translateY(0)' : 'translateY(20px)'} !important;
            order: 1;
          }
          .locations-earth-container {
            transform: ${isVisible ? 'translateY(0)' : 'translateY(-20px)'} !important;
            height: 400px !important;
            max-width: 500px !important;
            margin: 0 auto !important;
            order: 2;
          }
          .locations-description {
            max-width: 100% !important;
            margin-left: auto;
            margin-right: auto;
          }
        }
        @media (max-width: 768px) {
          .locations-section {
            padding: 3rem 1.5rem !important;
          }
          .locations-container {
            gap: 2.5rem !important;
          }
          .locations-title {
            font-size: clamp(2.5rem, 10vw, 5rem) !important;
            margin-bottom: 1rem !important;
          }
          .locations-description {
            font-size: 1rem !important;
            margin-bottom: 1.5rem !important;
          }
          .locations-earth-container {
            height: 350px !important;
            max-width: 400px !important;
          }
        }
        @media (max-width: 480px) {
          .locations-section {
            padding: 2rem 1rem !important;
          }
          .locations-container {
            gap: 2rem !important;
          }
          .locations-title {
            font-size: clamp(2rem, 12vw, 4rem) !important;
          }
          .locations-description {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }
          .locations-link {
            font-size: 0.9rem !important;
          }
          .locations-earth-container {
            height: 300px !important;
            max-width: 300px !important;
          }
          canvas { width: 100% !important; }
        }
      `}</style>

      <section style={styles.section} ref={containerRef} className="locations-section">
        <div style={styles.container} className="locations-container">
          <RotatingEarth isVisible={isVisible} isHovering={isHovering} />

          <div style={styles.contentSide} className="locations-content">
            <h2 style={styles.title} className="locations-title">{dict.title}</h2>
            <p style={styles.description} className="locations-description">
              {dict.text}
            </p>
            <Link
              href={`/${lang}/locations`}
              style={styles.link}
              className="locations-link"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {dict.button}
              <div style={styles.underline} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}