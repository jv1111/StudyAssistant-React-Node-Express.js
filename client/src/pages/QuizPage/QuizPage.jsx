import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useQuestionFetcher from "../../hooks/useQuestionFetcher";
import LoadingPage from "../Loading/LoadingPage";
import { submitAnswer } from "../../api/QuizApi";
import { saveQuizRecord } from "../../api/QuizApi";

const QuizPage = () => {

    const [numAnswered, setNumAnswered] = useState(0);//used to trigger the useEffect in useQuestionFentcher
    const { quizId } = useParams();
    const { isLoading, item, quizEnded } = useQuestionFetcher(quizId, numAnswered);

    const submitAnswerHandler = async (answer, questionId) => {
        const response = await submitAnswer(questionId, answer);

        if (response.error) return alert("error");

        if (response.correct) {
            alert("Correct");
        } else {
            alert("Incorrect");
        }
        setNumAnswered(numAnswered + 1);
    }

    if (quizEnded) {
        saveQuizRecord(item.subject, item.quizName, item.score, item.numberOfItems);
        // todo create a quizRecord page and navigate to it automatically once the quiz is ended
        return <>END</>
    }

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className="quizPage container">
            <div className="itemContainer">
                <div className="topDescription ">
                    <div className="d-flex justify-content-between">
                        <div className="left d-grid">
                            <label className="fw-bold">Subject: <label className="fw-normal">{item.subject}</label></label>
                            <label className="fw-bold">Quiz Name: <label className="fw-normal">{item.quizName}</label> </label>
                        </div>
                        <div className="right d-grid">
                            <label className="fw-bold">Score: <label className="fw-normal">{item.score}</label></label>
                            <label className="fw-bold">Number Of Items: <label className="fw-normal">{item.numberOfItems}</label></label>
                        </div>
                    </div>
                    <div className="line"></div>
                </div>
                <div className="itemPanel">
                    <div className="itemBox" style={{ height: "250px", overflow: "auto" }}>
                        <label className="itemName">Question# {item.questionNumber} </label>
                        <div className="line"></div>
                        <div className="p-2">
                            <p>{item.question}</p>
                        </div>
                    </div>
                    <div className="selectionPanel d-grid gap-1 mt-1">
                        {item.choices.map((choice, index) => {
                            return <button
                                key={index}
                                className="btn-primary"
                                onClick={() => submitAnswerHandler(choice, item._id)}
                            >
                                {choice}
                            </button>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizPage;