'use client'

import { useState, useRef } from "react";
import HeroMouseInteraction from "./HeroMouseInteraction";

export default function Hero() {
  const [isTextHovered, setIsTextHovered] = useState(false);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <section className="pt-40 pb-32 px-8 relative min-h-screen flex items-center justify-center">
      {/* 3D Planets Model - Behind text (z-index 0) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-auto z-0"
        style={{
          filter: isTextHovered ? 'blur(12px)' : 'blur(0px)',
          transition: 'filter 0.5s ease-in-out',
        }}
      >
        <div className="w-[1000px] h-[1000px]">
          <HeroMouseInteraction />
        </div>
      </div>

      {/* Hero Content - In front of planets (z-index 10) */}
      <div
        className="max-w-5xl mx-auto text-center relative z-10 pointer-events-auto px-16 py-12"
        onMouseEnter={() => {
          if (leaveTimeoutRef.current !== null) {
            clearTimeout(leaveTimeoutRef.current);
            leaveTimeoutRef.current = null;
          }
          setIsTextHovered(true);
        }}
        onMouseLeave={() => {
          // Keep blur for a moment after mouse leaves
          if (leaveTimeoutRef.current !== null) {
            clearTimeout(leaveTimeoutRef.current);
          }
          leaveTimeoutRef.current = setTimeout(() => {
            setIsTextHovered(false);
          }, 300); // Stay blurred for 0.3 seconds after leaving
        }}
      >
        <h1 className="text-6xl md:text-8xl font-serif mb-4 leading-tight text-white select-none">
          Carol Hsiao
        </h1>
        <p className="text-2xl md:text-3xl font-serif mb-2 leading-relaxed text-white select-none">
          Independent Front End
        </p>
        <p className="text-2xl md:text-3xl font-serif mb-6 flex items-center justify-center gap-3 leading-relaxed text-white select-none">
          <span className="text-2xl">◆</span>
          Developer
          <span className="text-2xl">◆</span>
        </p>
        <p className="text-xl md:text-2xl font-serif text-white select-none">
          Currently Building @FireFree
        </p>
      </div>
    </section>
  );
}
