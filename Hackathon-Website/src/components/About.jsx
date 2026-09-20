import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import aboutImage from '../assets/hero-character.webp';
import EventScheduleModal from './LazyEventScheduleModal';
import FadeImage from './FadeImage';
import { CHALLENGES } from '../data/challenges';

const TOTAL_PROBLEMS = CHALLENGES.reduce((sum, c) => sum + c.problemStatements.length, 0);

const FACTS = [
  '10 HOURS',
  'TEAMS OF 3–4',
  `${CHALLENGES.length} DOMAINS`,
  `${TOTAL_PROBLEMS} PROBLEMS`,
  '₹25,000 PRIZE POOL',
  '05–06 OCT'
];

export default function About() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
        <span className="text-xs font-mono font-bold tracking-widest text-zinc-500">
          {'// about_buildathon'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* Left Card - Dark terminal panel */}
        <div className="lg:col-span-6 bg-[#0c0c0e] text-white border-2 border-zinc-950 rounded-[28px] shadow-[8px_8px_0_#ffd000] relative overflow-hidden flex flex-col min-h-[460px]">

          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-5 py-3 bg-zinc-900 border-b border-zinc-800">
            <span className="w-3 h-3 rounded-full bg-[#ff3b30]" />
            <span className="w-3 h-3 rounded-full bg-[#ffd000]" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="ml-3 font-mono text-xs text-zinc-400">~/about.md</span>
          </div>

          <div className="p-8 sm:p-10 flex flex-col justify-between flex-1">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-800 text-[10px] font-mono font-bold text-zinc-300 uppercase mb-6 border border-zinc-700">
                <Sparkles className="w-3.5 h-3.5 text-[#ffd000]" />
                <span>THE VISION</span>
              </div>

              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] mb-6 text-white">
                MORE THAN<br />
                JUST A<br />
                <span className="text-[#ffd000]">BUILDATHON.</span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-lg mb-4">
                BUILDATHON is a 10-hour build event organised by the Department of CSE at VELS University&apos;s Thiruvanmiyur Campus. Teams of 3–4 pick one of six real-world domains, choose a problem statement and build a working prototype. The Top 10 present to a judge panel at the Grand Finale.
              </p>

              <p className="font-mono text-xs font-bold text-zinc-300 leading-relaxed max-w-lg mb-6">
                {'// organised by the '}
                <span className="text-[#ffd000]">Department of Computer Science &amp; Engineering</span>
                {', School of Engineering, VISTAS'}
              </p>

              {/* Fact chips */}
              <ul className="flex flex-wrap gap-2">
                {FACTS.map((fact) => (
                  <li
                    key={fact}
                    className="px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-700 text-[#ffd000] font-mono text-[11px] font-bold tracking-wider"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-8 border-t border-zinc-800 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setIsScheduleOpen(true)}
                className="inline-flex items-center gap-2 bg-[#ffd000] text-zinc-950 font-mono text-xs font-bold px-6 py-3 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer"
              >
                <span>VIEW FULL SCHEDULE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="font-mono text-[10px] text-zinc-500 uppercase">BUILDATHON 2026</span>
            </div>
          </div>
        </div>

        {/* Right Card - Artwork, tuned to the black / white / yellow palette */}
        <div className="lg:col-span-6 relative min-h-[460px] rounded-[28px] overflow-hidden bg-[#f7f7f8] border-2 border-zinc-950 shadow-[8px_8px_0_#0c0c0e] p-4">

          {/* Yellow and coral backing blocks */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffd000] rounded-bl-[40px] z-0" />
          <div className="absolute bottom-6 left-6 w-24 h-24 bg-[#ff3b30] rounded-2xl z-0" />

          {/* Dotted Grid Accent */}
          <div className="absolute top-6 left-6 w-32 h-32 bg-dot-matrix opacity-60 pointer-events-none z-0" />

          {/* Image Container */}
          <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border-2 border-zinc-950 min-h-[420px]">
            <FadeImage
              src={aboutImage}
              alt="Stylised portrait of a figure wearing a glossy cube-shaped headset, in black and white"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 text-white z-20">
              <span className="font-mono text-[10px] text-[#ffd000] font-bold uppercase tracking-widest block mb-1">
                BUILDATHON 2026
              </span>
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight">
                FUTURE FORGE - SHAPING TOMORROW
              </h3>
            </div>
          </div>

        </div>

      </div>

      {/* Event Schedule Modal */}
      <EventScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />
    </section>
  );
}
