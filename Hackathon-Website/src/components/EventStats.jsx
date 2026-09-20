import useCountdown from '../hooks/useCountdown';
import useCountUp from '../hooks/useCountUp';
import useReveal from '../hooks/useReveal';

const STATS = [
  { value: 10, suffix: '', label: 'HOURS' },
  { value: 150, suffix: '+', label: 'HACKERS' },
  { value: 40, suffix: '+', label: 'TEAMS' }
];

function Stat({ value, suffix = '', active }) {
  const shown = useCountUp(value, active);
  return (
    <span className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-950 tracking-tight mb-1">
      {shown}
      {suffix}
    </span>
  );
}

export default function EventStats() {
  const { days, phase } = useCountdown(60000);
  const isLive = phase !== 'before';
  const [ref, inView] = useReveal(0.3);

  return (
    <section ref={ref} className="py-4 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto mb-12">
      <div className="bg-white border-2 border-zinc-950 rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0_#0c0c0e]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center text-center ${
                idx > 0 ? 'pt-4 md:pt-0' : ''
              }`}
            >
              <Stat value={stat.value} suffix={stat.suffix} active={inView} />
              <span className="font-mono text-xs font-bold text-zinc-600 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}

          {/* 4th Card: Live Days Countdown to Buildathon */}
          <div className="flex flex-col items-center justify-center text-center pt-4 md:pt-0">
            <Stat value={days} active={inView} />
            <span className="font-mono text-xs font-bold text-zinc-600 uppercase tracking-widest">
              DAYS
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-widest mt-0.5">
              {isLive ? 'BUILDATHON STARTED' : 'TO BUILDATHON'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
