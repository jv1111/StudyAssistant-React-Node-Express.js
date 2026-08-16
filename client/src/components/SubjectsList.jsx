import React from "react";

import EmptyState from "./EmptyState";
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
    <section className="subjects-section">
      <header className="subjects-header">
        <div>
          <h1 className="subjects-title">Subjects</h1>

          <p className="subjects-description">Browse your quiz subjects</p>
        </div>

        <SearchInput
          value={searchInput}
          onChange={handleSearch}
          placeholder="Search subjects..."
        />
      </header>

      {subjects.length > 0 ? (
        <ul className="subjects-grid" onScroll={handleScroll}>
          {subjects.map((subject) => (
            <li key={subject._id}>
              <SubjectCard subject={subject} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No subjects found"
          description="There are no subjects matching your search."
        />
      )}
    </section>
  );
};

export default SubjectsList;
