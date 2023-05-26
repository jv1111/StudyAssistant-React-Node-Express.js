import React from "react";
import { QuizList } from "../../components";
import "../../styles/items.css";

const HomePage = () => {

    return (
        <div className="quizzes-page container">
            <QuizList />
        </div>
    );
}

export default HomePage;