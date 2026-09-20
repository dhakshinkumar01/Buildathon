import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MuseumHUD from './components/MuseumHUD';
import Hero from './components/Hero';
import EventStats from './components/EventStats';
import PartnersPreview from './components/PartnersPreview';
import About from './components/About';
import EventHighlights from './components/EventHighlights';
import Challenges from './components/Challenges';
import EventDetails from './components/EventDetails';
import Timeline from './components/Timeline';
import Prizes from './components/Prizes';
import Sponsors from './components/Sponsors';
import SearchModal from './components/LazySearchModal';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Ticker from './components/Ticker';
import Rules from './components/Rules';
import ScrollProgress from './components/ScrollProgress';
import Reveal from './components/Reveal';
import StickyRegister from './components/StickyRegister';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Fetch the popups' code when the browser is idle, so the first open is instant
  useEffect(() => {
    const preload = () => {
      SearchModal.preload();
      import('./components/EventScheduleModal');
      import('./components/ChallengeModal');
    };
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(preload, { timeout: 5000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(preload, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Ctrl/⌘ + K opens search from anywhere
  useEffect(() => {
    const onKeyDown = (e) => {
      // (browser autofill can fire keydown without a `key`)
      if ((e.ctrlKey || e.metaKey) && (e.key || '').toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-950 selection:bg-[#ffd000] selection:text-zinc-950 font-sans antialiased overflow-x-clip">
      {/* Lets keyboard users jump past the header */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-zinc-950 focus:text-[#ffd000] focus:font-mono focus:text-xs focus:font-bold focus:uppercase focus:px-4 focus:py-3 focus:rounded-full"
      >
        Skip to main content
      </a>

      <ScrollProgress />
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Floating section index */}
      <MuseumHUD />

      <main id="main" tabIndex={-1} className="space-y-4 outline-none">
        <Hero />
        <Ticker />
        <Reveal><EventStats /></Reveal>
        <Reveal><PartnersPreview /></Reveal>
        <Reveal><Challenges /></Reveal>
        <Reveal><About /></Reveal>
        <Reveal><EventDetails /></Reveal>
        <Reveal><EventHighlights /></Reveal>
        <Reveal><Timeline /></Reveal>
        <Reveal><Rules /></Reveal>
        <Reveal><Prizes /></Reveal>
        <Reveal><Sponsors /></Reveal>
        <Reveal><FinalCTA /></Reveal>
      </main>

      <Footer />

      <StickyRegister />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}

export default App;
