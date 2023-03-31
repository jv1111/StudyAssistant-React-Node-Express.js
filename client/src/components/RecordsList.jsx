import React, { useState } from "react";
import EmptyList from "./EmptyList";
import { Search } from "react-bootstrap-icons";
import searchDelay from "../helper/searchDelay";
import useItemFetcher from "../hooks/useItemFetcher";
import { getRecords } from "../api/QuizApi";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../pages/Loading/LoadingPage";

const RecordsList = () => {

    const [records, setRecords] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    const { isLoading, setSearching, setSkipCount } = useItemFetcher(records, setRecords, searchVal, getRecords, {});
    const navigate = useNavigate();

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className="itemContainer">
            <div className="topDescription">
                <h2 className="text-fam-kavoon">
                    Records
                </h2>
                <div className="line"></div>
                <div className="searchBox">
                    <Search className="searchIcon" />
                    <input
                        onChange={(e) => {
                            setSkipCount(0);
                            setSearching(true);//to fetch new data when searching (prevent appending data)
                            searchDelay(setSearchVal, e.target.value);
                        }}
                        type="text"
                        name="search"
                        placeholder="search"
                    />
                </div>
            </div>

            <div className="itemPanel">
                {records.length !== 0 ?
                    <ul className="itemsList">
                        {records.map((record, index) => {
                            return (
                                <div
                                    className="itemBox"
                                    key={index}
                                    onClick={() => navigate(`${record._id}`)}
                                >
                                    <li
                                        key={index}
                                    >
                                        <div className="top d-flex justify-content-between">
                                            <label className="itemName">{record.quizName}</label>
                                            <label className="itemName">{record.date}</label>
                                        </div>
                                        <div className="line"></div>
                                        <div className="descriptionBox">
                                            <label className="description d-grid">
                                                Score: {record.score}
                                            </label>
                                            <label className="description">
                                                Number of items: {record.numberOfItems}
                                            </label>

                                        </div>
                                    </li>

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

export default RecordsList;