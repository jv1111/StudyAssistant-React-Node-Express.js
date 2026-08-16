import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import ItemContainer from "../../components/ItemContainer";

import { createQuiz, deleteSavedData } from "../../api/QuizApi";
import useSavedDataFetcher from "../../hooks/useSavedDataFetcher";
import autoSave from "../../helper/autoSave";

const CreateQuizPage = () => {
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

  const itemOnChangeHandler = (event, index) => {
    const newItems = items.map((item, itemIndex) =>
      itemIndex === index
        ? {
            ...item,
            [event.target.name]: event.target.value,
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

  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await createQuiz(subject, quizName, items);

    if (response.error) {
      alert(response.error);
      return;
    }

    await deleteSavedData("createQuiz");
    navigate("/");
  };

  return (
    <div className="create-quiz-page">
      <section className="create-quiz">
        <header className="create-quiz-header">
          <span className="form-eyebrow">QUIZ BUILDER</span>

          <h1 className="create-quiz-title">Create Quiz</h1>

          <p className="create-quiz-description">
            Create a quiz by providing the basic information and adding
            questions.
          </p>
        </header>

        <form
          className="create-quiz-form"
          autoComplete="off"
          onSubmit={submitHandler}
        >
          {/* Quiz Information */}
          <section
            className="create-quiz-card"
            aria-labelledby="quiz-info-title"
          >
            <header className="create-quiz-card-header">
              <div>
                <h2 id="quiz-info-title">Quiz Information</h2>

                <p>Provide the basic details for your quiz.</p>
              </div>
            </header>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <div className="form-field">
                  <label htmlFor="subject">Subject</label>

                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={subject}
                    placeholder="e.g. Mathematics"
                    onChange={(event) => {
                      setSubject(event.target.value);

                      autoSave("createQuiz", {
                        items,
                        subject: event.target.value,
                        quizName,
                      });
                    }}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-field">
                  <label htmlFor="quizName">Quiz Name</label>

                  <input
                    id="quizName"
                    type="text"
                    name="quizName"
                    value={quizName}
                    placeholder="e.g. Algebra Quiz"
                    onChange={(event) => {
                      setQuizName(event.target.value);

                      autoSave("createQuiz", {
                        items,
                        subject,
                        quizName: event.target.value,
                      });
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Questions */}
          <ItemContainer search={false} title="Questions">
            <div className="question-list" ref={itemBoxRef}>
              {items.map((item, index) => (
                <article className="question-card" key={index}>
                  <header className="question-card-header">
                    <div>
                      <span className="question-number">
                        QUESTION {index + 1}
                      </span>

                      <h3>Question {index + 1}</h3>
                    </div>

                    <button
                      type="button"
                      className="btn btn-danger"
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
                  </header>

                  <div className="question-card-body">
                    <div className="form-field">
                      <label htmlFor={`question-${index}`}>Question</label>

                      <textarea
                        id={`question-${index}`}
                        rows="4"
                        name="question"
                        required
                        placeholder="Enter your question..."
                        value={item.question}
                        onChange={(event) => itemOnChangeHandler(event, index)}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor={`answer-${index}`}>Answer</label>

                      <input
                        id={`answer-${index}`}
                        type="text"
                        name="answer"
                        required
                        placeholder="Enter the correct answer..."
                        value={item.answer}
                        onChange={(event) => itemOnChangeHandler(event, index)}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <footer className="question-list-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={addQuestion}
              >
                + Add Question
              </button>
            </footer>
          </ItemContainer>

          {/* Form Actions */}
          <footer className="create-quiz-actions">
            <button type="submit" className="btn btn-primary">
              Create Quiz
            </button>
          </footer>
        </form>
      </section>
    </div>
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

export default CreateQuizPage;
