import { useNavigate } from "react-router-dom";

const QuizCard = ({ quiz, onSelect, onDownload }) => {
  const navigate = useNavigate();

  return (
    <article className="quiz-card">
      <header className="quiz-card-header">
        <div>
          <h2>{quiz.quizName}</h2>
          <span>Quiz</span>
        </div>
      </header>

      <hr />

      <p>Number of items: {quiz.numberOfItems}</p>

      <div className="quiz-card-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onSelect(quiz._id)}
        >
          Take Quiz
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(`/quiz/update/${quiz._id}`)}
        >
          Update
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={(event) => onDownload(event, quiz._id)}
        >
          Download
        </button>
      </div>
    </article>
  );
};

export default QuizCard;
