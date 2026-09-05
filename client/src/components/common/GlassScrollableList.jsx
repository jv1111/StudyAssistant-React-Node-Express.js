import Panel from "../common/Panel";

const GlassScrollableList = ({ children, onScroll }) => {
  return (
    <Panel className="mb-5 flex h-full w-full overflow-hidden px-4 py-2">
      <ul
        onScroll={onScroll}
        className="flex w-full flex-col gap-2 overflow-y-auto pb-24 pt-2 pr-2 sm:pr-4"
      >
        {children}
      </ul>
    </Panel>
  );
};

export default GlassScrollableList;
