import React, { useState } from "react";
import EmptyList from "./EmptyList";
import useItemFetcher from "../hooks/useItemFetcher";
import { useNavigate } from "react-router-dom";
import { Search } from "react-bootstrap-icons";

import { getSubjects } from "../api/QuizApi";
import searchDelay from "../helper/searchDelay";
import infinitScroller from "../helper/infinitScroller";
import LoadingPage from "../pages/Loading/LoadingPage";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const { isLoading, setSearching, setSkipCount } = useItemFetcher(
    subjects,
    setSubjects,
    searchVal,
    getSubjects,
    {},
  );

  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="text-white text-fam-kavoon mb-1">Subjects</h2>

          <p className="text-secondary mb-0">Browse your quiz subjects</p>
        </div>

        {/* Search */}
        <div className="input-group" style={{ maxWidth: "350px" }}>
          <span className="input-group-text bg-dark border-secondary text-secondary">
            <Search />
          </span>

          <input
            type="text"
            name="search"
            className="form-control bg-dark text-white border-secondary"
            placeholder="Search subjects..."
            value={searchVal}
            onChange={(e) => {
              setSkipCount(0);
              setSearching(true);
              searchDelay(setSearchVal, e.target.value);
            }}
          />
        </div>
      </div>

      {/* Subjects */}
      <div className="card bg-dark border-secondary shadow-sm">
        <div className="card-body p-3 p-md-4">
          {subjects.length !== 0 ? (
            <div
              className="row g-3"
              onScroll={(e) => infinitScroller(e, subjects, setSkipCount)}
            >
              {subjects.map((subject, index) => (
                <div className="col-12 col-md-6 col-lg-4" key={index}>
                  <button
                    type="button"
                    className="w-100 text-start bg-transparent border-0 p-0"
                    onClick={() => navigate(`quiz/${subject._id}`)}
                  >
                    <div className="card h-100 bg-body-secondary border-secondary subject-card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start gap-2">
                          <h5 className="card-title text-white mb-0">
                            {subject._id}
                          </h5>

                          <span className="badge text-bg-primary">Subject</span>
                        </div>

                        <hr className="border-secondary my-3" />

                        <p className="card-text text-secondary mb-0">
                          View quizzes for this subject
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyList />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectList;
