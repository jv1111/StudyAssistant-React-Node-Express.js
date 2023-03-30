import React, { useEffect, useState } from "react";
import { QuizList, ItemContainer } from "../../components";
import "../../styles/items.css";

const HomePage = () => {

    const [searchVal, setSearchVal] = useState("");

    return (
        <div className="home-page container">
            <QuizList searchVal={searchVal} />
        </div>
    );
}

export default HomePage;