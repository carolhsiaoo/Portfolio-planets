'use client';

import { memo, useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { usePageTransition } from './PageTransition';
import { useLanguage } from './LanguageContext';

const Header = memo(function Header({ hideOnScroll = false }: { hideOnScroll?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const langRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { navigateTo } = usePageTransition();
  const { lang, setLang } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const handleLangSwitch = useCallback((newLang: 'en' | 'zh') => {
    setLang(newLang);
    // If on a blog page, navigate to the correct language route
    if (pathname.startsWith('/blog/')) {
      const blogLang = newLang === 'zh' ? 'zh-tw' : 'en';
      const rest = pathname.replace(/^\/blog\/(en|zh-tw)/, '');
      router.push(`/blog/${blogLang}${rest}`);
    }
  }, [setLang, pathname, router]);

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

    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hideOnScroll]);

  const navLinks = [
    { href: '/', label: lang === 'zh' ? '首頁' : 'HOME' },
    { href: '/services', label: lang === 'zh' ? '服務' : 'SERVICE' },
    { href: '/blog', label: lang === 'zh' ? '部落格' : 'BLOG' },
  ];

  const navContent = (
    <>
      <Link href="/" onClick={(e) => handleNavClick(e, '/')} className={`flex items-center transition-opacity duration-500 ${menuOpen ? 'opacity-0 pointer-events-none' : ''}`}>
        <Image
          src="/logo.png"
          alt="Carol Hsiao Logo"
          width={40}
          height={40}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-500"
        />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href} onClick={(e) => handleNavClick(e, href)} className="text-sm sm:text-base md:text-lg font-inter font-medium tracking-wider hover:opacity-60 transition-all duration-500 text-black">
            {label}
          </Link>
        ))}
        <div ref={langRef} className="relative ml-1">
          <button
            onClick={() => setLangOpen((o) => !o)}
            className="flex items-center gap-2 bg-black/5 rounded-full px-5 py-1.5 text-xs font-inter transition-all duration-300 hover:bg-black/10"
          >
            <span className="text-[#1a1a1a]">
              {lang === 'en' ? 'EN' : '中'}
            </span>
            <svg className={`w-3 h-3 text-[#1a1a1a]/50 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 4.5L6 7.5L9 4.5" />
            </svg>
          </button>
          <div
            className={`absolute top-full right-0 mt-2 w-full bg-[#ededed] rounded-2xl overflow-hidden transition-all duration-300 ${
              langOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <button
              onClick={() => { handleLangSwitch('en'); setLangOpen(false); }}
              className={`flex items-center gap-2 w-full px-4 py-2 text-xs font-inter transition-all duration-200 ${
                lang === 'en' ? 'bg-[#1a1a1a] text-white' : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:bg-black/5'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => { handleLangSwitch('zh'); setLangOpen(false); }}
              className={`flex items-center gap-2 w-full px-4 py-2 text-xs font-inter transition-all duration-200 ${
                lang === 'zh' ? 'bg-[#1a1a1a] text-white' : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:bg-black/5'
              }`}
            >
              中文
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile hamburger button */}
      <button
        onClick={() => setMenuOpen((o) => !o)}
        className="md:hidden relative z-60 flex flex-col justify-center items-center w-8 h-8 gap-1.5"
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-0.5 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${menuOpen ? 'rotate-45 translate-y-1 bg-white' : 'bg-[#1a1a1a]'}`} />
        <span className={`block w-5 h-0.5 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${menuOpen ? '-rotate-45 -translate-y-1 bg-white' : 'bg-[#1a1a1a]'}`} />
      </button>
    </>
  );

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 ${menuOpen ? 'z-60' : 'z-50'} ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
      } ${isScrolled ? 'pt-4 px-4 sm:px-6 md:px-8' : ''}`}
      style={{
        borderBottom: (isScrolled || menuOpen) ? 'none' : '1px solid #F1F1F1',
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
          menuOpen
            ? 'max-w-7xl bg-transparent px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4'
            : isScrolled
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

      {/* Full-page mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background */}
        <div className={`absolute inset-0 bg-[#1a1a1a] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] origin-top ${
          menuOpen ? 'scale-y-100' : 'scale-y-0'
        }`} />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center px-8">
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => { handleNavClick(e, href); setMenuOpen(false); }}
                className="text-white font-cinzel text-4xl sm:text-5xl font-medium tracking-tight hover:opacity-60"
                style={{
                  transitionProperty: 'transform, opacity',
                  transitionDuration: '0.6s, 0.6s',
                  transitionTimingFunction: 'cubic-bezier(0.77,0,0.18,1), cubic-bezier(0.77,0,0.18,1)',
                  transitionDelay: menuOpen ? `${150 + i * 80}ms` : '0ms',
                  transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
                  opacity: menuOpen ? 1 : 0,
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Language toggle */}
          <div
            className="mt-16 flex items-center gap-1 bg-white/10 rounded-full p-1"
            style={{
              transitionProperty: 'transform, opacity',
              transitionDuration: '0.6s, 0.6s',
              transitionTimingFunction: 'cubic-bezier(0.77,0,0.18,1), cubic-bezier(0.77,0,0.18,1)',
              transitionDelay: menuOpen ? `${150 + navLinks.length * 80}ms` : '0ms',
              transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
              opacity: menuOpen ? 1 : 0,
            }}
          >
            <button
              onClick={() => { handleLangSwitch('en'); setMenuOpen(false); }}
              className={`px-5 py-2 rounded-full text-sm font-inter transition-all duration-300 ${
                lang === 'en' ? 'bg-white text-[#1a1a1a]' : 'text-white/50 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => { handleLangSwitch('zh'); setMenuOpen(false); }}
              className={`px-5 py-2 rounded-full text-sm font-inter transition-all duration-300 ${
                lang === 'zh' ? 'bg-white text-[#1a1a1a]' : 'text-white/50 hover:text-white'
              }`}
            >
              中文
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default Header;
