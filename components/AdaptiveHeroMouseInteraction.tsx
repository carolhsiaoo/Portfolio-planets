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
  const [devOverride, setDevOverride] = useState<'model' | 'video' | null>(null);
  const isDev = process.env.NODE_ENV === 'development';

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

  const showVideo = devOverride === 'video' || (devOverride === null && (showFallback || !shouldLoad));
  const showModel = devOverride === 'model' || (devOverride === null && !showFallback && shouldLoad);

  return (
    <>
      {isDev && (
        <button
          onClick={() => setDevOverride(prev => prev === 'video' ? 'model' : 'video')}
          className="fixed bottom-4 right-4 z-[9999] px-3 py-1.5 rounded-full text-xs font-mono bg-black/70 text-white backdrop-blur-sm hover:bg-black/90 transition-colors"
        >
          {showVideo ? '📹 Video' : '🌐 3D'} — click to switch
        </button>
      )}
      {showVideo ? <StaticHeroFallback /> : showModel ? <HeroMouseInteraction spinBurst={spinBurst} /> : null}
    </>
  );
}

/**
 * Video fallback for low-end devices
 * Uses pre-recorded video of the 3D scene - same visual, better performance
 */
function StaticHeroFallback() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener('ended', handleEnded);

    // Try autoplay — if blocked (in-app browsers), show tap-to-play
    video.play().then(() => {
      setNeedsTap(false);
    }).catch(() => {
      setNeedsTap(true);
    });

    // Also listen for global touch to retry autoplay
    const retryOnTouch = () => {
      if (video.paused) {
        video.play().then(() => setNeedsTap(false)).catch(() => {});
      }
    };
    document.addEventListener('touchstart', retryOnTouch, { once: true });
    document.addEventListener('click', retryOnTouch, { once: true });

    return () => {
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('touchstart', retryOnTouch);
      document.removeEventListener('click', retryOnTouch);
    };
  }, []);

  const handleTap = () => {
    const video = videoRef.current;
    if (video && video.paused) {
      video.play().then(() => setNeedsTap(false)).catch(() => {});
    }
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-visible relative"
      style={{ transform: 'translateZ(0)', marginTop: 'min(-2vh, -1rem)' }}
      onClick={handleTap}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/hero-planets-poster.png"
        className="h-full w-auto object-contain"
        style={{
          maxWidth: '100%',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0) scale(0.9)',
          transformOrigin: 'center center',
          clipPath: 'inset(1px)',
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
      {needsTap && (
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer z-10">
          <div className="bg-black/30 backdrop-blur-sm rounded-full p-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
