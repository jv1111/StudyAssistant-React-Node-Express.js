import EmptyState from "../../components/EmptyState";
import SubjectCard from "../../components/SubjectCard";
import SearchInput from "../../components/SearchInput";

import useSubjects from "../../hooks/useSubjects";
import LoadingPage from "../Loading/LoadingPage";

const HomePage = () => {
  const { subjects, isLoading, searchInput, handleSearch, handleScroll } =
    useSubjects();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <section className="list-page" aria-labelledby="subjects-title">
      <header className="list-page-header">
        <div>
          <h1 id="subjects-title" className="list-page-title">
            Subjects
          </h1>

          <p className="list-page-description">Browse your quiz subjects</p>
        </div>

        <SearchInput
          value={searchInput}
          onChange={handleSearch}
          placeholder="Search subjects..."
        />
      </header>

      {subjects.length > 0 ? (
        <ul className="list-page-grid" onScroll={handleScroll}>
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

export default HomePage;
