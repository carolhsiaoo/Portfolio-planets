'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { usePageTransition } from './PageTransition';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'right' | 'bottom';
}

export default function FadeInSection({
  children,
  delay = 0,
  className = '',
  direction = 'right'
}: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isTransitioning } = usePageTransition();

  useEffect(() => {
    // Don't start observing while a page transition overlay is active
    if (isTransitioning) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay, isTransitioning]);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? 'opacity-100 translate-x-0 translate-y-0'
          : `opacity-0 ${direction === 'bottom' ? 'translate-y-12' : 'translate-x-12'}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
