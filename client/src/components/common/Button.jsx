const Button = ({
  children,
  type = "button",
  variant = "primary",
  href,
  disabled = false,
  onClick,
  className = "",
  fit = false,
  icon: Icon,
  iconOnly = false,
  title,
}) => {
  const baseStyles = iconOnly
    ? "flex h-8 w-8 items-center justify-center rounded-full transition-colors cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-auto"
    : variant === "link"
      ? "border-0 bg-transparent p-0 text-sm font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-auto"
      : variant === "card"
        ? "group flex flex-col justify-between rounded-xl border border-border bg-background-secondary/40 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary-light/40 hover:shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-auto"
        : variant === "unstyled"
          ? "cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-auto"
          : `flex min-h-12 ${
              fit ? "w-fit" : "w-full"
            } items-center justify-center rounded-(--radius-input) px-5 text-sm font-bold transition-all duration-200 cursor-pointer active:scale-[0.99] disabled:cursor-not-allowed disabled:pointer-events-auto disabled:active:scale-100`;

  const variants = {
    primary:
      "bg-primary text-white shadow-(--shadow-button) hover:bg-primary-hover border border-primary/20 disabled:bg-[linear-gradient(45deg,var(--color-primary-light)_25%,transparent_25%,transparent_50%,var(--color-primary-light)_50%,var(--color-primary-light)_75%,transparent_75%,transparent)] disabled:bg-[length:16px_16px] disabled:bg-background-secondary disabled:text-primary/50 disabled:border-primary/20 disabled:shadow-none disabled:hover:bg-background-secondary",

    secondary:
      "border border-border bg-background-secondary text-foreground shadow-sm hover:bg-primary-light hover:border-primary/50 hover:text-primary hover:shadow-(--shadow-button) disabled:bg-background-secondary/60 disabled:text-muted/70 disabled:border-border/60 disabled:shadow-none disabled:hover:bg-background-secondary/60 disabled:hover:border-border disabled:hover:text-muted/70",
    danger:
      "border border-danger/20 bg-danger/10 text-danger hover:bg-danger/20 disabled:bg-[linear-gradient(45deg,rgba(220,38,38,0.04)_25%,transparent_25%,transparent_50%,rgba(220,38,38,0.04)_50%,rgba(220,38,38,0.04)_75%,transparent_75%,transparent)] disabled:bg-[length:16px_16px] disabled:bg-background-secondary disabled:text-danger/40 disabled:border-danger/15 disabled:shadow-none disabled:hover:bg-background-secondary",

    success:
      "border border-success/20 bg-success/10 text-success hover:bg-success/20 disabled:bg-[linear-gradient(45deg,rgba(22,163,74,0.04)_25%,transparent_25%,transparent_50%,rgba(22,163,74,0.04)_50%,rgba(22,163,74,0.04)_75%,transparent_75%,transparent)] disabled:bg-[length:16px_16px] disabled:bg-background-secondary disabled:text-success/40 disabled:border-success/15 disabled:shadow-none disabled:hover:bg-background-secondary",

    ghost:
      "border-transparent bg-transparent text-muted hover:bg-primary-light hover:text-primary disabled:bg-transparent disabled:text-muted/40 disabled:hover:bg-background-secondary/40 disabled:hover:text-muted/60",

    link: "text-primary hover:text-primary-hover disabled:text-muted/50 disabled:hover:text-muted/50 disabled:no-underline",

    card: "disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:border-border disabled:hover:bg-background-secondary/40 disabled:hover:shadow-none",

    unstyled: "",
  };

  const buttonClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={buttonClassName}
        title={title}
        aria-disabled={disabled}
      >
        {Icon && <Icon size={16} />}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      title={title}
      className={buttonClassName}
    >
      {Icon && <Icon size={16} />}
      {!iconOnly && children}
    </button>
  );
};

export default Button;
