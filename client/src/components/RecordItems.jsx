import React from "react";
import { CheckCircle, XCircle } from "react-bootstrap-icons";

const RecordItems = ({ record }) => {

    return (
        <div className="recordItems">
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
                            <label className="bold">Question# {index + 1}</label>
                            <p className="p-2">{item.question}</p>
                            <label className={`bold ${item.correct ? "correctAns" : "incorrectAns"}`}>Answer: </label>
                            <label className={`bold ${item.correct ? "correctAns" : "incorrectAns"}`}>
                                {item.userAnswer}
                            </label>
                            {!item.correct &&
                                <label className="bold correctAns">
                                    {item.answer}
                                </label>
                            }
                            <div className="line"></div>
                        </li>
                    )
                })}
            </ul>
        </div >
    )
}

export default RecordItems;