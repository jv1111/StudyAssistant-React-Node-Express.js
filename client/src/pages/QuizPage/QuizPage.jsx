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
    <div className="quizPage page container">
      <div className="itemContainer">
        <div className="topDescription ">
          <div className="d-flex justify-content-between">
            <div className="left d-grid">
              <label className="fw-bold">
                Subject: <label className="fw-normal">{item.subject}</label>
              </label>
              <label className="fw-bold">
                Quiz Name:{" "}
                <label className="fw-normal">{item.quizName}</label>{" "}
              </label>
            </div>
            <div className="right d-grid">
              <label className="fw-bold">
                Score: <label className="fw-normal">{item.score}</label>
              </label>
              <label className="fw-bold">
                Number Of Items:{" "}
                <label className="fw-normal">{item.numberOfItems}</label>
              </label>
            </div>
          </div>
          <div className="line"></div>
        </div>
        <div className="itemPanel position-relative">
          {showCorrectAnsPopup && (
            <CorrectAnsPopup
              correctAns={correctAns}
              setShowCorrectAnsPopup={setShowCorrectAnsPopup}
              setNumAnswered={setNumAnswered}
              setDisableSubmittion={setDisableSubmittion}
            />
          )}
          <div
            className="itemBox"
            style={{ height: "250px", overflow: "auto" }}
          >
            <div className="d-flex justify-content-between">
              <label className="itemName">
                Question# {item.questionNumber}{" "}
              </label>
              {showCorrectLbl && (
                <label className="lblCorrect fw-bold">Correct!</label>
              )}
            </div>
            <div className="line"></div>
            <div className="p-2">
              <p>{item.question}</p>
            </div>
          </div>
          <div className="selectionPanel d-grid gap-1 mt-1">
            {item.choices.map((choice, index) => {
              if (choice) {
                return (
                  <button
                    key={index}
                    className="btn-primary"
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
        </div>
      </div>
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
    <div className="popupBlocker">
      <div className="correctAnsPopup">
        <label className="fw-bold text-danger">Incorrect answer</label>
        <div className="line"></div>
        <label className="fw-bold">Correct Answer:</label>
        <p className="lblCorrect">{correctAns}</p>
        <button
          onClick={() => {
            setNumAnswered((prev) => prev + 1);
            setShowCorrectAnsPopup(false);
            setDisableSubmittion(false);
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
