const Panel = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-2xl border border-border/80 bg-surface/60 backdrop-blur-md shadow-lg shadow-black/5 ${className}`}
    >
      {children}
    </div>
  );
};

export default Panel;
