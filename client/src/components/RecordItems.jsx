import React from "react";
import { CheckCircle, XCircle } from "react-bootstrap-icons";

const RecordItems = ({ record }) => {

    return (
        <div className="item mt-4">
            <ul>
                {record.items.map((item, index) => {
                    // todo update css
                    return (
                        <li key={index}>
                            {item.correct ?
                                <CheckCircle className="correctIcon" />
                                :
                                <XCircle className="incorrectIcon"/>
                            }
                            {index !== 0 && <div className="line bg-gray w-100 mt-3 mb-3" style={{ height: "2px" }}></div>}
                            <label className="fw-bold">Question# {index + 1}</label>
                            <p className="p-2">{item.question}</p>
                            <label className={`fw-bold p-2 ${item.correct ? "correctAns" : "incorrectAns"}`}>Answer: </label>
                            <br />
                            <label className={`fw-normal p-2 ${item.correct ? "correctAns" : "incorrectAns"}`}>
                                {item.userAnswer}
                            </label>
                            {!item.correct &&
                                <label className="fw-bold correctAns">
                                    {item.answer}
                                </label>
                            }
                        </li>
                    )
                })}
            </ul>
        </div >
    )
}

export default RecordItems;