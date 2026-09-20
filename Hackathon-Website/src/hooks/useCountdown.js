import { useSyncExternalStore } from 'react';
import { EVENT_START, DAY2_START, EVENT_OVER } from '../constants';

const start = new Date(EVENT_START).getTime();
const day2 = new Date(DAY2_START).getTime();
const over = new Date(EVENT_OVER).getTime();

// One shared 1-second clock for the whole page. It starts with the first subscriber and
// stops when the last one leaves, instead of every component running its own timer.
const listeners = new Set();
let timer = null;

function subscribe(listener) {
  listeners.add(listener);
  if (timer === null) {
    timer = setInterval(() => listeners.forEach((notify) => notify()), 1000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };
}

// phase: 'before' | 'day1' (build day) | 'day2' (grand finale) | 'over'
function compute(now) {
  const diff = start - now;

  if (diff > 0) {
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      isLive: false,
      phase: 'before'
    };
  }

  const phase = now >= over ? 'over' : now >= day2 ? 'day2' : 'day1';
  return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: phase !== 'over', phase };
}

// One cached snapshot per interval length (1000, 30000, 60000 ...). The snapshot only changes when that
// interval rolls over, so React sees a stable value between ticks and each caller re-renders only when
// its own interval rolls over, not on every shared 1-second tick.
const snapshots = new Map();

function getSnapshot(intervalMs) {
  const now = Date.now();
  const bucket = Math.floor(now / intervalMs);
  const cached = snapshots.get(intervalMs);
  if (cached && cached.bucket === bucket) return cached.value;

  const value = compute(now);
  snapshots.set(intervalMs, { bucket, value });
  return value;
}

// `intervalMs` is how often this caller wants fresh values.
export default function useCountdown(intervalMs = 1000) {
  return useSyncExternalStore(
    subscribe,
    () => getSnapshot(intervalMs),
    () => getSnapshot(intervalMs)
  );
}
