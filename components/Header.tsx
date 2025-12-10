export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#faf8f5]/90 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-base sm:text-lg">✦</span>
          <span className="font-medium text-xs sm:text-sm tracking-wide">CAROL HSIAO</span>
        </div>

        <nav className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <a href="#work" className="text-[10px] sm:text-xs font-medium tracking-wider hover:opacity-60 transition-opacity">
            WORK
          </a>
          <a href="#about" className="text-[10px] sm:text-xs font-medium tracking-wider hover:opacity-60 transition-opacity">
            ABOUT
          </a>
          <a href="#contact" className="text-[10px] sm:text-xs font-medium tracking-wider hover:opacity-60 transition-opacity">
            CONTACT
          </a>
        </nav>
      </div>
    </header>
  );
}
