import { CheckCircle, XCircle } from "react-bootstrap-icons";

const RecordItems = ({ record }) => {
  return (
    <section className="record-items" aria-labelledby="answer-review-title">
      <header className="record-items-header">
        <h2 id="answer-review-title">Answer review</h2>

        <p>Review your answers and see which questions you got right.</p>
      </header>

      <div className="record-questions">
        {record.items.map((item, index) => {
          const isCorrect = item.correct;

          return (
            <article
              className={`record-question ${
                isCorrect
                  ? "record-question-correct"
                  : "record-question-incorrect"
              }`}
              key={index}
            >
              {/* Question header */}
              <header className="record-question-header">
                <div className="record-question-status">
                  {isCorrect ? (
                    <CheckCircle className="correct-icon" />
                  ) : (
                    <XCircle className="incorrect-icon" />
                  )}

                  <span className="record-question-number">
                    Question {index + 1}
                  </span>
                </div>

                <span
                  className={`record-result ${
                    isCorrect ? "correct-answer" : "incorrect-answer"
                  }`}
                >
                  {isCorrect ? "Correct" : "Incorrect"}
                </span>
              </header>

              {/* Question */}
              <div className="record-question-body">
                <p className="record-question-text">{item.question}</p>

                {/* User answer */}
                <div className="record-answers">
                  <div className="record-answer">
                    <span className="record-answer-label">Your answer</span>

                    <span
                      className={`record-answer-value ${
                        isCorrect ? "correct-answer" : "incorrect-answer"
                      }`}
                    >
                      {item.userAnswer}
                    </span>
                  </div>

                  {!isCorrect && (
                    <div className="record-answer">
                      <span className="record-answer-label">Correct answer</span>

                      <span className="record-answer-value correct-answer">
                        {item.answer}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RecordItems;
