import React from "react";

import EmptyList from "./EmptyList";
import SubjectCard from "./SubjectCard";
import SearchInput from "./SearchInput";

import useSubjects from "../hooks/useSubjects";

import LoadingPage from "../pages/Loading/LoadingPage";

const SubjectsList = () => {
  const { subjects, isLoading, searchInput, handleSearch, handleScroll } =
    useSubjects();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <section className="subjectsSection py-4">
      <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="text-white text-fam-kavoon mb-1">Subjects</h2>

          <p className="text-secondary mb-0">Browse your quiz subjects</p>
        </div>

        <SearchInput
          value={searchInput}
          onChange={handleSearch}
          placeholder="Search subjects..."
        />
      </header>

      <div className="card bg-dark border-secondary shadow-sm">
        <div className="card-body p-3 p-md-4">
          {subjects.length > 0 ? (
            <div className="row g-3" onScroll={handleScroll}>
              {subjects.map((subject) => (
                <SubjectCard key={subject._id} subject={subject} />
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

export default SubjectsList;
