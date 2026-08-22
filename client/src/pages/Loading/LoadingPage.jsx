import { MoonLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5">
      <MoonLoader
        color="#7c6cff"
        size={50}
        speedMultiplier={0.8}
        aria-label="Loading"
      />

      <p className="text-sm font-medium text-muted">Loading...</p>
    </main>
  );
};

export default LoadingPage;
