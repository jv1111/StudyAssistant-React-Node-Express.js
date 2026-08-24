const Card = ({ children, className = "", width = "w-full" }) => {
  return (
    <div
      className={`${width} rounded-(--radius-glass) border border-white/10 bg-white/6.5 p-6 shadow-(--shadow-glass) backdrop-blur-(--blur-glass) ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
