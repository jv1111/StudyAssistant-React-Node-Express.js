const Card = ({ children, className = "", width = "w-full" }) => {
  return (
    <div
      className={`${width} rounded-(--radius-card) border border-border bg-surface p-8 shadow-(--shadow-card) transition-all ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
