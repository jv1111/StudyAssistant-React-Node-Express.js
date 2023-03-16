import React from "react";
import "../styles/pad.css";

const Pad = ({ ...props }) => {
    return (
        <div className="pad p-4">
            <div className="d-flex justify-content-between">
                <div className="d-grid">
                    <label className="fw-bold">Name:
                        <label className="fw-normal">
                            name
                        </label>
                    </label>
                    <label className="fw-bold">Subject:
                        <label className="fw-normal">
                            Subject
                        </label>
                    </label>
                    <label className="fw-bold">Quiz name:
                        <label className="fw-normal">
                            Quiz name
                        </label>
                    </label>
                </div>
                <div className="d-flex flex-column">
                    <label className="fw-bold">Date:
                        <label className="fw-normal">
                            Date
                        </label>
                    </label>
                    <label className="fw-bold">Score:
                        <label className="fw-normal">
                            Score
                        </label>
                    </label>
                </div>
            </div>
            <div className="body d-grid gap-1 mt-4">
                <div className="item">
                    <label className="fw-bold">Question# 1</label>
                    <div className="p-2">
                        <p>question asdjpow question asdjpow question asdjpow question asdjpow question asdjpow question asdjpow question asdjpow question asdjpow .</p>
                        <label className="fw-bold">Answer: </label>
                        <br />
                        <label className="fw-normal">
                            wipoqipoqiepio
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pad;