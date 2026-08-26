import EmptyState from "../../components/common/EmptyState";
import ListPageLayout from "../../components/common/ListPageLayout";
import SubjectCardContent from "../../components/quiz/SubjectCardContent";
import Card from "../../components/common/Card";

import useSubjects from "../../hooks/useSubjects";
import LoadingPage from "../Loading/LoadingPage";

const HomePage = () => {
  const { subjects, isLoading, searchInput, handleSearch, handleScroll } =
    useSubjects();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <ListPageLayout
      title="Subjects"
      description="Browse your quiz subjects and test your knowledge"
      searchInput={searchInput}
      onSearch={handleSearch}
      searchPlaceholder="Search subjects..."
    >
      {subjects.length > 0 ? (
        <ul
          onScroll={handleScroll}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {subjects.map((subject) => (
            <li key={subject._id} className="h-full">
              <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-(--shadow-card)">
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
    </ListPageLayout>
  );
};

export default HomePage;
