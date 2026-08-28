import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const SAMPLE_QUIZ_DATA = {
  id: "quiz_9921",
  subject: "General Science",
  quizName: "Cellular Biology & Photosynthesis",
  totalItems: 5,
  questions: [
    {
      _id: "q1",
      question:
        "What is the primary function of the mitochondria in eukaryotic cells?",
      choices: [
        "Protein synthesis and folding",
        "Cellular respiration and ATP production",
        "Storage of genomic DNA",
        "Packaging of cellular waste for exocytosis",
      ],
      answer: "Cellular respiration and ATP production",
      explanation:
        "Mitochondria are often referred to as the powerhouse of the cell because they generate ATP through oxidative phosphorylation.",
    },
    {
      _id: "q2",
      question:
        "Which pigment absorbs red and blue light while reflecting green light during photosynthesis?",
      choices: ["Carotenoid", "Chlorophyll a", "Phycobilin", "Anthocyanin"],
      answer: "Chlorophyll a",
      explanation:
        "Chlorophyll absorbs blue and red wavelengths of light and reflects green light, giving plants their green color.",
    },
    {
      _id: "q3",
      question:
        "What process results in four genetically diverse haploid daughter cells?",
      choices: ["Mitosis", "Binary Fission", "Meiosis", "Budding"],
      answer: "Meiosis",
      explanation:
        "Meiosis undergoes two rounds of division to produce four non-identical haploid gametes.",
    },
  ],
};

const QuizPage = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [score, setScore] = useState(0);

  const [feedback, setFeedback] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const currentQuestion = SAMPLE_QUIZ_DATA.questions[currentIndex];
  const progressPercent =
    ((currentIndex + 1) / SAMPLE_QUIZ_DATA.totalItems) * 100;

  const handleSelectOption = (choice) => {
    setSelectedChoice(choice);
  };

  const handleSubmitAnswer = () => {
    if (!selectedChoice) return;

    const isCorrect =
      selectedChoice.trim().toLowerCase() ===
      currentQuestion.answer.trim().toLowerCase();

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback({
        isOpen: true,
        type: "success",
        title: "Spot On! Correct Answer",
        message:
          currentQuestion.explanation ||
          `Great job! "${currentQuestion.answer}" is indeed correct.`,
      });
    } else {
      setFeedback({
        isOpen: true,
        type: "error",
        title: "Incorrect Answer",
        message: `The correct answer was: "${currentQuestion.answer}".\n${
          currentQuestion.explanation || ""
        }`,
      });
    }
  };

  const handleNextQuestion = () => {
    setSelectedChoice(null);

    if (currentIndex + 1 < SAMPLE_QUIZ_DATA.questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFeedback({
        isOpen: true,
        type: "success",
        title: "Quiz Completed! 🎉",
        message: `You've completed the quiz with a total score of ${score + 1}/${
          SAMPLE_QUIZ_DATA.totalItems
        }!`,
        onConfirm: () => navigate("/"),
      });
    }
  };

  const handlePauseQuiz = () => {
    navigate(-1);
  };

  const handleCancelQuiz = () => {
    setFeedback({
      isOpen: true,
      type: "warning",
      title: "Cancel Quiz?",
      message:
        "Are you sure you want to exit? Your progress will not be saved.",
      onConfirm: () => navigate("/"),
    });
  };

  return (
    <div className="layout-container mx-auto flex max-w-6xl flex-col gap-6 py-8">
      <header className="flex flex-col gap-4 rounded-card border border-border bg-surface p-5 shadow-(--shadow-card)">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="primary" shape="rounded">
              {SAMPLE_QUIZ_DATA.subject}
            </Badge>

            <span className="text-xs font-semibold text-muted">
              Quiz ID: #{SAMPLE_QUIZ_DATA.id}
            </span>
          </div>

          <span className="text-xs font-semibold text-muted">
            Question {currentIndex + 1} of {SAMPLE_QUIZ_DATA.totalItems}
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

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="card-base flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
                {currentIndex + 1}
              </span>

              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Question Prompt
                </span>

                <h2 className="mt-1 text-lg font-bold leading-relaxed text-foreground sm:text-xl">
                  {currentQuestion.question}
                </h2>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {currentQuestion.choices.map((choice, optionIndex) => {
                const letterLabel = String.fromCharCode(65 + optionIndex);
                const isSelected = selectedChoice === choice;

                return (
                  <SelectableOption
                    key={optionIndex}
                    selected={isSelected}
                    optionLabel={letterLabel}
                    label={choice}
                    showSelectedIndicator
                    onClick={() => handleSelectOption(choice)}
                    className="min-h-16"
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border/80 pt-5">
              <Button
                variant="ghost"
                icon={Flag}
                fit
                className="gap-1.5 px-0 text-xs font-semibold hover:bg-transparent"
              >
                Report Issue
              </Button>

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  fit
                  onClick={handleNextQuestion}
                  className="text-muted hover:text-foreground"
                >
                  Skip Question
                </Button>

                <Button
                  variant="primary"
                  icon={ArrowRightShort}
                  fit
                  disabled={!selectedChoice}
                  onClick={handleSubmitAnswer}
                  className="px-8"
                >
                  Submit Answer
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <aside className="flex flex-col gap-4 lg:col-span-1">
          <Card className="card-base flex flex-col gap-2 border-l-4 border-l-primary p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Time Remaining
              </span>
              <Clock className="text-primary" size={18} />
            </div>

            <div className="font-mono text-3xl font-extrabold tracking-tight text-foreground">
              12:45
            </div>

            <p className="text-xs text-muted">
              Quiz auto-submits when timer expires.
            </p>
          </Card>

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
                / {SAMPLE_QUIZ_DATA.totalItems} pts
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-background-secondary p-3 text-xs">
              <span className="font-medium text-muted">Current Accuracy</span>
              <span className="font-bold text-foreground">
                {currentIndex > 0
                  ? `${Math.round((score / currentIndex) * 100)}%`
                  : "100%"}
              </span>
            </div>
          </Card>

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

      <FeedbackModal
        isOpen={feedback.isOpen}
        onClose={() => setFeedback((prev) => ({ ...prev, isOpen: false }))}
        type={feedback.type}
        title={feedback.title}
        message={feedback.message}
        onConfirm={feedback.onConfirm || handleNextQuestion}
      />
    </div>
  );
};

export default QuizPage;
