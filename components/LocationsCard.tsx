"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

// ============================================================
// Image Carousel Subcomponent for each facility
// ============================================================
interface ImageCarouselProps {
  images: string[];
  alt: string;
  autoPlayInterval?: number; // in milliseconds
}

function ImageCarousel({
  images,
  alt,
  autoPlayInterval = 4000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Navigation functions
  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [images.length, isAnimating]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [images.length, isAnimating]);

  // Auto-advance logic
  useEffect(() => {
    if (autoPlayInterval && !isHovering && images.length > 1) {
      intervalRef.current = setInterval(goToNext, autoPlayInterval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlayInterval, goToNext, isHovering, images.length]);

  // No images? fallback
  if (!images.length) {
    return (
      <div
        className="carousel-fallback"
        style={{ background: "#1a1a1a", width: "100%", height: "100%" }}
      />
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div
      className="carousel-container"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Current image with smooth fade animation */}
      <div
        key={currentIndex}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          animation: "fadeIn 0.5s ease-in-out",
        }}
      >
        <Image
          src={currentImage}
          alt={`${alt} - image ${currentIndex + 1}`}
          fill
          style={{ objectFit: "cover" }}
          priority={currentIndex === 0}
          loading={currentIndex === 0 ? "eager" : "lazy"}
        />
      </div>

      {/* Navigation arrows - only show if more than 1 image */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="carousel-arrow carousel-arrow-left"
            aria-label="Previous image"
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
              transition: "all 0.2s ease",
              zIndex: 20,
              opacity: 0.7,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="carousel-arrow carousel-arrow-right"
            aria-label="Next image"
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
              transition: "all 0.2s ease",
              zIndex: 20,
              opacity: 0.7,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          >
            <ChevronRightIcon size={20} />
          </button>

          {/* Dots indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "8px",
              zIndex: 20,
              background: "rgba(0,0,0,0.4)",
              padding: "4px 12px",
              borderRadius: "20px",
              backdropFilter: "blur(4px)",
            }}
          >
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(idx);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                style={{
                  width: idx === currentIndex ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor:
                    idx === currentIndex ? "#42c2ca" : "rgba(255,255,255,0.5)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  padding: 0,
                }}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================
// Location Card (enhanced with carousel)
// ============================================================
interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  features: string[];
  images: string[]; // changed from single 'image' to array
}

interface LocationCardProps {
  location: Location;
  index: number;
  isVisible: boolean;
  lang?: "en" | "ka";
}

const MAP_LINKS = [
  "https://www.google.com/maps/place/Valhalla+Echo+Fitness+Club/@41.7879714,44.8150725,15z/data=!4m10!1m2!2m1!1svalhalla+echo+fitness!3m6!1s0x40446d0070363033:0x7110fa5b707e3608!8m2!3d41.7879714!4d44.8150725!15sChV2YWxoYWxsYSBlY2hvIGZpdG5lc3OSAQNneW3gAQA!16s%2Fg%2F11ydz1ny9s?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D",
  "https://www.google.com/maps/place/vallhallaecho+fitness+club/@41.7235847,44.7762972,15z/data=!4m10!1m2!2m1!1svalhalla+echo+fitness!3m6!1s0x404473bd8d8e43bb:0x381ac90e0973cbd2!8m2!3d41.7235847!4d44.7762972!15sChV2YWxoYWxsYSBlY2hvIGZpdG5lc3NaFyIVdmFsaGFsbGEgZWNobyBmaXRuZXNzkgEOZml0bmVzc19jZW50ZXKaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUnNkWFZwU1VGbkVBReABAPoBBQiPARA4!16s%2Fg%2F11s8k7tmd6?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D",
];

const translations = {
  en: { openMap: "Open on Map" },
  ka: { openMap: "რუკაზე ნახვა" },
};

const GRADIENT = "linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf)";
const ACCENT = "#42c2ca";
const RED = "#e11d1d";

export default function LocationCard({
  location,
  index,
  isVisible,
  lang = "en",
}: LocationCardProps) {
  return (
    <div
      style={{
        position: "relative",
        height: "580px",
        borderRadius: "20px",
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
        boxShadow: "0 20px 35px -12px rgba(0,0,0,0.5)",
      }}
    >
      {/* Image Carousel - full bleed background */}
      <ImageCarousel
        images={location.images}
        alt={location.name}
        autoPlayInterval={4500}
      />

      {/* Strong gradient overlay — dark at bottom, clear at top */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.15) 100%)",
          pointerEvents: "none", // allows clicking arrows through overlay
          zIndex: 5,
        }}
      />

      {/* Gradient accent line at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: GRADIENT,
          zIndex: 15,
        }}
      />

      {/* All content pinned to bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 15,
          padding: "1.75rem",
        }}
      >
        {/* Name */}
        <h3
          style={{
            fontSize: "1.9rem",
            fontWeight: 900,
            color: "white",
            margin: "0 0 0.15rem",
            letterSpacing: "0.04em",
            lineHeight: 1.1,
            textShadow: "0 2px 20px rgba(0,0,0,0.8)",
          }}
        >
          {location.name}
        </h3>

        {/* City */}
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            margin: "0 0 1.25rem",
          }}
        >
          {location.city}
        </p>

        {/* Info rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.55rem",
            marginBottom: "1.1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <MapPin size={14} color={RED} style={{ flexShrink: 0 }} />
            {location.address}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <Phone size={14} color={RED} style={{ flexShrink: 0 }} />
            {location.phone}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <Clock size={14} color={ACCENT} style={{ flexShrink: 0 }} />
            {location.hours}
          </div>
        </div>

        {/* Feature tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.35rem",
            marginBottom: "1.25rem",
          }}
        >
          {location.features.map((f, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "6px",
                padding: "0.2rem 0.55rem",
                background: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(4px)",
              }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Map button */}
        <a
          href={MAP_LINKS[index] ?? MAP_LINKS[0]}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: GRADIENT,
            color: "white",
            textDecoration: "none",
            borderRadius: "10px",
            padding: "0.65rem 1.2rem",
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.5)";
          }}
        >
          <ExternalLink size={13} />
          {translations[lang].openMap}
          <ChevronRight size={13} />
        </a>
      </div>

      {/* Inject keyframes for smooth fade animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(1.02);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
