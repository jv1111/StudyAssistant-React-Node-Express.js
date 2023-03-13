import React from "react";
import { useParams } from "react-router-dom";

const QuizPage = () => {

    const { quizId } = useParams();

    return (
        <div className="quizPage container">
            <div className="itemContainer">
                <div className="topDescription ">
                    <div className="d-flex justify-content-between">
                        <div className="left d-grid">
                            <label>Subject: </label>
                            <label>Quiz Name: </label>
                        </div>
                        <div className="right d-grid">
                            <label>Score: </label>
                            <label>Number Of Items: </label>
                        </div>
                    </div>
                    <div className="line"></div>
                </div>
                <div className="itemPanel">
                    <div className="itemBox" style={{ height: "250px", overflow: "auto" }}>
                        <label className="itemName">Question: </label>
                        <div className="line"></div>
                        <div className="p-2">
                            <p>what is this and what is that</p>
                        </div>
                    </div>
                    <div className="selectionPanel d-grid gap-1 mt-1">
                        <button>A</button>
                        <button>B</button>
                        <button>C</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizPage;