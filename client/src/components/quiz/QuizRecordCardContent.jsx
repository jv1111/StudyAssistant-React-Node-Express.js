import {
  Trophy,
  ArrowRight,
  Calendar3,
  CardList,
  UiChecks,
  JournalText,
} from "react-bootstrap-icons";

import Button from "../common/Button";
import { formatDate } from "../../utils/dateUtils";

const QuizRecordCardContent = ({ record, onViewDetails }) => {
  const isMultipleChoice = record.quizType === "multiple_choice";
  const QuizTypeIcon = isMultipleChoice ? UiChecks : CardList;
  const quizTypeDisplay = isMultipleChoice ? "Multiple Choice" : "Enumeration";

  const percentage = (record.score / record.numberOfItems) * 100;
  const isPassing = percentage >= 50;

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-xs transition-transform duration-300 group-hover:scale-105">
            <Trophy size={22} />
          </div>

          <div
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-bold ${
              isPassing
                ? "border-success/30 bg-success/10 text-success"
                : "border-danger/30 bg-danger/10 text-danger"
            }`}
          >
            <span>
              {record.score} / {record.numberOfItems}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
          <JournalText size={14} />
          <span className="uppercase tracking-wider">{record.subject}</span>
        </div>

        <h2 className="mt-1 line-clamp-1 text-xl font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
          {record.quizName}
        </h2>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <div className="flex items-center gap-1.5">
            <Calendar3 size={14} />
            <span>{formatDate(record.completedAt)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <QuizTypeIcon size={14} />
            <span>{quizTypeDisplay}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-border/60 pt-4">
        <Button
          type="button"
          fit
          icon={ArrowRight}
          onClick={onViewDetails}
          className="w-full justify-between gap-2 shadow-xs transition-all group-hover:shadow-md"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default QuizRecordCardContent;
