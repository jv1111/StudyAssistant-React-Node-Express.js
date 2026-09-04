const GlassScrollableList = ({ children, onScroll }) => {
  return (
    <div className="flex mb-5 h-full w-full">
      <ul
        onScroll={onScroll}
        className="flex w-full flex-col gap-2 overflow-y-auto pb-24 pt-2 pr-2 sm:pr-4"
      >
        {children}
      </ul>
    </div>
  );
};

export default GlassScrollableList;
