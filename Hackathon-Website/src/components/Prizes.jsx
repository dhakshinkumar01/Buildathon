import { useState } from 'react';
import { Award, Trophy, Medal, FileCheck, ArrowRight } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import useCountUp from '../hooks/useCountUp';
import scrollToSection from '../utils/scrollToSection';

// Amounts are in rupees. Placement order in the array is 1st, 2nd, 3rd.
const PRIZES = [
  {
    id: 'first',
    place: 1,
    rank: '1ST PRIZE',
    amount: 12000,
    title: 'GRAND CHAMPION',
    desc: 'The winner of the Grand Finale.',
    icon: Trophy,
    order: 'md:order-2',
    step: 'md:h-32',
    segment: 'bg-[#ffd000]',
    featured: true
  },
  {
    id: 'second',
    place: 2,
    rank: '2ND PRIZE',
    amount: 8000,
    title: 'RUNNER UP',
    desc: 'The runner-up of the Grand Finale.',
    icon: Medal,
    order: 'md:order-1',
    step: 'md:h-24',
    segment: 'bg-zinc-200'
  },
  {
    id: 'third',
    place: 3,
    rank: '3RD PRIZE',
    amount: 5000,
    title: '2ND RUNNER UP',
    desc: 'The second runner-up of the Grand Finale.',
    icon: Award,
    order: 'md:order-3',
    step: 'md:h-16',
    segment: 'bg-zinc-500'
  }
];

const POOL = PRIZES.reduce((sum, p) => sum + p.amount, 0);

const inr = (n) => `₹${n.toLocaleString('en-IN')}`;

function Amount({ value, active }) {
  const shown = useCountUp(value, active, 1400);
  return <>{inr(shown)}</>;
}

