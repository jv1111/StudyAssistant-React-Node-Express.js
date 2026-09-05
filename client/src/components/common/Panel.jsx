const Panel = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-2xl border border-dashed border-border bg-surface/50 ${className}`}
    >
      {children}
    </div>
  );
};

export default Panel;
