import {
  TrophyFill,
  Clock,
  ArrowRightShort,
  Flag,
  PauseFill,
  XCircle,
} from "react-bootstrap-icons";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import FeedbackModal from "../../components/common/FeedbackModal";
import SelectableOption from "../../components/common/SelectableOption";
import LoadingPage from "../common/LoadingPage";

import useQuizSession from "../../hooks/quiz/useQuizSession";

const QuizPage = () => {
  const {
    quiz,
    selectedChoice,
    isLoading,
    isSubmitting,
    feedback,
    handleSelectOption,
    handleSubmitAnswer,
    handleNextQuestion,
    closeFeedback,
    handlePauseQuiz,
    handleCancelQuiz,
  } = useQuizSession();

  if (isLoading || !quiz) {
    return <LoadingPage />;
  }

  const currentIndex = quiz.currentItem;
  const totalItems = quiz.numberOfItems;

  const progressPercent = ((currentIndex + 1) / totalItems) * 100;

  const choices = quiz.choices || [];

  return (
    <div className="layout-container mx-auto flex max-w-6xl flex-col gap-6 py-8">
      <header className="flex flex-col gap-4 rounded-card border border-border bg-surface p-5 shadow-(--shadow-card)">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="primary" shape="rounded">
              {quiz.quizType === "multiple_choice"
                ? "Multiple Choice"
                : "Enumeration"}
            </Badge>

            <span className="text-xs font-semibold text-muted">
              Quiz ID: #{quiz.quizId}
            </span>
          </div>

          <span className="text-xs font-semibold text-muted">
            Question {currentIndex + 1} of {totalItems}
          </span>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {quiz.quizName}
        </h1>

        <div className="flex flex-col gap-1.5 border-t border-border/60 pt-2">
          <div className="flex justify-between text-xs font-semibold text-muted">
            <span>Progress</span>
            <span>{Math.round(progressPercent)}% Completed</span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-background-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
                {currentIndex + 1}
              </span>

              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Question Prompt
                </span>

                <h2 className="mt-1 text-lg font-bold leading-relaxed text-foreground sm:text-xl">
                  {quiz.question}
                </h2>
              </div>
            </div>

            {quiz.quizType === "multiple_choice" && (
              <div className="flex flex-col gap-3">
                {choices.map((choice, optionIndex) => {
                  const letterLabel = String.fromCharCode(65 + optionIndex);

                  const choiceValue =
                    typeof choice === "object" && choice !== null
                      ? (choice.value ??
                        choice.answer ??
                        choice.text ??
                        choice.label)
                      : choice;

                  const isSelected = selectedChoice === choiceValue;

                  return (
                    <SelectableOption
                      key={optionIndex}
                      selected={isSelected}
                      optionLabel={letterLabel}
                      label={choiceValue}
                      showSelectedIndicator
                      onClick={() => handleSelectOption(choiceValue)}
                      className="min-h-16"
                    />
                  );
                })}
              </div>
            )}

            {quiz.quizType === "enumeration" && (
              <input
                type="text"
                value={selectedChoice || ""}
                onChange={(event) => handleSelectOption(event.target.value)}
                placeholder="Enter your answer..."
                className="w-full rounded-lg border border-border bg-background-secondary px-4 py-3 text-foreground outline-none focus:border-primary"
                disabled={isSubmitting}
              />
            )}

            <div className="flex items-center justify-between gap-4 border-t border-border/80 pt-5">
              <Button
                variant="ghost"
                icon={Flag}
                fit
                className="gap-1.5 px-0 text-xs font-semibold hover:bg-transparent"
              >
                Report Issue
              </Button>

              <Button
                variant="primary"
                icon={ArrowRightShort}
                fit
                disabled={!selectedChoice || isSubmitting}
                onClick={() => handleSubmitAnswer()}
                className="px-8"
              >
                {isSubmitting ? "Submitting..." : "Submit Answer"}
              </Button>
            </div>
          </Card>
        </div>

        <aside className="flex flex-col gap-4">
          <Card className="flex flex-col gap-2 border-l-4 border-l-primary">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Time Remaining
              </span>

              <Clock className="text-primary" size={18} />
            </div>

            <div className="font-mono text-3xl font-extrabold tracking-tight text-foreground">
              --:--
            </div>

            <p className="text-xs text-muted">
              Quiz auto-submits when timer expires.
            </p>
          </Card>

          <Card className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Current Score
              </span>

              <TrophyFill className="text-primary" size={18} />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-primary">
                {quiz.score}
              </span>

              <span className="text-sm font-semibold text-muted">
                / {totalItems} pts
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-background-secondary p-3 text-xs">
              <span className="font-medium text-muted">Current Accuracy</span>

              <span className="font-bold text-foreground">
                {quiz.answeredItems > 0
                  ? `${Math.round((quiz.score / quiz.answeredItems) * 100)}%`
                  : "100%"}
              </span>
            </div>
          </Card>

          <Card className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              Quiz Controls
            </span>

            <div className="flex flex-col gap-2.5">
              <Button
                variant="secondary"
                icon={PauseFill}
                onClick={handlePauseQuiz}
                className="w-full justify-center gap-2"
              >
                Pause Quiz
              </Button>

              <Button
                variant="ghost"
                icon={XCircle}
                onClick={handleCancelQuiz}
                className="w-full justify-center gap-2 text-error hover:bg-error/10 hover:text-error"
              >
                Cancel Quiz
              </Button>
            </div>
          </Card>
        </aside>
      </div>

      <FeedbackModal
        isOpen={feedback.isOpen}
        onClose={closeFeedback}
        type={feedback.type}
        title={feedback.title}
        message={feedback.message}
        onConfirm={feedback.onConfirm || handleNextQuestion}
      />
    </div>
  );
};

export default QuizPage;
