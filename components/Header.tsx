'use client';

import { memo, useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePageTransition } from './PageTransition';

const Header = memo(function Header({ hideOnScroll = false }: { hideOnScroll?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { navigateTo } = usePageTransition();

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigateTo(href);
  }, [navigateTo]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (hideOnScroll) {
        const scrollingDown = currentScrollY > lastScrollY.current;
        if (scrollingDown && currentScrollY > 80) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hideOnScroll]);

  const navContent = (
    <>
      <Link href="/" onClick={(e) => handleNavClick(e, '/')} className="flex items-center">
        <Image
          src="/logo.png"
          alt="Carol Hsiao Logo"
          width={40}
          height={40}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-500"
        />
      </Link>

      <nav className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        <Link href="/" onClick={(e) => handleNavClick(e, '/')} className="text-sm sm:text-base md:text-lg font-inter font-medium tracking-wider hover:opacity-60 transition-all duration-500 text-black">
          HOME
        </Link>
        <Link href="/services" onClick={(e) => handleNavClick(e, '/services')} className="text-sm sm:text-base md:text-lg font-inter font-medium tracking-wider hover:opacity-60 transition-all duration-500 text-black">
          SERVICE
        </Link>
        <Link href="/blog" onClick={(e) => handleNavClick(e, '/blog')} className="text-sm sm:text-base md:text-lg font-inter font-medium tracking-wider hover:opacity-60 transition-all duration-500 text-black">
          BLOG
        </Link>
      </nav>
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
      } ${isScrolled ? 'pt-4 px-4 sm:px-6 md:px-8' : ''}`}
      style={{
        borderBottom: isScrolled ? 'none' : '1px solid #F1F1F1',
        transition: 'opacity 1s ease-out, transform 1s ease-out, padding 0.5s ease-in-out',
        ...(hideOnScroll && isHidden ? {
          transform: 'translateY(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.5s ease-in-out',
        } : {}),
        ...(hideOnScroll && !isHidden && isScrolled ? {
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.5s ease-in-out',
        } : {}),
      }}
    >
      <div
        className={`mx-auto transition-all duration-500 ease-in-out flex items-center justify-between ${
          isScrolled
            ? 'max-w-4xl bg-white/30 backdrop-blur-xl rounded-full px-6 py-3 shadow-2xl'
            : 'max-w-7xl bg-[#faf8f5]/90 backdrop-blur-sm px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4'
        }`}
        style={{
          border: 'none',
          transition: 'all 0.5s ease-in-out'
        }}
      >
        {navContent}
      </div>
    </header>
  );
});

export default Header;
