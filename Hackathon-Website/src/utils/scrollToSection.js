import prefersReducedMotion from '../hooks/useReducedMotion';

// Scrolls to the section with the given id. The landing offset comes from each
// section's `scroll-mt-24` class (clears the fixed header), so do not add
// scroll-padding on <html> as well or every jump lands twice as far down.
export default function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return false;

  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'instant' : 'smooth',
    block: 'start'
  });

  // Keep the URL shareable without adding a history entry per click.
  if (window.history && typeof window.history.replaceState === 'function') {
    window.history.replaceState(null, '', `#${id}`);
  }
  return true;
}
