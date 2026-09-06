import { RiseLoader, MoonLoader } from "react-spinners";

const Loading = ({ className = "", variant = "loading", text = "Loading" }) => {
  if (variant === "fetching") {
    return (
      <li
        className={`flex flex-col w-full items-center justify-center gap-2 ${className}`}
      >
        <MoonLoader
          color="var(--color-muted)"
          size={15}
          speedMultiplier={0.8}
          aria-label={text}
        />
        <p className="text-xs font-medium tracking-wide text-muted">{text}</p>
      </li>
    );
  }

  return (
    <li
      className={`flex w-full flex-col items-center justify-center gap-4 ${className}`}
    >
      <RiseLoader
        color="var(--color-primary)"
        size={10}
        speedMultiplier={0.8}
        aria-label={text}
      />

      <p className="text-base font-semibold tracking-wide text-primary">
        {text}
      </p>
    </li>
  );
};

export default Loading;
