import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JournalBookmark, FileEarmarkText } from "react-bootstrap-icons";

import EmptyState from "../../components/common/EmptyState";
import QuizItemCard from "../../components/quiz/QuizItemCard";
import GlassScrollableList from "../../components/common/GlassScrollableList";
import LoadingPage from "../common/LoadingPage";
import Badge from "../../components/common/Badge";
import AppHeader from "../../components/common/AppHeader";

import useRecordedSubjects from "../../hooks/records/useRecordedSubjects";
import useRecords from "../../hooks/records/useRecords";

const RecordsPage = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);

  const isRecordMode = Boolean(selectedSubject);

  const {
    subjects = [],
    isLoading: isSubjectsLoading,
    searchInput: subjectSearchInput,
    handleSearch: handleSubjectSearch,
    handleScroll: handleSubjectScroll,
  } = useRecordedSubjects();

  const {
    records = [],
    isLoading: isRecordsLoading,
    searchInput: recordSearchInput,
    handleSearch: handleRecordSearch,
    handleScroll: handleRecordScroll,
  } = useRecords(selectedSubject?._id);

  const isLoading = isRecordMode ? isRecordsLoading : isSubjectsLoading;

  const items = isRecordMode ? (records ?? []) : (subjects ?? []);

  const searchInput = isRecordMode ? recordSearchInput : subjectSearchInput;

  const handleSearch = isRecordMode ? handleRecordSearch : handleSubjectSearch;

  const handleScroll = isRecordMode ? handleRecordScroll : handleSubjectScroll;

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
  };

  const handleSelectRecord = (record) => {
    if (!record._id) {
      console.error("Record is missing _id:", record);
      return;
    }

    navigate(`/quiz/records/${record._id}`);
  };

  const itemConfig = isRecordMode
    ? {
        getName: (item) => item.quizName,
        itemIcon: FileEarmarkText,
        onSelect: handleSelectRecord,
        getCount: (item) => item.numberOfItems,
        countLabel: "Question",
        getBadge: (item) => (
          <Badge variant="primary" shape="pill">
            {item.quizType === "enumeration"
              ? "Enumeration"
              : "Multiple Choice"}
          </Badge>
        ),
        getDescription: () =>
          "Review your answers, score, and performance from this quiz attempt.",
        getSecondaryContent: (item) =>
          item.completedAt
            ? `Completed ${new Date(item.completedAt).toLocaleDateString()}`
            : null,
      }
    : {
        getName: (item) => item.name,
        itemIcon: JournalBookmark,
        onSelect: handleSelectSubject,
        getCount: (item) => item.recordCount,
        countLabel: "Record",
        getBadge: () => (
          <Badge icon={JournalBookmark} variant="primary" shape="pill">
            Subject
          </Badge>
        ),
        getDescription: () =>
          "View your quiz records and track your performance in this subject.",
        getSecondaryContent: () => null,
      };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex w-full flex-col">
      <AppHeader
        eyebrow="Overview"
        title={isRecordMode ? selectedSubject.name : "Records"}
        description={
          isRecordMode
            ? "Choose a quiz record to review your performance."
            : "Browse your quiz records by subject."
        }
        leading={
          isRecordMode && (
            <button
              type="button"
              onClick={handleBackToSubjects}
              className="mb-1 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              Subjects
            </button>
          )
        }
        searchValue={searchInput}
        onSearch={handleSearch}
        searchPlaceholder={
          isRecordMode ? "Search records..." : "Search subjects..."
        }
      />

      {isRecordMode && (
        <div className="mb-5 w-full border-b border-border/90" />
      )}

      <div className="mb-5 flex min-h-0 flex-1">
        {items.length > 0 ? (
          <GlassScrollableList onScroll={handleScroll}>
            {items.map((item) => (
              <li
                key={item._id}
                className="mb-3 flex w-full items-center justify-center last:mb-0"
              >
                <QuizItemCard
                  name={itemConfig.getName(item)}
                  itemIcon={itemConfig.itemIcon}
                  onSelect={() => itemConfig.onSelect(item)}
                  hasOption={false}
                  count={itemConfig.getCount(item)}
                  countLabel={itemConfig.countLabel}
                  badge={itemConfig.getBadge(item)}
                  description={itemConfig.getDescription(item)}
                  secondaryContent={itemConfig.getSecondaryContent(item)}
                />
              </li>
            ))}
          </GlassScrollableList>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <EmptyState
              title={
                isRecordMode
                  ? "No quiz records found"
                  : "No recorded subjects found"
              }
              description={
                isRecordMode
                  ? "There are no quiz records matching your search."
                  : "You do not have any quiz records yet."
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordsPage;
