'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavLink {
  id: string;
  label: string;
}

const navLinks: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'programs', label: 'Programs' },
  { id: 'trainers', label: 'Trainers' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'pricing', label: 'Pricing' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        setShowHeader(true);
      }

      setIsScrolled(currentScrollY > 20);
      lastScrollY = currentScrollY;
    };

    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScreen);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScreen);
    };
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    headerWrapper: {
      position: 'fixed',
      top: showHeader ? '0' : '-100px',
      left: 0,
      right: 0,
      zIndex: 50,
      transition: 'top 0.4s ease',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 2rem',
      height: '80px',
      backdropFilter: 'blur(6px)',
      backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
      transition: 'background-color 0.3s ease',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: 'white',
      fontWeight: 900,
      cursor: 'pointer',
      fontSize: '1.5rem',
      letterSpacing: '0.05em',
      transition: 'all 0.3s ease',
    },
    nav: {
      display: 'flex',
      gap: '2rem',
    },
    mobileButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      padding: '0.5rem',
      zIndex: 51,
    },
    mobileMenu: {
      position: 'absolute',
      top: '80px',
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(163, 230, 53, 0.2)',
      maxHeight: isMobileMenuOpen ? '400px' : '0',
      opacity: isMobileMenuOpen ? 1 : 0,
      overflow: 'hidden',
      transition: 'all 0.3s ease-in-out',
      padding: isMobileMenuOpen ? '1rem 2rem' : '0 2rem',
    },
  };

  const navButtonStyle = (active: boolean): React.CSSProperties => ({
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: active ? '#a3e635' : 'white',
    transition: 'color 0.3s',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
  });

  const mobileLinkStyle = (active: boolean): React.CSSProperties => ({
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    backgroundColor: active ? 'rgba(163, 230, 53, 0.1)' : 'transparent',
    borderLeft: active ? '4px solid #a3e635' : '4px solid transparent',
    color: active ? '#a3e635' : 'white',
    cursor: 'pointer',
    marginBottom: '0.5rem',
    transition: 'all 0.2s ease',
  });

  return (
    <div style={styles.headerWrapper}>
      <header style={styles.header}>
        <div style={styles.logo}>REFORM</div>

        {/* Desktop Nav */}
        {!isMobile && (
          <nav style={styles.nav}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                style={navButtonStyle(activeLink === link.id)}
                onClick={() => setActiveLink(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}

        {/* Mobile Button */}
        {isMobile && (
          <button
            style={styles.mobileButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
      </header>

      {/* Mobile Menu */}
      {isMobile && (
        <div style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              style={mobileLinkStyle(activeLink === link.id)}
              onClick={() => {
                setActiveLink(link.id);
                setIsMobileMenuOpen(false);
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}