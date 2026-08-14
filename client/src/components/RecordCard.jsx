import React from "react";

const RecordCard = ({ record, onSelect }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(record._id);
    }
  };

  return (
    <div
      className="card content-card"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(record._id)}
      onKeyDown={handleKeyDown}
    >
      <div className="card-body p-3 p-md-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <div>
            <h5 className="card-title text-white mb-1">{record.quizName}</h5>

            <small className="text-white-50">Quiz Record</small>
          </div>

          <span className="text-white-50">{record.date}</span>
        </div>

        <hr className="border-secondary my-3" />

        <div className="row g-3">
          <div className="col-12 col-sm-6">
            <div className="recordStat">
              <small className="text-white-50 d-block">Score</small>

              <span className="text-white fs-5 fw-semibold">
                {record.score}
              </span>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <div className="recordStat">
              <small className="text-white-50 d-block">Number of Items</small>

              <span className="text-white fs-5 fw-semibold">
                {record.numberOfItems}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordCard;
