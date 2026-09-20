import useCountdown from '../hooks/useCountdown';

const pad = (n) => String(n).padStart(2, '0');

const LIVE_STATE = {
  day1: { big: 'DAY 1', sub: 'BUILD DAY - 5 OCT', sr: 'BUILDATHON is live. Day 1, build day.' },
  day2: { big: 'DAY 2', sub: 'GRAND FINALE - 6 OCT', sr: 'BUILDATHON is live. Day 2, grand finale.' },
  over: { big: 'DONE', sub: 'THANKS FOR BUILDING WITH US', sr: 'BUILDATHON 2026 has ended.' }
};

// Compact terminal-style countdown shown in the hero.
export default function HeroCountdown({ className = '' }) {
  const timeLeft = useCountdown();
  const live = LIVE_STATE[timeLeft.phase];

  const units = [
    { label: 'DAYS', value: pad(timeLeft.days) },
    { label: 'HRS', value: pad(timeLeft.hours) },
    { label: 'MIN', value: pad(timeLeft.minutes) },
    { label: 'SEC', value: pad(timeLeft.seconds) }
  ];

  return (
    <div
      className={`w-full bg-zinc-950 text-zinc-100 border-2 border-zinc-950 rounded-2xl shadow-[4px_4px_0_#0c0c0e] overflow-hidden font-mono px-4 sm:px-5 py-3.5 ${className}`}
    >
      {/* One row: terminal dots + label */}
      <div className="flex items-center gap-1.5 mb-3" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b30]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffd000]" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        <span className="ml-2 text-[11px] font-bold uppercase tracking-widest text-zinc-400 truncate">
          {live ? `> STATUS: ${timeLeft.phase === 'over' ? 'COMPLETE' : 'LIVE'}` : '> BUILDATHON STARTS IN'}
          <span className="animate-blink text-[#ffd000]">_</span>
        </span>
      </div>

      {live ? (
        <div aria-hidden="true" className="flex items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#ffd000] leading-none">{live.big}</span>
          <span className="text-[11px] font-semibold text-zinc-400 tracking-widest">{live.sub}</span>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2" aria-hidden="true">
          {units.map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#ffd000] tabular-nums leading-none">
                {unit.value}
              </span>
              <span className="text-[10px] font-semibold text-zinc-400 tracking-widest mt-1.5">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      )}

      <p className="sr-only">
        {live ? live.sr : `${timeLeft.days} days until BUILDATHON starts on 5 October 2026.`}
      </p>
    </div>
  );
}
