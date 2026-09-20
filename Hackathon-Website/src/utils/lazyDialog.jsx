import { lazy, Suspense, useState } from 'react';

// Wraps a popup so its code is only downloaded the first time it opens.
// `Dialog.preload()` fetches it early (e.g. when the browser is idle).
export default function lazyDialog(loader) {
  const Inner = lazy(loader);

  function LazyDialog(props) {
    const [wanted, setWanted] = useState(Boolean(props.isOpen));
    if (props.isOpen && !wanted) setWanted(true);
    if (!wanted) return null;

    return (
      <Suspense fallback={null}>
        <Inner {...props} />
      </Suspense>
    );
  }

  LazyDialog.preload = loader;
  return LazyDialog;
}
