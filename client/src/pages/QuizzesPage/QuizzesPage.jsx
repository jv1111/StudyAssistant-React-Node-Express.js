import React from "react";
import { QuizList } from "../../components";
import "../../styles/items.css";

const HomePage = () => {

    return (
        <div className="quizzesPage page container">
            <QuizList />
        </div>
    );
}

export default HomePage;