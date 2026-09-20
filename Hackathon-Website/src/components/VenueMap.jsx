import { useState } from 'react';
import { ArrowRight, ExternalLink, MousePointerClick } from 'lucide-react';
import { VENUE_MAP_EMBED_URL, VENUE_MAP_URL, VENUE_DIRECTIONS_URL } from '../constants';

// Embedded Google Map of the venue. Inactive until clicked so it can't trap page scrolling on touch screens.
export default function VenueMap() {
  const [active, setActive] = useState(false);

  return (
    <div
      className="bg-white border-2 border-zinc-950 rounded-3xl shadow-[6px_6px_0_#0c0c0e] overflow-hidden flex flex-col h-full"
      onMouseLeave={() => setActive(false)}
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-950 text-zinc-100 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b30]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffd000]" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        <span className="ml-2 font-mono text-[11px] text-zinc-400 truncate">~/venue/thiruvanmiyur-campus</span>
        <a
          href={VENUE_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#ffd000] hover:text-white transition-colors shrink-0"
        >
          <span>OPEN IN MAPS</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Map */}
      <div className="relative flex-1 min-h-[320px] sm:min-h-[380px] bg-zinc-100">
        <iframe
          title="Map showing VELS University, Thiruvanmiyur Campus"
          src={VENUE_MAP_EMBED_URL}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />

        {!active && (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label="Activate the map to zoom and move it"
            className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/0 hover:bg-zinc-950/10 transition-colors cursor-pointer"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-950 text-[#ffd000] border-2 border-zinc-950 shadow-[3px_3px_0_#ffd000] font-mono text-[11px] font-bold uppercase">
              <MousePointerClick className="w-4 h-4" />
              <span>Click to explore the map</span>
            </span>
          </button>
        )}
      </div>

      {/* Footer: address + directions */}
      <div className="shrink-0 border-t-2 border-zinc-950 bg-zinc-50 px-4 sm:px-5 py-3 flex flex-wrap items-center gap-3">
        <p className="font-mono text-[11px] font-bold text-zinc-600 uppercase tracking-wide">
          VELS University · Thiruvanmiyur Campus, Chennai
        </p>
        <a
          href={VENUE_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-2 bg-[#ffd000] hover:bg-[#f2c400] text-zinc-950 border-2 border-zinc-950 font-mono text-[11px] font-extrabold uppercase px-4 py-2 rounded-full transition-colors"
        >
          <span>Get directions</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
