// Height-animated show/hide (see `.collapse` in index.css). Content stays mounted; when closed it is
// hidden from keyboard and screen readers.
export default function Collapse({ open, id, children }) {
  return (
    <div id={id} className={`collapse${open ? ' is-open' : ''}`}>
      <div className="collapse-inner">{children}</div>
    </div>
  );
}
