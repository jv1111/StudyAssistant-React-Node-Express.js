import { useState } from "react";
import {
  TrophyFill,
  Clock,
  ArrowRightShort,
  Flag,
  PauseFill,
  XCircle,
  PencilSquare,
} from "react-bootstrap-icons";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import FeedbackModal from "../../components/common/FeedbackModal";
import LoadingPage from "../Loading/LoadingPage";

const SAMPLE_QUIZ_DATA = {
  quizId: "IDENT-101",
  quizName: "Biology & Life Sciences Quiz",
  questions: [
    {
      id: 1,
      question: "What is known as the powerhouse of the cell?",
    },
    {
      id: 2,
      question:
        "What green pigment in plants absorbs light energy for photosynthesis?",
    },
    {
      id: 3,
      question:
        "What is the basic functional and structural unit of all living organisms?",
    },
  ],
};

const IdentificationQuizPage = () => {
  // Quiz session state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredItems, setAnsweredItems] = useState(0);

  // Input & Submit state
  const [answer, setAnswer] = useState("");
  const [isLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Feedback Modal state
  const [feedback, setFeedback] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const totalItems = SAMPLE_QUIZ_DATA.questions.length;
  const currentQuestion = SAMPLE_QUIZ_DATA.questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / totalItems) * 100;

  // Handle Answer Submission
  const onSubmit = (e) => {
    if (e) e.preventDefault();
    if (!answer.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setScore((prev) => prev + 1);
      setAnsweredItems((prev) => prev + 1);

      setFeedback({
        isOpen: true,
        type: "success",
        title: "Answer Recorded!",
        message: `Your answer: "${answer.trim()}"`,
      });
    }, 500);
  };

  // Move to Next Question
  const handleNextQuestion = () => {
    setFeedback((prev) => ({ ...prev, isOpen: false }));
    setAnswer(""); // Clear input field

    if (currentIndex < totalItems - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert("Quiz Completed!");
    }
  };

  const closeFeedback = () => {
    setFeedback((prev) => ({ ...prev, isOpen: false }));
  };

  const handlePauseQuiz = () => console.log("Pause quiz triggered");
  const handleCancelQuiz = () => console.log("Cancel quiz triggered");

  if (isLoading || !currentQuestion) {
    return <LoadingPage />;
  }

  return (
    <div className="layout-container mx-auto flex max-w-6xl flex-col gap-6 py-8">
      {/* HEADER SECTION */}
      <header className="flex flex-col gap-4 rounded-card border border-border bg-surface p-5 shadow-(--shadow-card)">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="warning" icon={PencilSquare} shape="rounded">
              Identification
            </Badge>

            <span className="text-xs font-semibold text-muted">
              Quiz ID: #{SAMPLE_QUIZ_DATA.quizId}
            </span>
          </div>

          <span className="text-xs font-semibold text-muted">
            Question {currentIndex + 1} of {totalItems}
          </span>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {SAMPLE_QUIZ_DATA.quizName}
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

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        {/* LEFT COLUMN: QUESTION FORM */}
        <div className="lg:col-span-2">
          <Card className="card-base flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
                {currentIndex + 1}
              </span>

              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Identification Prompt
                </span>

                <h2 className="mt-1 text-lg font-bold leading-relaxed text-foreground sm:text-xl">
                  {currentQuestion.question}
                </h2>
              </div>
            </div>

            {/* SINGLE ANSWER INPUT FORM */}
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <label
                htmlFor="single-answer-input"
                className="text-xs font-semibold text-muted"
              >
                Your Answer
              </label>

              <input
                id="single-answer-input"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                disabled={isSubmitting}
                autoFocus
                className="w-full rounded-xl border border-border bg-background-secondary/40 px-4 py-3.5 text-sm font-medium text-foreground outline-none transition-all focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
              />

              {/* ACTION FOOTER */}
              <div className="mt-3 flex items-center justify-between gap-4 border-t border-border/80 pt-5">
                <Button
                  type="button"
                  variant="ghost"
                  icon={Flag}
                  fit
                  className="gap-1.5 px-0 text-xs font-semibold hover:bg-transparent"
                >
                  Report Issue
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  icon={ArrowRightShort}
                  fit
                  disabled={!answer.trim() || isSubmitting}
                  className="px-8"
                >
                  {isSubmitting ? "Submitting..." : "Submit Answer"}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* RIGHT COLUMN: TIMER, SCORE & CONTROLS */}
        <aside className="flex flex-col gap-4 lg:col-span-1">
          {/* TIMER CARD */}
          <Card className="card-base flex flex-col gap-2 border-l-4 border-l-primary p-5">
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

          {/* SCORE CARD */}
          <Card className="card-base flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Current Score
              </span>
              <TrophyFill className="text-primary" size={18} />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-primary">{score}</span>

              <span className="text-sm font-semibold text-muted">
                / {totalItems} pts
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-background-secondary p-3 text-xs">
              <span className="font-medium text-muted">Current Accuracy</span>
              <span className="font-bold text-foreground">
                {answeredItems > 0
                  ? `${Math.round((score / answeredItems) * 100)}%`
                  : "100%"}
              </span>
            </div>
          </Card>

          {/* CONTROLS CARD */}
          <Card className="card-base flex flex-col gap-3 p-5">
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

      {/* FEEDBACK MODAL */}
      <FeedbackModal
        isOpen={feedback.isOpen}
        onClose={closeFeedback}
        type={feedback.type}
        title={feedback.title}
        message={feedback.message}
        onConfirm={handleNextQuestion}
      />
    </div>
  );
};

export default IdentificationQuizPage;
