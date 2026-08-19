import { useNavigate } from "react-router-dom";

import Button from "../common/Button";

const QuizCardContent = ({ quiz, onSelect, onDownload }) => {
  const navigate = useNavigate();

  return (
    <article className="flex h-full min-h-44 flex-col">
      <div>
        <span className="text-xs font-medium uppercase tracking-wider text-primary">
          Quiz
        </span>

        <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          {quiz.quizName}
        </h2>
      </div>

      <div className="my-4 h-px bg-white/10" />

      <p className="text-sm leading-relaxed text-muted">
        Number of items: {quiz.numberOfItems}
      </p>

      <div className="mt-auto flex gap-2 pt-6">
        <Button
          type="button"
          onClick={() => onSelect(quiz._id)}
          fullWidth={false}
        >
          Take Quiz
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate(`/quiz/update/${quiz._id}`)}
          fullWidth={false}
        >
          Update
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={(event) => onDownload(event, quiz._id)}
          fullWidth={false}
        >
          Download
        </Button>
      </div>
    </article>
  );
};

export default QuizCardContent;
