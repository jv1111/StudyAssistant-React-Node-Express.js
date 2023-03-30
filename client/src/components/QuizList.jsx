import React, { useState } from "react";
import EmptyList from "./EmptyList";
import useQuizzesFetcher from "../hooks/useQuizzesFetcher"
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../pages/Loading/LoadingPage";
import { Search } from "react-bootstrap-icons";
import searchDelay from "../helper/searchDelay";
import infinitScroller from "../helper/infinitScroller";

const QuizList = () => {

    const { subject } = useParams();
    const [skipCount, setSkipCount] = useState(0);
    const [searchVal, setSearchVal] = useState("");
    const [quizzes, setQuizzes] = useState([]);
    const { isLoading } = useQuizzesFetcher(subject, searchVal, skipCount, quizzes, setQuizzes);
    const navigate = useNavigate();

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className="itemContainer">
            <div className="topDescription">
                <h2 className="text-fam-kavoon">
                    Quizzes
                </h2>
                <div className="line"></div>
                <div className="searchBox">
                    <Search className="searchIcon" />
                    <input
                        onChange={(e) => {
                            setSkipCount(0);
                            searchDelay(setSearchVal, e.target.value);
                        }}
                        type="text"
                        name="search"
                        placeholder="search"
                    />
                </div>
            </div>

            <div className="itemPanel">
                {quizzes.length !== 0 ?
                    <ul className="itemsList" onScroll={(e) => infinitScroller(e, quizzes, setSkipCount)}>
                        {quizzes.map((quiz, index) => {
                            return (
                                <div
                                    className="itemBox"
                                    key={index}
                                    onClick={() => navigate(`${quiz._id}`)}
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
                    :
                    <EmptyList />
                }

            </div>

        </div>
    );
}

export default QuizList;