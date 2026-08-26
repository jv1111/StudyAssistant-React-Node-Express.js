import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useQuestionFetcher from "../../hooks/useQuestionFetcher";
import LoadingPage from "../Loading/LoadingPage";
import { submitAnswer } from "../../api/quiz.api";
import { saveQuizRecord } from "../../api/quiz.api";

const EnumQuizPage = () => {
  // todo make keys insensitive in the server in answer submittion e.g b === B
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
  const [userAnswer, setUserAnswer] = useState("");
  const choicesRef = useRef([]);

  const submitAnswerHandler = async (answer, questionId) => {
    console.log(answer);
    console.log(questionId);
    const response = await submitAnswer(questionId, answer);

    if (response.error) return alert("error");

    if (response.correct) {
      setDisableSubmittion(true);
      choicesRef.current.classList.add("bgCorrect");
      choicesRef.current.classList.add("text-white");
      setShowCorrectLbl(true);
      // wait for some time to next the question
      setTimeout(() => {
        choicesRef.current.classList.remove("bgCorrect");
        choicesRef.current.classList.remove("text-white");
        setNumAnswered(numAnswered + 1); //refresh the useQuestionFetcher/next the question
        setDisableSubmittion(false);
        setShowCorrectLbl(false);
        setUserAnswer(""); //clear the users answer input
      }, 1500);
    } else {
      setCorrectAns(response.correctAns);
      setShowCorrectAnsPopup(true);
    }
  };

  if (quizEnded) {
    saveQuizRecord(quizId);
    // todo create a quizRecord page and navigate to it automatically once the quiz is ended
    return <>END</>;
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="quizPage container">
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
              setUserAnswer={setUserAnswer}
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

          <input
            type="text"
            placeholder="Answer"
            className="inputController ps-1 w-100 mt-1"
            name="answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <button
            ref={choicesRef}
            className="btn-primary w-100 mt-1"
            disabled={disableSubmittion}
            onClick={() => submitAnswerHandler(userAnswer, item._id)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const CorrectAnsPopup = ({
  correctAns,
  setShowCorrectAnsPopup,
  setNumAnswered,
  setUserAnswer,
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
            setUserAnswer("");
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default EnumQuizPage;
