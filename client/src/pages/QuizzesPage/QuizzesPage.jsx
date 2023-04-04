import React from "react";
import { QuizList, ItemContainer } from "../../components";
import "../../styles/items.css";

const HomePage = () => {

    return (
        <div className="quizzes-page container">
            <QuizList />
        </div>
    );
}

export default HomePage;