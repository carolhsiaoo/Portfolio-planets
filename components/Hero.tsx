'use client'

import { useState, useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";
import AdaptiveHeroMouseInteraction from "./AdaptiveHeroMouseInteraction";

export default function Hero() {
  const [backgroundBrightness, setBackgroundBrightness] = useState(128); // 0-255
  const [showName, setShowName] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  // Determine text color based on background brightness
  // If background is bright (>127), use black text; if dark, use white text
  const textColor = backgroundBrightness > 127 ? 'text-black' : 'text-white';

  useEffect(() => {
    // Show name first
    const nameTimer = setTimeout(() => {
      setShowName(true);
    }, 300);

    // Show tagline after name
    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, 900);

    return () => {
      clearTimeout(nameTimer);
      clearTimeout(taglineTimer);
    };
  }, []);

  return (
    <section className="pt-32 sm:pt-40 md:pt-40 lg:pt-56 pb-16 sm:pb-24 md:pb-24 lg:pb-32 relative min-h-[600px] sm:min-h-[700px] md:min-h-[650px] lg:min-h-screen flex items-center justify-center overflow-x-hidden">
      {/* 3D Planets Model - Behind text (z-index 0) - Adaptive based on device performance */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-0 overflow-hidden">
        <div className="w-full h-full sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] lg:w-[min(1000px,90vw)] lg:h-[1000px]" style={{ willChange: 'auto' }}>
          <AdaptiveHeroMouseInteraction />
        </div>
      </div>

      {/* Hero Content - Split layout with header-matching width */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col justify-center sm:justify-between gap-80 sm:gap-0 py-12 sm:py-20 md:py-24">
          {/* Carol Hsiao - Top Left on desktop, Top Center on mobile */}
          <div
            className="pointer-events-auto self-center sm:self-start text-center sm:text-left will-change-transform"
          >
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-cinzel font-medium leading-tight ${textColor} select-none transition-all duration-1000 ease-out ${
              showName ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`} style={{ willChange: 'transform, opacity' }}>
              Carol Hsiao
            </h1>
          </div>

          {/* Rest of text - Bottom Right on desktop, Bottom Center on mobile */}
          <div
            className={`pointer-events-auto self-center sm:self-end text-center flex flex-col items-center transition-all duration-1000 ease-out will-change-transform ${
              showTagline ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ willChange: 'transform, opacity' }}
          >
            {/* <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-inter font-light mb-2 leading-relaxed ${textColor} select-none transition-colors duration-300`}>
              Designer and Developer
            </p> */}
            <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-inter font-medium mb-2 flex items-center justify-center gap-2 sm:gap-3 leading-relaxed ${textColor} select-none transition-colors duration-300`}>
              <span className="text-lg sm:text-xl md:text-2xl">✦</span>
              Product Engineer
              <span className="text-lg sm:text-xl md:text-2xl">✦</span>
            </p>
            <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-inter font-medium leading-relaxed ${textColor} select-none transition-colors duration-300`}>
              Currently Building{' '}
              <a
                href="https://firefree.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer relative inline-flex items-center gap-1.5 px-2 py-1 rounded-xl hover:bg-purple-200/50 transition-colors duration-300"
              >
                @FireFree
                <FiExternalLink className="text-sm sm:text-base md:text-lg lg:text-xl" strokeWidth={2.5} />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
