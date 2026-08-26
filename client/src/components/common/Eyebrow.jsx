const Eyebrow = ({ children }) => {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-xs font-bold tracking-widest text-primary border border-primary/20">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
};

export default Eyebrow;
