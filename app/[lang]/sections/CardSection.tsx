'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface Card {
  title: string;
  text: string;
  backgroundImage?: string;
}

type CardDict = Record<string, Card>;


export default function CardSection({ dict }: { dict: CardDict }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1] || 'en';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const cards = [
    {
      id: 1,
      title: dict.card1.title,
      description: dict.card1.text,
      backgroundImage: '/assets/images/map.jpg',
      delay: 0,
      path: `/${currentLang}/locations`,
    },
    {
      id: 2,
      title: dict.card2.title,
      description: dict.card2.text,
      backgroundImage: '/assets/images/pricing.jpg',
      delay: 0.2,
      path: `/${currentLang}/pricing`,
    },
    {
      id: 3,
      title: dict.card3.title,
      description: dict.card3.text,
      backgroundImage: '/assets/images/activities.jpg',
      delay: 0.4,
      path: `/${currentLang}/activities`,
    },
  ];

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      position: 'relative',
      marginTop: '-120px',
      zIndex: 10,
      padding: '0 2rem',
      maxWidth: '1400px',
      margin: '-153px auto 0',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      padding: '0 1rem',
    },
  };

  return (
    <>
      <style>{`
        .card {
          position: relative;
          height: 450px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s ease;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(20px)'};
        }

        .card:hover {
          transform: translateY(-8px);
        }

        .card-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.4s ease;
        }

        .card:hover .card-bg {
          transform: scale(1.05);
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.4) 10%,
          );
          backdrop-filter: blur(0px);
          transition: backdrop-filter 0.5s ease;
        }

        .card:hover .card-overlay {
          backdrop-filter: blur(12px);
        }

        .card-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          height: 100%;
        }

        .card-glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(5px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          transition: all 0.4s ease;
        }

        .card:hover .card-glass {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(163, 230, 53, 0.3);
          box-shadow: 0 8px 32px rgba(163, 230, 53, 0.2);
        }

        .card-title {
          font-size: 2rem;
          font-weight: 900;
          color: white;
          margin-bottom: 0.5rem;
          margin-top: 0;
          letter-spacing: 0.1em;
          text-shadow: 0 0 20px rgba(163, 230, 53, 0.3);
          transition: all 0.3s ease;
        }

        .card:hover .card-title {
          color: #a3e635;
          text-shadow: 0 0 30px rgba(163, 230, 53, 0.6);
        }

        .card-description {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 300;
          letter-spacing: 0.05em;
          margin-bottom: 0;
        }

        .card-shine {
          display: none;
        }

        .card-border {
          display: none;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .cards-container {
            margin-top: -100px !important;
            padding: 0 1.5rem !important;
          }
          
          .cards-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
            gap: 1.25rem !important;
            padding: 0 0.5rem !important;
          }
          
          .card {
            height: 380px;
          }
          
          .card-title {
            font-size: 1.75rem;
          }
          
          .card-glass {
            padding: 1.25rem;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .cards-container {
            margin-top: -80px !important;
            padding: 0 1rem !important;
          }
          
          .cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
            padding: 0 !important;
          }
          
          .card {
            height: 320px;
          }
          
          .card-title {
            font-size: 1.5rem;
          }
          
          .card-description {
            font-size: 0.9rem;
          }
          
          .card-glass {
            padding: 1rem;
          }
        }

        /* Small mobile */
        @media (max-width: 480px) {
          .cards-container {
            margin-top: -60px !important;
            padding: 0 0.75rem 2rem!important;
          }
          
          .card {
            height: 280px;
          }
          
          .card-title {
            font-size: 1.25rem;
            letter-spacing: 0.05em;
          }
          
          .card-description {
            font-size: 0.85rem;
          }
          
          .card-glass {
            padding: 0.875rem;
          }
        }
      `}</style>

      <section style={styles.container} className="cards-container">
        <div style={styles.grid} className="cards-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className="card"
              style={{
                animationDelay: `${card.delay}s`,
              }}
              onClick={() => router.push(card.path)}
            >
              <div
                className="card-bg"
                style={{
                  backgroundImage: `url(${card.backgroundImage})`,
                }}
              />
              <div className="card-overlay" />
              <div className="card-shine" />
              <div className="card-border" />

              <div className="card-content">
                <div className="card-glass">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}