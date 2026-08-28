import {
  PatchCheckFill,
  QuestionCircle,
  PlayFill,
  PencilSquare,
  Download,
} from "react-bootstrap-icons";
import Button from "../common/Button";

const QuizCardContent = ({ quiz, onSelect, onEdit, onDownload }) => {
  return (
    <article className="flex h-full min-h-48 flex-col justify-between">
      <div>
        {/* Header: Icon & Question Count Badge */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs transition-transform duration-300 group-hover:scale-105">
            <PatchCheckFill size={22} />
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-semibold text-muted">
            <QuestionCircle size={13} className="text-primary" />
            <span>
              {quiz.numberOfItems || 0}{" "}
              {quiz.numberOfItems === 1 ? "Item" : "Items"}
            </span>
          </div>
        </div>

        {/* Quiz Title */}
        <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary line-clamp-1">
          {quiz.quizName}
        </h2>

        {/* Optional Subject context or description fallback */}
        <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
          {quiz.subjectName
            ? `Subject: ${quiz.subjectName}`
            : "Test your understanding with this practice quiz."}
        </p>
      </div>

      {/* Action Bar */}
      <div className="mt-6 border-t border-border/60 pt-4 flex items-center gap-2">
        {/* Primary Action */}
        <Button
          type="button"
          onClick={() => onSelect(quiz._id)}
          className="flex-1 justify-center gap-2 shadow-xs group-hover:shadow-md transition-all"
        >
          <PlayFill size={16} />
          <span>Take Quiz</span>
        </Button>

        {/* Secondary Actions */}
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="secondary"
            fit
            onClick={() => onEdit(quiz._id)}
            title="Update Quiz"
            aria-label="Update Quiz"
            className="p-2.5! text-muted hover:text-foreground"
          >
            <PencilSquare size={16} />
          </Button>

          <Button
            type="button"
            variant="secondary"
            fit
            onClick={(event) => onDownload(event, quiz._id)}
            title="Download PDF"
            aria-label="Download PDF"
            className="p-2.5! text-muted hover:text-foreground"
          >
            <Download size={16} />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default QuizCardContent;
