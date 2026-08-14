import React from "react";
import { useNavigate } from "react-router-dom";

import EmptyList from "./EmptyList";
import RecordCard from "./RecordCard";
import SearchInput from "./SearchInput";

import useRecords from "../hooks/useRecords";

import LoadingPage from "../pages/Loading/LoadingPage";

const RecordsList = () => {
  const { records, isLoading, searchInput, handleSearch, handleScroll } =
    useRecords();

  const navigate = useNavigate();

  const handleRecordSelect = (recordId) => {
    navigate(`${recordId}`);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <section className="recordsSection py-4">
      <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="text-white text-fam-kavoon mb-1">Records</h2>

          <p className="text-secondary mb-0">
            Review your previous quiz results.
          </p>
        </div>

        <SearchInput
          value={searchInput}
          onChange={handleSearch}
          placeholder="Search records..."
        />
      </header>

      <div className="card bg-dark border-secondary shadow-sm">
        <div className="card-body p-3 p-md-4">
          {records.length > 0 ? (
            <div className="row g-3" onScroll={handleScroll}>
              {records.map((record) => (
                <div className="col-12 col-md-6 col-lg-4" key={record._id}>
                  <RecordCard record={record} onSelect={handleRecordSelect} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyList />
          )}
        </div>
      </div>
    </section>
  );
};

export default RecordsList;
