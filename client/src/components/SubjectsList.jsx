import React, { useState } from "react";
import EmptyList from "./EmptyList";
import useItemFetcher from "../hooks/useItemFetcher"
import { useNavigate } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import { getSubjects } from "../api/QuizApi";
import searchDelay from "../helper/searchDelay";
import infinitScroller from "../helper/infinitScroller";
import LoadingPage from "../pages/Loading/LoadingPage";

const SubjectList = () => {

    const [subjects, setSubjects] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    const { isLoading, setSearching, setSkipCount } = useItemFetcher(subjects, setSubjects, searchVal, getSubjects, {});
    const navigate = useNavigate();

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className="itemContainer">
            <div className="topDescription">
                <h2 className="text-fam-kavoon">
                    Subjects
                </h2>
                <div className="line"></div>
                <div className="searchBox">
                    <Search className="searchIcon" />
                    <input
                        onChange={(e) => {
                            setSkipCount(0);
                            setSearching(true);
                            searchDelay(setSearchVal, e.target.value);
                        }}
                        type="text"
                        name="search"
                        placeholder="search"
                    />
                </div>
            </div>

            <div className="itemPanel">
                {subjects.length !== 0 ?
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
                    :
                    <EmptyList />
                }

            </div>

        </div>

    );
}

export default SubjectList;