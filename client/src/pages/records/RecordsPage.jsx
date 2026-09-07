import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JournalBookmark, FileEarmarkText } from "react-bootstrap-icons";

import EmptyState from "../../components/common/EmptyState";
import QuizItemCard from "../../components/quiz/QuizItemCard";
import GlassScrollableList from "../../components/common/GlassScrollableList";
import Badge from "../../components/common/Badge";
import AppHeader from "../../components/common/AppHeader";
import Loading from "../../components/common/Loading";

import useRecordedSubjects from "../../hooks/records/useRecordedSubjects";
import useRecords from "../../hooks/records/useRecords";

const RecordsPage = () => {
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useState(null);

  const isRecordMode = Boolean(selectedSubject);

  const {
    subjects,
    isLoading: isSubjectsLoading,
    isFetchingFromScrollingDown: isFetchingSubjects,
    hasMore: hasMoreSubjects,
    searchInput: subjectSearchInput,
    handleSearch: handleSubjectSearch,
    handleScroll: handleSubjectScroll,
  } = useRecordedSubjects();

  const {
    records,
    isLoading: isRecordsLoading,
    isFetchingFromScrollingDown: isFetchingRecords,
    hasMore: hasMoreRecords,
    searchInput: recordSearchInput,
    handleSearch: handleRecordSearch,
    handleScroll: handleRecordScroll,
  } = useRecords(selectedSubject?._id);

  const items = isRecordMode ? records : subjects;

  const isLoading = isRecordMode ? isRecordsLoading : isSubjectsLoading;

  const isFetchingMore = isRecordMode ? isFetchingRecords : isFetchingSubjects;

  const hasMore = isRecordMode ? hasMoreRecords : hasMoreSubjects;

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
        hasOption: false,
        getCount: (item) => item.numberOfItems,
        countLabel: "Question",
        badge: (
          <Badge variant="primary" shape="pill">
            Multiple Choice
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
        getName: (item) => item.subject,
        itemIcon: JournalBookmark,
        onSelect: handleSelectSubject,
        hasOption: false,
        getCount: (item) => item.recordCount,
        countLabel: "Record",
        badge: (
          <Badge icon={JournalBookmark} variant="primary" shape="pill">
            Subject
          </Badge>
        ),
        getDescription: () =>
          "View your quiz records and track your performance in this subject.",
        getSecondaryContent: () => null,
      };

  return (
    <div className="flex h-screen w-full flex-col">
      <AppHeader
        eyebrow="Overview"
        title={isRecordMode ? selectedSubject.subject : "Records"}
        description={
          isRecordMode
            ? "Choose a quiz record to review your performance."
            : "Browse your quiz records by subject."
        }
        showBackButton={isRecordMode}
        onBack={handleBackToSubjects}
        searchValue={searchInput}
        onSearch={handleSearch}
        searchPlaceholder={
          isRecordMode ? "Search records..." : "Search subjects..."
        }
      />

      <div className="mb-5 flex min-h-0 flex-1 flex-col">
        <GlassScrollableList
          onScroll={handleScroll}
          isFetchingMore={isFetchingMore}
        >
          {items.length > 0 ? (
            items.map((item) => (
              <li
                key={item._id}
                className="flex w-full items-center justify-center"
              >
                <QuizItemCard
                  name={itemConfig.getName(item)}
                  itemIcon={itemConfig.itemIcon}
                  onSelect={() => itemConfig.onSelect(item)}
                  hasOption={itemConfig.hasOption}
                  count={itemConfig.getCount(item)}
                  countLabel={itemConfig.countLabel}
                  badge={itemConfig.badge}
                  description={itemConfig.getDescription(item)}
                  secondaryContent={itemConfig.getSecondaryContent(item)}
                />
              </li>
            ))
          ) : isLoading ? (
            <li className="flex min-h-full w-full items-center justify-center">
              <Loading />
            </li>
          ) : (
            <li className="flex min-h-full w-full items-center justify-center">
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
            </li>
          )}
        </GlassScrollableList>
      </div>
    </div>
  );
};

export default RecordsPage;
