import { useState, useEffect, useRef } from 'react';
import { Search, X, Compass, ArrowRight } from 'lucide-react';
import { REGISTER_URL } from '../constants';
import scrollToSection from '../utils/scrollToSection';
import useDialogFocus from '../hooks/useDialogFocus';
import usePresence from '../hooks/usePresence';

const SEARCH_ITEMS = [
  { title: 'ABOUT BUILDATHON', category: 'ABOUT', sectionId: 'about' },
  { title: 'EVENT HIGHLIGHTS', category: 'HIGHLIGHTS', sectionId: 'highlights' },
  { title: 'DOMAIN 1 - AGENTIC AI & AUTOMATION', category: 'CHALLENGES', sectionId: 'challenges' },
  { title: 'DOMAIN 2 - SMART CITIES & URBAN INTELLIGENCE', category: 'CHALLENGES', sectionId: 'challenges' },
  { title: 'DOMAIN 3 - EDTECH & FUTURE OF LEARNING', category: 'CHALLENGES', sectionId: 'challenges' },
  { title: 'DOMAIN 4 - FINTECH & DIGITAL ECONOMY', category: 'CHALLENGES', sectionId: 'challenges' },
  { title: 'DOMAIN 5 - AGRITECH & FOODTECH', category: 'CHALLENGES', sectionId: 'challenges' },
  { title: 'VENUE, MAP & EVENT DATES', category: 'DETAILS', sectionId: 'details' },
  { title: 'THE JOURNEY TIMELINE', category: 'TIMELINE', sectionId: 'timeline' },
  { title: 'RULES & FAQ', category: 'RULES', sectionId: 'rules' },
  { title: 'DOWNLOAD PPT TEMPLATE', category: 'DOWNLOADS', sectionId: 'rules' },
  { title: 'CASH PRIZES (₹25,000)', category: 'PRIZES', sectionId: 'prizes' },
  { title: 'SPONSORS & ORGANISER', category: 'SPONSORS', sectionId: 'sponsors' },
  { title: 'REGISTER NOW', category: 'REGISTER', sectionId: 'register' }
];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const { mounted, closing } = usePresence(isOpen);

  // Scroll lock and focus stay in place until the closing animation finishes
  useDialogFocus(dialogRef, mounted);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const q = query.trim().toLowerCase();
  const filtered = SEARCH_ITEMS.filter(
    (item) => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
  );

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  const handleSelect = (id) => {
    if (id === 'register') {
      window.open(REGISTER_URL, '_blank', 'noopener,noreferrer');
    } else {
      scrollToSection(id);
    }
    handleClose();
  };

  const focusResult = (index) => {
    const nodes = listRef.current ? listRef.current.querySelectorAll('button[data-result]') : [];
    if (nodes[index]) nodes[index].focus();
  };

  const onInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusResult(0);
    } else if (e.key === 'Enter' && filtered[0]) {
      e.preventDefault();
      handleSelect(filtered[0].sectionId);
    }
  };

  const onResultKeyDown = (e, index) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusResult(index + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index === 0 && inputRef.current) inputRef.current.focus();
      else focusResult(index - 1);
    }
  };

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      className={`fixed inset-0 z-[80] flex items-start justify-center pt-20 px-4 bg-zinc-950/70 outline-none ${closing ? 'animate-fadeOut pointer-events-none' : 'animate-fadeIn'
        }`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search the site"
    >
      <div
        className={`relative w-full max-w-2xl bg-white border-2 border-zinc-950 rounded-[28px] shadow-[8px_8px_0_#ffd000] p-6 overflow-hidden ${closing ? 'animate-popOut' : 'animate-popIn'
          }`}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Search Input Bar */}
        <div className="relative flex items-center mb-4">
          <Search className="w-5 h-5 text-zinc-400 absolute left-4" />
          <input
            ref={inputRef}
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Search challenges, prizes, timeline, venue..."
            aria-label="Search"
            className="w-full bg-[#f7f7f8] border border-zinc-200 focus:border-zinc-950 rounded-2xl pl-12 pr-12 py-3.5 text-base text-zinc-900 outline-none font-sans"
          />
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close search"
            className="absolute right-3.5 w-8 h-8 rounded-full bg-zinc-200 hover:bg-zinc-300 flex items-center justify-center text-zinc-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-80 overflow-y-auto overscroll-contain space-y-1.5 pr-1">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <button
                type="button"
                data-result
                key={item.title}
                onClick={() => handleSelect(item.sectionId)}
                onKeyDown={(e) => onResultKeyDown(e, idx)}
                className="group w-full text-left flex items-center justify-between p-3.5 rounded-2xl bg-[#fcfcfd] hover:bg-zinc-950 hover:text-white focus-visible:bg-zinc-950 focus-visible:text-white border border-black/5 transition-colors cursor-pointer outline-none"
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-zinc-400 group-hover:text-white group-focus-visible:text-white transition-colors shrink-0" />
                  <span className="font-mono text-sm font-semibold uppercase">{item.title}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 group-hover:bg-zinc-800 group-focus-visible:bg-zinc-800 text-zinc-600 group-hover:text-zinc-300 group-focus-visible:text-zinc-300">
                    {item.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-focus-visible:text-white transition-colors" />
                </div>
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-xs font-mono text-zinc-500">
              No matching sections found.
            </div>
          )}
        </div>

        <p className="mt-4 hidden sm:block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
          ↑ ↓ to move · Enter to open · Esc to close
        </p>

      </div>
    </div>
  );
}
