import { useNavigate } from "react-router-dom";

import EmptyState from "../../components/common/EmptyState";
import SubjectCardContent from "../../components/quiz/SubjectCardContent";
import Card from "../../components/common/Card";
import AppHeaderContent from "../../components/common/AppHeaderContent";
import SearchInput from "../../components/common/SearchInput";
import LoadingPage from "../Loading/LoadingPage";
import GlassScrollableGrid from "../../components/common/GlassScrollableGrid"; // <-- Import the new component

import useSubjects from "../../hooks/useSubjects";

const HomePage = () => {
  const navigate = useNavigate();

  const { subjects, isLoading, searchInput, handleSearch, handleScroll } =
    useSubjects();

  const handleSelectSubject = (subjectId) => {
    navigate(`/quiz/${subjectId}`);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex h-full flex-col">
      <header className="mb-8 mt-4 flex h-fit shrink-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
        <GlassScrollableGrid onScroll={handleScroll}>
          {subjects.map((subject) => (
            <li key={subject._id} className="h-full">
              <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <SubjectCardContent
                  subject={subject}
                  onSelectSubject={() => handleSelectSubject(subject._id)}
                />
              </Card>
            </li>
          ))}
        </GlassScrollableGrid>
      ) : (
        <div className="flex-1">
          <EmptyState
            title="No subjects found"
            description="There are no subjects matching your search. Try adjusting your query."
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
