const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full rounded-(--radius-glass) border border-white/10 bg-white/6.5 p-6 shadow-(--shadow-glass) backdrop-blur-(--blur-glass) ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
