import Button from "../common/Button";
import AuthFormHeader from "../auth/AuthFormHeader";

const QuizOptionBox = ({ quizId, onClose, onStartQuiz }) => {
  return (
    <div>
      <AuthFormHeader
        eyebrow="QUIZ MODE"
        title="Select quiz type"
        description="Choose how you want to take this quiz."
      />

      <div className="mt-7 flex gap-3">
        <Button
          type="button"
          onClick={() => onStartQuiz(quizId, "multiple_choice")}
        >
          Multiple choices
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={() => onStartQuiz(quizId, "enumeration")}
        >
          Enumeration
        </Button>

        <Button type="button" variant="danger" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default QuizOptionBox;
