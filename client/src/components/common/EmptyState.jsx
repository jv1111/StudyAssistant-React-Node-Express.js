import { Search } from "react-bootstrap-icons";

import Panel from "./Panel";

const EmptyState = ({
  title = "Nothing here yet",
  description,
  icon: Icon = Search,
}) => {
  return (
    <Panel
      className="flex h-full w-full flex-col items-center justify-center px-6 py-16 text-center"
      role="status"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary-light text-primary shadow-2xs">
        <Icon size={26} />
      </div>

      <h3 className="text-lg font-bold text-foreground">{title}</h3>

      {description && (
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
          {description}
        </p>
      )}
    </Panel>
  );
};

export default EmptyState;
