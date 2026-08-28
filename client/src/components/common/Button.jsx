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
    ? "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50"
    : variant === "link"
      ? "cursor-pointer border-0 bg-transparent p-0 text-sm font-semibold text-primary hover:text-primary-hover disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
      : variant === "card"
        ? "group flex flex-col justify-between rounded-xl border border-border bg-background-secondary/40 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary-light/40 hover:shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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
    card: "",
  };

  const buttonClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={buttonClassName} title={title}>
        {Icon && <Icon size={iconOnly ? 16 : 16} />}
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
      {Icon && <Icon size={iconOnly ? 16 : 16} />}
      {!iconOnly && children}
    </button>
  );
};

export default Button;
