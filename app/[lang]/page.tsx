'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { useDictionary } from '@/app/context/DictionaryContext';
import Hero from './sections/Hero';
import Trainers from './sections/Trainers';
import Locations from './sections/Locations';
import Footer from './sections/Footer';

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(container: HTMLElement, targetY: number, duration = 900) {
  const startY = container.scrollTop;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    container.scrollTop = startY + distance * eased;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export default function Home() {
  const { dict, lang } = useDictionary();
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  const goToSection = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const sections = container.querySelectorAll<HTMLElement>('.snap-section');
    const total = sections.length;
    const next = Math.max(0, Math.min(index, total - 1));
    if (next === currentIndex.current) return;

    isScrolling.current = true;
    currentIndex.current = next;

    // Shorter duration on mobile for snappier feel
    const isMobile = window.innerWidth < 768;
    smoothScrollTo(container, next * container.clientHeight, isMobile ? 600 : 900);

    setTimeout(() => {
      isScrolling.current = false;
    }, isMobile ? 650 : 1000);
  }, []);

  // Wheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      if (e.deltaY > 20) goToSection(currentIndex.current + 1);
      else if (e.deltaY < -20) goToSection(currentIndex.current - 1);
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [goToSection]);

  // Touch — fires on touchmove once threshold is crossed, not on touchend
  // This removes the perceived delay entirely
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let hasFired = false;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      hasFired = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isScrolling.current || hasFired) return;
      const delta = touchStartY.current - e.touches[0].clientY;
      // 30px threshold — responsive but won't fire on accidental micro-swipes
      if (Math.abs(delta) > 30) {
        hasFired = true;
        if (delta > 0) goToSection(currentIndex.current + 1);
        else goToSection(currentIndex.current - 1);
      }
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
    };
  }, [goToSection]);

  // Arrow keys
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        goToSection(currentIndex.current + 1);
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        goToSection(currentIndex.current - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goToSection]);

  return (
    <>
      <style>{`
        .snap-container {
          height: 100dvh;
          overflow: hidden;
          position: relative;
        }
        .snap-section {
          overflow: hidden;
        }
      `}</style>

      <div className="snap-container" ref={containerRef}>
        <div className="snap-section"><Hero /></div>
        <div className="snap-section"><Trainers lang={lang as 'en' | 'ge'} dict={dict.trainers} /></div>
        <div className="snap-section"><Locations lang={lang as 'en' | 'ge'} dict={dict.locations} /></div>
        <div className="snap-section"><Footer /></div>
      </div>
    </>
  );
}