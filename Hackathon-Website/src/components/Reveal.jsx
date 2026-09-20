import useReveal from '../hooks/useReveal';

// Fades a block up once it scrolls into view. See `.reveal` in index.css.
// `delay` (ms) staggers neighbouring blocks.
export default function Reveal({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
