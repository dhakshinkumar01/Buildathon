import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import useDialogFocus from '../hooks/useDialogFocus';
import usePresence from '../hooks/usePresence';
import { Calendar, X, Download, ExternalLink, Bell } from 'lucide-react';

const DAY1_SCHEDULE = [
  {
    num: '01',
    time: '8:00 AM',
    title: 'CHECK-IN & REGISTRATION',
    desc: 'Team ID and attendance verification, badges and kits, seating and team allocation.'
  },
  {
    num: '02',
    time: '8:45 AM',
    title: 'OPENING & RULES',
    desc: 'Welcome, rules briefing, problem statements, evaluation criteria, submission format and escalation process.'
  },
  {
    num: '03',
    time: '9:00 AM',
    title: 'BUILDING SPRINT 1',
    desc: 'Teams build their first working version.'
  },
  {
    num: '04',
    time: '12:00 PM',
    title: 'PROGRESS REVIEW',
    desc: 'A checkpoint on problem, approach, architecture, progress and blockers. Not an elimination round.'
  },
  {
    num: '05',
    time: '1:00 PM',
    title: 'LUNCH BREAK',
    desc: 'Lunch, with coordinator and technical support on hand.'
  },
  {
    num: '06',
    time: '2:00 PM',
    title: 'BUILDING SPRINT 2',
    desc: 'Refine, test, document and prepare the demo.'
  },
  {
    num: '07',
    time: '4:30 PM',
    title: 'FINAL REVIEW',
    desc: 'All 50 teams are evaluated on their prototype. The Top 10 finalists are selected.'
  },
  {
    num: '08',
    time: '6:00 PM',
    title: 'WRAP-UP',
    desc: 'Scores finalized, Top 10 announced and Grand Finale instructions shared.'
  }
];

