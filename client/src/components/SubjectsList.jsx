import React, { useState } from "react";
import EmptyList from "./EmptyList";

const SubjectList = () => {

    if (subjects.length === 0) {
        return <EmptyList />
    }

    return (
        <ul className="itemsList">
            {subjects.map((subject, index) => {
                return (
                    <div className="itemBox">
                        <li
                            className="itemName"
                            key={index}
                        >
                            {subject.name}
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

const subjects = [
    // {
    //     name: "First",
    //     description: null
    // },
    // {
    //     name: "Second",
    //     description: null
    // },
    // {
    //     name: "Third",
    //     description: null
    // }
]

export default SubjectList;