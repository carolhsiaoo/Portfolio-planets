'use client'

import { useState, useEffect, useRef } from 'react';
import { detectPerformanceTier, FPSMonitor } from '@/utils/detectPerformance';
import HeroMouseInteraction from './HeroMouseInteraction';

/**
 * Adaptive wrapper that detects device performance and shows appropriate fallback.
 */
export default function AdaptiveHeroMouseInteraction({ spinBurst = false }: { spinBurst?: boolean } = {}) {
  const [shouldLoad, setShouldLoad] = useState(true);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const tier = detectPerformanceTier();

    // For low-end devices (potato or low tier), show CSS animation only - NO 3D
    if (tier === 'potato' || tier === 'low') {
      setShouldLoad(false);
      setShowFallback(true);
      return;
    }

    // Monitor FPS and downgrade to CSS if performance is bad
    const monitor = new FPSMonitor();
    let lowFPSCount = 0;

    monitor.onFPSUpdate((fps) => {
      if (fps < 20) {
        lowFPSCount++;
        if (lowFPSCount >= 3) {
          setShowFallback(true);
        }
      } else {
        lowFPSCount = 0;
      }
    });

    monitor.start();
  }, []);

  if (showFallback) {
    return <StaticHeroFallback />;
  }

  if (!shouldLoad) {
    return null;
  }

  return <HeroMouseInteraction spinBurst={spinBurst} />;
}

/**
 * Video fallback for low-end devices
 * Uses pre-recorded video of the 3D scene - same visual, better performance
 */
function StaticHeroFallback() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(err => console.log('Video play error:', err));
    };

    video.addEventListener('ended', handleEnded);
    video.play().catch(err => console.log('Video autoplay error:', err));

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden"
      style={{ transform: 'translateZ(0)', paddingTop: 'min(5vh, 4rem)' }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="h-full w-auto object-contain"
        style={{
          maxWidth: '100%',
          imageRendering: 'crisp-edges',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          transformOrigin: 'center center',
          border: 'none',
          outline: 'none',
          margin: 0,
          padding: 0,
          display: 'block',
        }}
      >
        <source src="/videos/hero-planets.webm" type="video/webm" />
        <source src="/videos/hero-planets.mp4" type="video/mp4" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl animate-pulse" />
        </div>
      </video>
    </div>
  );
}
