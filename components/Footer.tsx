import { memo } from 'react';
import { RiTwitterXFill } from 'react-icons/ri';
import { FaInstagram, FaLinkedin, FaDribbble, FaGithub } from 'react-icons/fa';

const Footer = memo(function Footer() {
  return (
    <footer id="contact" className="py-20 mt-20 bg-black text-white rounded-tl-[150px] rounded-tr-[150px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Let's talk section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-medium mb-8 flex items-center justify-center gap-4">
            <span className="text-3xl sm:text-4xl">✦</span>
            Let's talk!
            <span className="text-3xl sm:text-4xl">✦</span>
          </h2>
          <a
            href="mailto:carolhsiaostudio@gmail.com"
            className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-cinzel font-normal hover:opacity-70 transition-opacity break-all px-2 sm:px-0"
          >
            carolhsiaostudio@gmail.com
          </a>
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
        <div className="flex justify-between items-center text-xs sm:text-sm lg:text-base font-inter font-normal border-t border-gray-800 pt-8">
          <div>Made with nuts 🌰 by Carol.</div>
          <div className="text-right">© 2025 All rights reserved</div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
