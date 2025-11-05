import { useState, useEffect } from 'react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/98 backdrop-blur-md border-b border-[#ff6600]/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
      {/* Subtle animated line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff6600] to-transparent opacity-30" />
      
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-3 md:py-4 flex justify-between items-center relative z-10">
        <div className="h-9 md:h-11">
          <div className="h-full flex items-center gap-3">
            {/* Racing number badge */}
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#ff6600] to-[#ff8800] flex items-center justify-center">
              <span className="text-black font-black text-[0.9em] md:text-[1.1em]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>88</span>
            </div>
            <span className="text-white tracking-[0.15em] font-black text-[0.7em] md:text-base">JMS MOTORSPORT</span>
          </div>
        </div>
        <ul className="flex gap-3 md:gap-6 lg:gap-8 list-none">
          {[
            { label: 'HOME', id: 'home' },
            { label: 'ABOUT', id: 'about' },
            { label: 'DRIVERS', id: 'drivers' },
            { label: 'SCHEDULE', id: 'schedule' },
            { label: 'PARTNERS', id: 'partners' },
            { label: 'STORE', id: 'store' },
            { label: 'CONTACT', id: 'contact' },
          ].map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="text-[#999] text-[0.6em] md:text-[0.7em] lg:text-[0.8em] tracking-[0.15em] transition-all duration-300 hover:text-[#ff6600] relative group font-black"
              >
                {item.label}
                <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-gradient-to-r from-[#ff6600] to-[#ff8800] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(255,102,0,0.6)]" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
