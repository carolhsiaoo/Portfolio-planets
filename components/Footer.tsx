import { memo } from 'react';

const Footer = memo(function Footer() {
  return (
    <footer className="py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center text-xs sm:text-sm lg:text-base">
        <div>Made with nuts 🌰 by Carol Hsiao.</div>
        <div className="text-right">© 2025 All rights reserved</div>
      </div>
    </footer>
  );
});

export default Footer;
