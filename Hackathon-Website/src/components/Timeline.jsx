import { useRef, useState } from 'react';
import { ArrowRight, Calendar, Check, ChevronDown, Download } from 'lucide-react';
import { STEPS } from '../data/timeline';
import { REGISTER_URL } from '../constants';
import { PPT_TEMPLATE } from '../data/downloads';
import useCountdown from '../hooks/useCountdown';
import scrollToSection from '../utils/scrollToSection';
import EventScheduleModal from './LazyEventScheduleModal';
import Collapse from './Collapse';

const LAST = STEPS.length - 1;

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 border-2 border-zinc-950 shadow-[3px_3px_0_#0c0c0e] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#0c0c0e] font-mono text-xs font-extrabold uppercase px-5 py-3 rounded-full transition-[translate,box-shadow,background-color] cursor-pointer';
const BUTTON_PRIMARY = `${BUTTON_BASE} bg-[#ffd000] hover:bg-[#f2c400] text-zinc-950`;
const BUTTON_SECONDARY = `${BUTTON_BASE} bg-white hover:bg-zinc-100 text-zinc-950`;

const STATUS_LABEL = {
  live: 'LIVE NOW',
  done: 'DONE',
  pre: 'PRE-EVENT',
  upcoming: 'UPCOMING'
};

// One action button (link, download, scroll-to-section or open-schedule).
function StepAction({ action, onOpenSchedule }) {
  const className = action.primary ? BUTTON_PRIMARY : BUTTON_SECONDARY;

  if (action.kind === 'link') {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={className}>
        <span>{action.label}</span>
        <ArrowRight className="w-4 h-4" />
      </a>
    );
  }

  if (action.kind === 'download') {
    return (
      <a href={action.href} download={action.filename} className={className}>
        <Download className="w-4 h-4" />
        <span>{action.label}</span>
      </a>
    );
  }

  if (action.kind === 'schedule') {
    return (
      <button type="button" onClick={onOpenSchedule} className={className}>
        <Calendar className="w-4 h-4" />
        <span>{action.label}</span>
      </button>
    );
  }

  return (
    <button type="button" onClick={() => scrollToSection(action.target)} className={className}>
      <span>{action.label}</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}

// Details for one stage: what happens, what to do, and its action buttons.
function StepDetail({ step, status, onOpenSchedule, showBar = true }) {
  return (
    <div className="bg-white border-2 border-zinc-950 rounded-2xl shadow-[6px_6px_0_#ffd000] overflow-hidden">
      {showBar && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-950 text-zinc-100">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b30]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffd000]" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="ml-2 font-mono text-[11px] text-zinc-400 truncate">
            {`~/journey/${step.num}-${step.slug}.md`}
          </span>
          <span
            className={`ml-auto shrink-0 font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
              status === 'live' ? 'bg-[#ff3b30] text-white' : 'bg-zinc-800 text-[#ffd000]'
            }`}
          >
            {STATUS_LABEL[status]}
          </span>
        </div>
      )}

      <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <span className="font-mono text-[11px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
            {`// stage_${step.num} · ${step.when}`}
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-950 uppercase tracking-tight mb-4">
            {step.title}
          </h3>

          <ul className="space-y-2.5">
            {step.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm text-zinc-700 leading-relaxed">
                <span className="font-mono font-bold text-amber-500 shrink-0" aria-hidden="true">
                  {'>'}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {step.note && (
            <p className="mt-5 font-mono text-[11px] text-zinc-500 border border-dashed border-zinc-400 rounded-lg px-3 py-2">
              {`// ${step.note}`}
            </p>
          )}
        </div>

        <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
          {step.actions.map((action) => (
            <StepAction key={action.label} action={action} onOpenSchedule={onOpenSchedule} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const { phase } = useCountdown(30000);

  // Status of each stage relative to the event dates (steps 1–3 have no announced dates).
  const liveIndex = phase === 'day1' ? 3 : phase === 'day2' ? 5 : -1;
  const doneBefore = phase === 'day1' ? 3 : phase === 'day2' ? 5 : phase === 'over' ? STEPS.length : 0;
  const statusOf = (idx) => {
    if (idx === liveIndex) return 'live';
    if (idx < doneBefore) return 'done';
    return idx < 3 ? 'pre' : 'upcoming';
  };

  const initial = liveIndex >= 0 ? liveIndex : phase === 'over' ? LAST : 0;
  const [selected, setSelected] = useState(initial);
  const [mobileOpen, setMobileOpen] = useState(initial);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const tabRefs = useRef([]);

  const openSchedule = () => setIsScheduleOpen(true);

  const selectStep = (idx, focus = false) => {
    setSelected(idx);
    if (focus && tabRefs.current[idx]) tabRefs.current[idx].focus();
  };

  const onTabKeyDown = (e, idx) => {
    const keys = {
      ArrowRight: Math.min(idx + 1, LAST),
      ArrowLeft: Math.max(idx - 1, 0),
      Home: 0,
      End: LAST
    };
    if (e.key in keys) {
      e.preventDefault();
      selectStep(keys[e.key], true);
    }
  };

  const step = STEPS[selected];
  // Track runs from the first icon centre to the last icon centre (each icon sits at the middle of its sixth).
  const TRACK_INSET = `calc(100% / ${STEPS.length * 2})`;

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto scroll-mt-24">
      {/* Indicator Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
        <span className="text-xs font-mono font-bold tracking-widest text-zinc-500">
          {'// the_journey'}
        </span>
      </div>

      <div className="bg-white border-2 border-zinc-950 rounded-[28px] shadow-[8px_8px_0_#0c0c0e] p-6 sm:p-10 relative overflow-hidden">

        <div className="mb-12">
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-zinc-950 uppercase tracking-tight mb-3">
            THE JOURNEY
          </h2>
          <p className="text-base text-zinc-500 max-w-2xl">
            From registration to the Grand Finale: six stages every team goes through. Select a stage to see what
            happens and what you need to do.
          </p>
        </div>

        {/* Desktop: stage tabs on a track */}
        <div className="hidden lg:block">
          <div className="relative">
            <div
              className="absolute top-[25px] h-1.5 rounded-full bg-zinc-200"
              style={{ left: TRACK_INSET, right: TRACK_INSET }}
              aria-hidden="true"
            />
            <div
              className="absolute top-[25px] h-1.5 rounded-full bg-zinc-950 transition-[width] duration-500"
              style={{
                left: TRACK_INSET,
                width: `calc((100% - 100% / ${STEPS.length}) * ${selected / LAST})`
              }}
              aria-hidden="true"
            />

            <div role="tablist" aria-label="Journey stages" className="grid grid-cols-6 relative">
              {STEPS.map((s, idx) => {
                const Icon = s.icon;
                const status = statusOf(idx);
                const isSelected = selected === idx;
                return (
                  <button
                    key={s.num}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`journey-tab-${idx}`}
                    aria-selected={isSelected}
                    aria-controls="journey-panel"
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => selectStep(idx)}
                    onKeyDown={(e) => onTabKeyDown(e, idx)}
                    className="group px-2 flex flex-col items-center text-center cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500"
                  >
                    <span className="relative">
                      {status === 'live' && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-2 py-0.5 rounded bg-[#ff3b30] text-white font-mono text-[9px] font-bold tracking-wider whitespace-nowrap animate-pulse">
                          LIVE NOW
                        </span>
                      )}
                      <span
                        className={`w-14 h-14 rounded-2xl border-2 border-zinc-950 flex items-center justify-center transition-[translate,box-shadow,background-color,color] duration-200 ${
                          isSelected
                            ? 'bg-[#ffd000] text-zinc-950 shadow-[4px_4px_0_#0c0c0e] -translate-y-1'
                            : status === 'done'
                              ? 'bg-zinc-950 text-[#ffd000] group-hover:-translate-y-0.5'
                              : 'bg-white text-zinc-700 shadow-[3px_3px_0_#0c0c0e] group-hover:-translate-y-0.5'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </span>
                      {status === 'done' && (
                        <span className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 border-2 border-zinc-950 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </span>
                      )}
                    </span>

                    <span className="mt-5 font-mono text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                      {`STEP ${s.num}`}
                    </span>
                    <span className="font-heading text-base font-bold text-zinc-950 uppercase tracking-tight mt-0.5">
                      {s.title}
                    </span>
                    <span
                      className={`mt-1.5 px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase ${
                        isSelected ? 'bg-[#ffd000] text-zinc-950' : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {s.when}
                    </span>
                    <span className="mt-2 text-xs text-zinc-500 leading-relaxed max-w-[170px]">{s.summary}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            role="tabpanel"
            id="journey-panel"
            aria-labelledby={`journey-tab-${selected}`}
            className="mt-10"
          >
            <div key={selected} className="animate-riseIn">
              <StepDetail step={step} status={statusOf(selected)} onOpenSchedule={openSchedule} />
            </div>
          </div>
        </div>

        {/* Mobile / tablet: vertical stages that expand in place */}
        <ol className="lg:hidden relative space-y-4 before:absolute before:left-6 before:top-6 before:bottom-6 before:w-1 before:rounded-full before:bg-zinc-200">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            const status = statusOf(idx);
            const isOpen = mobileOpen === idx;
            return (
              <li key={s.num} className="relative">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`journey-mobile-${idx}`}
                  onClick={() => setMobileOpen(isOpen ? null : idx)}
                  className="w-full flex items-start gap-4 text-left cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                >
                  <span
                    className={`relative z-10 w-12 h-12 rounded-2xl border-2 border-zinc-950 flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#ffd000] text-zinc-950 shadow-[3px_3px_0_#0c0c0e]'
                        : status === 'done'
                          ? 'bg-zinc-950 text-[#ffd000]'
                          : 'bg-white text-zinc-700 shadow-[3px_3px_0_#0c0c0e]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {status === 'done' && (
                      <span className="absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-950 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                      </span>
                    )}
                  </span>

                  <span className="flex-1 pt-0.5">
                    <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                      {`STEP ${s.num} · ${s.when}`}
                      {status === 'live' && (
                        <span className="ml-2 px-1.5 py-0.5 rounded bg-[#ff3b30] text-white animate-pulse">LIVE NOW</span>
                      )}
                    </span>
                    <span className="block font-heading text-base font-bold text-zinc-950 uppercase tracking-tight">
                      {s.title}
                    </span>
                    <span className="block text-xs text-zinc-500 leading-relaxed">{s.summary}</span>
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 mt-3 shrink-0 text-zinc-700 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <Collapse open={isOpen} id={`journey-mobile-${idx}`}>
                  <div className="pt-4 pr-2 pb-2 ml-0 sm:ml-16">
                    <StepDetail step={s} status={status} onOpenSchedule={openSchedule} showBar={false} />
                  </div>
                </Collapse>
              </li>
            );
          })}
        </ol>

        {/* Key dates + actions */}
        <div className="mt-12 pt-8 border-t-2 border-zinc-950 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <ul className="lg:col-span-6 flex flex-wrap gap-2">
            {['5 OCT · BUILD DAY', '6 OCT · GRAND FINALE', '~50 TEAMS → TOP 10'].map((chip) => (
              <li
                key={chip}
                className="px-3.5 py-2 rounded-md bg-zinc-950 text-[#ffd000] font-mono text-[11px] font-bold tracking-wider"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="lg:col-span-6 flex flex-wrap gap-3 lg:justify-end">
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className={BUTTON_PRIMARY}>
              <span>Register now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href={PPT_TEMPLATE.href} download={PPT_TEMPLATE.filename} className={BUTTON_SECONDARY}>
              <Download className="w-4 h-4" />
              <span>PPT template</span>
            </a>
            <button type="button" onClick={() => scrollToSection('rules')} className={BUTTON_SECONDARY}>
              <span>Read the rules</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      <EventScheduleModal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} />
    </section>
  );
}
