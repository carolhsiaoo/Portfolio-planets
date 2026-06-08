'use client'

import { useState, useEffect } from 'react';

const INTRO_DURATION = 1800;
const FADE_OUT_DURATION = 600;

export default function LoadingIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'playing' | 'fading' | 'done'>('playing');

  // Preload 3D assets into browser cache during the intro (network only, no GPU)
  useEffect(() => {
    const preload = (url: string) => fetch(url, { priority: 'low' as RequestPriority }).catch(() => {});
    preload('/models/planets.glb');
    // drei environment presets are hosted on this CDN
    preload('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_09_1k.hdr');
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
      <div className="flex flex-col items-center gap-5">
        <span className="loading-intro-symbol text-[28px] text-neutral-400 select-none">
          ✦
        </span>
        <p className="loading-intro-name font-cinzel text-2xl sm:text-3xl font-medium text-neutral-800 tracking-[0.3em] leading-none select-none">
          CAROL
        </p>
        <div className="loading-intro-line" />
      </div>
    </div>
  );
}
