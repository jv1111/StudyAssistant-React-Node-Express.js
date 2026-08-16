const EmptyState = ({ title = "Nothing here yet", description }) => {
  return (
    <div className="empty-state" role="status">
      <h2>{title}</h2>

      {description && <p>{description}</p>}
    </div>
  );
};

export default EmptyState;
