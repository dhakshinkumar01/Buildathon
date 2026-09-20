const markLoaded = (el) => {
  if (el) el.dataset.loaded = 'true';
};

// <img> that fades in once it has loaded (see `img[data-fade]` in index.css).
// Uses a data attribute rather than state, so it never re-renders.
export default function FadeImage({ alt, ...props }) {
  return (
    <img
      data-fade=""
      alt={alt}
      {...props}
      ref={(el) => {
        if (el && el.complete && el.naturalWidth > 0) markLoaded(el);
      }}
      onLoad={(e) => markLoaded(e.currentTarget)}
      onError={(e) => markLoaded(e.currentTarget)}
    />
  );
}
