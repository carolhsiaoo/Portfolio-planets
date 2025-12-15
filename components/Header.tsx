'use client';

import { memo, useState, useEffect } from 'react';

const Header = memo(function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in on component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 bg-[#faf8f5]/90 backdrop-blur-sm z-50 transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-base sm:text-lg">✦</span>
          <span className="font-medium text-xs sm:text-sm lg:text-lg tracking-wide">CAROL HSIAO</span>
        </div>

        <nav className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <a href="#work" className="text-xs sm:text-sm lg:text-base font-medium tracking-wider hover:opacity-60 transition-opacity">
            WORK
          </a>
          <a href="#about" className="text-xs sm:text-sm lg:text-base font-medium tracking-wider hover:opacity-60 transition-opacity">
            ABOUT
          </a>
          <a href="#contact" className="text-xs sm:text-sm lg:text-base font-medium tracking-wider hover:opacity-60 transition-opacity">
            CONTACT
          </a>
        </nav>
      </div>
    </header>
  );
});

export default Header;
