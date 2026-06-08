'use client'

import { useState, useEffect, useRef } from 'react';

const INTRO_DURATION = 1800;
const FADE_OUT_DURATION = 600;

export default function LoadingIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'playing' | 'fading' | 'done'>('playing');
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);

  // Preload 3D assets into browser cache during the intro (network only, no GPU)
  useEffect(() => {
    const preload = (url: string) => fetch(url, { priority: 'low' as RequestPriority }).catch(() => {});
    preload('/models/planets.glb');
    preload('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_09_1k.hdr');
  }, []);

  // Count from 0 to 100 over INTRO_DURATION using rAF for smoothness
  useEffect(() => {
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / INTRO_DURATION, 1);
      // Ease-out: fast start, slow finish
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fading'), INTRO_DURATION);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== 'fading') return;
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, FADE_OUT_DURATION);
    return () => clearTimeout(t2);
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center"
      style={{
        backgroundColor: '#faf8f5',
        opacity: phase === 'fading' ? 0 : 1,
        transition: `opacity ${FADE_OUT_DURATION}ms ease`,
        willChange: 'opacity',
      }}
    >
      <div className="flex flex-col items-center gap-8">
        <span className="loading-intro-symbol text-[60px] select-none">
          ✦
        </span>
        <p className="loading-intro-name font-cinzel text-5xl sm:text-6xl lg:text-7xl font-medium text-neutral-800 tracking-[0.3em] leading-none select-none" style={{ paddingLeft: '0.3em' }}>
          CAROL
        </p>
        <p className="font-cinzel text-2xl sm:text-3xl font-medium text-neutral-800 leading-none select-none tabular-nums">
          {count}%
        </p>
      </div>
    </div>
  );
}
