'use client';

import { memo, useState, useEffect } from 'react';
import Image from 'next/image';

const Header = memo(function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Trigger fade-in on component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Handle scroll event
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
      } ${isScrolled ? 'pt-4 px-4 sm:px-6 md:px-8' : ''}`}
      style={{
        borderBottom: isScrolled ? 'none' : '1px solid #F1F1F1',
        transition: 'opacity 1s ease-out, transform 1s ease-out, padding 0.5s ease-in-out',
      }}
    >
      <div
        className={`mx-auto transition-all duration-500 ease-in-out flex items-center justify-between ${
          isScrolled
            ? 'max-w-4xl bg-white/30 backdrop-blur-xl rounded-full px-6 py-3 shadow-2xl'
            : 'max-w-7xl bg-[#faf8f5]/90 backdrop-blur-sm px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6'
        }`}
        style={{
          border: 'none',
          transition: 'all 0.5s ease-in-out'
        }}
      >
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Carol Hsiao Logo"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-500"
          />
        </div>

        <nav className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <a href="#work" className="text-sm sm:text-base md:text-lg font-inter font-medium tracking-wide tracking-wider hover:opacity-60 transition-all duration-500 text-black">
            PROJECTS
          </a>
          <a href="#about" className="text-sm sm:text-base md:text-lg font-inter font-medium tracking-wide tracking-wider hover:opacity-60 transition-all duration-500 text-black">
            ABOUT
          </a>
          <a href="#contact" className="text-sm sm:text-base md:text-lg font-inter font-medium tracking-wide tracking-wider hover:opacity-60 transition-all duration-500 text-black">
            CONTACT
          </a>
        </nav>
      </div>
    </header>
  );
});

export default Header;
