'use client';

import dynamic from 'next/dynamic';

// Dynamically import Hero component to code-split the Three.js bundle
// This prevents the heavy 3D library from blocking initial page load
const Hero = dynamic(() => import("./Hero"), {
  ssr: false, // Disable server-side rendering for 3D content
  loading: () => (
    <section className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-8 relative min-h-[600px] sm:min-h-[700px] md:min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-black leading-tight text-black select-none">
          Carol Hsiao
        </h1>
      </div>
    </section>
  ),
});

export default function ClientHero() {
  return <Hero />;
}
