import { useNavigate } from "react-router-dom";

import EmptyState from "../../components/common/EmptyState";
import SubjectCard from "../../components/quiz/SubjectCard";
import AppHeaderContent from "../../components/common/AppHeaderContent";
import SearchInput from "../../components/common/SearchInput";
import LoadingPage from "../common/LoadingPage";
import GlassScrollableList from "../../components/common/GlassScrollableList";

import useSubjects from "../../hooks/quiz/useSubjects";

const SubjectsPage = () => {
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
      <header className="mb-5 mt-4 flex h-fit shrink-0 flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
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

      <div className="mb-5 w-full border-b border-border/90" />

      {subjects.length > 0 ? (
        <GlassScrollableList onScroll={handleScroll}>
          {subjects.map((subject) => (
            <li key={subject._id} className="w-full">
              <SubjectCard
                subject={subject}
                onSelect={() => handleSelectSubject(subject._id)}
              />
            </li>
          ))}
        </GlassScrollableList>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState
            title="No subjects found"
            description="There are no subjects matching your search. Try adjusting your query."
          />
        </div>
      )}
    </div>
  );
};

export default SubjectsPage;
