import { memo } from 'react';

const Footer = memo(function Footer() {
  return (
    <footer className="py-20 mt-20 bg-black text-white rounded-tl-[150px] rounded-tr-[150px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Let's talk section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 flex items-center justify-center gap-4">
            <span className="text-3xl sm:text-4xl">✦</span>
            Let's talk!
            <span className="text-3xl sm:text-4xl">✦</span>
          </h2>
          <a
            href="mailto:hello@carolhsiao.com"
            className="text-2xl sm:text-3xl md:text-4xl hover:opacity-70 transition-opacity"
          >
            hello@carolhsiao.com
          </a>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-6 sm:gap-8 md:gap-12 mb-20 flex-wrap text-sm sm:text-base md:text-lg">
          <a
            href="https://twitter.com/carolhsiao"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            X
          </a>
          <a
            href="https://instagram.com/carolhsiao"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            INSTAGRAM
          </a>
          <a
            href="https://linkedin.com/in/carolhsiao"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            LINKEDIN
          </a>
          <a
            href="https://dribbble.com/carolhsiao"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            DRIBBBLE
          </a>
          <a
            href="https://github.com/carolhsiao"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            GITHUB
          </a>
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-center text-xs sm:text-sm lg:text-base border-t border-gray-800 pt-8">
          <div>Made with nuts 🌰 by Carol Hsiao.</div>
          <div className="text-right">© 2025 All rights reserved</div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
