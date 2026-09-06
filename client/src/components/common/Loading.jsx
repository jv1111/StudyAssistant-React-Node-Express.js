import { RiseLoader } from "react-spinners";

const Loading = () => {
  return (
    <li className="flex min-h-full w-full flex-col items-center justify-center gap-4">
      <RiseLoader
        color="var(--color-primary)"
        size={10}
        speedMultiplier={0.8}
        aria-label="Loading"
      />

      <p className="text-base font-semibold tracking-wide text-primary">
        Loading
      </p>
    </li>
  );
};

export default Loading;
