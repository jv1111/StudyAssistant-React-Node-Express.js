import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import ItemContainer from "./ItemContainer";

import { createQuiz, deleteSavedData } from "../api/QuizApi";
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
    const newItems = [
      ...items,
      {
        question: "",
        answer: "",
      },
    ];

    setItems(newItems);

    setTimeout(() => {
      if (itemBoxRef.current) {
        itemBoxRef.current.scrollTop = itemBoxRef.current.scrollHeight;
      }
    }, 10);
  };

  const deleteQuestion = (index) => {
    const newItems = [...items];

    newItems.splice(index, 1);

    setItems(newItems);

    autoSave("createQuiz", {
      items: newItems,
      subject,
      quizName,
    });
  };

  const itemOnChangeHandler = (e, index) => {
    const newItems = items.map((item, itemIndex) =>
      itemIndex === index
        ? {
            ...item,
            [e.target.name]: e.target.value,
          }
        : item,
    );

    setItems(newItems);

    autoSave("createQuiz", {
      items: newItems,
      subject,
      quizName,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await createQuiz(subject, quizName, items);

    if (response.error) {
      alert(response.error);
      return;
    }

    await deleteSavedData("createQuiz");
    navigate("/");
  };

  return (
    <form autoComplete="off" onSubmit={submitHandler}>
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-white mid-size-title mb-2">Create Quiz</h1>

        <p className="text-white-50 mb-0">
          Create a quiz by providing the basic information and adding questions.
        </p>
      </div>

      {/* Quiz Information */}
      <div className="card bg-dark border-secondary mb-4">
        <div className="card-body p-4">
          <h5 className="text-white mb-4">Quiz Information</h5>

          <div className="row g-4">
            <div className="col-12 col-md-6">
              <label htmlFor="subject" className="form-label text-white">
                Subject
              </label>

              <input
                id="subject"
                type="text"
                className="form-control"
                name="subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);

                  autoSave("createQuiz", {
                    items,
                    subject: e.target.value,
                    quizName,
                  });
                }}
                required
              />
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="quizName" className="form-label text-white">
                Quiz Name
              </label>

              <input
                id="quizName"
                type="text"
                className="form-control"
                name="quizName"
                value={quizName}
                onChange={(e) => {
                  setQuizName(e.target.value);

                  autoSave("createQuiz", {
                    items,
                    subject,
                    quizName: e.target.value,
                  });
                }}
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Questions */}
      <ItemContainer search={false} title="Questions">
        <div className="p-3 p-md-4">
          <div className="itemsList" ref={itemBoxRef}>
            {items.map((item, index) => (
              <div className="card bg-dark border-secondary mb-4" key={index}>
                {/* Question Header */}
                <div className="card-header border-secondary d-flex align-items-center justify-content-between py-3">
                  <h6 className="text-white mb-0">Question {index + 1}</h6>

                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteQuestion(index)}
                    disabled={items.length <= 3}
                    title={
                      items.length <= 3
                        ? "A quiz must contain at least 3 questions"
                        : "Delete question"
                    }
                  >
                    Delete
                  </button>
                </div>

                {/* Question Content */}
                <div className="card-body p-3 p-md-4">
                  <div className="mb-4">
                    <label className="form-label text-white">Question</label>

                    <textarea
                      rows="4"
                      className="form-control"
                      name="question"
                      required
                      placeholder="Enter your question..."
                      value={item.question}
                      onChange={(e) => itemOnChangeHandler(e, index)}
                    />
                  </div>

                  <div>
                    <label className="form-label text-white">Answer</label>

                    <input
                      className="form-control"
                      type="text"
                      name="answer"
                      required
                      placeholder="Enter the correct answer..."
                      value={item.answer}
                      onChange={(e) => itemOnChangeHandler(e, index)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Question */}
          <div className="d-flex justify-content-center pt-2">
            <button
              type="button"
              className="btn btn-outline-light px-4"
              onClick={addQuestion}
            >
              + Add Question
            </button>
          </div>
        </div>
      </ItemContainer>

      {/* Submit */}
      <div className="d-flex justify-content-end mt-4 mb-4">
        <button type="submit" className="btn btn-primary px-5">
          Create Quiz
        </button>
      </div>
    </form>
  );
};

const onLoad_items = [
  {
    question: "",
    answer: "",
  },
  {
    question: "",
    answer: "",
  },
  {
    question: "",
    answer: "",
  },
];

export default CreateQuizForm;
