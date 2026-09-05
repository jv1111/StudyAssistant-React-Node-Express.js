import { useNavigate, useParams } from "react-router-dom";
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
import AppHeader from "../../components/common/AppHeader";

import { formatDate } from "../../utils/dateUtils";
import useRecord from "../../hooks/records/useRecord";

const RecordPage = () => {
  const navigate = useNavigate();
  const { recordId } = useParams();

  const { record, isLoading, error } = useRecord(recordId);

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center py-16">
        <p className="text-sm text-muted">Loading quiz record...</p>
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-16 text-center">
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

  const percentage =
    record.numberOfItems > 0 ? (record.score / record.numberOfItems) * 100 : 0;

  const isPassing = percentage >= 50;

  const handleBack = () => {
    navigate("/quiz/records");
  };

  return (
    <div className="flex w-full flex-col">
      <AppHeader
        eyebrow="Quiz Record"
        title={record.quizName}
        description="Review your answers, score, and performance from this quiz attempt."
        showBackButton
        onBack={handleBack}
      />

      <div className="mb-5 flex flex-col gap-5">
        <div className="grid gap-5 md:grid-cols-[1fr_auto]">
          <Card className="card-base">
            <div className="flex h-full flex-col justify-between gap-5">
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

              <div className="flex items-center gap-2 text-sm font-medium text-muted">
                <Calendar3 size={14} />

                <span>Completed on {formatDate(record.completedAt)}</span>
              </div>
            </div>
          </Card>

          <Card className="card-base flex min-w-[180px] items-center justify-center">
            <div className="flex flex-col items-center">
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
          </Card>
        </div>

        <Card className="card-base mb-5">
          <header className="mb-6 flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">Quiz Review</h2>

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

          <div className="flex flex-col gap-5">
            {record.items.map((item, index) => (
              <div
                key={item._id || index}
                className="rounded-card border border-border border-l-4 bg-surface p-4 sm:p-6"
                style={{
                  borderLeftColor: item.correct
                    ? "var(--color-success)"
                    : "var(--color-danger)",
                }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      item.correct
                        ? "bg-success/10 text-success"
                        : "bg-danger/10 text-danger"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <div className="flex min-w-0 flex-1 flex-col gap-3">
                    <h3 className="text-lg font-semibold leading-relaxed text-foreground">
                      {item.question}
                    </h3>

                    <div className="flex flex-col gap-2 rounded-lg bg-background-secondary/50 p-4">
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
      </div>
    </div>
  );
};

export default RecordPage;
