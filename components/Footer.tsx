import { memo } from 'react';

const Footer = memo(function Footer() {
  return (
    <footer className="py-10 px-8 mt-20">
      <div className="max-w-6xl mx-auto flex justify-between items-center text-xs sm:text-sm lg:text-base">
        <div>Made with nuts 🌰 by Carol Hsiao.</div>
        <div>© 2025 All rights reserved</div>
      </div>
    </footer>
  );
});

export default Footer;
