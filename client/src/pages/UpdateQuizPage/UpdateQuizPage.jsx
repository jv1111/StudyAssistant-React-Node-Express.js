import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ItemContainer from "../../components/ItemContainer";

import { deleteSavedData, updateQuiz } from "../../api/QuizApi";
import autoSave from "../../helper/autoSave";
import useItemsLoader from "../../hooks/useItemsLoader";
import useSavedDataFetcher from "../../hooks/useSavedDataFetcher";

const UpdateQuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const itemBoxRef = useRef(null);

  const [subject, setSubject] = useState("");
  const [quizName, setQuizName] = useState("");
  const [items, setItems] = useState([]);

  useItemsLoader(quizId, setSubject, setQuizName, setItems);

  useSavedDataFetcher("updateQuiz", setItems, setSubject, setQuizName, quizId);

  const saveData = (data) => {
    autoSave("updateQuiz", data, quizId);
  };

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
    const newItems = items.filter((_, itemIndex) => itemIndex !== index);

    setItems(newItems);

    saveData({
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

    saveData({
      items: newItems,
      subject,
      quizName,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await updateQuiz(quizId, subject, quizName, items);

    if (response.error) {
      alert(response.error);
      return;
    }

    await deleteSavedData("updateQuiz", quizId);

    navigate(`/quiz/${subject}`);
  };

  return (
    <div className="update-quiz-page">
      <section className="update-quiz">
        <header className="update-quiz-header">
          <span className="form-eyebrow">QUIZ BUILDER</span>

          <h1 className="update-quiz-title">Update Quiz</h1>

          <p className="update-quiz-description">
            Update the quiz details and modify its questions.
          </p>
        </header>

        <form
          className="update-quiz-form"
          autoComplete="off"
          onSubmit={submitHandler}
        >
          {/* Quiz Information */}
          <section
            className="update-quiz-card"
            aria-labelledby="quiz-info-title"
          >
            <header className="update-quiz-card-header">
              <div>
                <h2 id="quiz-info-title">Quiz Information</h2>

                <p>Update the basic details for your quiz.</p>
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
                      const value = event.target.value;

                      setSubject(value);

                      saveData({
                        items,
                        subject: value,
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
                      const value = event.target.value;

                      setQuizName(value);

                      saveData({
                        items,
                        subject,
                        quizName: value,
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
                        value={item.question}
                        placeholder="Enter your question..."
                        onChange={(event) => itemOnChangeHandler(event, index)}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor={`answer-${index}`}>Answer</label>

                      <input
                        id={`answer-${index}`}
                        type="text"
                        name="answer"
                        value={item.answer}
                        placeholder="Enter the correct answer..."
                        onChange={(event) => itemOnChangeHandler(event, index)}
                        required
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="question-list-action">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={addQuestion}
              >
                + Add Question
              </button>
            </div>
          </ItemContainer>

          {/* Form Actions */}
          <div className="update-quiz-actions">
            <button type="submit" className="btn btn-primary">
              Update Quiz
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateQuizPage;
