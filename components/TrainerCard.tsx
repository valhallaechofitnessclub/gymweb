"use client";
import React from "react";
import Image from "next/image";
import { Zap, ChevronRight } from "lucide-react";

interface Trainer {
  name: string;
  color?: string;
  image?: string;
  location?: string;
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
}

const MINT = "#42c2ca";
const MINT_RGBA = (a: number) => `rgba(66, 194, 202, ${a})`;
const RED = "#e11d1d";
const RED_RGBA = (a: number) => `rgba(225, 29, 29, ${a})`;

export default function TrainerCard({
  trainer,
  index = 0,
  isVisible,
  isHovered,
  onHover,
  onLeave,
}: Props) {
  const uid = `tc-${index}`;

  return (
    <>
      <style>{`
        .${uid} {
          transition:
            opacity 0.7s ease ${index * 0.12}s,
            transform 0.7s ease ${index * 0.12}s,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }
        .${uid} .tc-photo {
          transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .${uid}:hover .tc-photo { transform: scale(1.06); }
        
        .${uid} .tc-view-btn { transition: color 0.2s ease, gap 0.2s ease; }
        .${uid}:hover .tc-view-btn {
          color: rgba(255,255,255,0.55) !important;
          gap: 0.35rem !important;
        }
      `}</style>

      <div
        className={uid}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        style={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          overflow: "hidden",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          background: "rgba(13, 13, 15, 0.97)",
          border: `1px solid ${isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"}`,
          boxShadow: isHovered
            ? "0 16px 48px rgba(0,0,0,0.6)"
            : "0 4px 24px rgba(0,0,0,0.45)",
          position: "relative",
        }}
      >
        {/* Top — photo + content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            minHeight: "200px",
          }}
        >
          {/* Left — photo */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            {trainer.image ? (
              <Image
                src={`/assets/images/trainers/${trainer.image}`}
                alt={trainer.name}
                fill
                className="tc-photo"
                style={{ objectFit: "cover", objectPosition: "top center" }}
                loading="lazy"
              />
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(135deg, ${RED_RGBA(0.5)} 0%, #111 70%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "5rem",
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.05)",
                    userSelect: "none",
                  }}
                >
                  {trainer.name.charAt(0)}
                </span>
              </div>
            )}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, transparent 50%, rgba(13,13,15,0.97) 100%)",
                zIndex: 1,
              }}
            />
          </div>

          {/* Right — content */}
          <div
            style={{
              padding: "1.2rem 1.3rem 1.1rem 1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Diagonal stripe texture */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `repeating-linear-gradient(
                -50deg,
                transparent, transparent 10px,
                rgba(255,255,255,0.016) 10px, rgba(255,255,255,0.016) 11px
              )`,
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            {/* Mint glow — bottom right */}
            <div
              style={{
                position: "absolute",
                bottom: "-40px",
                right: "-30px",
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(66,194,202,0.09) 0%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            {/* Red glow — top right */}
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "10px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(225,29,29,0.07) 0%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Name + title */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3
                style={{
                  margin: "0 0 0.25rem",
                  fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.15,
                  letterSpacing: "0.01em",
                }}
              >
                {trainer.name}
              </h3>
              {trainer.title && (
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.28)",
                  }}
                >
                  {trainer.title}
                </p>
              )}
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf)",
                opacity: 0.3,
                position: "relative",
                zIndex: 1,
                margin: "0.5rem 0",
              }}
            />

            {/* Badges */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.38rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              {trainer.location &&
                (() => {
                  const isBoth = trainer.location.includes("&");
                  const isGldani = trainer.location.includes("გლდანი");
                  const isSaburtalo = trainer.location.includes("საბურთალო");

                  let background: string;
                  let border: string;
                  let color: string;

                  if (isBoth) {
                    // Gradient for both locations
                    background = `linear-gradient(90deg, ${RED_RGBA(0.12)} 0%, ${MINT_RGBA(0.08)} 100%)`;
                    border = `1px solid transparent`;
                    color = "transparent";
                  } else if (isGldani) {
                    // Red for gldani
                    background = RED_RGBA(0.12);
                    border = `1px solid ${RED_RGBA(0.3)}`;
                    color = "#ff6b6b";
                  } else if (isSaburtalo) {
                    // Mint for saburtalo
                    background = MINT_RGBA(0.08);
                    border = `1px solid ${MINT_RGBA(0.28)}`;
                    color = MINT;
                  } else {
                    background = RED_RGBA(0.12);
                    border = `1px solid ${RED_RGBA(0.3)}`;
                    color = "#ff6b6b";
                  }

                  return (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        alignSelf: "flex-start",
                        background: isBoth
                          ? `linear-gradient(90deg, ${RED_RGBA(0.12)} 0%, ${MINT_RGBA(0.08)} 100%)`
                          : background,
                        border,
                        padding: "0.22rem 0.6rem",
                        borderRadius: "6px",
                        fontSize: "0.67rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                      }}
                    >
                      <span
                        style={{
                          background: isBoth
                            ? `linear-gradient(90deg, #ff6b6b 0%, ${MINT} 100%)`
                            : "transparent",
                          WebkitBackgroundClip: isBoth ? "text" : "unset",
                          WebkitTextFillColor: isBoth ? "transparent" : color,
                          backgroundClip: isBoth ? "text" : "unset",
                          color: isBoth ? "transparent" : color,
                        }}
                      >
                        {trainer.location}
                      </span>
                    </span>
                  );
                })()}
              {trainer.specialty && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    alignSelf: "flex-start",
                    background: MINT_RGBA(0.08),
                    border: `1px solid ${MINT_RGBA(0.28)}`,
                    color: MINT,
                    padding: "0.22rem 0.6rem",
                    borderRadius: "6px",
                    fontSize: "0.67rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                  }}
                >
                  <Zap size={10} />
                  {trainer.specialty}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
