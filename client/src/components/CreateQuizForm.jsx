import React, { useState, useRef } from "react";
import FormTextField from "./FormTextField";
import ItemContainer from "./ItemContainer";

const CreateQuizForm = () => {

    const [items, setItems] = useState(temp);
    const [subject, setSubject] = useState("");
    const [quizName, setQuizName] = useState("");
    const itemBoxRef = useRef(null);

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
        setItems(newItems);//update items value
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(items);
        console.log(subject);
        console.log(quizName);
        //todo create server function
    }

    return (
        <form autoComplete="off" onSubmit={submitHandler}>
            <label>Create quiz</label>
            <FormTextField
                type="text"
                label="Subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />
            <FormTextField
                type="text"
                label="Quiz Name"
                name="quizName"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
            />

            <ItemContainer title={"Questions"} >
                <div className="itemsList" ref={itemBoxRef}>
                    {items.map((item, index) => {
                        return (
                            <div className="itemBox" key={index}>
                                <button
                                    id="deleteQuestion"
                                    type="button"
                                    onClick={() => deleteQuestion(index)}
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
                className="btn-primary"
            >
                Submit
            </button>

        </form>
    );
}

const temp = [
    {
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

export default CreateQuizForm;