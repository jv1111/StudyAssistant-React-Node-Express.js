import { useParams } from "react-router-dom";
import {
  TrophyFill,
  Calendar3,
  JournalText,
  CheckCircleFill,
  XCircleFill,
  UiChecks,
  CardList,
} from "react-bootstrap-icons";

import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { formatDate } from "../../utils/dateUtils";
import useRecord from "../../hooks/useRecord";

const RecordPage = () => {
  const { recordId } = useParams();
  const { record, isLoading, error } = useRecord(recordId);

  if (isLoading) {
    return (
      <div className="layout-container py-16 text-center">
        <p className="text-sm text-muted">Loading quiz record...</p>
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="layout-container py-16 text-center">
        <h2 className="text-xl font-bold text-foreground">No record found.</h2>
        <p className="mt-2 text-sm text-muted">
          The record you are looking for does not exist or failed to load.
        </p>
      </div>
    );
  }

  const isMultipleChoice = record.quizType === "multiple_choice";
  const QuizTypeIcon = isMultipleChoice ? UiChecks : CardList;
  const quizTypeDisplay = isMultipleChoice ? "Multiple Choice" : "Enumeration";

  const percentage = (record.score / record.numberOfItems) * 100;
  const isPassing = percentage >= 50;

  return (
    <>
      {/* Header Summary */}
      <header className="mb-8 flex h-fit flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge shape="rounded" variant="primary">
              <JournalText className="mr-1 inline" size={12} />
              {record.subject}
            </Badge>

            <Badge shape="pill" variant="info">
              <QuizTypeIcon className="mr-1 inline" size={12} />
              {quizTypeDisplay}
            </Badge>
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {record.quizName}
          </h1>

          <div className="flex items-center gap-2 text-sm font-medium text-muted">
            <Calendar3 size={14} />
            <span>Completed on {formatDate(record.completedAt)}</span>
          </div>
        </div>

        {/* Score Display */}
        <div className="flex min-w-[140px] shrink-0 flex-col items-center justify-center rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <TrophyFill
            className={isPassing ? "mb-2 text-success" : "mb-2 text-danger"}
            size={24}
          />

          <div className="flex items-baseline gap-1">
            <span
              className={`text-3xl font-black ${
                isPassing ? "text-success" : "text-danger"
              }`}
            >
              {record.score}
            </span>

            <span className="text-sm font-bold text-muted">
              / {record.numberOfItems}
            </span>
          </div>

          <span className="mt-1 text-xs font-semibold text-muted">
            {Math.round(percentage)}% Accuracy
          </span>
        </div>
      </header>

      {/* Details & Review Section */}
      <section aria-labelledby="quiz-review-title">
        <Card className="card-base">
          <header className="mb-6 flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                id="quiz-review-title"
                className="text-lg font-bold text-foreground"
              >
                Quiz Review
              </h2>
              <p className="mt-1 text-sm text-muted">
                Review your answers below. Correct answers are highlighted in
                green, and incorrect ones in red.
              </p>
            </div>

            <Badge
              variant="primary"
              shape="rounded"
              className="self-start sm:self-auto"
            >
              {record.items.length}{" "}
              {record.items.length === 1 ? "Question" : "Questions"}
            </Badge>
          </header>

          <div className="flex flex-col gap-6">
            {record.items.map((item, index) => (
              <div
                key={item._id || index}
                className="flex flex-col gap-4 rounded-card border border-border border-l-4 bg-surface p-4 sm:p-6"
                style={{
                  borderLeftColor: item.correct
                    ? "var(--color-success)"
                    : "var(--color-danger)",
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Question Number Indicator */}
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      item.correct
                        ? "bg-success/10 text-success"
                        : "bg-danger/10 text-danger"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <div className="flex flex-1 flex-col gap-3">
                    {/* Question Text */}
                    <h3 className="text-lg font-semibold leading-relaxed text-foreground">
                      {item.question}
                    </h3>

                    {/* Answers Container */}
                    <div className="flex flex-col gap-2 rounded-lg bg-background-secondary/50 p-4">
                      {/* User's Answer */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-muted">
                            Your Answer
                          </span>

                          <span
                            className={`font-medium ${
                              item.correct ? "text-success" : "text-danger"
                            }`}
                          >
                            {item.answer ? (
                              item.answer
                            ) : (
                              <span className="italic opacity-70">
                                No answer provided
                              </span>
                            )}
                          </span>
                        </div>

                        {/* Icon Indicator */}
                        <div className="mt-1 shrink-0">
                          {item.correct ? (
                            <CheckCircleFill
                              className="text-success"
                              size={20}
                            />
                          ) : (
                            <XCircleFill className="text-danger" size={20} />
                          )}
                        </div>
                      </div>

                      {/* Correct Answer */}
                      {!item.correct && (
                        <div className="mt-2 flex flex-col gap-1 border-t border-border/50 pt-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-muted">
                            Correct Answer
                          </span>

                          <span className="font-medium text-success">
                            {item.correctAnswer}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </>
  );
};

export default RecordPage;
