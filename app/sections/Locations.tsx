'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import RotatingEarth from '@/components/RotatingEarth';

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
            padding: '5rem 2rem',
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
            height: 'fit-content',
            overflow: 'hidden',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
        image: {
            width: '78%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%'
        },
        contentSide: {
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
            transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
        },
        title: {
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontWeight: 900,
            color: 'white',
            marginBottom: '1.5rem',
            letterSpacing: '0.05em',
            lineHeight: 1,
            marginTop: 0,
        },
        description: {
            fontSize: '1.25rem',
            color: '#999',
            lineHeight: 1.8,
            marginBottom: '3rem',
            maxWidth: '500px',
        },
        link: {
            display: 'inline-block',
            fontSize: '1.125rem',
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
            gap: 3rem !important;
          }
          .activities-image {
            height: 450px !important;
          }
        }

        @media (max-width: 768px) {
          .activities-image {
            height: 350px !important;
          }
        }
      `}</style>

            <section style={styles.section}>
                <div style={styles.container} className="activities-container">
                    <div style={styles.imageContainer} className="activities-image">
                        <RotatingEarth />
                    </div>


                    <div style={styles.contentSide}>
                        <h2 style={styles.title}>LOCATIONS</h2>
                        <p style={styles.description}>
                            Our fitness centers are strategically located to help you stay active, no matter where you are.                        </p>
                        <Link
                            href="/activities"
                            style={styles.link}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            VIEW LOCATIONS
                            <div style={styles.underline} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}