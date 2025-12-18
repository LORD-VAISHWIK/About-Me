import { useEffect, useRef, useState } from 'react';
import { Menu, X, Github } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const lastFocusRef = useRef(null);

  useEffect(() => {
    // Keep body scroll in sync even if user navigates by other means
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (!isOpen) return;
      setIsOpen(false);
      if (lastFocusRef.current && typeof lastFocusRef.current.focus === 'function') {
        lastFocusRef.current.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((v) => {
      const next = !v;
      if (next) lastFocusRef.current = document.activeElement;
      return next;
    });
  };

  return (
    <header>
      <nav className="fixed w-full z-50 glass top-0 transition-all duration-300 border-b border-white/5 pt-[env(safe-area-inset-top)]" id="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="https://www.instagram.com/yagnarshivaishwik/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20 bg-white flex items-center justify-center p-1">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 30 H45 V50 H55 V30 H70 V55 H55 V75 H45 V55 H30 V30 Z" fill="#3b82f6" />
                <rect x="25" y="35" width="15" height="15" fill="#3b82f6" rx="2"/>
                <rect x="60" y="35" width="15" height="15" fill="#3b82f6" rx="2"/>
                <rect x="35" y="50" width="15" height="15" fill="#3b82f6" rx="2"/>
                <rect x="50" y="50" width="15" height="15" fill="#3b82f6" rx="2"/>
                <rect x="42.5" y="65" width="15" height="15" fill="#3b82f6" rx="2"/>
              </svg>
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 group-hover:to-white transition-all text-sm sm:text-base font-bold">
              Vaishwik
              <span className="hidden sm:inline text-secondary font-normal text-xs uppercase tracking-widest opacity-70 ml-2">| Entrepreneur</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-3 text-sm font-medium">
            {['Projects', 'Experience', 'Skills', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 bg-white/5 border border-white/5 backdrop-blur-md rounded-full font-medium hover:bg-white/10 hover:border-white/10 transition-all text-slate-300 hover:text-white">
                {item}
              </a>
            ))}
            <a href="https://github.com/LORD-VAISHWIK" target="_blank" rel="noopener noreferrer" className="ml-2 px-5 py-2 bg-gradient-to-r from-slate-800 to-black border border-white/10 rounded-full font-semibold hover:border-blue-500/30 transition-all flex items-center gap-2 text-white shadow-lg hover:shadow-blue-500/20 group">
              <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" /> GitHub
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden text-white p-3 rounded-full min-h-[2.75rem] min-w-[2.75rem]"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-transform duration-300 lg:hidden flex flex-col items-center justify-center space-y-6 text-xl px-6 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {['Projects', 'Experience', 'Skills', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-secondary hover:text-white w-full max-w-sm px-8 py-3 rounded-full flex items-center justify-center bg-white/5 border border-white/10" onClick={toggleMenu}>
            {item}
          </a>
        ))}
        <a href="https://github.com/LORD-VAISHWIK" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white w-full max-w-sm px-8 py-3 rounded-full flex items-center justify-center gap-2 bg-white/5 border border-white/10">
          <Github className="w-5 h-5" /> GitHub
        </a>
      </div>
    </header>
  );
};

export default Navbar;

