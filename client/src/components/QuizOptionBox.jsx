import React from "react";
import { useNavigate } from "react-router-dom";

const QuizOptionBox = ({ selectingType, quizId, onClose }) => {
  const navigate = useNavigate();

  const selectHandler = (type) => {
    if (type === "multipleChoice") {
      navigate(quizId);
    }

    if (type === "enumeration") {
      navigate(`enum/${quizId}`);
    }
  };

  return (
    <div className={`popupBlocker ${selectingType ? "" : "hidden"}`}>
      <div className="selection">
        <h3 className="text-fam-kavoon">Select quiz type</h3>

        <button
          type="button"
          className="btn-primary"
          onClick={() => selectHandler("multipleChoice")}
        >
          Multiple choices
        </button>

        <button
          type="button"
          className="btn-primary"
          onClick={() => selectHandler("enumeration")}
        >
          Enumeration
        </button>

        <button type="button" className="btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default QuizOptionBox;
