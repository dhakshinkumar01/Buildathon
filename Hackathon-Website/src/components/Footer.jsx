import { Calendar, MapPin, Mail, Phone, AtSign } from 'lucide-react';
import { CONTACT } from '../constants';
import logoIcon from '../assets/logo-icon.webp';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/8 pt-16 pb-28 md:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-100">

          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoIcon} alt="" width={44} height={44} className="w-11 h-11 object-contain shrink-0" />
              <div>
                <h3 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-zinc-950">
                  BUILDATHON
                </h3>
                <p className="font-grotesk text-xs text-zinc-500 font-semibold tracking-wider uppercase">
                  Future Forge - Shaping Tomorrow with Technology
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-500 max-w-md leading-relaxed font-normal">
              A 10-hour build event where teams of 3–4 turn real-world problem statements into working prototypes.
            </p>

            <div className="pt-4 border-t border-zinc-100 max-w-md">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                ORGANISED BY
              </span>
              <p className="font-heading text-lg font-extrabold uppercase tracking-tight leading-tight text-zinc-950">
                Department of Computer Science &amp; Engineering
              </p>
              <p className="mt-1 text-xs text-zinc-500 leading-relaxed font-mono">
                School of Engineering, VELS Institute of Science, Technology &amp; Advanced Studies (VISTAS)
              </p>
            </div>
          </div>

          {/* Location, Dates & Contact Column */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs text-zinc-600">
            <span className="font-bold text-zinc-500 uppercase tracking-widest block mb-2">
              EVENT &amp; CONTACT
            </span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-950 shrink-0" />
              <span>Thiruvanmiyur Campus</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-950 shrink-0" />
              <span>05.10.2026 - 06.10.2026</span>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-zinc-100">
              <Mail className="w-4 h-4 text-zinc-950 shrink-0" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-zinc-950 underline break-all">
                {CONTACT.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <AtSign className="w-4 h-4 text-zinc-950 shrink-0" />
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-950 underline"
              >
                Instagram {CONTACT.instagramHandle}
              </a>
            </div>
            <div className="pt-3 border-t border-zinc-100 space-y-2">
              <span className="font-bold text-zinc-500 uppercase tracking-widest block">
                STUDENT COORDINATORS
              </span>
              {CONTACT.coordinators.map((c) => (
                <div key={c.phone} className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-zinc-950 shrink-0" />
                  <a href={`tel:+91${c.phone}`} className="hover:text-zinc-950">
                    {c.name} - <span className="underline">{c.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-2 font-mono text-xs text-zinc-600">
            <span className="font-bold text-zinc-500 uppercase tracking-widest block mb-2">
              NAVIGATION
            </span>
            <ul className="space-y-2 uppercase">
              <li><a href="#challenges" className="hover:text-zinc-950 transition-colors">CHALLENGES</a></li>
              <li><a href="#about" className="hover:text-zinc-950 transition-colors">ABOUT</a></li>
              <li><a href="#timeline" className="hover:text-zinc-950 transition-colors">TIMELINE</a></li>
              <li><a href="#rules" className="hover:text-zinc-950 transition-colors">RULES &amp; FAQ</a></li>
              <li><a href="#prizes" className="hover:text-zinc-950 transition-colors">PRIZES</a></li>
              <li><a href="#sponsors" className="hover:text-zinc-950 transition-colors">SPONSORS</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <p>© 2026 BUILDATHON. ALL RIGHTS RESERVED.</p>
        </div>

      </div>
    </footer>
  );
}
