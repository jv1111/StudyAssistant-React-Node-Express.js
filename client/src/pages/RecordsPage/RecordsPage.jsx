import { useNavigate } from "react-router-dom";

import EmptyState from "../../components/EmptyState";
import RecordCard from "../../components/RecordCard";
import SearchInput from "../../components/SearchInput";

import useRecords from "../../hooks/useRecords";

import LoadingPage from "../Loading/LoadingPage";

const RecordsPage = () => {
  const { records, isLoading, searchInput, handleSearch, handleScroll } =
    useRecords();

  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <section className="records-page" aria-labelledby="records-title">
      <header className="records-page-header">
        <div>
          <span className="form-eyebrow">QUIZ HISTORY</span>

          <h1 id="records-title">Records</h1>

          <p>Review your previous quiz results.</p>
        </div>

        <SearchInput
          value={searchInput}
          onChange={handleSearch}
          placeholder="Search records..."
        />
      </header>

      {records.length > 0 ? (
        <div className="records-grid" onScroll={handleScroll}>
          {records.map((record) => (
            <RecordCard
              key={record._id}
              record={record}
              onSelect={(recordId) => navigate(recordId)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No records found"
          description="Complete a quiz to see its results here."
        />
      )}
    </section>
  );
};

export default RecordsPage;
