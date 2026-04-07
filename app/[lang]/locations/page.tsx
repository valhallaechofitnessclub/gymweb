"use client";

import React, { useState, useEffect } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import LocationCard from "@/components/LocationsCard";
import Hero from "@/components/Hero";
import Link from "next/link";
import Image from "next/image";
import { useDictionary } from "@/app/context/DictionaryContext";

const ACCENT = "#42c2ca";
const GRADIENT = "linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf)";

export default function LocationsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { dict } = useDictionary();

  useEffect(() => {
    setIsVisible(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dictData = dict.locationsPage;

  // ============================================================
  // DEFINE IMAGE ARRAYS FOR BOTH FACILITIES
  // ============================================================
  // GLDANI IMAGES (left card) - place your actual image paths here
  const gldaniImages = [
    "/assets/images/gldani/gldani1.png",
    "/assets/images/gldani/gldani2.png",
    "/assets/images/gldani/gldani3.png",
    "/assets/images/gldani/gldani4.png",
    "/assets/images/gldani/gldani5.png",
    "/assets/images/gldani/gldani6.png",
    "/assets/images/gldani/gldani7.png",
    "/assets/images/gldani/gldani8.png",
    "/assets/images/gldani/gldani9.png",
    "/assets/images/gldani/gldani10.png",
    "/assets/images/gldani/gldani11.png",
    "/assets/images/gldani/gldani12.png",
    "/assets/images/gldani/gldani13.png",
    "/assets/images/gldani/gldani14.png",
    "/assets/images/gldani/gldani15.png",
    "/assets/images/gldani/gldani16.png",
    // Add as many as you have. Examples:
    // '/assets/images/gldani/entrance.jpg',
    // '/assets/images/gldani/weightroom.jpg',
  ];

  // SABURTALO IMAGES (right card)
  const saburtaloImages = [
    "/assets/images/saburtalo/saburtalo1.png",
    "/assets/images/saburtalo/saburtalo2.png",
    "/assets/images/saburtalo/saburtalo3.png",
    "/assets/images/saburtalo/saburtalo4.png",
    "/assets/images/saburtalo/saburtalo5.png",
    "/assets/images/saburtalo/saburtalo6.png",
    "/assets/images/saburtalo/saburtalo7.png",
    "/assets/images/saburtalo/saburtalo8.png",
    "/assets/images/saburtalo/saburtalo9.png",
    "/assets/images/saburtalo/saburtalo10.png",
    "/assets/images/saburtalo/saburtalo11.png",
    "/assets/images/saburtalo/saburtalo12.png",
    "/assets/images/saburtalo/saburtalo13.png",
  ];

  // Fallback images in case arrays are empty (prevents blank cards)
  const fallbackGldani = "/assets/images/gldaniGym.png";
  const fallbackSaburtalo = "/assets/images/saburtaloGym.png";

  // Prepare locations with image arrays (using fallback if array empty)
  const locations = [
    {
      id: 1,
      ...dictData.cards.card1, // adjust based on your dict structure
      name: dictData.cards.card1?.name || "Valhalla Echo Gldani",
      address: dictData.cards.card1?.address || "Gldani District, Tbilisi",
      city: dictData.cards.card1?.city || "Tbilisi",
      phone: dictData.cards.card1?.phone || "+995 555 12 34 56",
      hours: dictData.cards.card1?.hours || "Mon-Sun: 08:00 - 23:00",
      features: dictData.cards.card1?.features || [
        "Cardio Zone",
        "Free Weights",
        "Sauna",
      ],
      images: gldaniImages.length ? gldaniImages : [fallbackGldani],
    },
    {
      id: 2,
      ...dictData.cards.card2,
      name: dictData.cards.card2?.name || "Valhalla Echo Saburtalo",
      address: dictData.cards.card2?.address || "Saburtalo District, Tbilisi",
      city: dictData.cards.card2?.city || "Tbilisi",
      phone: dictData.cards.card2?.phone || "+995 555 98 76 54",
      hours: dictData.cards.card2?.hours || "Mon-Sun: 07:00 - 00:00",
      features: dictData.cards.card2?.features || [
        "Pool",
        "CrossFit",
        "Yoga Studio",
      ],
      images: saburtaloImages.length ? saburtaloImages : [fallbackSaburtalo],
    },
  ];

  return (
    <div
      style={{
        minHeight: "100dvh",
        padding: isMobile ? "5rem 1rem 2rem" : "6rem 2rem 4rem",
        backgroundColor: "black",
      }}
    >
      <Hero
        title={dictData.header.title}
        subtitle={dictData.header.subtitle}
        isVisible={isVisible}
      />

      {/* Two Facility Cards with Photo Collage (Carousel) */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(380px, 1fr))",
          gap: isMobile ? "1rem" : "1.5rem",
        }}
      >
        {locations.map((location, idx) => (
          <LocationCard
            key={location.id}
            location={location}
            index={idx}
            isVisible={isVisible}
          />
        ))}
      </div>

      {/* Map section — bothGym.png as full background (unchanged) */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "4rem auto 0",
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
          height: isMobile ? "340px" : "500px",
        }}
      >
        <Image
          src="/assets/images/bothGym.png"
          alt="Both gym locations"
          fill
          style={{ objectFit: "cover" }}
          loading="lazy"
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: GRADIENT,
            zIndex: 2,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "2rem 1.5rem" : "3rem",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: isMobile
                ? "clamp(1.5rem, 6vw, 2rem)"
                : "clamp(2rem, 4vw, 3rem)",
              fontWeight: 900,
              color: "white",
              marginBottom: "0.75rem",
              marginTop: 0,
              letterSpacing: "0.04em",
              textShadow: "0 2px 20px rgba(0,0,0,0.8)",
            }}
          >
            {dictData.mapSection.title}
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: isMobile ? "0.9rem" : "1.05rem",
              marginBottom: "2rem",
              maxWidth: "480px",
              lineHeight: 1.6,
            }}
          >
            {dictData.mapSection.text}
          </p>

          <Link
            href="https://www.google.com/maps/search/valhalla+echo+fitness/@41.7161693,44.6885749,12z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: GRADIENT,
              color: "white",
              textDecoration: "none",
              borderRadius: "12px",
              padding: isMobile ? "0.75rem 1.5rem" : "0.875rem 2rem",
              fontSize: isMobile ? "0.875rem" : "1rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            <MapPin size={16} />
            View on Google Maps
            <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
