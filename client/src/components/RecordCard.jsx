const RecordCard = ({ record, onSelect }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(record._id);
    }
  };

  return (
    <article
      className="record-card"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(record._id)}
      onKeyDown={handleKeyDown}
    >
      <header className="record-card-header">
        <div>
          <span className="record-card-type">QUIZ RECORD</span>
          <h2>{record.quizName}</h2>
        </div>
        <time>{record.date}</time>
      </header>

      <dl className="record-card-stats">
        <div>
          <dt>Score</dt>
          <dd>{record.score}</dd>
        </div>
        <div>
          <dt>Questions</dt>
          <dd>{record.numberOfItems}</dd>
        </div>
      </dl>
    </article>
  );
};

export default RecordCard;
