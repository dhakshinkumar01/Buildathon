import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Search } from 'lucide-react';
import velsLogo from '../assets/vels-logo.webp';
import logoIcon from '../assets/logo-icon.webp';
import { REGISTER_URL } from '../constants';
import useActiveSection from '../hooks/useActiveSection';
import usePresence from '../hooks/usePresence';
import scrollToSection from '../utils/scrollToSection';

// Keep in page order: the active-section highlight relies on it.
const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'about', label: 'About' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'rules', label: 'Rules' },
  { id: 'prizes', label: 'Prizes' },
  { id: 'sponsors', label: 'Sponsors' }
];

const NAV_IDS = NAV_LINKS.map((l) => l.id);

// Full link row from `xl` up; hamburger menu below it, so there is never a width with neither.
export default function Navbar({ onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(NAV_IDS, 200);
  const { mounted: drawerMounted, closing: drawerClosing } = usePresence(mobileMenuOpen);

  // Close the drawer with Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const goTo = (id) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-4">
      <nav
        aria-label="Main"
        className="max-w-7xl mx-auto rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between bg-white border-2 border-zinc-950"
      >

        {/* Left: Brand Identity with BUILDATHON + Vertical Divider + VELS Logo */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              goTo('hero');
            }}
            className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer"
          >
            <img
              src={logoIcon}
              alt=""
              width={40}
              height={40}
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-sm sm:text-base tracking-tight text-zinc-950 uppercase leading-none">
                BUILDATHON
              </span>
              <span className="font-grotesk text-[8px] sm:text-[9px] text-zinc-500 font-semibold tracking-wider uppercase mt-0.5 hidden min-[420px]:block">
                Future Forge
              </span>
            </div>
          </a>

          {/* Thin Vertical Divider */}
          <div className="h-6 sm:h-7 w-[1px] bg-zinc-300 mx-0.5 sm:mx-1 shrink-0" />

          {/* VELS Logo */}
          <a
            href="https://vistas.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            title="VELS Institute of Science, Technology & Advanced Studies (VISTAS)"
            className="flex items-center shrink-0 hover:opacity-90 transition-opacity"
          >
            <img
              src={velsLogo}
              alt="VELS University Logo"
              width={191}
              height={197}
              className="h-[32px] sm:h-[44px] w-auto object-contain shrink-0"
            />
          </a>
        </div>

        {/* Center: Desktop Navigation Links (xl and up) */}
        <div className="hidden xl:flex items-center gap-1 font-grotesk">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => goTo(link.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer font-grotesk text-[16px] leading-[1.4] tracking-normal ${
                  isActive
                    ? 'bg-[#ffd000] text-zinc-950 font-bold'
                    : 'text-zinc-600 font-semibold hover:bg-zinc-100 hover:text-zinc-950'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right: Search, Register and (below xl) the menu button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search (Ctrl+K)"
            title="Search (Ctrl+K)"
            className="w-9 h-9 rounded-full bg-white hover:bg-[#ffd000] border-2 border-zinc-950 flex items-center justify-center text-zinc-950 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#ffd000] hover:bg-[#f2c400] text-zinc-950 border-2 border-zinc-950 shadow-[3px_3px_0_#0c0c0e] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#0c0c0e] font-grotesk text-[15px] font-bold leading-[1.4] tracking-normal px-5 py-2 rounded-full transition-[translate,box-shadow,background-color] cursor-pointer"
          >
            <span>Register</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className="xl:hidden w-9 h-9 rounded-full bg-white hover:bg-[#ffd000] border-2 border-zinc-950 flex items-center justify-center text-zinc-950 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Drawer Menu (below xl) */}
      {drawerMounted && (
        <div
          id="mobile-menu"
          className={`xl:hidden mt-3 max-w-7xl mx-auto bg-white border-2 border-zinc-950 rounded-3xl p-6 shadow-[6px_6px_0_#0c0c0e] space-y-4 ${
            drawerClosing ? 'animate-slideUp pointer-events-none' : 'animate-slideDown'
          }`}
        >
          <div className="flex flex-col space-y-3 font-grotesk text-zinc-800">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => goTo(link.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`text-left py-2 px-3 rounded-md uppercase font-grotesk text-[15px] leading-[1.4] tracking-normal ${
                    isActive
                      ? 'bg-[#ffd000] text-zinc-950 font-bold'
                      : 'text-zinc-800 font-semibold hover:bg-zinc-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col space-y-3">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#ffd000] hover:bg-[#f2c400] text-zinc-950 border-2 border-zinc-950 shadow-[3px_3px_0_#0c0c0e] font-grotesk text-[15px] font-bold leading-[1.4] tracking-normal py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors"
            >
              <span>Register</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
