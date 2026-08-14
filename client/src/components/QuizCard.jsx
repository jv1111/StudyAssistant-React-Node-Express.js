import React from "react";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ quiz, onSelect, onDownload }) => {
  const navigate = useNavigate();

  return (
    <div className="card content-card" onClick={() => onSelect(quiz._id)}>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <h5 className="card-title text-white mb-0">{quiz.quizName}</h5>

          <span className="badge text-bg-primary">Quiz</span>
        </div>

        <hr className="border-secondary my-3" />

        <p className="card-text text-secondary mb-3">
          Number of items: {quiz.numberOfItems}
        </p>

        <div className="quizzesButtons mt-auto">
          <button
            type="button"
            className="btnUpdateQuiz"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/quiz/update/${quiz._id}`);
            }}
          >
            Update
          </button>

          <button
            type="button"
            className="btnDownloadAsPdf"
            onClick={(e) => onDownload(e, quiz._id)}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
