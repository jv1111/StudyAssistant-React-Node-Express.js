import { MoonLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 py-16">
      <MoonLoader
        color="#c59b27"
        size={46}
        speedMultiplier={0.8}
        aria-label="Loading"
      />
      <p className="text-sm font-semibold tracking-wide text-muted">
        Loading subjects...
      </p>
    </div>
  );
};

export default LoadingPage;
