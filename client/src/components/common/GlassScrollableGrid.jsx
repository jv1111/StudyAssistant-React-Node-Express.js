const GlassScrollableGrid = ({ children, onScroll }) => {
  return (
    <div className="relative mb-5 min-h-0 flex-1">
      <div className="absolute inset-y-0 left-0 right-6 sm:right-8 rounded-2xl border border-primary/10 bg-surface/60 shadow-gold-glow ring-1 ring-inset ring-white/50 backdrop-blur-md">
        <div className="absolute inset-x-0 -top-px h-0.5 rounded-t-2xl bg-linear-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <ul
        onScroll={onScroll}
        className="absolute inset-0 z-10 grid grid-cols-1 gap-6 overflow-y-auto p-4 pt-10 pb-24 pr-11 sm:grid-cols-2 sm:p-6 sm:pt-10 sm:pr-16 lg:grid-cols-3"
      >
        {children}
      </ul>

      <div className="pointer-events-none absolute left-0 right-6 sm:right-8 top-0 z-20 h-10 rounded-t-2xl bg-linear-to-b from-[#fdfbf6] to-transparent" />
      {/* Bottom Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-6 sm:right-8 z-20 h-24 rounded-b-2xl bg-linear-to-t from-[#fdfbf6] to-transparent" />
    </div>
  );
};

export default GlassScrollableGrid;
