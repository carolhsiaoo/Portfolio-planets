export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#faf8f5]/90 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">✦</span>
          <span className="font-medium text-sm tracking-wide">CAROL HSIAO</span>
        </div>

        <nav className="flex gap-10">
          <a href="#work" className="text-xs font-medium tracking-wider hover:opacity-60 transition-opacity">
            WORK
          </a>
          <a href="#about" className="text-xs font-medium tracking-wider hover:opacity-60 transition-opacity">
            ABOUT
          </a>
          <a href="#contact" className="text-xs font-medium tracking-wider hover:opacity-60 transition-opacity">
            CONTACT
          </a>
        </nav>
      </div>
    </header>
  );
}
