import { useState } from "react";
import {
  TrophyFill,
  ArrowRightShort,
  PauseFill,
  XCircle,
} from "react-bootstrap-icons";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import FeedbackModal from "../../components/common/FeedbackModal";
import OptionBox from "../../components/common/OptionBox";
import SelectableOption from "../../components/common/SelectableOption";
import Loading from "../../components/common/Loading";

import useQuizSession from "../../hooks/quiz/useQuizSession";

const CHOICE_LENGTH_THRESHOLD = 50;

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

  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  if (isLoading || !quiz) {
    return <Loading />;
  }

  const currentIndex = quiz.currentItem;
  const totalItems = quiz.numberOfItems;

  const progressPercent = (currentIndex / totalItems) * 100;

  const choices = quiz.choices || [];

  const isMultipleChoice = quiz.quizType === "multiple_choice";
  const isEnumeration = quiz.quizType === "enumeration";

  const useTwoColumnLayout = choices.every((choice) => {
    const choiceValue =
      typeof choice === "object" && choice !== null
        ? (choice.value ?? choice.answer ?? choice.text ?? choice.label)
        : choice;

    return String(choiceValue ?? "").length <= CHOICE_LENGTH_THRESHOLD;
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedChoice || isSubmitting) {
      return;
    }

    handleSubmitAnswer();
  };

  const handlePauseConfirmation = () => {
    setShowPauseModal(false);
    handlePauseQuiz();
  };

  const handleCancelConfirmation = () => {
    setShowCancelModal(false);
    handleCancelQuiz();
  };

  return (
    <div className="flex w-full flex-col overflow-hidden">
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col gap-5 pt-4">
        <header className="flex flex-col gap-3 rounded-card border border-border bg-surface p-5 shadow-(--shadow-card)">
          <div className="flex items-center justify-between gap-4">
            <Badge
              variant={isMultipleChoice ? "primary" : "warning"}
              shape="rounded"
            >
              {isMultipleChoice ? "Multiple Choice" : "Enumeration"}
            </Badge>

            <span className="text-xs font-semibold text-muted">
              Question {currentIndex + 1} of {totalItems}
            </span>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {quiz.quizName}
          </h1>

          <div className="flex flex-col gap-1 border-t border-border/60 pt-2">
            <div className="flex items-center justify-between text-xs font-semibold text-muted">
              <span>Progress</span>
              <span>{Math.round(progressPercent)}% Completed</span>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-background-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </header>

        <div className="mb-5 grid min-h-0 flex-1 grid-cols-1 items-start gap-5 lg:grid-cols-3">
          <div className="min-h-0 lg:col-span-2">
            <Card className="flex flex-col gap-6">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
                  {currentIndex + 1}
                </span>

                <div className="flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    {isMultipleChoice
                      ? "Question Prompt"
                      : "Identification Prompt"}
                  </span>

                  <h2 className="mt-1 text-lg font-bold leading-relaxed text-foreground sm:text-xl">
                    {quiz.question}
                  </h2>
                </div>
              </div>

              {isMultipleChoice && (
                <div
                  className={
                    useTwoColumnLayout
                      ? "grid grid-cols-1 gap-3 sm:grid-cols-2"
                      : "flex flex-col gap-3"
                  }
                >
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

              {isEnumeration && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <label
                    htmlFor="quiz-answer"
                    className="text-xs font-semibold text-muted"
                  >
                    Your Answer
                  </label>

                  <input
                    id="quiz-answer"
                    type="text"
                    value={selectedChoice || ""}
                    onChange={(event) => handleSelectOption(event.target.value)}
                    placeholder="Type your answer here..."
                    disabled={isSubmitting}
                    autoFocus
                    className="w-full rounded-xl border border-border bg-background-secondary/40 px-4 py-3.5 text-sm font-medium text-foreground outline-none transition-all focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  <div className="mt-3 flex justify-end border-t border-border/80 pt-5">
                    <Button
                      type="submit"
                      variant="primary"
                      icon={ArrowRightShort}
                      fit
                      disabled={!selectedChoice || isSubmitting}
                      className="px-8"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Answer"}
                    </Button>
                  </div>
                </form>
              )}

              {isMultipleChoice && (
                <div className="flex justify-end border-t border-border/80 pt-5">
                  <Button
                    type="button"
                    variant="primary"
                    icon={ArrowRightShort}
                    fit
                    disabled={!selectedChoice || isSubmitting}
                    onClick={handleSubmit}
                    className="px-8"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Answer"}
                  </Button>
                </div>
              )}
            </Card>
          </div>

          <aside className="flex flex-col gap-4">
            {/*
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
            */}

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
                <span className="font-medium text-muted">Current Progress</span>

                <span className="font-bold text-foreground">
                  {Math.round(progressPercent)}%
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
                  onClick={() => setShowPauseModal(true)}
                  className="w-full justify-center gap-2"
                >
                  Pause Quiz
                </Button>

                <Button
                  variant="danger"
                  icon={XCircle}
                  onClick={() => setShowCancelModal(true)}
                  className="w-full justify-center gap-2 text-error hover:bg-error/10 hover:text-error"
                >
                  Cancel Quiz
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </div>

      <FeedbackModal
        isOpen={feedback.isOpen}
        onClose={closeFeedback}
        type={feedback.type}
        title={feedback.title}
        message={feedback.message}
        onConfirm={feedback.onConfirm || handleNextQuestion}
      />

      <OptionBox
        isOpen={showPauseModal}
        onClose={() => setShowPauseModal(false)}
        eyebrow="PAUSE QUIZ"
        title="Pause this quiz?"
        description="Your current quiz progress will be saved. You can resume the quiz later and continue where you left off."
        options={[
          {
            label: "Yes",
            value: "yes",
            variant: "secondary",
          },
        ]}
        onSelect={handlePauseConfirmation}
        closeLabel="No"
        closeVariant="secondary"
      />

      <OptionBox
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        eyebrow="CANCEL QUIZ"
        title="Cancel this quiz?"
        description="Your current quiz session and progress will be deleted. If you want to take this quiz again, you will need to start over."
        options={[
          {
            label: "Yes",
            value: "yes",
            variant: "danger",
          },
        ]}
        onSelect={handleCancelConfirmation}
        closeLabel="No"
        closeVariant="secondary"
      />
    </div>
  );
};

export default QuizPage;
