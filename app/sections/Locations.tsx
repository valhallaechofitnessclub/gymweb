'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

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

function RotatingEarth({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 3, 5]} intensity={3} />
        <pointLight position={[-5, 0, 5]} intensity={1} />
        <pointLight position={[0, -5, 0]} intensity={0.5} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />
        <Earth />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

export default function Locations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 } // triggers a bit earlier
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    section: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' },
    container: { maxWidth: '1400px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' },
    contentSide: { opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-40px)', transition: 'opacity 0.8s ease, transform 0.8s ease' },
    title: { fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 900, color: 'white', marginBottom: '1.5rem', letterSpacing: '0.05em', lineHeight: 1 },
    description: { fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#aaa', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '500px' },
    link: { display: 'inline-block', fontSize: 'clamp(0.9rem, 2vw, 1.125rem)', color: '#a3e635', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.1em', position: 'relative', paddingBottom: '5px', cursor: 'pointer' },
    underline: { position: 'absolute', bottom: 0, left: 0, width: isHovering ? '100%' : '40px', height: '2px', background: '#a3e635', transition: 'width 0.3s ease' },
  };

  return (
    <section style={styles.section} ref={containerRef}>
      <div style={styles.container}>
        <RotatingEarth isVisible={isVisible} />

        <div style={styles.contentSide}>
          <h2 style={styles.title}>LOCATIONS</h2>
          <p style={styles.description}>
            Our fitness centers are strategically located to help you stay active, no matter where you are.
          </p>
          <a
            href="/activities"
            style={styles.link}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            VIEW LOCATIONS
            <div style={styles.underline} />
          </a>
        </div>
      </div>
    </section>
  );
}
