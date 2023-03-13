import React from "react";
import EmptyList from "./EmptyList";
import useQuizzesFetcher from "../hooks/useQuizzesFetcher.jsx"
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../pages/Loading/LoadingPage";

const QuizList = () => {

    const { subject } = useParams();
    const { isLoading, quizzes } = useQuizzesFetcher(subject);
    const navigate = useNavigate();

    if (isLoading) {
        return <LoadingPage />
    }

    if (quizzes.length === 0) {
        return <EmptyList />
    }

    return (
        <ul className="itemsList">
            {quizzes.map((quiz, index) => {
                return (
                    <div
                        className="itemBox"
                        key={index}
                        onClick={() => navigate(`quiz/${quiz._id}`)}
                    >
                        <li
                            className="itemName"
                            key={index}
                        >
                            {quiz.quizName}
                        </li>
                        <div className="line"></div>
                        <div className="descriptionBox">
                            <label className="description">
                                Number of items: {quiz.numberOfItems}
                            </label>
                        </div>
                    </div>
                )
            })}
        </ul>
    );
}

export default QuizList;