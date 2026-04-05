"use client";

import React, { useState, useEffect } from "react";
import { useDictionary } from "@/app/context/DictionaryContext";

export default function Hero() {
  const { dict } = useDictionary();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const gradient =
    "linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf)";

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
      padding: "1rem",
      overflow: "hidden",
    },
    content: {
      position: "relative",
      zIndex: 1,
    },
    title: {
      fontSize:
        typeof window !== "undefined" && window.innerWidth <= 600
          ? "clamp(2.2rem, 10vw, 4.5rem)"
          : "clamp(4rem, 15vw, 12rem)",
      fontWeight: 900,
      background: gradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "1rem",
      letterSpacing: "0.05em",
      opacity: isVisible ? 1 : 0,
      transform: isVisible
        ? "translateY(0) scale(1)"
        : "translateY(50px) scale(0.9)",
      transition: "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
      position: "relative",
      marginTop: 0,
      filter: "drop-shadow(0 0 20px rgba(200, 0, 0, 0.4))",
    },
    subtitle: {
      fontSize:
        typeof window !== "undefined" && window.innerWidth <= 600
          ? "clamp(1rem, 4vw, 1.5rem)"
          : "clamp(1.5rem, 5vw, 3rem)",
      fontWeight: 300,
      background: gradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textTransform: "uppercase",
      letterSpacing: "0.3em",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s",
      position: "relative",
      filter: "drop-shadow(0 0 15px rgba(66, 194, 202, 0.5))",
    },
    glowLine: {
      position: "absolute",
      bottom: "-20px",
      left: "50%",
      transform: `translateX(-50%) scaleX(${isVisible ? 1 : 0})`,
      width: "200px",
      height: "2px",
      background:
        "linear-gradient(90deg, transparent, #cc0000, #e11d1d, #42c2ca, #2dd4bf, transparent)",
      boxShadow: "0 0 20px rgba(150, 100, 100, 0.5)",
      transition: "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s",
    },
  };

  return (
    <section style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>{dict.hero.title}</h2>
        <div style={{ position: "relative", display: "inline-block" }}>
          <p style={styles.subtitle}>{dict.hero.subtitle}</p>
          <div style={styles.glowLine} />
        </div>
      </div>
    </section>
  );
}