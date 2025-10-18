'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Earth() {
    const meshRef = useRef<THREE.Mesh>(null);

const texture = useLoader(THREE.TextureLoader, '/assets/images/earth.jpg');


    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[2, 64, 64]} />
            <meshStandardMaterial
                map={texture}
                metalness={0.1}
                roughness={0.8}
            />
        </mesh>
    );
}

function RotatingEarth() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div style={{ width: '100%', height: '100%', background: 'transparent' }} />
        );
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 0, 4], fov: 75 }}
                style={{ background: 'transparent' }}
                gl={{ alpha: true }}
            >
                <ambientLight intensity={2} />
                <directionalLight position={[5, 3, 5]} intensity={3} />
                <pointLight position={[-5, 0, 5]} intensity={1} />
                <pointLight position={[0, -5, 0]} intensity={0.5} />
                <pointLight position={[0, 5, 0]} intensity={0.5} />

                <Earth />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                />
            </Canvas>
        </div>
    );
}

export default function Activities() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const styles: { [key: string]: React.CSSProperties } = {
        section: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1.5rem',
            position: 'relative',
        },
        container: {
            maxWidth: '1400px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
        },
        imageContainer: {
            position: 'relative',
            width: '100%',
            height: '500px',
            overflow: 'hidden',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
        contentSide: {
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
            transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
        },
        title: {
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            fontWeight: 900,
            color: 'white',
            marginBottom: '1.5rem',
            letterSpacing: '0.05em',
            lineHeight: 1,
            marginTop: 0,
        },
        description: {
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#999',
            lineHeight: 1.8,
            marginBottom: '2rem',
            maxWidth: '500px',
        },
        link: {
            display: 'inline-block',
            fontSize: 'clamp(0.9rem, 2vw, 1.125rem)',
            color: '#a3e635',
            textDecoration: 'none',
            fontWeight: 600,
            letterSpacing: '0.1em',
            position: 'relative',
            paddingBottom: '5px',
            transition: 'color 0.3s ease',
            cursor: 'pointer',
        },
        underline: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: isHovering ? '100%' : '40px',
            height: '2px',
            background: '#a3e635',
            transition: 'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
    };

    return (
        <>
            <style jsx global>{`
                @media (max-width: 1024px) {
                    .activities-container {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                    .activities-image {
                        height: 400px !important;
                    }
                }

                @media (max-width: 768px) {
                    .activities-container {
                        gap: 1.5rem !important;
                    }
                    .activities-image {
                        height: 350px !important;
                    }
                    .activities-section {
                        padding: 3rem 1rem !important;
                        min-height: auto !important;
                    }
                }

                @media (max-width: 480px) {
                    .activities-image {
                        height: 300px !important;
                    }
                    .activities-section {
                        padding: 2rem 1rem !important;
                    }
                    .activities-content {
                        text-align: center;
                    }
                }
            `}</style>

            <section style={styles.section} className="activities-section">
                <div style={styles.container} className="activities-container">
                    <div style={styles.imageContainer} className="activities-image">
                        <RotatingEarth />
                    </div>

                    <div style={styles.contentSide} className="activities-content">
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
        </>
    );
}