import { useState } from 'react';
import { Layers, Compass } from 'lucide-react';
import { REGISTER_URL } from '../constants';
import useActiveSection from '../hooks/useActiveSection';
import scrollToSection from '../utils/scrollToSection';

const FLOORS = [
  { id: 'hero', name: 'HOME', label: '00 / HOME' },
  { id: 'challenges', name: 'CHALLENGES', label: '01 / CHALLENGES' },
  { id: 'about', name: 'ABOUT', label: '02 / ABOUT' },
  { id: 'timeline', name: 'TIMELINE', label: '03 / TIMELINE' },
  { id: 'rules', name: 'RULES', label: '04 / RULES & FAQ' },
  { id: 'prizes', name: 'PRIZES', label: '05 / PRIZES' },
  { id: 'sponsors', name: 'SPONSORS', label: '06 / SPONSORS' },
  { id: 'register', name: 'REGISTER', label: 'EXIT / REGISTER' }
];

const FLOOR_IDS = FLOORS.map((f) => f.id);

export default function MuseumHUD() {
  const activeFloor = useActiveSection(FLOOR_IDS, 300);
  const [isExpanded, setIsExpanded] = useState(false);

  const goTo = (id) => {
    setIsExpanded(false);
    if (id === 'register') {
      window.open(REGISTER_URL, '_blank', 'noopener,noreferrer');
      return;
    }
    scrollToSection(id);
  };

  const currentFloorObj = FLOORS.find((f) => f.id === activeFloor) || FLOORS[0];

  // Not needed on the first screen, where it would sit on top of the countdown.
  if (activeFloor === 'hero') return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <div className="relative">
        {/* Expanded Floor Index Menu */}
        {isExpanded && (
          <div className="absolute bottom-14 right-0 w-64 bg-white border border-black/10 rounded-2xl shadow-2xl p-3 mb-2 animate-popIn">
            <div className="px-3 py-2 border-b border-black/5 flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">BUILDATHON DIRECTORY</span>
              <Compass className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <div className="space-y-1 max-h-72 overflow-y-auto">
              {FLOORS.map((floor) => {
                const isActive = activeFloor === floor.id;
                return (
                  <button
                    key={floor.id}
                    onClick={() => goTo(floor.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-zinc-900 text-white font-semibold shadow-sm'
                        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                    }`}
                  >
                    <span>{floor.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Floating Elevator Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 bg-white border border-black/10 px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:border-black/20 transition-[box-shadow,border-color] text-xs font-mono text-zinc-800 cursor-pointer"
        >
          <div className="w-2 h-2 rounded-full bg-[#ffd000] border border-zinc-900 animate-ping" />
          <span className="font-medium">{currentFloorObj.label}</span>
          <Layers className="w-4 h-4 text-zinc-400" />
        </button>
      </div>
    </div>
  );
}

