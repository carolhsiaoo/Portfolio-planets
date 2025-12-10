'use client'

import { useState } from "react";
import HeroMouseInteraction from "./HeroMouseInteraction";

export default function Hero() {
  const [backgroundBrightness, setBackgroundBrightness] = useState(128); // 0-255
  const [isTextHovered, setIsTextHovered] = useState(false);

  // Determine text color based on background brightness
  // If background is bright (>127), use black text; if dark, use white text
  const textColor = backgroundBrightness > 127 ? 'text-black' : 'text-white';

  return (
    <section className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-8 relative min-h-screen flex items-center justify-center">
      {/* 3D Planets Model - Behind text (z-index 0) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-0">
        <div className="w-full h-full sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px]">
          <HeroMouseInteraction onBrightnessChange={setBackgroundBrightness} isTextHovered={isTextHovered} />
        </div>
      </div>

      {/* Hero Content - Split layout with header-matching width */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col justify-center sm:justify-between gap-96 sm:gap-0 py-12 sm:py-20 md:py-24">
          {/* Carol Hsiao - Top Left on desktop, Top Center on mobile */}
          <div
            className="pointer-events-auto self-center sm:self-start text-center sm:text-left"
            onMouseEnter={() => setIsTextHovered(true)}
            onMouseLeave={() => setIsTextHovered(false)}
          >
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-black leading-tight ${textColor} select-none transition-colors duration-300`}>
              Carol Hsiao
            </h1>
          </div>

          {/* Rest of text - Bottom Right on desktop, Bottom Center on mobile */}
          <div
            className="pointer-events-auto self-center sm:self-end text-center flex flex-col items-center"
            onMouseEnter={() => setIsTextHovered(true)}
            onMouseLeave={() => setIsTextHovered(false)}
          >
            <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif mb-2 leading-relaxed ${textColor} select-none transition-colors duration-300`}>
              Designer and Developer
            </p>
            <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif mb-2 flex items-center justify-center gap-2 sm:gap-3 leading-relaxed ${textColor} select-none transition-colors duration-300`}>
              <span className="text-lg sm:text-xl md:text-2xl">◆</span>
              Product Builder
              <span className="text-lg sm:text-xl md:text-2xl">◆</span>
            </p>
            <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif leading-relaxed ${textColor} select-none transition-colors duration-300`}>
              Currently Building @FireFree
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
