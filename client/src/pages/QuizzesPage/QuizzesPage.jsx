import React from "react";
import { QuizList, ItemContainer } from "../../components";
import "../../styles/items.css";

const HomePage = () => {
    return (
        <div className="home-page container">
            <ItemContainer search={true} title={"Quizzes"}>
                <QuizList />
            </ItemContainer>
        </div>
    );
}

export default HomePage;