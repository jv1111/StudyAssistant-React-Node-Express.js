import { useSelector } from "react-redux";

const Pad = ({ children, record }) => {
  const auth = useSelector((state) => state.auth);
  const numberOfItems = record.items.length;

  return (
    <section className="record-preview" aria-labelledby="record-preview-title">
      <header className="record-preview-header">
        <div>
          <span className="form-eyebrow">QUIZ REVIEW</span>
          <h1 id="record-preview-title">{record.quizName}</h1>
          <p>{record.subject}</p>
        </div>

        <dl className="record-preview-stats">
          <div>
            <dt>Score</dt>
            <dd>{record.score} <span>/ {numberOfItems}</span></dd>
          </div>
          <div>
            <dt>Completed</dt>
            <dd>{record.date}</dd>
          </div>
          <div>
            <dt>Student</dt>
            <dd>{auth.user.username}</dd>
          </div>
        </dl>
      </header>

      <div className="record-preview-body">{children}</div>
    </section>
  );
};

export default Pad;
