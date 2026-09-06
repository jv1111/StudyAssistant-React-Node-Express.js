import Loading from "./Loading";
import Panel from "./Panel";

const GlassScrollableList = ({ children, onScroll, isFetchingMore }) => {
  return (
    <Panel className="flex h-full min-h-0 w-full flex-1 flex-col px-4 py-2">
      <div
        onScroll={onScroll}
        className="flex h-full w-full flex-col overflow-x-hidden overflow-y-auto py-2 pr-4"
      >
        <ul
          className={`flex w-full flex-col gap-4 ${
            !isFetchingMore ? "min-h-full" : ""
          }`}
        >
          {children}
        </ul>

        {isFetchingMore && (
          <Loading variant="fetching" text="Please wait" className="mt-5" />
        )}
      </div>
    </Panel>
  );
};

export default GlassScrollableList;
