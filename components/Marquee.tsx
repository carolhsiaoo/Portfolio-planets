'use client'

import { memo } from 'react';
import { useLanguage } from './LanguageContext';

const itemsByLang = {
  en: ["UI/UX Design", "React", "Prototype", "Creative Development", "Three.js", "Product Design", "Frontend Development", "User Experience"],
  zh: ["UI/UX 設計", "React", "原型設計", "創意開發", "Three.js", "產品設計", "前端開發", "使用者體驗"],
};

const Marquee = memo(function Marquee() {
  const { lang } = useLanguage();
  const items = itemsByLang[lang];

  // Create multiple copies to ensure seamless loop
  const allItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full">
      <div className="w-full bg-[#faf8f5] pt-12 sm:pt-16 md:pt-20" />
      <div className="w-full overflow-hidden py-4 sm:py-6 md:py-8 border-y border-gray-800 bg-black">
        <div className="inline-flex animate-marquee whitespace-nowrap hover:pause-marquee">
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
