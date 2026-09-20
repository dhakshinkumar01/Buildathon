import { PARTNERS } from '../data/partners';
import velsOfficialBanner from '../assets/vels-official-banner.webp';
import FadeImage from './FadeImage';

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto scroll-mt-24">
      {/* Indicator Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
        <span className="text-xs font-mono font-bold tracking-widest text-zinc-500">
          {'// sponsors'}
        </span>
      </div>

      <div className="bg-white border-2 border-zinc-950 rounded-[28px] shadow-[8px_8px_0_#0c0c0e] p-6 sm:p-10 relative overflow-hidden">

        <div className="mb-10">
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-zinc-950 uppercase tracking-tight mb-3">
            OUR SPONSORS
          </h2>
          <p className="text-base text-zinc-500 max-w-2xl">
            Thank you to the sponsors who make BUILDATHON 2026 possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Sponsors */}
          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PARTNERS.map((partner) => (
              <li
                key={partner.id}
                className="card-brutal group bg-white rounded-3xl p-6 flex flex-col items-center text-center"
              >
                <span className="self-start font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">
                  {'// sponsor'}
                </span>
                <div className="w-full h-32 sm:h-36 flex items-center justify-center p-4 rounded-2xl bg-white border-2 border-zinc-950 group-hover:bg-zinc-50 transition-colors">
                  <FadeImage
                    src={partner.logo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 font-heading text-lg font-extrabold text-zinc-950 uppercase tracking-tight">
                  {partner.name}
                </h3>
              </li>
            ))}
          </ul>

          {/* Organiser */}
          <div className="lg:col-span-5 bg-zinc-950 text-white border-2 border-zinc-950 rounded-3xl shadow-[6px_6px_0_#ffd000] p-6 sm:p-7 flex flex-col">
            <span className="font-mono text-[10px] font-bold text-[#ffd000] uppercase tracking-widest mb-4">
              {'// organised_by'}
            </span>
            <div className="bg-white rounded-2xl p-4 mb-5">
              <FadeImage
                src={velsOfficialBanner}
                alt="VELS Institute of Science, Technology & Advanced Studies (VISTAS)"
                width={1024}
                height={341}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain"
              />
            </div>
            <h3 className="font-heading text-xl font-extrabold uppercase tracking-tight leading-tight mb-2">
              Department of Computer Science &amp; Engineering
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              School of Engineering, VELS Institute of Science, Technology &amp; Advanced Studies (VISTAS)
            </p>
            <p className="mt-auto pt-5 font-mono text-[11px] text-zinc-500 uppercase tracking-wider">
              Thiruvanmiyur Campus, Chennai
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
