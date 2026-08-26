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
      ? "cursor-pointer border-0 bg-transparent p-0 text-sm font-semibold text-primary hover:text-primary-hover disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
      : `flex min-h-12 ${
          fit ? "w-fit" : "w-full"
        } cursor-pointer items-center justify-center rounded-(--radius-input) px-5 text-sm font-bold transition-all duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50`;

  const variants = {
    primary:
      "bg-primary text-white shadow-(--shadow-button) hover:bg-primary-hover border border-primary/20",

    secondary:
      "border border-border bg-background-secondary text-foreground hover:bg-border/40 hover:border-border",

    danger:
      "border border-danger/20 bg-danger/10 text-danger hover:bg-danger/20",

    ghost:
      "border-transparent bg-transparent text-muted hover:bg-primary-light hover:text-primary",

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
