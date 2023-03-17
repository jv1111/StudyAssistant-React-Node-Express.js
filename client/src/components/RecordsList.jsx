import React from "react";
import EmptyList from "./EmptyList";
import useRecordsFetcher from "../hooks/useRecordsFetcher"
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../pages/Loading/LoadingPage";

const RecordsList = () => {

    const { userId } = useParams();
    const { isLoading, records } = useRecordsFetcher(userId);
    const navigate = useNavigate();

    if (isLoading) {
        return <LoadingPage />
    }

    if (records.length === 0) {
        return <EmptyList />
    }
    console.log(records);
    return (
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
    );
}

export default RecordsList;