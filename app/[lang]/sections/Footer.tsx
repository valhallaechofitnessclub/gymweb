"use client";

import React, { useState, useEffect } from "react";
import { useDictionary } from "@/app/context/DictionaryContext";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const { dict } = useDictionary();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gradient = "linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf)";

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/valhallaecho_fitness_club/",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/Valhallaechoclub",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ),
    },
    {
      name: "Email",
      url: "mailto:info@valhallaecho.ge",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
    },
    {
      name: "Phone",
      url: "tel:557573731",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
    },
  ];

  const styles: { [key: string]: React.CSSProperties } = {
    footer: {
      borderTop: "1px solid rgba(204, 0, 0, 0.15)",
      padding: isMobile ? "0" : "4rem 2rem 2rem",
      marginTop: isMobile ? "0" : "6rem",
    },
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
    },
    content: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: isMobile ? "1rem" : "3rem",
    },
    brand: {
      textAlign: "center" as const,
    },
    logo: {
      fontSize: "clamp(3rem, 8vw, 5rem)",
      fontWeight: 900,
      background: gradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      letterSpacing: "0.1em",
      filter: "drop-shadow(0 0 20px rgba(200, 0, 0, 0.4))",
      marginBottom: "1rem",
    },
    tagline: {
      fontSize: "1rem",
      background: gradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      letterSpacing: "0.2em",
      textTransform: "uppercase" as const,
      fontWeight: 300,
      filter: "drop-shadow(0 0 15px rgba(66, 194, 202, 0.5))",
    },
    socialLinks: {
      display: "flex",
      gap: isMobile ? "1rem" : "2rem",
      flexWrap: "wrap" as const,
      justifyContent: "center",
    },
    divider: {
      width: "100%",
      height: "1px",
      background:
        "linear-gradient(90deg, transparent, #cc0000, #e11d1d, #42c2ca, #2dd4bf, transparent)",
      boxShadow: "0 0 20px rgba(150, 100, 100, 0.5)",
      margin: isMobile ? "1rem 0 0 1rem" : "2rem 0 0 2rem",
    },
    copyright: {
      textAlign: "center" as const,
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: "0.875rem",
      letterSpacing: "0.05em",
      marginTop: 0,
    },
  };

  return (
    <>
      <style>{`
        .social-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          padding: 0.75rem 1.5rem;
          border: 1px solid rgba(204, 0, 0, 0.2);
          border-radius: 50px;
          background: rgba(204, 0, 0, 0.03);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .social-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(204, 0, 0, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .social-link:hover::before {
          left: 100%;
        }

        .social-link:hover {
          border-color: rgba(66, 194, 202, 0.5);
          background: rgba(204, 0, 0, 0.05);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(204, 0, 0, 0.2);
          color: #42c2ca;
        }

        .social-icon {
          transition: transform 0.3s ease;
        }

        .social-link:hover .social-icon {
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .social-link {
            width: calc(50% - 1rem);
            justify-content: center;
          }
        }
        @media (max-width: 480px) {
          .social-link {
            width: 100%;
            margin: 0 2rem;
            justify-content: center;
          }
        }
      `}</style>

      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.content}>
            <div style={styles.brand}>
              <h2 style={styles.logo}>{dict.footer.title}</h2>
              <p style={styles.tagline}>{dict.footer.subtitle}</p>
            </div>

            <div style={styles.socialLinks}>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="social-link"
                  target={link.name !== "Email" && link.name !== "Phone" ? "_blank" : undefined}
                  rel={link.name !== "Email" && link.name !== "Phone" ? "noopener noreferrer" : undefined}
                >
                  <span className="social-icon">{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>

            <div style={styles.divider} />

            <p style={styles.copyright}>
              © {new Date().getFullYear()} VALHALLA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}