'use client'

import { memo } from 'react';

const Marquee = memo(function Marquee() {
  const items = [
    "UI/UX Design",
    "React",
    "Prototype",
    "Unity",
    "Three.js",
    "Figma",
    "Product Design",
    "Frontend Development",
    "AR/VR",
    "User Research"
  ];

  // Create multiple copies to ensure seamless loop
  const allItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full">
      <div className="w-full bg-white pt-12 sm:pt-16 md:pt-20" />
      <div className="w-full overflow-hidden py-4 sm:py-6 md:py-8 mb-12 sm:mb-16 md:mb-20 border-y border-gray-800 bg-black">
        <div className="flex animate-marquee whitespace-nowrap hover:pause-marquee">
        {allItems.map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center shrink-0"
          >
            <span className="text-xl sm:text-2xl md:text-3xl font-cinzel font-normal text-white mx-4 sm:mx-6 md:mx-8">
              {item}
            </span>
            <span className="text-xl sm:text-2xl md:text-3xl font-cinzel font-normal text-gray-400 mx-4 sm:mx-6 md:mx-8">
              •
            </span>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
});

export default Marquee;
