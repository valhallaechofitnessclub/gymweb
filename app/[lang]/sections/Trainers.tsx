"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface TrainersProps {
  dict: {
    title: string;
    text: string;
    button: string;
    img: string;
  };
  lang: "en" | "ge";
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
      { threshold: 0, rootMargin: "200px 0px" },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    section: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 2rem",
    },
    container: {
      maxWidth: "1400px",
      width: "100%",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "5rem",
      alignItems: "center",
    },
    content: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateX(0)" : "translateX(-40px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
    },
    title: {
      fontSize: "clamp(3rem, 8vw, 8rem)",
      fontWeight: 900,
      background: "linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "1.5rem",
      letterSpacing: "0.05em",
      lineHeight: 1.1,
      paddingBottom: "0.08em",
      marginTop: 0,
      filter: "drop-shadow(0 0 20px rgba(204, 0, 0, 0.3))",
    },
    description: {
      fontSize: "clamp(1rem, 2vw, 1.25rem)",
      color: "#aaa",
      lineHeight: 1.8,
      marginBottom: "2.5rem",
      maxWidth: "500px",
    },
    link: {
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.6em",
      fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
      color: "#fff",
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase" as const,
      padding: "0.9em 2.2em",
      borderRadius: "4px",
      position: "relative",
      cursor: "pointer",
      background: "linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf)",
      boxShadow:
        "0 0 28px rgba(204, 0, 0, 0.4), 0 0 56px rgba(66, 194, 202, 0.15)",
      transition:
        "transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease",
      zIndex: 1,
      overflow: "hidden",
    },
    imageContainer: {
      display: "flex",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateX(0)" : "translateX(40px)",
      transition: "opacity 0.8s ease, transform 0.8s ease 0.1s",
      position: "relative",
      width: "fit-content",
      justifySelf: "end",
    },
    circle: {
      width: "420px",
      height: "420px",
      borderRadius: "50%",
      overflow: "hidden",
      position: "relative",
      zIndex: 1,
      background: "#000",
      transition: "transform 0.6s ease",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "50%",
      transition: "transform 0.6s ease, filter 0.4s ease",
      filter: "brightness(1.1) contrast(1.1)",
    },
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
                    .trainers-link {
                        align-self: center;
                        margin: 0 auto;
                    }
                }

                .trainers-link::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: rgba(255, 255, 255, 0.18);
                    opacity: 0;
                    transition: opacity 0.25s ease;
                    border-radius: inherit;
                }
                .trainers-link:hover::before {
                    opacity: 1;
                }
                .trainers-link:hover {
                    transform: translateY(-2px) scale(1.03) !important;
                    box-shadow: 0 0 40px rgba(204, 0, 0, 0.55), 0 0 80px rgba(66, 194, 202, 0.25) !important;
                }
                .trainers-link:active {
                    transform: translateY(0px) scale(0.98) !important;
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
                        font-size: 0.85rem !important;
                        padding: 0.8em 1.8em !important;
                    }
                    .trainers-circle {
                        width: 240px !important;
                        height: 240px !important;
                    }
                }

                ${isHovering ? `.trainers-circle` : ""} {
                    transform: scale(1.05);
                }

                ${isHovering ? ".trainers-image" : ""} {
                    transform: scale(1.1);
                    filter: brightness(1.2) contrast(1.15);
                }
            `}</style>

      <section
        style={styles.section}
        ref={containerRef}
        className="trainers-section"
      >
        <div style={styles.container} className="trainers-container">
          <div style={styles.content} className="trainers-content">
            <h2 style={styles.title} className="trainers-title">
              {dict.title}
            </h2>
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
            </Link>
          </div>

          <div
            style={styles.imageContainer}
            className="trainers-image-container"
          >
            <div
              className="trainers-shadow"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, rgba(204, 0, 0, 0.12) 0%, rgba(0,0,0,0.9) 100%)",
                filter: "drop-shadow(0 0 30px rgba(66, 194, 202, 0.25))",
                zIndex: 0,
                transition: "filter 0.6s ease",
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
