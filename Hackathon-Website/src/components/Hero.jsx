import {
  ArrowRight,
  ArrowDown,
  Calendar,
  MapPin,
  Trophy,
  Bell,
  Users
} from 'lucide-react';
import heroAiHuman from '../assets/hero-ai-human.webp';
import { REGISTER_URL, VENUE_MAP_URL } from '../constants';
import useTyped from '../hooks/useTyped';
import HeroCountdown from './HeroCountdown';
import scrollToSection from '../utils/scrollToSection';

const TYPED_WORDS = ['build.', 'hack.', 'ship.'];

// Kept as its own component so the typing animation (a state change every ~50-90 ms)
// re-renders only this line, not the whole hero and both countdown cards.
function TypedTagline() {
  const typed = useTyped(TYPED_WORDS);

  return (
    <p aria-hidden="true" className="font-mono text-sm sm:text-base font-bold text-zinc-950 mb-4 h-6">
      <span className="text-zinc-400">{'> '}</span>
      <span className={typed ? 'bg-[#ffd000] px-1.5' : ''}>{typed}</span>
      <span className="animate-blink">_</span>
    </p>
  );
}

export default function Hero() {
  const scrollToDomains = () => scrollToSection('challenges');

  return (
    <section id="hero" className="relative pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto scroll-mt-24">

      {/* Asymmetric 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

        {/* Left Column - Editorial Typography & Event Info */}
        <div className="lg:col-span-6 flex flex-col justify-center">

          {/* Organiser lockup, as on the poster: School, Department, PRESENTS */}
          <div className="mb-7">
            <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 mb-2">
              School of Engineering · VELS University (VISTAS)
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="inline-block bg-[#ffd000] border-2 border-zinc-950 shadow-[3px_3px_0_#0c0c0e] px-3 py-1.5 sm:py-2 font-heading text-base sm:text-lg lg:text-base xl:text-xl font-extrabold uppercase tracking-tight leading-tight text-zinc-950">
                Department of Computer Science &amp; Engineering
              </p>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-zinc-500">
                Presents
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border-2 border-zinc-950 text-zinc-900 font-mono text-xs font-bold uppercase tracking-wider mb-5 w-fit">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#ffd000] opacity-75 animate-ping" />
              <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-[#ffd000] shadow-[0_0_8px_rgba(255,208,0,0.8)]" />
            </span>
            <span>BUILDATHON 2026 • REGISTRATION OPEN</span>
          </div>

          {/* Main Title BUILDATHON */}
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[84px] xl:text-[96px] font-extrabold text-zinc-950 leading-none tracking-tight uppercase mb-2 select-none">
            BUILDATHON
          </h1>

          {/* Typed terminal tagline (decorative; the real headline follows) */}
          <TypedTagline />

          {/* Countdown for phones and tablets: right under the title so it is on the first screen.
              (On laptops and desktops it sits under the image in the right column.) */}
          <HeroCountdown className="lg:hidden mb-6 max-w-md" />

          {/* Sub-headline */}
          <h2 className="font-archivo text-xl sm:text-2xl md:text-3xl font-extrabold text-zinc-950 uppercase tracking-tight leading-snug mb-5 max-w-2xl">
            FUTURE FORGE - SHAPING TOMORROW WITH TECHNOLOGY
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed max-w-xl mb-6">
            A 10-hour build event where student teams turn real-world problem statements into working prototypes.
          </p>

          {/* Event Metadata Pills */}
          <div className="flex flex-wrap items-center gap-3 mb-8 text-zinc-900">
            <div className="flex items-center gap-2.5 bg-zinc-50 border border-zinc-300 px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4 text-zinc-700 shrink-0" />
              <span className="font-grotesk text-sm sm:text-base font-semibold">
                05.10.2026 - 06.10.2026
              </span>
            </div>

            <a
              href={VENUE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Open VELS University Thiruvanmiyur Campus on Google Maps"
              aria-label="Open VELS University Thiruvanmiyur Campus in Google Maps"
              className="flex items-center gap-2.5 bg-zinc-50 hover:bg-white border border-zinc-300 hover:border-zinc-950 px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-zinc-700 shrink-0" />
              <span className="font-grotesk text-sm sm:text-base font-semibold">
                Thiruvanmiyur Campus
              </span>
            </a>

            <div className="flex items-center gap-2.5 bg-[#fff4b8] border border-[#e6bd00] px-4 py-2 rounded-full">
              <Trophy className="w-4 h-4 text-zinc-950 shrink-0" />
              <span className="font-grotesk text-sm sm:text-base font-bold text-zinc-950">
                ₹25,000 Prize Pool
              </span>
            </div>
          </div>

          {/* Action Buttons: Register is the one solid-black button; Explore Domains is the lighter outline button */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-zinc-950 hover:bg-zinc-800 text-white border-2 border-zinc-950 shadow-[4px_4px_0_#ffd000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#ffd000] font-grotesk text-base font-extrabold leading-tight pl-8 pr-3 py-3 rounded-full transition-[translate,box-shadow,background-color] cursor-pointer"
            >
              <span>Register Now</span>
              <span className="w-8 h-8 rounded-full bg-[#ffd000] text-zinc-950 flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>

            <button
              type="button"
              onClick={scrollToDomains}
              aria-label="Explore Domains: the six challenge domains"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white hover:bg-[#ffd000] text-zinc-950 border-2 border-zinc-950 font-grotesk text-base font-bold leading-tight pl-7 pr-3 py-3 rounded-full transition-colors cursor-pointer"
            >
              <span>Explore Domains</span>
              <span className="w-8 h-8 rounded-full border-2 border-zinc-950 flex items-center justify-center shrink-0 transition-transform group-hover:translate-y-0.5">
                <ArrowDown className="w-4 h-4" />
              </span>
            </button>
          </div>

          <p className="mt-6 font-mono text-xs font-bold tracking-widest text-zinc-500 uppercase">
            {'// teams of 3–4 · ~50 teams shortlisted'}
          </p>

        </div>

        {/* Right Column - Prominent Uploaded Hero Artwork */}
        {/* On laptops and desktops this column stays in view while the left text scrolls past */}
        <div className="lg:col-span-6 relative flex items-center justify-center lg:sticky lg:top-28 lg:self-start">
          {/* Outer wrapper holds the stickers so the frame's overflow-hidden doesn't clip them */}
          <div className="relative w-full max-w-[660px]">
            <span aria-hidden="true" className="absolute -top-3 -left-2 sm:-left-3 z-10 -rotate-6 bg-[#ffd000] border-2 border-zinc-950 shadow-[3px_3px_0_#0c0c0e] px-3 py-1.5 font-mono text-xs font-extrabold uppercase tracking-wider text-zinc-950">
              10 hours
            </span>
            <span aria-hidden="true" className="absolute top-1/3 -right-2 sm:-right-3 z-10 rotate-3 bg-white border-2 border-zinc-950 shadow-[3px_3px_0_#0c0c0e] px-3 py-1.5 font-mono text-xs font-extrabold uppercase tracking-wider text-zinc-950">
              6 domains
            </span>
            <span aria-hidden="true" className="absolute -bottom-3 -left-1 sm:-left-2 z-10 rotate-2 bg-zinc-950 border-2 border-zinc-950 shadow-[3px_3px_0_#ffd000] px-3 py-1.5 font-mono text-xs font-extrabold tracking-wider text-[#ffd000]">
              ₹25,000
            </span>

            <div className="relative w-full overflow-hidden rounded-3xl border-2 border-zinc-950 shadow-[8px_8px_0_#ffd000] bg-white group">
              <img
                src={heroAiHuman}
                alt="BUILDATHON Future Forge AI and Human Intelligence Artwork"
                width={1024}
                height={682}
                fetchPriority="high"
                className="w-full h-auto object-contain block group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            </div>

            {/* Countdown for laptops and desktops: under the image, always in view with this column */}
            <HeroCountdown className="hidden lg:block mt-8" />
          </div>
        </div>

      </div>

      {/* Information Cards (Side by Side on Desktop) */}
      <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {/* Left Card: Acceptance Notification */}
          <div className="bg-white border-2 border-zinc-950 rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0_#ffd000] flex items-start gap-3.5 sm:gap-4 h-full">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#ffd000] border-2 border-zinc-950 flex items-center justify-center shrink-0 shadow-[2px_2px_0_#0c0c0e]">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-950" />
            </div>
            <div className="flex-1">
              <p className="text-sm sm:text-base text-zinc-800 leading-relaxed font-sans">
                <strong className="font-extrabold text-zinc-950 mr-1.5">Acceptance Notification:</strong>
                <span className="font-normal text-zinc-700">The acceptance notification will be sent to the team leader’s registered email address within 48 hours of submission.</span>
              </p>
            </div>
          </div>

          {/* Right Card: Who Can Participate */}
          <div className="bg-white border-2 border-zinc-950 rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0_#ffd000] flex items-start gap-3.5 sm:gap-4 h-full">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#ffd000] border-2 border-zinc-950 flex items-center justify-center shrink-0 shadow-[2px_2px_0_#0c0c0e]">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-950" />
            </div>
            <div className="flex-1">
              <p className="text-sm sm:text-base text-zinc-800 leading-relaxed font-sans">
                <strong className="font-extrabold text-zinc-950 mr-1.5">WHO CAN PARTICIPATE:</strong>
                <span className="font-normal text-zinc-700">BUILDATHON – Future Forge is open to undergraduate students from every engineering, science, and computing branch — including but not limited to CSE.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}




