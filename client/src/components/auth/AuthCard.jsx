const AuthCard = ({ children }) => {
  return (
    <div className="lightBox">
      <div className="lightBoxPanel">{children}</div>
    </div>
  );
};

export default AuthCard;
