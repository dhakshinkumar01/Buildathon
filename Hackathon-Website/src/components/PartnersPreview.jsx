import { PARTNERS } from '../data/partners';
import scrollToSection from '../utils/scrollToSection';
import FadeImage from './FadeImage';

// Slim logo strip near the top of the page. Each logo jumps to the full Sponsors section.
export default function PartnersPreview() {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto mb-8">
      <div className="bg-white border-2 border-zinc-950 rounded-2xl shadow-[4px_4px_0_#0c0c0e] px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest shrink-0">
          {'// supported_by'}
        </span>

        <ul className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8 flex-1">
          {PARTNERS.map((partner) => (
            <li key={partner.id}>
              <button
                type="button"
                onClick={() => scrollToSection('sponsors')}
                aria-label={`${partner.name}: see our sponsors`}
                className="h-12 sm:h-14 px-4 rounded-xl border-2 border-transparent hover:border-zinc-950 hover:bg-zinc-50 transition-colors cursor-pointer flex items-center"
              >
                <FadeImage
                  src={partner.logo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-auto max-w-[9rem] object-contain py-1"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
