import { useEffect, useState } from 'react';
import prefersReducedMotion from './useReducedMotion';

// Keeps a popup mounted for `exitMs` after it is closed so it can play a closing animation.
// `mounted`: render the popup. `closing`: it has been closed and is animating out.
export default function usePresence(isOpen, exitMs = 160) {
  const [mounted, setMounted] = useState(isOpen);
  if (isOpen && !mounted) setMounted(true);

  useEffect(() => {
    if (isOpen) return undefined;
    const timer = setTimeout(() => setMounted(false), prefersReducedMotion() ? 0 : exitMs);
    return () => clearTimeout(timer);
  }, [isOpen, exitMs]);

  return { mounted, closing: mounted && !isOpen };
}
