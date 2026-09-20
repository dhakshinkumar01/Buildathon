import { CHALLENGES } from '../data/challenges';

const PROBLEM_COUNT = CHALLENGES.reduce((sum, c) => sum + c.problemStatements.length, 0);

const ITEMS = [
  '10 HOURS',
  '₹25,000 PRIZE POOL',
  `${CHALLENGES.length} DOMAINS`,
  `${PROBLEM_COUNT} PROBLEM STATEMENTS`,
  '05–06 OCT 2026',
  'THIRUVANMIYUR CAMPUS'
];

function Row({ hidden = false }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center font-mono text-sm sm:text-base font-extrabold text-zinc-950 uppercase tracking-wider">
          <span className="px-6 sm:px-8 whitespace-nowrap">{item}</span>
          <span className="text-zinc-950">✦</span>
        </span>
      ))}
    </div>
  );
}

// Yellow hazard-tape style marquee shown under the hero.
export default function Ticker() {
  return (
    <div className="overflow-hidden py-5" role="region" aria-label="Event highlights">
      <div className="marquee-pause -rotate-1 bg-[#ffd000] border-y-2 border-zinc-950 py-3 overflow-hidden">
        <div className="animate-marquee flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
    </div>
  );
}
