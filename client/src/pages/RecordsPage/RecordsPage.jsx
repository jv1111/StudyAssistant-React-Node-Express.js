import EmptyState from "../../components/common/EmptyState";
import ListPageLayout from "../../components/common/ListPageLayout";
import RecordCardContent from "../../components/records/RecordCardContent";
import Card from "../../components/common/Card";

import useRecords from "../../hooks/useRecords";
import LoadingPage from "../Loading/LoadingPage";

const RecordsPage = () => {
  const { records, isLoading, searchInput, handleSearch, handleScroll } =
    useRecords();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <ListPageLayout
      title="Records"
      description="Review your previous quiz results"
      searchInput={searchInput}
      onSearch={handleSearch}
      searchPlaceholder="Search records..."
    >
      {records.length > 0 ? (
        <ul
          onScroll={handleScroll}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {records.map((record) => (
            <li key={record._id}>
              <Card>
                <RecordCardContent record={record} />
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No records found"
          description="Complete a quiz to see your results here."
        />
      )}
    </ListPageLayout>
  );
};

export default RecordsPage;
