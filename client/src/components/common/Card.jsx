const Card = ({
  children,
  className = "",
  width = "w-full",
  hoverable = false,
}) => {
  return (
    <div
      className={`
        ${width}
        rounded-card
        border border-border/80
        bg-surface
        p-5
        shadow-(--shadow-card)
        transition-all
        duration-200
        ${hoverable ? "hover:-translate-y-0.5 hover:border-border hover:shadow-md" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
