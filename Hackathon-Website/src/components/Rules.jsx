import { useState } from 'react';
import { ChevronDown, Download, FileText } from 'lucide-react';
import { FAQ } from '../data/faq';
import { DOWNLOADS } from '../data/downloads';
import Collapse from './Collapse';

export default function Rules() {
  const [openIndexes, setOpenIndexes] = useState(() => new Set());

  const toggle = (idx) =>
    setOpenIndexes((current) => {
      const updated = new Set(current);
      if (updated.has(idx)) updated.delete(idx);
      else updated.add(idx);
      return updated;
    });

  return (
    <section id="rules" className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto scroll-mt-24">
      {/* Indicator Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
        <span className="text-xs font-mono font-bold tracking-widest text-zinc-500">
          {'// rules_and_faq'}
        </span>
      </div>

      <div className="mb-12">
        <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-zinc-950 uppercase tracking-tight mb-3">
          RULES &amp; FAQ
        </h2>
        <p className="text-base text-zinc-500 max-w-2xl">
          Everything teams need to know before registering: how selection works, what to submit, and the ground rules for build day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Accordion */}
        <div className="lg:col-span-8 space-y-3">
          {FAQ.map((item, idx) => {
            const isOpen = openIndexes.has(idx);
            const panelId = `faq-panel-${idx}`;
            return (
              <div
                key={item.q}
                className={`bg-white border-2 border-zinc-950 rounded-2xl transition-shadow ${
                  isOpen ? 'shadow-[4px_4px_0_#ffd000]' : 'shadow-[4px_4px_0_#0c0c0e]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer px-5 sm:px-6 py-4 font-heading text-base sm:text-lg font-bold text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded-2xl"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-zinc-700 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <Collapse open={isOpen} id={panelId}>
                  <div className="px-5 sm:px-6 pb-5 text-sm text-zinc-600 leading-relaxed space-y-3 border-t border-zinc-100 pt-4">
                    {item.a && <p>{item.a}</p>}
                    {item.list && (
                      item.ordered ? (
                        <ol className="list-decimal pl-5 space-y-1.5">
                          {item.list.map((point) => <li key={point}>{point}</li>)}
                        </ol>
                      ) : (
                        <ul className="list-disc pl-5 space-y-1.5">
                          {item.list.map((point) => <li key={point}>{point}</li>)}
                        </ul>
                      )
                    )}
                  </div>
                </Collapse>
              </div>
            );
          })}
        </div>

        {/* Sidebar: downloads */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
          {DOWNLOADS.map((file) => (
            <div key={file.id} className="card-brutal bg-[#ffd000] rounded-3xl p-6">
              <div className="w-11 h-11 rounded-xl bg-zinc-950 text-[#ffd000] flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] font-bold text-zinc-800 uppercase tracking-widest block mb-1">
                {'// download'}
              </span>
              <h3 className="font-heading text-xl font-extrabold text-zinc-950 uppercase tracking-tight mb-2">
                {file.title}
              </h3>
              <p className="text-sm text-zinc-800 leading-relaxed mb-5">{file.description}</p>
              <a
                href={file.href}
                download={file.filename}
                className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-xs font-bold uppercase px-5 py-3 rounded-full transition-colors"
              >
                <Download className="w-4 h-4 text-[#ffd000]" />
                <span>{file.label}</span>
              </a>
            </div>
          ))}
        </aside>

      </div>
    </section>
  );
}
