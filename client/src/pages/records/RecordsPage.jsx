import { useNavigate } from "react-router-dom";

import EmptyState from "../../components/common/EmptyState";
import QuizRecordCardContent from "../../components/quiz/QuizRecordCardContent";
import Card from "../../components/common/Card";
import AppHeaderContent from "../../components/common/AppHeaderContent";
import SearchInput from "../../components/common/SearchInput";
import LoadingPage from "../common/LoadingPage";
import GlassScrollableList from "../../components/common/GlassScrollableList";

import useRecords from "../../hooks/records/useRecords";

const RecordsPage = () => {
  const navigate = useNavigate();

  const { records, isLoading, searchInput, handleSearch, handleScroll } =
    useRecords();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex h-full flex-col">
      <header className="mb-8 mt-4 flex h-fit shrink-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
        <GlassScrollableList onScroll={handleScroll}>
          {records.map((record) => (
            <li key={record._id} className="h-fit">
              <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <QuizRecordCardContent
                  record={record}
                  onViewDetails={() => navigate(`/quiz/records/${record._id}`)}
                />
              </Card>
            </li>
          ))}
        </GlassScrollableList>
      ) : (
        <div className="flex-1">
          <EmptyState
            title="No records found"
            description="There are no quiz records matching your search. Try adjusting your query."
          />
        </div>
      )}
    </div>
  );
};

export default RecordsPage;
