import { useNavigate } from "react-router-dom";

const QuizOptionBox = ({ selectingType, quizId, onClose }) => {
  const navigate = useNavigate();

  const selectHandler = (type) => {
    if (type === "multipleChoice") {
      navigate(quizId);
    }

    if (type === "enumeration") {
      navigate(`enum/${quizId}`);
    }
  };

  if (!selectingType) {
    return null;
  }

  return (
    <section aria-labelledby="quiz-type-title">
      <h2 id="quiz-type-title">Select quiz type</h2>

      <div>
        <button type="button" onClick={() => selectHandler("multipleChoice")}>
          Multiple choices
        </button>

        <button type="button" onClick={() => selectHandler("enumeration")}>
          Enumeration
        </button>

        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </section>
  );
};

export default QuizOptionBox;
