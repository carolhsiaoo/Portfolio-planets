'use client'

import SceneMoon from "./SceneMoon";

export default function Hero() {
  return (
    <section className="pt-40 pb-32 px-8 relative min-h-screen flex items-center justify-center">
      {/* 3D Planets Model - Behind text (z-index 0) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-0">
        <div className="w-[1000px] h-[1000px]">
          <SceneMoon />
        </div>
      </div>

      {/* Hero Content - In front of planets (z-index 10) */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h1 className="text-6xl md:text-8xl font-serif mb-4 leading-tight text-white">
          Carol Hsiao
        </h1>
        <p className="text-2xl md:text-3xl font-serif mb-2 leading-relaxed text-white">
          Independent Front End
        </p>
        <p className="text-2xl md:text-3xl font-serif mb-6 flex items-center justify-center gap-3 leading-relaxed text-white text-white">
          <span className="text-2xl">◆</span>
          Developer
          <span className="text-2xl">◆</span>
        </p>
        <p className="text-xl md:text-2xl font-serif text-white">
          Currently Building @FireFree
        </p>
      </div>
    </section>
  );
}
