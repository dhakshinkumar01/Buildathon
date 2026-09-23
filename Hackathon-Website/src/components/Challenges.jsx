import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight } from 'lucide-react';
import scrollToSection from '../utils/scrollToSection';
import { CHALLENGES } from '../data/challenges';
import usePresence from '../hooks/usePresence';
import Reveal from './Reveal';
import FadeImage from './FadeImage';

// Loaded on first use; App.jsx preloads it when the browser is idle.
const ChallengeModal = lazy(() => import('./ChallengeModal'));

const TOTAL_PROBLEMS = CHALLENGES.reduce((sum, c) => sum + c.problemStatements.length, 0);

// Flat list of every statement with its domain (used to resolve deep links like #challenges/AG-01).
const ALL_STATEMENTS = CHALLENGES.flatMap((domain) =>
  domain.problemStatements.map((p) => ({ ...p, domain }))
);

// Deep links: #challenges/AG-01 opens that statement, #challenges/domain-03 opens a domain.
function parseHash() {
  const match = window.location.hash.match(/^#challenges\/(.+)$/i);
  if (!match) return null;

  let key;
  try {
    key = decodeURIComponent(match[1]).toUpperCase();
  } catch {
    return null;
  }

  const domainMatch = key.match(/^DOMAIN-(\d+)$/);
  if (domainMatch) {
    const domain = CHALLENGES.find((c) => c.id === domainMatch[1].padStart(2, '0'));
    return domain ? { domainId: domain.id, code: null } : null;
  }

  const statement = ALL_STATEMENTS.find((p) => p.code === key);
  return statement ? { domainId: statement.domain.id, code: statement.code } : null;
}

function writeHash(hash) {
  try {
    window.history.replaceState(null, '', hash);
  } catch {
    // ignore (e.g. sandboxed frames)
  }
}

export default function Challenges() {
  const [open, setOpen] = useState(null); // { domainId, code } | null

  // True when the popup was opened by a shared link rather than by a click on this page.
  const openedFromLink = useRef(false);

  // Open the popup from the URL on load and on back/forward.
  useEffect(() => {
    const sync = () => {
      const target = parseHash();
      if (target) openedFromLink.current = true;
      setOpen(target);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const openDomain = (domainId, code = null) => {
    setOpen({ domainId, code });
    writeHash(code ? `#challenges/${code}` : `#challenges/domain-${domainId}`);
  };

  const closeModal = () => {
    setOpen(null);
    writeHash('#challenges');
    // A shared link opens over the top of the page, so bring the section into view behind it.
    if (openedFromLink.current) {
      openedFromLink.current = false;
      scrollToSection('challenges');
    }
  };

  // Keep showing the last opened domain while the popup plays its closing animation.
  const [lastOpen, setLastOpen] = useState(open);
  if (open && open !== lastOpen) setLastOpen(open);
  const { mounted, closing } = usePresence(open !== null);
  const shown = open ?? lastOpen;
  const openDomainData = mounted && shown ? CHALLENGES.find((c) => c.id === shown.domainId) : null;

  return (
    <section id="challenges" className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto scroll-mt-24 relative">
      {/* Indicator Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
        <span className="text-xs font-mono font-bold tracking-widest text-zinc-500">
          {'// challenge_domains'}
        </span>
      </div>

      <div className="mb-10">
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-950 uppercase tracking-tight mb-4">
          DOMAIN
        </h2>
        <p className="text-base sm:text-lg text-zinc-500 max-w-2xl">
          {CHALLENGES.length} domains, {TOTAL_PROBLEMS} problem statements. Open a domain to read the full statements
          and the skills each one needs.
        </p>
        <p className="mt-3 font-mono text-xs text-zinc-500 max-w-2xl">
          {'// no datasets are provided: use public datasets, APIs or your own synthetic data. Choose any tech stack.'}
        </p>
      </div>

      {/* Domain cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CHALLENGES.map((item, idx) => (
          <Reveal key={item.id} className="h-full" delay={(idx % 3) * 90}>
          <div
            role="button"
            tabIndex={0}
            aria-label={`Open ${item.title}`}
            onClick={() => openDomain(item.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openDomain(item.id);
              }
            }}
            className="card-brutal group h-full bg-white rounded-3xl overflow-hidden cursor-pointer flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
          >
            {/* The artwork already carries the domain title, so no second heading is shown */}
            <div className="relative aspect-[333/211] border-b-2 border-zinc-950 bg-zinc-100 overflow-hidden">
              <FadeImage
                src={item.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
              />
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-zinc-950 text-[#ffd000] font-mono text-[10px] font-bold tracking-wider">
                {`// domain_${item.id}`}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <h3 className="sr-only">{item.title}</h3>
              <span className="self-start text-[10px] font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-300 uppercase">
                {item.tag}
              </span>

              <p className="mt-3 text-sm text-zinc-600 leading-relaxed">{item.desc}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.problemStatements.map((p) => (
                  <span
                    key={p.code}
                    className="px-2 py-0.5 rounded-md bg-zinc-100 group-hover:bg-[#ffd000] border border-zinc-300 group-hover:border-zinc-950 text-zinc-700 group-hover:text-zinc-950 font-mono text-[10px] font-bold transition-colors"
                  >
                    {p.code}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-5">
                <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-xs font-mono font-bold text-zinc-950">
                  <span>OPEN DOMAIN</span>
                  <span className="inline-flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#ffd000] border border-zinc-950 text-[10px]">
                      {item.problemStatements.length} PROBLEMS
                    </span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          </Reveal>
        ))}
      </div>

      {/* Rendered on <body>: this section sits inside the scroll-reveal wrapper, which is invisible
          (and a containing block for fixed elements) until revealed, e.g. when opening a shared link. */}
      {openDomainData &&
        createPortal(
          <Suspense fallback={null}>
            <ChallengeModal
              domain={openDomainData}
              domains={CHALLENGES}
              expandCode={shown.code}
              closing={closing}
              onNavigate={openDomain}
              onClose={closeModal}
            />
          </Suspense>,
          document.body
        )}
    </section>
  );
}
