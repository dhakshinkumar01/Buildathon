import lazyDialog from '../utils/lazyDialog';

// The search popup is only downloaded the first time it is opened.
const LazySearchModal = lazyDialog(() => import('./SearchModal'));

export default LazySearchModal;
