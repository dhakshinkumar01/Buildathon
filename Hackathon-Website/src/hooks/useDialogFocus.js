import { useEffect } from 'react';

const FOCUSABLE = 'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])';

// Dialog behaviour shared by the popups: locks page scroll while open, moves focus into the
// dialog, keeps Tab inside it, and restores both when it closes. The caller handles Escape.
// `ref` must point at the dialog element (give it tabIndex={-1}).
export default function useDialogFocus(ref, isOpen) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const dialog = ref.current;
    if (dialog && !dialog.contains(document.activeElement)) dialog.focus();

    const onKeyDown = (e) => {
      if (e.key !== 'Tab' || !dialog) return;

      const nodes = Array.from(dialog.querySelectorAll(FOCUSABLE)).filter((n) => !n.disabled);
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus();
    };
  }, [ref, isOpen]);
}
