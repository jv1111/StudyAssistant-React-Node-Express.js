const Button = ({
  children,
  type = "button",
  variant = "primary",
  href,
  disabled = false,
  onClick,
  className = "",
  fit = false,
}) => {
  const baseStyles =
    variant === "link"
      ? "cursor-pointer border-0 bg-transparent p-0 text-sm text-primary transition-colors duration-200 hover:text-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      : `flex min-h-12 ${
          fit ? "w-fit" : "w-full"
        } cursor-pointer items-center justify-center rounded-xl border px-4 text-sm font-semibold backdrop-blur-xl transition-all duration-200 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50`;

  const variants = {
    primary:
      "border-primary/40 bg-primary/15 text-foreground shadow-[0_8px_25px_rgba(124,108,255,0.15)] hover:border-primary/60 hover:bg-primary/25 hover:shadow-[0_10px_30px_rgba(124,108,255,0.25)]",

    secondary:
      "border-accent/30 bg-accent/10 text-accent shadow-[0_6px_20px_rgba(110,231,225,0.08)] hover:border-accent/50 hover:bg-accent/15 hover:text-foreground hover:shadow-[0_8px_25px_rgba(110,231,225,0.15)]",

    danger:
      "border-danger/40 bg-danger/10 text-danger shadow-[0_6px_20px_rgba(255,135,157,0.08)] hover:border-danger/60 hover:bg-danger/20 hover:shadow-[0_8px_25px_rgba(255,135,157,0.15)]",

    ghost:
      "border-transparent bg-transparent text-muted hover:bg-white/5 hover:text-foreground",

    link: "",
  };

  const buttonClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={buttonClassName}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={buttonClassName}
    >
      {children}
    </button>
  );
};

export default Button;
