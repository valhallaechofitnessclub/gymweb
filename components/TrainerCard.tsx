"use client";
import React from "react";
import Image from "next/image";
import { Award, Zap } from "lucide-react";

interface Trainer {
  name: string;
  color?: string;
  image?: string;
  experience?: string | number;
  specialty?: string;
  title?: string;
  bio?: string;
  certifications?: string[];
  buttonText?: string;
}

interface Props {
  trainer: Trainer;
  index?: number;
  isVisible?: boolean;
  isHovered?: boolean;
  onHover?: React.MouseEventHandler<HTMLDivElement>;
  onLeave?: React.MouseEventHandler<HTMLDivElement>;
  transitionSpeed?: string;
}

const GRADIENT = "linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf)";
const RED = "#e11d1d";
const MINT = "#42c2ca";
const MINT_RGBA = (a: number) => `rgba(66, 194, 202, ${a})`;
const RED_RGBA = (a: number) => `rgba(225, 29, 29, ${a})`;

export default function TrainerCard({
  trainer,
  index = 0,
  isVisible,
  onHover,
  onLeave,
}: Props) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
        borderRadius: "16px",
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
        background: "rgba(14, 14, 16, 0.95)",
        border: "1px solid rgba(255,255,255,0.06)",
        height: "200px",
      }}
    >
      {/* Left — photo */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {trainer.image ? (
          <Image
            src={`/assets/images/${trainer.image}`}
            alt={trainer.name}
            fill
            style={{ objectFit: "cover", objectPosition: "top center" }}
            loading="lazy"
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${RED} 0%, #1a1a1e 60%, #1a2e30 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "5rem",
                fontWeight: 900,
                color: "rgba(255,255,255,0.07)",
              }}
            >
              {trainer.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Fade right into content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, transparent 45%, rgba(14,14,16,0.95) 100%)",
            zIndex: 1,
          }}
        />
      </div>

      {/* Right — content */}
      <div
        style={{
          padding: "1.5rem 1.5rem 1.5rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0.75rem",
        }}
      >
        {/* Name + Title */}
        <div>
          <h3
            style={{
              fontSize: "1.4rem",
              fontWeight: 900,
              color: "white",
              margin: "0 0 0.2rem",
              lineHeight: 1.15,
              letterSpacing: "0.02em",
            }}
          >
            {trainer.name}
          </h3>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              margin: 0,
            }}
          >
            {trainer.title}
          </p>
        </div>

        {/* Gradient divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: GRADIENT,
            opacity: 0.35,
          }}
        />

        {/* Specialty + Experience badges */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              background: RED_RGBA(0.1),
              border: `1px solid ${RED_RGBA(0.3)}`,
              color: RED,
              padding: "0.25rem 0.6rem",
              borderRadius: "6px",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
            }}
          >
            <Award size={11} />
            {trainer.experience}
          </div>
          {trainer.specialty && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                background: MINT_RGBA(0.08),
                border: `1px solid ${MINT_RGBA(0.25)}`,
                color: MINT,
                padding: "0.25rem 0.6rem",
                borderRadius: "6px",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              <Zap size={11} />
              {trainer.specialty}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
