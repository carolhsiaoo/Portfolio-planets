'use client'

import { useState, useEffect, useRef } from 'react';
import { detectPerformanceTier, getPerformanceSettings, FPSMonitor } from '@/utils/detectPerformance';
import HeroMouseInteraction from './HeroMouseInteraction';

/**
 * Adaptive wrapper that detects device performance and shows appropriate fallback
 */
export default function AdaptiveHeroMouseInteraction() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const tier = detectPerformanceTier();
    const settings = getPerformanceSettings(tier);

    console.log('===========================================');
    console.log('[Performance Detection]');
    console.log('Detected tier:', tier);
    console.log('Settings:', settings);
    console.log('CPU Cores:', navigator.hardwareConcurrency);
    console.log('Device Memory:', (navigator as any).deviceMemory, 'GB');
    console.log('User Agent:', navigator.userAgent);
    console.log('===========================================');

    // For low-end devices (potato or low tier), show CSS animation only - NO 3D
    if (tier === 'potato' || tier === 'low') {
      console.log('🎨 [Performance] Low-end device detected - Using CSS animation instead of 3D');
      setShowFallback(true);
      return;
    }

    // For medium/high, load 3D scene
    console.log('🚀 [Performance] Loading 3D scene...');
    setShouldLoad(true);

    // Monitor FPS and downgrade to CSS if performance is bad
    const monitor = new FPSMonitor();
    let lowFPSCount = 0;

    monitor.onFPSUpdate((fps) => {
      console.log('[Performance] Current FPS:', fps);

      if (fps < 20) {
        lowFPSCount++;
        if (lowFPSCount >= 3) {
          console.warn('⚠️ [Performance] FPS too low (<20 for 3+ seconds) - Switching to CSS animation');
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
    return <LoadingPlaceholder />;
  }

  return <HeroMouseInteraction />;
}

/**
 * Loading placeholder while 3D scene loads
 */
function LoadingPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col justify-center sm:justify-between gap-80 sm:gap-0 py-12 sm:py-20 md:py-24">
        {/* Carol Hsiao - Top */}
        <div className="self-center sm:self-start text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-black leading-tight text-black select-none">
            Carol Hsiao
          </h1>
        </div>

        {/* Rest of text - Bottom */}
        <div className="self-center sm:self-end text-center flex flex-col items-center">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif mb-2 leading-relaxed text-black select-none">
            Designer and Developer
          </p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif mb-2 flex items-center justify-center gap-2 sm:gap-3 leading-relaxed text-black select-none">
            <span className="text-lg sm:text-xl md:text-2xl">◆</span>
            Product Builder
            <span className="text-lg sm:text-xl md:text-2xl">◆</span>
          </p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif leading-relaxed text-black select-none">
            Currently Building @FireFree
          </p>
          <p className="text-sm text-gray-400 mt-4">Loading 3D scene...</p>
        </div>
      </div>
    </div>
  );
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

    // Ensure video loops properly
    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(err => console.log('Video play error:', err));
    };

    video.addEventListener('ended', handleEnded);

    // Auto-play on mount
    video.play().catch(err => console.log('Video autoplay error:', err));

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden"
      style={{ backgroundColor: '#faf8f5' }}
    >
      {/* Video background - shows the actual 3D planets animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full sm:w-[600px] md:w-[800px] lg:w-[1000px] h-auto object-contain"
          style={{
            maxHeight: '100%',
            imageRendering: 'crisp-edges',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        >
          {/* WebM for modern browsers (smaller file size - 2.5MB) */}
          <source src="/videos/hero-planets.webm" type="video/webm" />
          {/* MP4 fallback for Safari (7.7MB) */}
          <source src="/videos/hero-planets.mp4" type="video/mp4" />

          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/40 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl animate-pulse" />
          </div>
        </video>
      </div>

    </div>
  );
}
