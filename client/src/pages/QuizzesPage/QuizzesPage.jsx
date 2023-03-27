import React, { useEffect, useState } from "react";
import { QuizList, ItemContainer } from "../../components";
import "../../styles/items.css";

const HomePage = () => {

    const [searchVal, setSearchVal] = useState("");

    return (
        <div className="home-page container">
            <ItemContainer
                search={true}
                title={"Quizzes"}
                setSearchVal={setSearchVal}
            >
                <QuizList searchVal={searchVal} />
            </ItemContainer>
        </div>
    );
}

export default HomePage;