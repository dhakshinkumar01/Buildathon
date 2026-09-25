import { useEffect, useRef, useState } from 'react';
import {
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Link2,
  ArrowRight,
  ShieldAlert,
  FileText,
  Target,
  Layers
} from 'lucide-react';
import { REGISTER_URL } from '../constants';
import copyText from '../utils/copyText';
import prefersReducedMotion from '../hooks/useReducedMotion';
import Collapse from './Collapse';

const FOCUSABLE = 'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])';

const slugOf = (domain) => domain.short.toLowerCase().replace(/\s+/g, '-');

// Terminal-styled popup for one challenge domain: overview, key areas and
// collapsible problem statements, with prev/next domain navigation.
export default function ChallengeModal({ domain, domains, expandCode, closing = false, onNavigate, onClose }) {
  const [selectedTrack, setSelectedTrack] = useState(() => {
    if (expandCode) {
      if (expandCode.startsWith('IOT')) return 'iot';
      if (expandCode.startsWith('EMB')) return 'embedded';
    }
    return null;
  });
  const [expanded, setExpanded] = useState(() => new Set(expandCode ? [expandCode] : []));
  const [copied, setCopied] = useState(null);

  // When the domain (or deep-linked statement) changes, reset the open rows. Done while rendering
  // (React's recommended way to reset state from props) instead of in an effect.
  const stateKey = `${domain.id}|${expandCode || ''}`;
  const [lastStateKey, setLastStateKey] = useState(stateKey);
  if (stateKey !== lastStateKey) {
    setLastStateKey(stateKey);
    setExpanded(new Set(expandCode ? [expandCode] : []));
    setSelectedTrack(expandCode ? (expandCode.startsWith('IOT') ? 'iot' : expandCode.startsWith('EMB') ? 'embedded' : null) : null);
  }
  const dialogRef = useRef(null);
  const bodyRef = useRef(null);
  const copyTimer = useRef(null);

  const index = domains.findIndex((d) => d.id === domain.id);
  const prev = domains[(index - 1 + domains.length) % domains.length];
  const next = domains[(index + 1) % domains.length];

  const activeTrackObj = domain.hasTracks && selectedTrack ? domain.tracks.find((t) => t.id === selectedTrack) : null;
  const statements = activeTrackObj ? activeTrackObj.problemStatements : domain.problemStatements;
  const allOpen = expanded.size === statements.length;

  // Lock page scroll, move focus into the dialog, and restore both on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      clearTimeout(copyTimer.current);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus();
    };
  }, []);

  // When the domain (or deep-linked statement) changes, reset the scroll position and scroll to the statement.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
    if (!expandCode) return undefined;

    const timer = setTimeout(() => {
      document.getElementById(`ps-${expandCode}`)?.scrollIntoView({
        block: 'center',
        behavior: prefersReducedMotion() ? 'instant' : 'smooth'
      });
    }, 80);
    return () => clearTimeout(timer);
  }, [domain.id, expandCode]);

  // Keyboard: Esc closes, arrows change domain, Tab stays inside the dialog.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (closing) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      const tag = e.target && e.target.tagName;
      if (e.key === 'ArrowLeft' && tag !== 'INPUT' && tag !== 'TEXTAREA') onNavigate(prev.id);
      if (e.key === 'ArrowRight' && tag !== 'INPUT' && tag !== 'TEXTAREA') onNavigate(next.id);

      if (e.key === 'Tab' && dialogRef.current) {
        const nodes = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE));
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || active === dialogRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closing, onClose, onNavigate, prev.id, next.id]);

  const toggle = (code) =>
    setExpanded((current) => {
      const updated = new Set(current);
      if (updated.has(code)) updated.delete(code);
      else updated.add(code);
      return updated;
    });

  const toggleAll = () => setExpanded(allOpen ? new Set() : new Set(statements.map((p) => p.code)));

  const copy = async (key, text) => {
    const ok = await copyText(text);
    setCopied(ok ? key : `${key}:error`);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(null), 1600);
  };

  // Format copied by COPY ID & TITLE (e.g. AG01: The Agent That Proves It Did the Right Thing)
  const idAndTitle = (p) => `${p.code}: ${p.title}`;

  const linkTo = (p) => `${window.location.origin}${window.location.pathname}#challenges/${p.code}`;

  const label = (key, idle, done) => {
    if (copied === key) return done;
    if (copied === `${key}:error`) return 'COPY FAILED';
    return idle;
  };

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-stretch sm:items-center justify-center p-0 sm:p-6 bg-black/70 ${
        closing ? 'animate-fadeOut pointer-events-none' : 'animate-fadeIn'
      }`}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="challenge-modal-title"
        onClick={(e) => e.stopPropagation()}
        className={`w-full sm:max-w-4xl h-full sm:h-auto sm:max-h-[90vh] bg-white sm:rounded-[28px] sm:border-2 border-zinc-950 sm:shadow-[8px_8px_0_#ffd000] flex flex-col overflow-hidden outline-none ${
          closing ? 'animate-popOut' : 'animate-popIn'
        }`}
      >
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-4 sm:px-5 py-3 bg-zinc-950 text-zinc-100 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ff3b30]" />
          <span className="w-3 h-3 rounded-full bg-[#ffd000]" />
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="ml-2 font-mono text-xs text-zinc-400 truncate">
            {`~/challenges/${slugOf(domain)}.md`}
          </span>
          <span className="ml-auto font-mono text-xs text-[#ffd000] shrink-0" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}/{String(domains.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-2 w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-200 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div ref={bodyRef} className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-8 space-y-8 text-zinc-900">
          {domain.hasTracks && selectedTrack === null ? (
            /* Track Selection View for Combined Domain */
            <div className="space-y-8 py-2">
              <div className="text-center max-w-xl mx-auto">
                <span className="inline-block px-3 py-1 rounded-full bg-[#ffd000] border-2 border-zinc-950 font-mono text-[11px] font-extrabold uppercase tracking-wider text-zinc-950 mb-3 shadow-[2px_2px_0_#0c0c0e]">
                  {`// domain_${domain.id} · COMBINED DOMAIN`}
                </span>
                <h2
                  id="challenge-modal-title"
                  className="font-heading text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-zinc-950"
                >
                  IOT &amp; EMBEDDED SYSTEMS
                </h2>
                <p className="mt-2 text-sm sm:text-base text-zinc-600 font-sans font-medium">
                  Choose a track to explore problem statements
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
                {domain.tracks.map((track, trackIdx) => (
                  <div
                    key={track.id}
                    className="bg-white border-2 border-zinc-950 rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0_#ffd000] hover:shadow-[8px_8px_0_#0c0c0e] hover:-translate-y-1 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Visual Graphic inside track option card */}
                      <div className="w-full aspect-[16/9] mb-5 rounded-xl border-2 border-zinc-950 bg-zinc-950 p-4 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffd000_1px,transparent_1px)] [background-size:12px_12px]" />
                        {track.id === 'iot' ? (
                          <div className="relative z-10 text-center flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-xl bg-[#ffd000] border-2 border-zinc-950 flex items-center justify-center text-zinc-950 shadow-[3px_3px_0_#ffffff]">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                              </svg>
                            </div>
                            <span className="font-mono text-[10px] font-bold text-[#ffd000] tracking-widest uppercase">
                              SENSORS • GATEWAYS • CLOUD
                            </span>
                          </div>
                        ) : (
                          <div className="relative z-10 text-center flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-xl bg-[#ffd000] border-2 border-zinc-950 flex items-center justify-center text-zinc-950 shadow-[3px_3px_0_#ffffff]">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                              </svg>
                            </div>
                            <span className="font-mono text-[10px] font-bold text-[#ffd000] tracking-widest uppercase">
                              MCU • FIRMWARE • REAL-TIME
                            </span>
                          </div>
                        )}
                      </div>

                      <span className="font-mono text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-300 text-zinc-700 uppercase block w-fit mb-3">
                        OPTION {trackIdx + 1}
                      </span>

                      <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-zinc-950 uppercase tracking-tight mb-2">
                        {track.title}
                      </h3>

                      <p className="text-sm text-zinc-600 leading-relaxed font-sans mb-6">
                        {track.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedTrack(track.id)}
                      className="w-full inline-flex items-center justify-between bg-zinc-950 group-hover:bg-[#ffd000] text-white group-hover:text-zinc-950 border-2 border-zinc-950 font-mono text-xs sm:text-sm font-extrabold uppercase px-5 py-3 rounded-xl transition-colors cursor-pointer shadow-[3px_3px_0_#0c0c0e]"
                    >
                      <span>{track.buttonText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {domain.hasTracks && activeTrackObj && (
                <div className="flex items-center justify-between bg-zinc-100 border-2 border-zinc-950 rounded-2xl p-4 shadow-[4px_4px_0_#0c0c0e]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-zinc-600">SELECTED TRACK:</span>
                    <span className="px-3 py-1 rounded-lg bg-[#ffd000] border-2 border-zinc-950 font-mono text-xs font-extrabold text-zinc-950">
                      {activeTrackObj.title}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedTrack(null)}
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold text-zinc-950 hover:text-amber-600 underline cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>CHANGE TRACK</span>
                  </button>
                </div>
              )}

              {/* Header */}
              <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
            <div className="w-full sm:w-56 aspect-[333/211] rounded-2xl overflow-hidden border-2 border-zinc-950 shadow-[4px_4px_0_#0c0c0e] shrink-0 bg-zinc-100">
              <img src={domain.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
                {`// domain_${domain.id} · ${domain.tag}`}
              </span>
              <h2
                id="challenge-modal-title"
                className="font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-zinc-950 leading-tight"
              >
                {domain.title}
              </h2>
              <p className="mt-2 font-mono text-xs text-zinc-500">
                {`${statements.length} problem statements`}
              </p>
            </div>
          </div>

          {/* Special note for the health domain */}
          {domain.isDecisionSupportOnly && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-bold text-amber-900 leading-snug">
                IMPORTANT: The system should be presented as DECISION SUPPORT, NOT as a medical diagnosis.
              </p>
            </div>
          )}

          {/* Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-zinc-700" />
                <span>ABOUT THE DOMAIN</span>
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed">{domain.about}</p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-zinc-700" />
                <span>REAL-WORLD FOCUS</span>
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed">{domain.realWorld}</p>
            </div>
          </div>

          <div className="bg-zinc-950 text-white rounded-2xl p-6 border-2 border-zinc-950">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#ffd000] uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>WHAT TO BUILD</span>
            </div>
            <p className="text-sm sm:text-base font-medium leading-relaxed text-zinc-200">{domain.whatToBuild}</p>
          </div>

          {/* Problem statements */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ffd000]" />
                <span className="font-mono text-xs font-extrabold text-zinc-600 uppercase tracking-widest">
                  {'// PROBLEM_STATEMENTS'}
                </span>
              </div>
              <button
                type="button"
                onClick={toggleAll}
                className="font-mono text-xs font-bold text-zinc-950 uppercase tracking-wider underline underline-offset-4 hover:text-amber-600 transition-colors cursor-pointer"
              >
                {allOpen ? 'COLLAPSE ALL' : 'EXPAND ALL'}
              </button>
            </div>

            <div className="space-y-4">
              {statements.map((p) => {
                const isOpen = expanded.has(p.code);
                const panelId = `ps-panel-${p.code}`;
                return (
                  <div
                    key={p.code}
                    id={`ps-${p.code}`}
                    className={`bg-white border-2 border-zinc-950 rounded-2xl scroll-mt-4 transition-all duration-200 ${
                      isOpen
                        ? 'shadow-[6px_6px_0_#ffd000]'
                        : 'shadow-[4px_4px_0_#0c0c0e] hover:shadow-[4px_4px_0_#ffd000]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(p.code)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 select-none group"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <span className="font-mono text-xs sm:text-sm font-extrabold px-3 py-1.5 bg-[#ffd000] text-zinc-950 rounded-lg border-2 border-zinc-950 shrink-0 shadow-[2px_2px_0_#0c0c0e]">
                          [{p.code}]
                        </span>
                        <span className="font-heading text-base sm:text-lg font-bold text-zinc-950 leading-snug group-hover:text-zinc-800">
                          {p.title}
                        </span>
                      </div>
                      <div className={`w-8 h-8 rounded-full border-2 border-zinc-950 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'bg-[#ffd000] rotate-180' : 'bg-zinc-100 group-hover:bg-[#ffd000]'}`}>
                        <ChevronDown className="w-5 h-5 text-zinc-950" />
                      </div>
                    </button>

                    <Collapse open={isOpen} id={panelId}>
                      <div className="px-4 sm:px-6 pb-5 sm:pb-6 border-t-2 border-zinc-950/10 pt-4 sm:pt-5 space-y-5">
                        <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-sans">
                          {p.desc}
                        </p>

                        {p.skills && p.skills.length > 0 && (
                          <div>
                            <span className="block font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2.5">
                              SKILLS NEEDED
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {p.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 rounded-full bg-zinc-100 border-2 border-zinc-950 text-zinc-900 font-mono text-xs font-semibold shadow-[2px_2px_0_#0c0c0e]"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="pt-2 flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => copy(`${p.code}:id`, idAndTitle(p))}
                            className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white border-2 border-zinc-950 font-mono text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition-all shadow-[3px_3px_0_#ffd000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                          >
                            {copied === `${p.code}:id` ? (
                              <Check className="w-4 h-4 text-[#ffd000]" />
                            ) : (
                              <Copy className="w-4 h-4 text-[#ffd000]" />
                            )}
                            <span>{label(`${p.code}:id`, 'COPY ID & TITLE', 'COPIED')}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => copy(`${p.code}:link`, linkTo(p))}
                            className="inline-flex items-center gap-2 bg-white hover:bg-zinc-100 text-zinc-950 border-2 border-zinc-950 font-mono text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition-all shadow-[3px_3px_0_#0c0c0e] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                          >
                            {copied === `${p.code}:link` ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Link2 className="w-4 h-4 text-zinc-950" />
                            )}
                            <span>{label(`${p.code}:link`, 'COPY LINK', 'LINK COPIED')}</span>
                          </button>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                );
              })}
            </div>
          </div>
          </>
          )}
        </div>

        {/* Footer: domain navigation + register */}
        <div className="shrink-0 border-t-2 border-zinc-950 bg-zinc-50 px-4 sm:px-6 py-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate(prev.id)}
            aria-label={`Previous domain: ${prev.short}`}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-zinc-100 border-2 border-zinc-950 text-zinc-950 font-mono text-[11px] font-bold uppercase pl-2.5 pr-3.5 py-2 rounded-full transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{prev.short}</span>
            <span className="sm:hidden">PREV</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate(next.id)}
            aria-label={`Next domain: ${next.short}`}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-zinc-100 border-2 border-zinc-950 text-zinc-950 font-mono text-[11px] font-bold uppercase pl-3.5 pr-2.5 py-2 rounded-full transition-colors cursor-pointer"
          >
            <span className="hidden sm:inline">{next.short}</span>
            <span className="sm:hidden">NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-2 bg-[#ffd000] hover:bg-[#f2c400] text-zinc-950 border-2 border-zinc-950 font-mono text-[11px] font-extrabold uppercase px-5 py-2.5 rounded-full transition-colors"
          >
            <span>REGISTER NOW</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
