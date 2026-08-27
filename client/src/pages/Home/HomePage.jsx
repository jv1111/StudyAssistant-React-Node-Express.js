import EmptyState from "../../components/common/EmptyState";
import SubjectCardContent from "../../components/quiz/SubjectCardContent";
import Card from "../../components/common/Card";
import AppHeaderContent from "../../components/common/AppHeaderContent";
import SearchInput from "../../components/common/SearchInput";

import useSubjects from "../../hooks/useSubjects";
import LoadingPage from "../Loading/LoadingPage";

const HomePage = () => {
  const { subjects, isLoading, searchInput, handleSearch, handleScroll } =
    useSubjects();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <header className="mb-8 flex h-fit flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <AppHeaderContent
          eyebrow="Overview"
          title="Subjects"
          description="Browse your quiz subjects and test your knowledge"
        />

        <div className="w-full shrink-0 sm:w-72 md:w-80">
          <SearchInput
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search subjects..."
          />
        </div>
      </header>

      {subjects.length > 0 ? (
        <ul
          onScroll={handleScroll}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {subjects.map((subject) => (
            <li key={subject._id} className="h-full">
              <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <SubjectCardContent subject={subject} />
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No subjects found"
          description="There are no subjects matching your search. Try adjusting your query."
        />
      )}
    </div>
  );
};

export default HomePage;
