import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

import useQuestionFetcher from "../../hooks/useQuestionFetcher";
import LoadingPage from "../Loading/LoadingPage";
import { submitAnswer, saveQuizRecord } from "../../api/quiz.api";

const QuizPage = () => {
  const [numAnswered, setNumAnswered] = useState(0);
  const { quizId } = useParams();

  const { isLoading, item, quizEnded } = useQuestionFetcher(
    quizId,
    numAnswered,
  );

  const [showCorrectAnsPopup, setShowCorrectAnsPopup] = useState(false);
  const [showCorrectLbl, setShowCorrectLbl] = useState(false);
  const [correctAns, setCorrectAns] = useState("");
  const [disableSubmittion, setDisableSubmittion] = useState(false);

  const navigate = useNavigate();

  const submitAnswerHandler = async (answer, questionId) => {
    setDisableSubmittion(true);

    const response = await submitAnswer(questionId, answer);

    if (response.error) {
      alert("error");
      setDisableSubmittion(false);
      return;
    }

    if (response.correct) {
      setShowCorrectLbl(true);

      setTimeout(() => {
        setNumAnswered((prev) => prev + 1);
        setDisableSubmittion(false);
        setShowCorrectLbl(false);
      }, 1500);
    } else {
      setCorrectAns(response.correctAns);
      setShowCorrectAnsPopup(true);
    }
  };

  if (quizEnded) {
    const saveRecord = async () => {
      const record = await saveQuizRecord(quizId);
      await navigate(`/quiz/records/${record._id}`);
    };

    saveRecord();

    return null;
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  const progress = (item.questionNumber / item.numberOfItems) * 100;

  return (
    <div className="mx-auto w-full max-w-(--content-max-width) px-(--page-padding) py-10">
      <header className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-primary">
            Quiz in Progress
          </span>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            {item.quizName}
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-muted">
            {item.subject}
          </p>
        </div>

        <dl className="flex gap-8">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">
              Score
            </dt>

            <dd className="mt-1 text-xl font-semibold text-foreground">
              {item.score}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">
              Question
            </dt>

            <dd className="mt-1 text-xl font-semibold text-foreground">
              {item.questionNumber}
              <span className="text-sm font-medium text-muted">
                {" "}
                / {item.numberOfItems}
              </span>
            </dd>
          </div>
        </dl>
      </header>

      <div
        role="progressbar"
        aria-label={`Question ${item.questionNumber} of ${item.numberOfItems}`}
        aria-valuenow={item.questionNumber}
        aria-valuemin="1"
        aria-valuemax={item.numberOfItems}
        className="mb-6 h-2 overflow-hidden rounded-full bg-white/10"
      >
        <span
          className="block h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Card>
        {showCorrectAnsPopup && (
          <CorrectAnsPopup
            correctAns={correctAns}
            setShowCorrectAnsPopup={setShowCorrectAnsPopup}
            setNumAnswered={setNumAnswered}
            setDisableSubmittion={setDisableSubmittion}
          />
        )}

        <section aria-labelledby="question-title">
          <header className="mb-6 flex items-center justify-between gap-4">
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              Question {item.questionNumber}
            </span>

            {showCorrectLbl && (
              <strong
                className="text-sm font-semibold text-success"
                aria-live="polite"
              >
                Correct!
              </strong>
            )}
          </header>

          <h2
            id="question-title"
            className="text-xl font-semibold leading-relaxed text-foreground sm:text-2xl"
          >
            {item.question}
          </h2>

          <div
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
            aria-label="Answer choices"
          >
            {item.choices.map((choice, index) => {
              if (!choice) return null;

              return (
                <Button
                  key={index}
                  type="button"
                  variant="ghost"
                  onClick={() => submitAnswerHandler(choice, item._id)}
                  disabled={disableSubmittion}
                  className="min-h-16 justify-start border-white/10 bg-white/5 px-5 text-left text-sm font-medium hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
                >
                  <span className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-semibold text-muted">
                    {String.fromCharCode(65 + index)}
                  </span>

                  {choice}
                </Button>
              );
            })}
          </div>
        </section>
      </Card>
    </div>
  );
};

const CorrectAnsPopup = ({
  correctAns,
  setShowCorrectAnsPopup,
  setNumAnswered,
  setDisableSubmittion,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      role="presentation"
    >
      <section
        className="w-full max-w-md rounded-(--radius-glass) border border-white/10 bg-background-secondary/95 p-6 shadow-(--shadow-glass) backdrop-blur-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="incorrect-answer-title"
      >
        <span className="text-xs font-medium uppercase tracking-wider text-primary">
          Keep Going
        </span>

        <h2
          id="incorrect-answer-title"
          className="mt-2 text-xl font-semibold text-foreground"
        >
          Incorrect answer
        </h2>

        <p className="mt-4 text-sm text-muted">The correct answer is</p>

        <p className="mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-foreground">
          {correctAns}
        </p>

        <div className="mt-6 flex justify-end">
          <Button
            type="button"
            fit
            onClick={() => {
              setNumAnswered((prev) => prev + 1);
              setShowCorrectAnsPopup(false);
              setDisableSubmittion(false);
            }}
          >
            Next Question
          </Button>
        </div>
      </section>
    </div>
  );
};

export default QuizPage;
