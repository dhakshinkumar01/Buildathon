import { useState, useEffect, useRef } from 'react';

// One-shot "has this element scrolled into view" hook.
// Falls back to visible when IntersectionObserver is unavailable.
export default function useReveal(threshold = 0.05) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(
    () => typeof window === 'undefined' || !('IntersectionObserver' in window)
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, visible]);

  return [ref, visible];
}
