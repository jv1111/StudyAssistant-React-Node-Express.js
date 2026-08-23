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
      ? "cursor-pointer border-0 bg-transparent p-0 text-sm text-primary hover:text-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      : `flex min-h-12 ${
          fit ? "w-fit" : "w-full"
        } cursor-pointer items-center justify-center rounded-xl border px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50`;

  const variants = {
    primary:
      "border-primary/40 bg-primary/15 text-foreground hover:border-primary/60 hover:bg-primary/25",

    secondary:
      "border-accent/30 bg-accent/10 text-accent hover:border-accent/50 hover:bg-accent/15 hover:text-foreground",

    danger:
      "border-danger/40 bg-danger/10 text-danger hover:border-danger/60 hover:bg-danger/20",

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
