const Badge = ({
  children,
  icon: Icon,
  variant = "primary",
  shape = "pill",
  className = "",
}) => {
  const variants = {
    primary: "border-primary/20 bg-primary-light text-primary",
    success: "border-success/20 bg-success/10 text-success",
    danger: "border-danger/20 bg-danger/10 text-danger",
    warning: "border-warning/20 bg-warning/10 text-warning",
    ai: "border-ai/20 bg-ai/10 text-ai",
    info: "border-info/20 bg-info/10 text-info",
    random: "border-random/20 bg-random/10 text-random",
  };

  const shapes = {
    pill: "rounded-full px-2.5 py-1 text-xs font-semibold",
    rounded: "rounded-lg px-3 py-1.5 text-xs font-bold",
  };

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 border ${shapes[shape]} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={13} />}
      {children}
    </span>
  );
};

export default Badge;
