import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import { VENUE_MAP_URL } from '../constants';
import VenueMap from './VenueMap';

// All-day 5–6 Oct event (Google's all-day end date is exclusive), so no finale times are invented.
const GOOGLE_CALENDAR_URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
  'BUILDATHON 2026 - Future Forge'
)}&dates=20261005/20261007&details=${encodeURIComponent(
  'Build day on 5 Oct (50 shortlisted teams) and Grand Finale on 6 Oct (Top 10 teams).'
)}&location=${encodeURIComponent('VELS University - Thiruvanmiyur Campus, Chennai, Tamil Nadu')}`;

const CARD =
  'card-brutal group relative bg-white rounded-3xl p-6 sm:p-7 flex flex-1 items-start gap-5';
const ICON =
  'w-12 h-12 rounded-2xl bg-zinc-100 border-2 border-zinc-950 flex items-center justify-center text-zinc-900 shrink-0 group-hover:bg-[#ffd000] transition-colors';

// "When and where" block shown right under About: venue, dates and the venue map.
export default function EventDetails() {
  return (
    <section id="details" className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
        <span className="text-xs font-mono font-bold tracking-widest text-zinc-500">
          {'// when_and_where'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* Venue + dates */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <a
            href={VENUE_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open VELS University Thiruvanmiyur Campus in Google Maps"
            className={CARD}
          >
            <div className={ICON}>
              <MapPin className="w-6 h-6" />
            </div>
            <div className="flex-1 pr-6">
              <span className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1">
                OFFICIAL VENUE
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-zinc-950 uppercase tracking-tight mb-1">
                THIRUVANMIYUR CAMPUS
              </h3>
              <p className="text-sm text-zinc-600">VELS University, Chennai</p>
            </div>
            <ExternalLink className="absolute top-5 right-5 w-4 h-4 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
          </a>

          <a
            href={GOOGLE_CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Add BUILDATHON 2026 to your Google Calendar"
            className={CARD}
          >
            <div className={ICON}>
              <Calendar className="w-6 h-6" />
            </div>
            <div className="flex-1 pr-6">
              <span className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1">
                EVENT DATES
              </span>
              <h3 className="font-mono text-xl sm:text-2xl font-extrabold text-zinc-950 tracking-tight mb-1">
                05.10.2026 - 06.10.2026
              </h3>
              <p className="text-sm text-zinc-600">5 Oct: Build Day · 6 Oct: Grand Finale</p>
            </div>
            <ExternalLink className="absolute top-5 right-5 w-4 h-4 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
          </a>
        </div>

        {/* Venue map */}
        <div className="lg:col-span-7">
          <VenueMap />
        </div>

      </div>
    </section>
  );
}