const DAY2_SCHEDULE = [
  {
    num: '01',
    time: 'TBA',
    title: 'REPORTING & SETUP',
    desc: 'Finalists report to campus, set up and submit the required final materials.'
  },
  {
    num: '02',
    time: 'TBA',
    title: 'FINAL PPT PRESENTATION',
    desc: 'Present the original solution and the final prototype story.'
  },
  {
    num: '03',
    time: 'TBA',
    title: 'LIVE PROTOTYPE DEMO',
    desc: 'Demonstrate the working prototype and its key user flow.'
  },
  {
    num: '04',
    time: 'TBA',
    title: 'JUDGE PANEL Q&A',
    desc: 'Judges question the team on problem, technology, innovation, feasibility and scalability.'
  },
  {
    num: '05',
    time: 'TBA',
    title: 'SCORING & DELIBERATION',
    desc: 'Judges consolidate scores and finalize the winners.'
  },
  {
    num: '06',
    time: 'TBA',
    title: 'WINNER ANNOUNCEMENT',
    desc: 'Winners are announced and prizes are distributed.'
  }
];
export default function EventScheduleModal({ isOpen, onClose }) {
  const dialogRef = useRef(null);

  // Scroll lock, focus handling and Tab trapping (a closed instance never touches the page lock).
  const { mounted, closing } = usePresence(isOpen);
  useDialogFocus(dialogRef, mounted);

  // Escape closes
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  // Download .ics Calendar File
  const generateICSFile = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//BUILDATHON 2026//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:buildathon-2026@futureforge2k26',
      'DTSTAMP:20260920T000000Z',
      'SUMMARY:BUILDATHON 2026 - Future Forge',
      'DESCRIPTION:Build day on 5 Oct (50 shortlisted teams) and Grand Finale on 6 Oct (Top 10 teams).',
      'LOCATION:VELS University - Thiruvanmiyur Campus\\, Chennai\\, Tamil Nadu',
      'DTSTART;VALUE=DATE:20261005',
      'DTEND;VALUE=DATE:20261007',
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: BUILDATHON 2026 is tomorrow!',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'BUILDATHON_2026_Reminder.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'BUILDATHON 2026 - Future Forge'
  )}&dates=20261005/20261007&details=${encodeURIComponent(
    'Build day on 5 Oct (50 shortlisted teams) and Grand Finale on 6 Oct (Top 10 teams).'
  )}&location=${encodeURIComponent(
    'VELS University - Thiruvanmiyur Campus, Chennai, Tamil Nadu'
  )}`;

  return createPortal(
    <div
      ref={dialogRef}
      tabIndex={-1}
      className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/70 outline-none ${
        closing ? 'animate-fadeOut pointer-events-none' : 'animate-fadeIn'
      }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-modal-title"
    >
      {/* Modal Container */}
      <div 
        className={`bg-white border border-zinc-200 rounded-[24px] sm:rounded-[28px] shadow-2xl w-full max-w-[850px] max-h-[85vh] flex flex-col overflow-hidden relative my-auto ${
          closing ? 'animate-popOut' : 'animate-popIn'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Sticky Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-zinc-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#ffd000] text-zinc-950 flex items-center justify-center font-bold shadow-sm shrink-0">
              <Calendar className="w-5 h-5 text-zinc-950" />
            </div>
            <div>
              <h3 id="schedule-modal-title" className="font-heading text-xl sm:text-2xl font-extrabold text-zinc-950 uppercase tracking-tight leading-none mb-1">
                EVENT SCHEDULE
              </h3>
              <span className="font-mono text-xs font-bold text-zinc-500">
                05.10.2026 - 06.10.2026
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 hover:text-zinc-950 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto overscroll-contain space-y-8 text-zinc-900">
          
          {/* KEY DETAILS Pill Grid */}
          <div>
            <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-3">
              KEY DETAILS
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3.5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block mb-1">
                  DURATION
                </span>
                <span className="font-heading text-sm font-bold text-zinc-950 uppercase">
                  2 Days
                </span>
              </div>

              <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3.5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block mb-1">
                  VENUE
                </span>
                <span className="font-heading text-sm font-bold text-zinc-950 uppercase truncate block">
                  Thiruvanmiyur Campus
                </span>
              </div>

              <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3.5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block mb-1">
                  TEAM SIZE
                </span>
                <span className="font-heading text-sm font-bold text-zinc-950 uppercase truncate block">
                  3–4 Members
                </span>
              </div>

              <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3.5 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block mb-1">
                  REGISTRATION
                </span>
                <div className="flex items-center gap-1.5 font-heading text-sm font-bold text-zinc-950 uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#ffd000] animate-pulse" />
                  <span>Open</span>
                </div>
              </div>
            </div>
          </div>

          {/* Day 1 & Day 2 Timelines (2-Column Grid on Desktop, Single-Column on Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-zinc-100">
            
            {/* DAY 01 */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-6 border-b border-zinc-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ffd000]" />
                    <h4 className="font-heading text-xl font-extrabold text-zinc-950 uppercase tracking-tight">
                      DAY 01
                    </h4>
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-500 block mt-0.5">
                    05 OCTOBER 2026
                  </span>
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-bold border border-zinc-200 uppercase">
                  BUILD DAY · 50 TEAMS
                </span>
              </div>

              <div className="space-y-4 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-zinc-200">
                {DAY1_SCHEDULE.map((item) => (
                  <div
                    key={item.num}
                    className="bg-[#fcfcfd] border border-zinc-200 hover:border-zinc-300 rounded-2xl p-4 pl-12 relative shadow-sm transition-[box-shadow,border-color] hover:shadow-md"
                  >
                    <span className="absolute left-2.5 top-4 w-3.5 h-3.5 rounded-full bg-white border-2 border-zinc-950 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffd000]" />
                    </span>

                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                        {item.time}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-zinc-500">
                        STEP {item.num}
                      </span>
                    </div>

                    <h5 className="font-heading text-base font-bold text-zinc-950 uppercase mb-1">
                      {item.title}
                    </h5>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* DAY 02 */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-6 border-b border-zinc-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ffd000]" />
                    <h4 className="font-heading text-xl font-extrabold text-zinc-950 uppercase tracking-tight">
                      DAY 02
                    </h4>
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-500 block mt-0.5">
                    06 OCTOBER 2026
                  </span>
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-bold border border-zinc-200 uppercase">
                  GRAND FINALE · TOP 10
                </span>
              </div>

              <div className="space-y-4 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-zinc-200">
                {DAY2_SCHEDULE.map((item) => (
                  <div
                    key={item.num}
                    className="bg-[#fcfcfd] border border-zinc-200 hover:border-zinc-300 rounded-2xl p-4 pl-12 relative shadow-sm transition-[box-shadow,border-color] hover:shadow-md"
                  >
                    <span className="absolute left-2.5 top-4 w-3.5 h-3.5 rounded-full bg-white border-2 border-zinc-950 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffd000]" />
                    </span>

                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                        {item.time}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-zinc-500">
                        STEP {item.num}
                      </span>
                    </div>

                    <h5 className="font-heading text-base font-bold text-zinc-950 uppercase mb-1">
                      {item.title}
                    </h5>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-mono text-[11px] text-zinc-500">
                Grand Finale timings will be shared with the finalists after the build day.
              </p>
            </div>

          </div>

          {/* Add to Calendar / Reminders bar */}
          <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs text-zinc-600 font-mono">
              <Bell className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Set a reminder so you don't miss the Buildathon event.</span>
            </div>
            
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={generateICSFile}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-xs font-bold uppercase transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#ffd000]" />
                <span>.ICS Event</span>
              </button>

              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-950 font-mono text-xs font-bold uppercase transition-colors inline-flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-zinc-600" />
                <span>Google Cal</span>
              </a>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-zinc-50 px-6 sm:px-8 py-4 border-t border-zinc-100 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-500">
            BUILDATHON 2026 • 5–6 OCTOBER
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-zinc-950 text-white font-mono text-xs font-bold uppercase hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
          >
            Close Schedule
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
