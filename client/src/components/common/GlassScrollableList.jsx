import Panel from "./Panel";

const GlassScrollableList = ({ children, onScroll }) => {
  return (
    <Panel className="h-full w-full min-h-0 flex-1 flex-col py-2 px-4 ">
      <div
        onScroll={onScroll}
        className="flex h-full w-full overflow-y-auto overflow-x-hidden pr-4 py-2"
      >
        <ul className="flex w-full flex-col gap-4">{children}</ul>
      </div>
    </Panel>
  );
};

export default GlassScrollableList;
