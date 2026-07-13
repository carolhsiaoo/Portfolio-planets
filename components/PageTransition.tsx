'use client'

import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type TransitionContextType = {
  navigateTo: (href: string) => void;
  hasNavigated: boolean;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextType>({ navigateTo: () => {}, hasNavigated: false, isTransitioning: false });

export function usePageTransition() {
  return useContext(TransitionContext);
}

const INTRO_DURATION = 1200;
const FADE_OUT_DURATION = 600;

function getLabelForPath(path: string): string {
  if (path.match(/^\/(en|zh)\/blog/) || path.startsWith('/blog')) return 'BLOG';
  if (path.match(/^\/(en|zh)\/contact/) || path.startsWith('/contact') || path.endsWith('#contact')) return 'CONTACT';
  if (path.match(/^\/(en|zh)\/services/) || path.startsWith('/services')) return 'SERVICE';
  return 'CAROL';
}

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [transitioning, setTransitioning] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [phase, setPhase] = useState<'in' | 'out' | 'idle'>('idle');
  const [label, setLabel] = useState('CAROL');
  const [count, setCount] = useState(0);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const targetHref = useRef('');

  const navigateTo = useCallback((href: string) => {
    if (href === pathname) return;
    targetHref.current = href;
    setLabel(getLabelForPath(href));
    setCount(0);
    setHasNavigated(true);
    setTransitioning(true);
    setPhase('in');
    // Navigate immediately so the target page starts mounting behind the overlay
    router.push(href);
  }, [pathname, router]);

  // Count animation
  useEffect(() => {
    if (phase !== 'in') return;
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / INTRO_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Count done, start fade out
        setPhase('out');
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  // Fade out after navigation
  useEffect(() => {
    if (phase !== 'out') return;
    const timer = setTimeout(() => {
      setPhase('idle');
      setTransitioning(false);
    }, FADE_OUT_DURATION);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <TransitionContext.Provider value={{ navigateTo, hasNavigated, isTransitioning: transitioning }}>
      {children}
      {transitioning && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center"
          style={{
            backgroundColor: '#faf8f5',
            opacity: phase === 'out' ? 0 : 1,
            transition: `opacity ${FADE_OUT_DURATION}ms ease`,
            willChange: 'opacity',
          }}
        >
          <div className="flex flex-col items-center gap-10">
            <span className="loading-intro-symbol text-[80px] select-none">
              ✦
            </span>
            <p className="loading-intro-name font-cinzel text-5xl sm:text-6xl lg:text-7xl font-medium text-neutral-800 tracking-[0.3em] leading-none select-none" style={{ paddingLeft: '0.3em' }}>
              {label}
            </p>
            <p className="font-cinzel text-5xl sm:text-6xl font-medium text-neutral-800 leading-none select-none tabular-nums">
              {count}%
            </p>
          </div>
        </div>
      )}
    </TransitionContext.Provider>
  );
}
