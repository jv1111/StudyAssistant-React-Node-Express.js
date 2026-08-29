import { useNavigate } from "react-router-dom";

import EmptyState from "../../components/common/EmptyState";
import QuizRecordCardContent from "../../components/quiz/QuizRecordCardContent";
import Card from "../../components/common/Card";
import AppHeaderContent from "../../components/common/AppHeaderContent";
import SearchInput from "../../components/common/SearchInput";
import LoadingPage from "../Loading/LoadingPage";

import useRecords from "../../hooks/useRecords";

const RecordsPage = () => {
  const navigate = useNavigate();

  const { records, isLoading, searchInput, handleSearch, handleScroll } =
    useRecords();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <header className="mb-8 flex h-fit flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <AppHeaderContent
          eyebrow="History"
          title="Quiz Records"
          description="Review your past quiz performances and track your progress"
        />

        <div className="w-full shrink-0 sm:w-72 md:w-80">
          <SearchInput
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search by quiz name..."
          />
        </div>
      </header>

      {records.length > 0 ? (
        <ul
          onScroll={handleScroll}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {records.map((record) => (
            <li key={record._id} className="h-full">
              <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <QuizRecordCardContent
                  record={record}
                  onViewDetails={() => navigate(`/quiz/records/${record._id}`)}
                />
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No records found"
          description="There are no quiz records matching your search. Try adjusting your query."
        />
      )}
    </div>
  );
};

export default RecordsPage;
