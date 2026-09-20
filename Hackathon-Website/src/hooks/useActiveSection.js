import { useState, useEffect } from 'react';

// Returns the id of the last section (from `ids`) whose top is above scrollY + offset.
// Scroll handling is throttled to one update per animation frame.
export default function useActiveSection(ids, offset = 200) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      const position = window.scrollY + offset;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        // getBoundingClientRect is independent of offsetParent, so wrappers
        // (e.g. scroll-reveal transforms) can't skew the measurement.
        if (el && position >= el.getBoundingClientRect().top + window.scrollY) {
          setActive(ids[i]);
          return;
        }
      }
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [ids, offset]);

  return active;
}
