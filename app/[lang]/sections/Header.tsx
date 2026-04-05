"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

interface NavLink {
  id: string;
  label: string;
  path: string;
}

interface Props {
  dict: {
    locations: string;
    activities: string;
    trainers: string;
    prices: string;
    contact: string;
  };
}

export default function Header({ dict }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1] || "en";

  const gradient = "linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf)";

  const navLinks: NavLink[] = useMemo(
    () => [
      {
        id: "locations",
        label: dict.locations,
        path: `/${currentLang}/locations`,
      },
      {
        id: "activities",
        label: dict.activities,
        path: `/${currentLang}/activities`,
      },
      {
        id: "trainers",
        label: dict.trainers,
        path: `/${currentLang}/trainers`,
      },
      { id: "prices", label: dict.prices, path: `/${currentLang}/pricing` },
      { id: "contact", label: dict.contact, path: `/${currentLang}/contact` },
    ],
    [dict, currentLang],
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  const desktopBtnRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const mobileBtnRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const currentPath = pathname.toLowerCase();
    const active = navLinks.find((link) => currentPath.includes(link.id));
    setActiveLink(active ? active.id : "");
  }, [pathname, navLinks]);

  useEffect(() => {
    const reset = (map: Map<string, HTMLButtonElement>) => {
      map.forEach((btn, id) => {
        const shouldShow = id === activeLink;
        btn.style.setProperty(
          "--hover-line",
          shouldShow ? "translateX(0)" : "translateX(-101%)",
        );
      });
    };
    reset(desktopBtnRefs.current);
    reset(mobileBtnRefs.current);
  }, [activeLink]);

  const switchLanguage = (lang: "en" | "ge") => {
    const parts = pathname.split("/");
    parts[1] = lang;
    const newPath = parts.join("/") || "/";
    router.push(newPath);
  };

  const handleNavigation = (link: NavLink) => {
    setActiveLink(link.id);
    setIsMobileMenuOpen(false);
    router.push(link.path);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        setShowHeader(true);
      }
      setIsScrolled(currentScrollY > 20);
      lastScrollY = currentScrollY;
    };

    const checkScreen = () => setIsMobile(window.innerWidth < 864);
    checkScreen();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkScreen);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    headerWrapper: {
      position: "fixed",
      top: showHeader ? "0" : "-100px",
      left: 0,
      right: 0,
      zIndex: 50,
      transition: "top 0.4s ease",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "0 1rem" : "0 2rem",
      height: "80px",
      backdropFilter: "blur(6px)",
      backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.8)" : "transparent",
      transition: "background-color 0.3s ease",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "0.7rem",
      background: gradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      fontWeight: 900,
      cursor: "pointer",
      fontSize: "1.5rem",
      letterSpacing: "0.05em",
      filter: "drop-shadow(0 0 10px rgba(200, 0, 0, 0.3))",
    },
    langSwitcher: { display: "flex", gap: "0.5rem" },
    nav: { display: "flex", gap: "2rem" },
    mobileButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "none",
      border: "none",
      color: "white",
      cursor: "pointer",
      padding: "0",
      zIndex: 51,
    },
    mobileMenu: {
      position: "absolute",
      top: "80px",
      left: 0,
      right: 0,
      backgroundColor: "rgba(0, 0, 0, 0.95)",
      backdropFilter: "blur(10px)",
      borderTop: "1px solid rgba(204, 0, 0, 0.2)",
      maxHeight: isMobileMenuOpen ? "400px" : "0",
      opacity: isMobileMenuOpen ? 1 : 0,
      overflow: "hidden",
      transition: "all 0.3s ease-in-out",
      padding: isMobileMenuOpen ? "1rem 2rem" : "0 2rem",
    },
  };

  const navButtonStyle = (active: boolean): React.CSSProperties => ({
    position: "relative",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: active ? "transparent" : "white",
    background: active ? gradient : "none",
    WebkitBackgroundClip: active ? "text" : "unset",
    WebkitTextFillColor: active ? "transparent" : "white",
    backgroundClip: active ? "text" : "unset",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "color 0.3s",
    padding: "0.5rem 0",
    overflow: "hidden",
  });

  const navButtonAfter = (active: boolean): React.CSSProperties => ({
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "2px",
    background:
      "linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf, transparent)",
    boxShadow: active ? "0 0 8px rgba(200, 0, 0, 0.4)" : "none",
    transform: active ? "translateX(0)" : "translateX(-101%)",
    transition: "transform 0.35s ease",
  });

  const mobileLinkStyle = (active: boolean): React.CSSProperties => ({
    display: "block",
    width: "100%",
    textAlign: "left" as const,
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: active ? "rgba(204, 0, 0, 0.08)" : "transparent",
    borderLeft: active ? "4px solid #e11d1d" : "4px solid transparent",
    color: active ? "transparent" : "white",
    background: active ? gradient : "transparent",
    WebkitBackgroundClip: active ? "text" : "unset",
    WebkitTextFillColor: active ? "transparent" : "white",
    backgroundClip: active ? "text" : "unset",
    cursor: "pointer",
    marginBottom: "0.5rem",
    transition: "all 0.2s ease",
    position: "relative",
    overflow: "hidden",
  });

  const mobileLinkAfter = (active: boolean): React.CSSProperties => ({
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "2px",
    background:
      "linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf, transparent)",
    boxShadow: active ? "0 0 8px rgba(200, 0, 0, 0.4)" : "none",
    transform: active ? "translateX(0)" : "translateX(-101%)",
    transition: "transform 0.35s ease",
  });

  const langButtonStyle = (active: boolean): React.CSSProperties => ({
    fontWeight: "bold",
    color: active ? "transparent" : "white",
    background: active ? gradient : "none",
    WebkitBackgroundClip: active ? "text" : "unset",
    WebkitTextFillColor: active ? "transparent" : "white",
    backgroundClip: active ? "text" : "unset",
    border: active ? "1px solid rgba(204, 0, 0, 0.6)" : "1px solid white",
    borderRadius: "4px",
    padding: "0.2rem 0.5rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
  });

  const setBtnRef = (
    id: string,
    el: HTMLButtonElement | null,
    map: React.MutableRefObject<Map<string, HTMLButtonElement>>,
  ) => {
    if (el) map.current.set(id, el);
    else map.current.delete(id);
  };

  return (
    <div style={styles.headerWrapper}>
      <header style={styles.header}>
        <div style={styles.logo} onClick={() => router.push(`/${currentLang}`)}>
          <img
            src="/assets/images/logo.png"
            alt="Valhalla"
            style={{
              height: "55px",
              width: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 0 10px rgba(200, 0, 0, 0.3))",
            }}
          />
          <div style={styles.langSwitcher}>
            <button
              style={langButtonStyle(pathname.startsWith("/en"))}
              onClick={(e) => {
                e.stopPropagation();
                switchLanguage("en");
              }}
            >
              EN
            </button>
            <button
              style={langButtonStyle(pathname.startsWith("/ge"))}
              onClick={(e) => {
                e.stopPropagation();
                switchLanguage("ge");
              }}
            >
              GE
            </button>
          </div>
        </div>

        {!isMobile && (
          <nav style={styles.nav}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                ref={(el) => setBtnRef(link.id, el, desktopBtnRefs)}
                style={navButtonStyle(activeLink === link.id)}
                onClick={() => handleNavigation(link)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.setProperty(
                    "--hover-line",
                    "translateX(0)",
                  );
                }}
                onMouseLeave={(e) => {
                  const isActive = activeLink === link.id;
                  e.currentTarget.style.setProperty(
                    "--hover-line",
                    isActive ? "translateX(0)" : "translateX(-101%)",
                  );
                }}
              >
                {link.label}
                <span
                  style={{
                    ...navButtonAfter(activeLink === link.id),
                    transform: "var(--hover-line, translateX(-101%))",
                  }}
                />
              </button>
            ))}
          </nav>
        )}

        {isMobile && (
          <button
            style={styles.mobileButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
      </header>

      {isMobile && (
        <div style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              ref={(el) => setBtnRef(link.id, el, mobileBtnRefs)}
              style={mobileLinkStyle(activeLink === link.id)}
              onClick={() => handleNavigation(link)}
              onMouseEnter={(e) => {
                e.currentTarget.style.setProperty(
                  "--hover-line",
                  "translateX(0)",
                );
              }}
              onMouseLeave={(e) => {
                const isActive = activeLink === link.id;
                e.currentTarget.style.setProperty(
                  "--hover-line",
                  isActive ? "translateX(0)" : "translateX(-101%)",
                );
              }}
            >
              {link.label}
              <span
                style={{
                  ...mobileLinkAfter(activeLink === link.id),
                  transform: "var(--hover-line, translateX(-101%))",
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
