const GlassScrollableList = ({ children, onScroll }) => {
  return (
    <div className="relative mb-5 min-h-0 flex-1">
      <ul
        onScroll={onScroll}
        className="absolute inset-0 z-10 flex w-full flex-col gap-5 overflow-y-auto pb-24 pt-2 pr-2 sm:pr-4"
      >
        {children}
      </ul>
    </div>
  );
};

export default GlassScrollableList;
