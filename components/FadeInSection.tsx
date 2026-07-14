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

    const el = sectionRef.current;
    if (!el) return;

    let observer: IntersectionObserver | undefined;
    let fallback: ReturnType<typeof setTimeout> | undefined;
    let attached = false;

    const attach = () => {
      if (attached) return;
      attached = true;
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer?.unobserve(el);
          }
        },
        {
          // Trigger as soon as the section peeks into the viewport — a late
          // trigger plus a long fade reads as a blank dead zone while scrolling
          threshold: 0.05,
          rootMargin: '0px'
        }
      );
      observer.observe(el);
    };

    // Arriving via a cross-document view transition: the browser snapshots the
    // incoming page and animates it in. If the fade-in runs during that
    // snapshot, the animation appears to play twice (once inside the
    // transition, once on the live DOM). Stay hidden until the transition
    // settles, with a timeout in case it hangs or is skipped.
    const activeVT = (document as Document & { activeViewTransition?: { finished: Promise<void> } })
      .activeViewTransition;
    if (activeVT?.finished) {
      activeVT.finished.then(attach, attach);
      fallback = setTimeout(attach, 1200);
    } else {
      attach();
    }

    return () => {
      clearTimeout(fallback);
      observer?.disconnect();
    };
  }, [delay, isTransitioning]);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-x-0 translate-y-0'
          : `opacity-0 ${direction === 'bottom' ? 'translate-y-12' : 'translate-x-12'}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
