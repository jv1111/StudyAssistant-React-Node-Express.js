import React, { useState } from "react";
import EmptyList from "./EmptyList";
import useDataFetcher from "../hooks/useDataFetcher"
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../api/QuizApi";
import infinitScroller from "../helper/infinitScroller";
import LoadingPage from "../pages/Loading/LoadingPage";

const SubjectList = ({ searchVal }) => {

    const [skipCount, setSkipCount] = useState(0);
    const [subjects, setSubjects] = useState([]);
    const { isLoading } = useDataFetcher(searchVal, skipCount, subjects, setSubjects, getSubjects);
    const navigate = useNavigate();

    if (isLoading) {
        return <LoadingPage />
    }

    if (subjects.length === 0) {
        return <EmptyList />
    }

    return (
        <ul className="itemsList" onScroll={(e) => infinitScroller(e, subjects, setSkipCount)}>
            {subjects.map((subject, index) => {
                return (
                    <div
                        className="itemBox"
                        key={index}
                        onClick={() => navigate(`quiz/${subject._id}`)}
                    >
                        <li
                            className="itemName"
                            key={index}
                        >
                            {subject._id}
                        </li>
                        <div className="line"></div>
                        <div className="descriptionBox">
                            <label className="description">
                                Description:
                            </label>
                        </div>
                    </div>
                )
            })}
        </ul>
    );
}

// const subjects = [
//     {
//         name: "First",
//         description: null
//     },
//     {
//         name: "Second",
//         description: null
//     },
//     {
//         name: "Third",
//         description: null
//     }
// ]

export default SubjectList;