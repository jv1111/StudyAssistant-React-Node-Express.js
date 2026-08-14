import React from "react";
import { CheckCircle, XCircle } from "react-bootstrap-icons";

const RecordItems = ({ record }) => {
  return (
    <div className="recordItems">
      <div className="recordItemsHeader">
        <h3 className="text-fam-kavoon">Quiz Review</h3>

        <p>Review your answers and see which questions you got right.</p>
      </div>

      <div className="recordQuestions">
        {record.items.map((item, index) => {
          const isCorrect = item.correct;

          return (
            <div
              className={`recordQuestion ${
                isCorrect ? "recordQuestionCorrect" : "recordQuestionIncorrect"
              }`}
              key={index}
            >
              {/* Question header */}
              <div className="recordQuestionHeader">
                <div className="d-flex align-items-center gap-2">
                  {isCorrect ? (
                    <CheckCircle className="correctIcon" />
                  ) : (
                    <XCircle className="incorrectIcon" />
                  )}

                  <span className="recordQuestionNumber">
                    Question {index + 1}
                  </span>
                </div>

                <span
                  className={`recordResult ${
                    isCorrect ? "correctAns" : "incorrectAns"
                  }`}
                >
                  {isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>

              {/* Question */}
              <div className="recordQuestionBody">
                <p className="recordQuestionText">{item.question}</p>

                {/* User answer */}
                <div className="recordAnswer">
                  <span className="recordAnswerLabel">Your answer</span>

                  <span
                    className={`recordAnswerValue ${
                      isCorrect ? "correctAns" : "incorrectAns"
                    }`}
                  >
                    {item.userAnswer}
                  </span>
                </div>

                {/* Correct answer */}
                {!isCorrect && (
                  <div className="recordAnswer correctAnswerBox">
                    <span className="recordAnswerLabel">Correct answer</span>

                    <span className="recordAnswerValue correctAns">
                      {item.answer}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecordItems;
