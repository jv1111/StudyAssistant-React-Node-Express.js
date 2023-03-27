import React from "react";
import EmptyList from "./EmptyList";
import useSubjectsFetcher from "../hooks/useSubjectsFetcher"
import { useNavigate } from "react-router-dom";
import LoadingPage from "../pages/Loading/LoadingPage";

const SubjectList = ({ searchVal }) => {

    const { isLoading, subjects } = useSubjectsFetcher(searchVal);
    const navigate = useNavigate();

    if (isLoading) {
        return <LoadingPage />
    }

    if (subjects.length === 0) {
        return <EmptyList />
    }

    return (
        <ul className="itemsList">
            {subjects.map((subject, index) => {
                return (
                    <div
                        className="itemBox"
                        key={index}
                        onClick={() => navigate(`quiz/${subject}`)}
                    >
                        <li
                            className="itemName"
                            key={index}
                        >
                            {subject}
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