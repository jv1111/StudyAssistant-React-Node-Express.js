import { useNavigate } from "react-router-dom";

import Button from "../common/Button";
import AuthFormHeader from "../auth/AuthFormHeader";

const QuizOptionBox = ({ quizId, onClose }) => {
  const navigate = useNavigate();

  const selectHandler = (type) => {
    if (type === "multipleChoice") {
      navigate(quizId);
    }

    if (type === "enumeration") {
      navigate(`enum/${quizId}`);
    }
  };

  return (
    <div>
      <AuthFormHeader
        eyebrow="QUIZ MODE"
        title="Select quiz type"
        description="Choose how you want to take this quiz."
      />

      <div className="mt-7 flex gap-3">
        <Button type="button" onClick={() => selectHandler("multipleChoice")}>
          Multiple choices
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={() => selectHandler("enumeration")}
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
