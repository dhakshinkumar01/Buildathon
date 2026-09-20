import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { REGISTER_URL } from '../constants';

// Bottom Register bar for phones. Slides in once the hero has scrolled out of view.
export default function StickyRegister() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      // Show after the hero, but step aside once the page's own "Join the movement" button is on screen.
      const cta = document.getElementById('register');
      const ctaOnScreen = cta ? cta.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(window.scrollY > 600 && !ctaOnScreen);
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
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white border-t-2 border-zinc-950 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full invisible'
      }`}
    >
      <a
        href={REGISTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-yellow-pill flex items-center justify-center gap-2 w-full py-3.5 font-mono text-sm font-extrabold uppercase border-2 border-zinc-950"
      >
        <span>Register Now</span>
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}
