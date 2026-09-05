import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <li className="flex flex-col min-h-full gap-2 w-full items-center justify-center">
      <MoonLoader
        color="#c59b27"
        size={46}
        speedMultiplier={0.8}
        aria-label="Loading"
      />
      <p className="text-sm font-semibold tracking-wide text-muted">Loading</p>
    </li>
  );
};

export default Loading;
