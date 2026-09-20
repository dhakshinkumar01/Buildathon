import { BookOpen, Cpu, Users, Lightbulb } from 'lucide-react';
import Reveal from './Reveal';

const HIGHLIGHTS = [
  {
    id: '01',
    title: 'LEARN',
    desc: 'Get feedback from reviewers at the mid-day Progress Review and the Final Review.',
    icon: BookOpen
  },
  {
    id: '02',
    title: 'BUILD',
    desc: 'Write every line of code live on build day. Forked or pre-built projects are not allowed.',
    icon: Cpu
  },
  {
    id: '03',
    title: 'CONNECT',
    desc: 'Team up with 2–3 teammates and build together for the whole day.',
    icon: Users
  },
  {
    id: '04',
    title: 'INNOVATE',
    desc: 'Pick one of 26 real-world problem statements across six domains and build a working prototype.',
    icon: Lightbulb
  }
];

export default function EventHighlights() {
  return (
    <section id="highlights" className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto scroll-mt-24">
      {/* Indicator Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
        <span className="text-xs font-mono font-bold tracking-widest text-zinc-500">
          {'// event_highlights'}
        </span>
      </div>

      <div className="mb-12">
        <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-zinc-950 uppercase tracking-tight mb-3">
          EVENT HIGHLIGHTS
        </h2>
        <p className="text-base text-zinc-500 max-w-xl">
          Four things every team gets out of the two days.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {HIGHLIGHTS.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <Reveal key={item.id} className="h-full" delay={idx * 90}>
            <div className="card-brutal group h-full bg-white rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs font-bold text-zinc-500 group-hover:text-zinc-950 transition-colors">
                    {item.id}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-[#f7f7f8] border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-zinc-950 group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-heading text-2xl font-bold text-zinc-950 uppercase tracking-tight mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-zinc-500 font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono font-semibold text-zinc-500 group-hover:text-zinc-950 transition-colors">
                <span>{`// ${item.title.toLowerCase()}`}</span>
              </div>
            </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