export default function Prizes() {
  const [hovered, setHovered] = useState(null);
  const [podiumRef, podiumSeen] = useReveal(0.25);

  return (
    <section id="prizes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto scroll-mt-24">
      {/* Indicator Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
        <span className="text-xs font-mono font-bold tracking-widest text-zinc-500">
          {'// prizes_and_rewards'}
        </span>
      </div>

      <div className="bg-white border-2 border-zinc-950 rounded-[28px] shadow-[8px_8px_0_#0c0c0e] p-6 sm:p-10 lg:p-12 relative overflow-hidden">

        {/* Heading + total pool */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          <div className="lg:col-span-6">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-950 uppercase tracking-tight mb-4">
              BUILD. INNOVATE. WIN.
            </h2>
            <p className="text-base sm:text-lg text-zinc-500">
              {inr(POOL)} in total cash prizes for the top three teams at the Grand Finale.
            </p>
          </div>

          <div className="lg:col-span-6 bg-zinc-950 text-white border-2 border-zinc-950 rounded-2xl shadow-[6px_6px_0_#ffd000] p-6 sm:p-8">
            <span className="font-mono text-[11px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">
              {'// total_prize_pool'}
            </span>
            <p className="font-heading text-5xl sm:text-6xl font-extrabold text-[#ffd000] tracking-tight leading-none">
              {inr(POOL)}
            </p>

            {/* How the pool is split. Hover a segment or a card to link them. */}
            <div
              className="mt-6 flex h-4 rounded-full overflow-hidden border border-zinc-700"
              aria-hidden="true"
            >
              {PRIZES.map((p) => (
                <div
                  key={p.id}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ width: `${(p.amount / POOL) * 100}%` }}
                  className={`${p.segment} transition-opacity duration-200 ${
                    hovered && hovered !== p.id ? 'opacity-30' : 'opacity-100'
                  }`}
                />
              ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] text-zinc-300">
              {PRIZES.map((p) => (
                <li key={p.id} className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-sm ${p.segment}`} aria-hidden="true" />
                  <span>{`${p.place}${p.place === 1 ? 'st' : p.place === 2 ? 'nd' : 'rd'} ${inr(p.amount)}`}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Podium: 2nd | 1st | 3rd on wide screens, 1st-2nd-3rd stacked on phones */}
        <div ref={podiumRef} className="grid grid-cols-1 md:grid-cols-3 md:items-end gap-8 mb-14">
          {PRIZES.map((p) => {
            const Icon = p.icon;
            const isLinked = hovered === p.id;
            return (
              <div
                key={p.id}
                className={`flex flex-col ${p.order}`}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={`card-brutal group relative rounded-3xl p-7 flex flex-col overflow-hidden ${
                    p.featured ? 'bg-white md:pt-12 md:pb-10' : 'bg-[#fcfcfd]'
                  } ${isLinked ? 'outline outline-4 outline-offset-2 outline-[#ffd000]' : ''}`}
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-3 border-b-2 border-zinc-950 ${
                      p.featured ? 'bg-[#ffd000]' : p.id === 'second' ? 'bg-zinc-300' : 'bg-zinc-500'
                    }`}
                    aria-hidden="true"
                  />

                  <div className="flex items-center justify-between mb-6 pt-2">
                    <span className="font-mono text-xs font-bold text-zinc-500 tracking-wider uppercase">
                      {p.rank}
                    </span>
                    <span className="w-11 h-11 rounded-xl bg-zinc-100 border-2 border-zinc-950 flex items-center justify-center text-zinc-950 group-hover:bg-[#ffd000] transition-colors">
                      <Icon className="w-5 h-5" />
                    </span>
                  </div>

                  <span className="font-heading text-4xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight block mb-2 tabular-nums">
                    <Amount value={p.amount} active={podiumSeen} />
                  </span>

                  <h3 className="font-grotesk text-lg font-bold text-zinc-800 uppercase tracking-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{p.desc}</p>

                  <div className="mt-6 pt-4 border-t border-zinc-200 font-mono text-[11px] font-bold text-zinc-500 uppercase">
                    {'// awarded at the grand finale · 6 oct'}
                  </div>
                </div>

                {/* Podium step (wide screens only) */}
                <div
                  aria-hidden="true"
                  className={`hidden md:flex ${p.step} mt-3 items-center justify-center rounded-2xl border-2 border-zinc-950 font-heading text-5xl font-extrabold ${
                    p.featured ? 'bg-[#ffd000] text-zinc-950' : 'bg-zinc-950 text-[#ffd000]'
                  }`}
                >
                  {p.place}
                </div>
              </div>
            );
          })}
        </div>

        {/* Path to the podium */}
        <div className="bg-zinc-50 border-2 border-zinc-950 rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 mb-8">
          <span className="font-mono text-[11px] font-bold text-zinc-500 uppercase tracking-widest shrink-0">
            {'// the_path_to_the_podium'}
          </span>
          <ul className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold">
            {['~50 TEAMS SHORTLISTED', 'TOP 10 FINALISTS', '3 PRIZE WINNERS'].map((item, idx, all) => (
              <li key={item} className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-md bg-zinc-950 text-[#ffd000]">{item}</span>
                {idx < all.length - 1 && <ArrowRight className="w-4 h-4 text-zinc-500" aria-hidden="true" />}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => scrollToSection('timeline')}
            className="lg:ml-auto inline-flex items-center gap-2 font-mono text-xs font-extrabold text-zinc-950 underline underline-offset-4 hover:text-amber-600 cursor-pointer"
          >
            SEE THE JOURNEY
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Participant recognition */}
        <div className="card-brutal bg-white rounded-2xl p-5 sm:p-6 flex items-start gap-4 max-w-2xl">
          <span className="w-11 h-11 rounded-xl bg-[#ffd000] border-2 border-zinc-950 flex items-center justify-center text-zinc-950 shrink-0">
            <FileCheck className="w-5 h-5" />
          </span>
          <div>
            <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
              {'// participant_recognition'}
            </span>
            <h4 className="font-heading text-lg font-extrabold text-zinc-950 uppercase mb-1">Certificates</h4>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Verified digital certificate of excellence &amp; participation for all teams.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
