const Button = ({
  children,
  type = "button",
  variant = "primary",
  href,
  disabled = false,
  onClick,
}) => {
  const baseStyles =
    variant === "link"
      ? "cursor-pointer border-0 bg-transparent p-0 text-sm text-primary transition-colors duration-200 hover:text-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      : "flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl border px-4 text-sm font-semibold backdrop-blur-xl transition-all duration-200 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "border-primary/40 bg-primary/15 text-foreground shadow-[0_8px_25px_rgba(124,108,255,0.15)] hover:border-primary/60 hover:bg-primary/25 hover:shadow-[0_10px_30px_rgba(124,108,255,0.25)]",

    secondary:
      "border-white/10 bg-white/5 text-foreground hover:border-white/20 hover:bg-white/10",

    ghost:
      "border-transparent bg-transparent text-muted hover:bg-white/5 hover:text-foreground",

    link: "",
  };

  const className = `${baseStyles} ${variants[variant]}`;

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
