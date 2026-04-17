"use client";

import React from "react";
import { Clock } from "lucide-react";
import Image from "next/image";

interface Activity {
  id: number;
  name: string;
  nameKa?: string;
  description?: string;
  duration: string;
  level?: string;
  schedule?: string;
  image?: string;
  color?: string;
}

interface ActivityCardProps {
  activity: Activity;
  index: number;
  isVisible: boolean;
  lang?: "en" | "ka";
}

export default function ActivityCard({
  activity,
  index,
  isVisible,
  lang = "en",
}: ActivityCardProps) {
  const displayName =
    lang === "ka" && activity.nameKa ? activity.nameKa : activity.name;

  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
        position: "relative",
        aspectRatio: "3 / 2",
        cursor: "pointer",
        border: "1px solid rgba(225, 29, 29, 0.35)",
      }}
    >
      <Image
        src="/assets/images/activities.png"
        alt={displayName}
        fill
        style={{ objectFit: "cover" }}
        loading="lazy"
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.78) 100%)",
          zIndex: 1,
        }}
      />

      {/* Duration — top right */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          zIndex: 2,
          display: "inline-flex",
          alignItems: "center",
          gap: "0.3rem",
          color: "rgba(255,255,255,0.75)",
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.05em",
        }}
      >
        <Clock size={11} strokeWidth={2} />
        {activity.duration}
      </div>

      {/* Title — centered in the empty upper space of the image */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: 0,
          right: 0,
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: 900,
            background:
              "linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            lineHeight: 1.2,
            filter: "drop-shadow(0 0 30px rgba(200,0,0,0.3))",
          }}
        >
          {displayName}
        </h3>
      </div>
    </div>
  );
}
