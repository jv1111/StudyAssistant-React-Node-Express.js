import Loading from "./Loading";
import Panel from "./Panel";

const GlassScrollableList = ({ children, onScroll, isLoading }) => {
  return (
    <Panel className="h-full w-full min-h-0 flex-1 flex-col py-2 px-4">
      <div
        onScroll={onScroll}
        className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden py-2 pr-4"
      >
        <ul
          className={`flex w-full flex-col gap-4 ${!isLoading ? "min-h-full" : ""}`}
        >
          {children}
        </ul>
        {isLoading && (
          <Loading variant="fetching" text="Please wait" className="mt-5" />
        )}
      </div>
    </Panel>
  );
};

export default GlassScrollableList;
