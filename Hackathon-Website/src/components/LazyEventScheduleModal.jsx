import lazyDialog from '../utils/lazyDialog';

// The schedule popup is only downloaded the first time it is opened.
const LazyEventScheduleModal = lazyDialog(() => import('./EventScheduleModal'));

export default LazyEventScheduleModal;
