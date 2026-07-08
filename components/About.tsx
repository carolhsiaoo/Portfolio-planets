'use client'

import { memo } from 'react';
import Image from 'next/image';
import StickerWall from './StickerWall';
import WashiTape from './WashiTape';
import { useLanguage } from './LanguageContext';

const About = memo(function About() {
  const { lang } = useLanguage();
  return (
    <section id="about" className="py-24 sm:py-32 md:py-40 relative overflow-hidden">
      <WashiTape />
      <StickerWall />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center flex flex-col items-center relative">
        {/* About heading with stars */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-medium mb-8 sm:mb-10 md:mb-12 flex items-center justify-center gap-4">
          <span className="text-3xl sm:text-4xl">✦</span>
          {lang === 'zh' ? '關於我' : 'About'}
          <span className="text-3xl sm:text-4xl">✦</span>
        </h2>

        {/* Description text */}
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-inter font-normal leading-relaxed mb-8 sm:mb-10 md:mb-12 max-w-full sm:max-w-2xl md:max-w-3xl px-2">
          {lang === 'zh' ? '從設計到程式碼，我打造生動、有趣、且令人難忘的網站。' : 'I build websites that move, react, and get remembered, from design to code.'}
        </p>

        {/* Profile image - centered */}
        <div className="flex justify-center">
          <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-gray-800 rounded-[3rem] overflow-hidden shadow-lg">
            <Image
              src="/carol-image.png"
              alt="Carol Hsiao — Creative Developer based in Calgary"
              width={384}
              height={384}
              sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
