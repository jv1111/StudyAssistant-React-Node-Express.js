import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useQuestionFetcher from "../../hooks/useQuestionFetcher";
import LoadingPage from "../Loading/LoadingPage";
import { submitAnswer } from "../../api/QuizApi";
import { saveQuizRecord } from "../../api/QuizApi";

const QuizPage = () => {
  const [numAnswered, setNumAnswered] = useState(0); //used to trigger the useEffect in useQuestionFentcher
  const { quizId } = useParams();
  const { isLoading, item, quizEnded } = useQuestionFetcher(
    quizId,
    numAnswered,
  );
  const [showCorrectAnsPopup, setShowCorrectAnsPopup] = useState(false);
  const [showCorrectLbl, setShowCorrectLbl] = useState(false);
  const [correctAns, setCorrectAns] = useState("");
  const [disableSubmittion, setDisableSubmittion] = useState(false);
  const choicesRef = useRef([]);
  const navigate = useNavigate();

  const submitAnswerHandler = async (answer, questionId, index) => {
    setDisableSubmittion(true);
    const response = await submitAnswer(questionId, answer);

    if (response.error) return alert("error");

    if (response.correct) {
      choicesRef.current[index].classList.add("bgCorrect");
      choicesRef.current[index].classList.add("text-white");
      setShowCorrectLbl(true);
      // wait for some time to next the question
      setTimeout(() => {
        choicesRef.current[index].classList.remove("bgCorrect");
        choicesRef.current[index].classList.remove("text-white");
        setNumAnswered(numAnswered + 1); //refresh the useQuestionFetcher/next the question
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
      // todo create a quizRecord page and navigate to it automatically once the quiz is ended
      await navigate(`/quiz/records/${record._id}`);
    };
    saveRecord();
    return "";
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <main className="quiz-play-page">
      <section className="quiz-play" aria-labelledby="quiz-play-title">
        <header className="quiz-play-header">
          <div>
            <span className="form-eyebrow">QUIZ IN PROGRESS</span>
            <h1 id="quiz-play-title">{item.quizName}</h1>
            <p>{item.subject}</p>
          </div>

          <dl className="quiz-stats">
            <div>
              <dt>Score</dt>
              <dd>{item.score}</dd>
            </div>
            <div>
              <dt>Question</dt>
              <dd>
                {item.questionNumber} <span>/ {item.numberOfItems}</span>
              </dd>
            </div>
          </dl>
        </header>

        <div
          className="quiz-progress"
          aria-label={`Question ${item.questionNumber} of ${item.numberOfItems}`}
        >
          <span
            style={{
              width: `${(item.questionNumber / item.numberOfItems) * 100}%`,
            }}
          />
        </div>

        <section
          className="quiz-question-panel"
          aria-labelledby="question-title"
        >
          {showCorrectAnsPopup && (
            <CorrectAnsPopup
              correctAns={correctAns}
              setShowCorrectAnsPopup={setShowCorrectAnsPopup}
              setNumAnswered={setNumAnswered}
              setDisableSubmittion={setDisableSubmittion}
            />
          )}

          <header className="quiz-question-header">
            <span>QUESTION {item.questionNumber}</span>
            {showCorrectLbl && (
              <strong className="quiz-correct-feedback" aria-live="polite">
                Correct!
              </strong>
            )}
          </header>

          <h2 id="question-title" className="quiz-question-text">
            {item.question}
          </h2>

          <div className="quiz-choices" aria-label="Answer choices">
            {item.choices.map((choice, index) => {
              if (choice) {
                return (
                  <button
                    key={index}
                    type="button"
                    className="quiz-choice"
                    ref={(element) => {
                      choicesRef.current[index] = element;
                    }}
                    onClick={() => submitAnswerHandler(choice, item._id, index)}
                    disabled={disableSubmittion}
                  >
                    {choice}
                  </button>
                );
              }
              return null;
            })}
          </div>
        </section>
      </section>
    </main>
  );
};

const CorrectAnsPopup = ({
  correctAns,
  setShowCorrectAnsPopup,
  setNumAnswered,
  setDisableSubmittion,
}) => {
  return (
    <div className="quiz-answer-modal" role="presentation">
      <section
        className="quiz-answer-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="incorrect-answer-title"
      >
        <span className="form-eyebrow">KEEP GOING</span>
        <h2 id="incorrect-answer-title">Incorrect answer</h2>
        <p className="quiz-answer-modal-label">The correct answer is</p>
        <p className="quiz-answer-modal-value">{correctAns}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setNumAnswered((prev) => prev + 1);
            setShowCorrectAnsPopup(false);
            setDisableSubmittion(false);
          }}
        >
          Next question
        </button>
      </section>
    </div>
  );
};

export default QuizPage;
