import React from "react";
import { useSelector } from "react-redux";
import "../styles/pad.css";

const Pad = ({ children, record }) => {

    const auth = useSelector(state => state.auth);

    return (
        <div className="pad p-4">
            <div className="d-flex justify-content-between">
                <div className="d-grid">
                    <label className="fw-bold">Name:
                        <label className="fw-normal ms-1">
                            {auth.user.username}
                        </label>
                    </label>
                    <label className="fw-bold">Subject:
                        <label className="fw-normal ms-1">
                            {record.subject}
                        </label>
                    </label>
                    <label className="fw-bold">Quiz name:
                        <label className="fw-normal ms-1">
                            {record.quizName}
                        </label>
                    </label>
                </div>
                <div className="d-flex flex-column">
                    <label className="fw-bold">Date:
                        <label className="fw-normal ms-1">
                            {record.date}
                        </label>
                    </label>
                    <label className="fw-bold">Score:
                        <label className="fw-normal ms-1">
                            Score
                        </label>
                    </label>
                </div>
            </div>
            <div className="body d-grid gap-1 mt-4">
                {children}
            </div>
        </div>
    )
}

export default Pad;