import { useState, useEffect } from 'react';
import prefersReducedMotion from './useReducedMotion';

// Counts from 0 to `target` once `active` becomes true (ease-out cubic).
// Shows the final value immediately under prefers-reduced-motion (no animation, no extra render).
export default function useCountUp(target, active, duration = 1200) {
  const reduced = prefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || reduced) return undefined;

    let frame;
    const startedAt = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - startedAt) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration, reduced]);

  return reduced ? target : value;
}
