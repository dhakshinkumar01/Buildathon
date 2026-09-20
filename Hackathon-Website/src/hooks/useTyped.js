import { useState, useEffect } from 'react';
import prefersReducedMotion from './useReducedMotion';

// Types each word in turn, holds it, deletes it, then moves to the next.
// Under prefers-reduced-motion it returns all words joined, with no animation.
export default function useTyped(words, { typeMs = 90, deleteMs = 45, holdMs = 1200 } = {}) {
  const reduced = prefersReducedMotion();
  const [text, setText] = useState('');

  useEffect(() => {
    if (reduced) return;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const step = () => {
      const word = words[wordIndex];
      if (!deleting) {
        charIndex += 1;
        setText(word.slice(0, charIndex));
        if (charIndex === word.length) {
          deleting = true;
          timer = setTimeout(step, holdMs);
          return;
        }
        timer = setTimeout(step, typeMs);
      } else {
        charIndex -= 1;
        setText(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
        timer = setTimeout(step, deleteMs);
      }
    };

    timer = setTimeout(step, typeMs);
    return () => clearTimeout(timer);
  }, [words, reduced, typeMs, deleteMs, holdMs]);

  return reduced ? words.join(' ') : text;
}
