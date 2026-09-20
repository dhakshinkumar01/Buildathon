import { ArrowRight, Sparkles } from 'lucide-react';
import { REGISTER_URL } from '../constants';

export default function FinalCTA() {
  return (
    <section id="register" className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto scroll-mt-24">
      <div className="bg-white border border-black/10 rounded-[44px] p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Yellow Decorative Corner Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#ffd000] rounded-bl-[44px] z-0 pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2f2f2] text-xs font-mono font-bold text-zinc-800 uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
            <span>BE PART OF THE FUTURE</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-950 uppercase tracking-tight mb-4">
            JOIN THE MOVEMENT
          </h2>

          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed font-normal mb-8">
            Be part of a community that builds the future. Bring your idea, assemble your team, and shape tomorrow with technology.
          </p>

          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-yellow-pill inline-flex items-center gap-3 font-mono text-xs font-extrabold px-9 py-4 cursor-pointer"
          >
            <span>Register Now</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Right Sketch Graphic Representation */}
        <div className="relative z-10 w-48 h-32 flex flex-col items-center justify-center font-serif text-3xl font-extrabold italic text-zinc-900 border-2 border-zinc-950 rounded-3xl p-6 bg-white shadow-xl rotate-3">
          <span>BUILD</span>
          <span className="text-xs font-mono font-bold uppercase not-italic text-zinc-500">THIRUVANMIYUR</span>
        </div>

      </div>
    </section>
  );
}
