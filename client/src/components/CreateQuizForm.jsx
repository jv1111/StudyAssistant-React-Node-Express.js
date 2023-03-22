import React, { useState, useRef, useEffect } from "react";
import FormTextField from "./FormTextField";
import ItemContainer from "./ItemContainer";
import { createQuiz } from "../api/QuizApi";
import { useNavigate } from "react-router-dom";
import useSavedDataFetcher from "../hooks/useSavedDataFetcher";
import autoSave from "../helper/autoSave";

const CreateQuizForm = () => {

    const [items, setItems] = useState(onLoad_items);
    const [subject, setSubject] = useState("");
    const [quizName, setQuizName] = useState("");
    const itemBoxRef = useRef(null);
    const navigate = useNavigate();

    useSavedDataFetcher("createQuiz", setItems, setSubject, setQuizName);

    const addQuestion = () => {
        // create a new emty question and answer object
        const newQuestion = {
            question: "",
            answer: ""
        }
        setItems([...items, newQuestion]);//set items to current items + newQuestion
        // auto scrolldown
        setTimeout(() => {
            itemBoxRef.current.scrollTop = itemBoxRef.current.scrollHeight;
        }, 10);
    }

    const deleteQuestion = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);// Remove one element from the 'newItems' array starting at the specified index
        setItems(newItems);//update items value
    }

    // update items value (e.g new questions and answers value)
    const itemOnChangeHandler = (e, index) => {
        const newItems = [...items];
        newItems[index][e.target.name] = e.target.value;//change item value base on index and target name (question/answer)
        setItems(newItems);
        const data = { items: items, subject: subject, quizName: quizName }
        autoSave("createQuiz", data);//save the pre-submitted automatically to the database
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await createQuiz(subject, quizName, items);
        if (response.error) {
            alert(response.error);
        }
        
        navigate("/");
    }

    return (
        <form autoComplete="off" onSubmit={submitHandler}>
            <label className="text-white mid-size-title">Create quiz</label>
            <div style={{ width: "250px", color: "white" }}>
                <FormTextField
                    type="text"
                    label="Subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => {
                        setSubject(e.target.value)
                        const data = { items: items, subject: e.target.value, quizName: quizName }
                        autoSave("createQuiz", data);//save the pre-submitted automatically to the database
                    }}
                />
                <FormTextField
                    type="text"
                    label="Quiz Name"
                    name="quizName"
                    value={quizName}
                    onChange={(e) => {
                        setQuizName(e.target.value)
                        const data = { items: items, subject: subject, quizName: e.target.value }
                        autoSave("createQuiz", data);//save the pre-submitted automatically to the database
                    }}
                />
            </div>

            <ItemContainer title={"Questions"} >
                <div className="itemsList" ref={itemBoxRef}>
                    {items.map((item, index) => {
                        return (
                            <div className="itemBox" key={index}>
                                <button
                                    id="deleteQuestion"
                                    type="button"
                                    onClick={() => deleteQuestion(index)}
                                    disabled={items.length <= 3}
                                >
                                    -
                                </button>
                                <div className="question">
                                    <label>Question {index + 1}</label>
                                    <textarea
                                        rows="4"
                                        className="inputController"
                                        name="question"
                                        required="required"
                                        value={item.question}
                                        onChange={(e) => itemOnChangeHandler(e, index)}
                                    />
                                </div>
                                <div className="answer">
                                    <label>Answer</label>
                                    <input
                                        className="inputController"
                                        type="text"
                                        name="answer"
                                        required="required"
                                        value={item.answer}
                                        onChange={(e) => itemOnChangeHandler(e, index)}
                                    />
                                </div>
                            </div>
                        )
                    })}
                    <div className="innerButton">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={addQuestion}
                        >
                            +
                        </button>
                    </div>

                </div>
            </ItemContainer>

            <button
                className="btn-primary mt-1"
                style={{ width: "200px" }}
            >
                Submit
            </button>

        </form>
    );
}

const onLoad_items = () => {

    return [{
        question: "",
        answer: ""
    },
    {
        question: "",
        answer: ""
    },
    {
        question: "",
        answer: ""
    }
    ]
}


export default CreateQuizForm;