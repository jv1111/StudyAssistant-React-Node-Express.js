import React, { useState } from "react";
import { Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import EmptyList from "./EmptyList";
import searchDelay from "../helper/searchDelay";
import useItemFetcher from "../hooks/useItemFetcher";
import { getRecords } from "../api/QuizApi";
import LoadingPage from "../pages/Loading/LoadingPage";

const RecordsList = () => {
  const [records, setRecords] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const { isLoading, setSearching, setSkipCount } = useItemFetcher(
    records,
    setRecords,
    searchVal,
    getRecords,
    {},
  );

  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="itemContainer">
      {/* Header */}
      <div className="topDescription">
        <div>
          <h2 className="text-white mb-1">Records</h2>

          <p className="text-white-50 mb-0">
            Review your previous quiz results.
          </p>
        </div>

        {/* Search */}
        <div className="searchBox">
          <Search className="searchIcon" />

          <input
            onChange={(e) => {
              setSkipCount(0);
              setSearching(true);

              searchDelay(setSearchVal, e.target.value);
            }}
            type="text"
            name="search"
            placeholder="Search records..."
          />
        </div>
      </div>

      {/* Records */}
      <div className="itemPanel">
        {records.length !== 0 ? (
          <ul className="itemsList list-unstyled mb-0">
            {records.map((record, index) => (
              <li key={record._id || index}>
                <div
                  className="card bg-dark border-secondary mb-3 recordCard"
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`${record._id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      navigate(`${record._id}`);
                    }
                  }}
                >
                  <div className="card-body p-3 p-md-4">
                    {/* Record Header */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                      <div>
                        <h5 className="text-white mb-1">{record.quizName}</h5>

                        <small className="text-white-50">Quiz Record</small>
                      </div>

                      <span className="text-white-50">{record.date}</span>
                    </div>

                    <hr className="border-secondary my-3" />

                    {/* Record Information */}
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
                          <small className="text-white-50 d-block">
                            Number of Items
                          </small>

                          <span className="text-white fs-5 fw-semibold">
                            {record.numberOfItems}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </div>
  );
};

export default RecordsList;
