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
    <section className="pt-40 pb-32 px-8 relative min-h-screen flex items-center justify-center">
      {/* 3D Planets Model - Behind text (z-index 0) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-0">
        <div className="w-[1000px] h-[1000px]">
          <HeroMouseInteraction onBrightnessChange={setBackgroundBrightness} isTextHovered={isTextHovered} />
        </div>
      </div>

      {/* Hero Content - In front of planets (z-index 10) */}
      <div
        className="max-w-5xl mx-auto text-center relative z-10 pointer-events-auto px-16 py-12"
        onMouseEnter={() => setIsTextHovered(true)}
        onMouseLeave={() => setIsTextHovered(false)}
      >
        <h1 className={`text-8xl md:text-8xl font-serif font-black mb-4 leading-tight ${textColor} select-none transition-colors duration-300`}>
          Carol Hsiao
        </h1>
        <p className={`text-2xl md:text-3xl font-serif mb-2 leading-relaxed ${textColor} select-none transition-colors duration-300`}>
          Deisnger and Developer
        </p>
        <p className={`text-2xl md:text-3xl font-serif mb-6 flex items-center justify-center gap-3 leading-relaxed ${textColor} select-none transition-colors duration-300`}>
          <span className="text-2xl">◆</span>
          Product Builder
          <span className="text-2xl">◆</span>
        </p>
        <p className={`text-xl md:text-2xl font-serif ${textColor} select-none transition-colors duration-300`}>
          Currently Building @FireFree
        </p>
      </div>
    </section>
  );
}
