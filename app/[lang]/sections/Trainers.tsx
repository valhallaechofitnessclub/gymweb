'use client';

import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';


interface TrainersProps {
    dict: {
        title: string;
        text: string;
        button: string;
        img: string;
    };
    lang: 'en' | 'ge';
}

export default function Trainers({ dict, lang }: TrainersProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0, rootMargin: '200px 0px' }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const styles: { [key: string]: React.CSSProperties } = {
        section: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 2rem' },
        container: { maxWidth: '1400px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' },
        content: {
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
        },
        title: { fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 900, color: 'white', marginBottom: '1.5rem', letterSpacing: '0.05em', lineHeight: 1, marginTop: 0 },
        description: { fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#aaa', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '500px' },
        link: { textDecoration: 'none', display: 'inline-block', fontSize: 'clamp(0.9rem, 2vw, 1.125rem)', color: '#a3e635', fontWeight: 600, letterSpacing: '0.1em', position: 'relative', paddingBottom: '5px', cursor: 'pointer' },
        underline: { position: 'absolute', bottom: 0, left: 0, width: '40px', height: '2px', background: '#a3e635', transition: 'width 0.3s ease' },
        imageContainer: {
            display: 'flex',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease 0.1s',
            position: 'relative',
            width: 'fit-content',
            justifySelf: 'end',
        },
        circle: {
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
            background: '#000',
            transition: 'transform 0.6s ease',
        },
        image: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', transition: 'transform 0.6s ease, filter 0.4s ease', filter: 'brightness(1.1) contrast(1.1)' },
    };

    return (
        <>
            <style>{`
                @media (max-width: 1024px) {
                    .trainers-container {
                        grid-template-columns: 1fr !important;
                        gap: 3rem !important;
                        text-align: center;
                    }
                    .trainers-description {
                        max-width: 100% !important;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .trainers-circle {
                        width: 350px !important;
                        height: 350px !important;
                    }
                    .trainers-image-container {
                        justify-self: center !important;
                    }
                }

                .trainers-link:hover .trainers-underline {
                    width: 100% !important;
                }

                @media (max-width: 768px) {
                    .trainers-section {
                        padding: 3rem 1.5rem !important;
                        min-height: auto !important;
                    }
                    .trainers-container {
                        gap: 2.5rem !important;
                    }
                    .trainers-title {
                        font-size: clamp(2.5rem, 10vw, 5rem) !important;
                        margin-bottom: 1rem !important;
                    }
                    .trainers-description {
                        font-size: 1rem !important;
                        margin-bottom: 1.5rem !important;
                    }
                    .trainers-circle {
                        width: 280px !important;
                        height: 280px !important;
                    }
                }

                @media (max-width: 480px) {
                    .trainers-section {
                        padding: 2rem 1rem !important;
                    }
                    .trainers-container {
                        gap: 2rem !important;
                    }
                    .trainers-title {
                        font-size: clamp(2rem, 12vw, 4rem) !important;
                    }
                    .trainers-description {
                        font-size: 0.8rem !important;
                        line-height: 1.4 !important;
                    }
                    .trainers-link {
                        font-size: 0.9rem !important;
                    }
                    .trainers-circle {
                        width: 240px !important;
                        height: 240px !important;
                    }
                }

                ${isHovering ? `.trainers-circle` : ''} {
                    transform: scale(1.05);
                }

                ${isHovering ? '.trainers-image' : ''} {
                    transform: scale(1.1);
                    filter: brightness(1.2) contrast(1.15);
                }
            `}</style>

            <section style={styles.section} ref={containerRef} className="trainers-section">
                <div style={styles.container} className="trainers-container">
                    <div style={styles.content} className="trainers-content">
                        <h2 style={styles.title} className="trainers-title">{dict.title}</h2>
                        <p style={styles.description} className="trainers-description">
                            {dict.text}
                        </p>
                        <Link
                            href={`/${lang}/trainers`}
                            style={styles.link}
                            className="trainers-link"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            {dict.button}
                            <div style={styles.underline} className="trainers-underline" />
                        </Link>
                    </div>

                    <div style={styles.imageContainer} className="trainers-image-container">
                        <div
                            className="trainers-shadow"
                            style={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: '50%',
                                background: 'radial-gradient(circle at 30% 30%, rgba(163,230,53,0.12) 0%, rgba(0,0,0,0.9) 100%)',
                                filter: 'drop-shadow(0 0 30px rgba(163,230,53,0.25))',
                                zIndex: 0,
                                transition: 'filter 0.6s ease',
                            }}
                        />
                        <div style={styles.circle} className="trainers-circle">
                            <Image
                                src={`/assets/images/${dict.img}`}
                                alt="Trainer"
                                fill
                                style={styles.image}
                                className="trainers-image"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
