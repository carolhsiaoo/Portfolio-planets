'use client';

import { memo, useState, useEffect, useRef, useCallback } from 'react';
import { RiTwitterXFill } from 'react-icons/ri';
import { FaInstagram, FaLinkedin, FaDribbble, FaGithub } from 'react-icons/fa';

interface FooterStar {
  id: number;
  x: number;
  y: number;
}

function StarPopVideo({ star }: { star: FooterStar }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 5.0;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: star.x - 75,
        top: star.y - 75,
        width: '150px',
        height: '150px',
      }}
    >
      <video
        ref={videoRef}
        playsInline
        muted
        preload="auto"
        style={{ mixBlendMode: 'screen', opacity: 0.95 }}
        className="w-full h-full"
      >
        <source src="/videos/star-pop.webm" type="video/webm" />
        <source src="/videos/star-pop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

const Footer = memo(function Footer() {
  const [stars, setStars] = useState<FooterStar[]>([]);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const nextId = useRef(0);

  const spawnStars = useCallback(() => {
    if (!emailRef.current) return;
    const rect = emailRef.current.getBoundingClientRect();
    const newStars: FooterStar[] = [];
    const count = 3;
    for (let i = 0; i < count; i++) {
      newStars.push({
        id: nextId.current++,
        x: rect.left + ((i + 0.5) / count) * rect.width,
        y: rect.top + rect.height / 2,
      });
    }
    setStars(newStars);
    setTimeout(() => setStars([]), 800);
  }, []);

  useEffect(() => {
    const handler = () => spawnStars();
    window.addEventListener('footer-star-burst', handler);
    return () => window.removeEventListener('footer-star-burst', handler);
  }, [spawnStars]);

  return (
    <footer id="contact" className="py-20 mt-0 bg-black text-white rounded-tl-[60px] rounded-tr-[60px] sm:rounded-tl-[100px] sm:rounded-tr-[100px] md:rounded-tl-[150px] md:rounded-tr-[150px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Let's talk section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-medium mb-8 flex items-center justify-center gap-4">
            <span className="text-3xl sm:text-4xl">✦</span>
            Let&apos;s talk!
            <span className="text-3xl sm:text-4xl">✦</span>
          </h2>
          <a
            ref={emailRef}
            href="mailto:carolhsiaostudio@gmail.com"
            className="relative inline-block text-base sm:text-2xl md:text-3xl lg:text-4xl font-cinzel font-normal hover:opacity-70 transition-opacity break-all px-2 sm:px-0"
          >
            carolhsiaostudio@gmail.com
          </a>
        </div>

        {/* Star pop videos */}
        <div className="fixed inset-0 pointer-events-none z-100">
          {stars.map((star) => (
            <StarPopVideo key={star.id} star={star} />
          ))}
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-8 sm:gap-10 md:gap-12 mb-20 flex-wrap">
          <a
            href="https://x.com/CarolXiaoo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 hover:scale-110 transition-all duration-300"
            aria-label="X (Twitter)"
          >
            <RiTwitterXFill className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </a>
          <a
            href="https://www.instagram.com/itscarolstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 hover:scale-110 transition-all duration-300"
            aria-label="Instagram"
          >
            <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </a>
          <a
            href="https://www.linkedin.com/in/carol-hsiao-5779a1158/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 hover:scale-110 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </a>
          <a
            href="https://dribbble.com/carolhsiao"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 hover:scale-110 transition-all duration-300"
            aria-label="Dribbble"
          >
            <FaDribbble className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </a>
          <a
            href="https://github.com/carolhsiaoo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 hover:scale-110 transition-all duration-300"
            aria-label="GitHub"
          >
            <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </a>
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-center text-xs sm:text-sm lg:text-base font-inter font-normal border-t border-[#252423] pt-8">
          <div>Made with nuts 🌰 by Carol.</div>
          <div className="text-right">© 2026 All rights reserved</div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
