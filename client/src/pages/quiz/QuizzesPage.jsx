import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { Book, Download, JournalBookmark } from "react-bootstrap-icons";

import EmptyState from "../../components/common/EmptyState";
import OptionBox from "../../components/common/OptionBox";
import QuizItemCard from "../../components/quiz/QuizItemCard";
import AppHeaderContent from "../../components/common/AppHeaderContent";
import SearchInput from "../../components/common/SearchInput";
import GlassScrollableList from "../../components/common/GlassScrollableList";
import LoadingPage from "../common/LoadingPage";
import Badge from "../../components/common/Badge";

import useSubjects from "../../hooks/quiz/useSubjects";
import useQuizzes from "../../hooks/quiz/useQuizzes";

import { downloadPdf } from "../../api/quiz/quiz.api";

const QuizzesPage = () => {
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const isQuizMode = Boolean(selectedSubject);

  const {
    subjects,
    isLoading: isSubjectsLoading,
    searchInput: subjectSearchInput,
    handleSearch: handleSubjectSearch,
    handleScroll: handleSubjectScroll,
  } = useSubjects();

  const {
    quizzes,
    isLoading: isQuizzesLoading,
    searchInput: quizSearchInput,
    handleSearch: handleQuizSearch,
    handleScroll: handleQuizScroll,
    handleStartQuiz,
  } = useQuizzes(selectedSubject?._id);

  const isLoading = isQuizMode ? isQuizzesLoading : isSubjectsLoading;

  const items = isQuizMode ? quizzes : subjects;

  const searchInput = isQuizMode ? quizSearchInput : subjectSearchInput;

  const handleSearch = isQuizMode ? handleQuizSearch : handleSubjectSearch;

  const handleScroll = isQuizMode ? handleQuizScroll : handleSubjectScroll;

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedQuiz(null);
  };

  const handleSelectQuiz = (quiz) => {
    setSelectedQuiz(quiz._id);
  };

  const handleQuizOptionClose = () => {
    setSelectedQuiz(null);
  };

  const handleDownloadPdf = async (quizId) => {
    try {
      const response = await downloadPdf(quizId);

      const contentDisposition = response.headers["content-disposition"];

      const fileName =
        contentDisposition?.match(/filename="?([^"]+)"?/)?.[1] || "quiz.pdf";

      saveAs(response.data, fileName);
    } catch (error) {
      console.error("Failed to download quiz PDF:", error);
    }
  };

  const itemConfig = isQuizMode
    ? {
        getName: (item) => item.quizName,
        itemIcon: Book,
        onSelect: handleSelectQuiz,
        hasOption: true,
        onOptionClick: (item) => handleDownloadPdf(item._id),
        optionVariant: "success",
        optionIcon: Download,
        optionTitle: "Download quiz PDF",
        getCount: (item) => item.numberOfItems,
        countLabel: "Question",
        badge: null,
        getDescription: () => "Choose a quiz and test your knowledge.",
        getSecondaryContent: () => null,
      }
    : {
        getName: (item) => item.name,
        itemIcon: JournalBookmark,
        onSelect: handleSelectSubject,
        hasOption: false,
        getCount: (item) => item.quizCount,
        countLabel: "Quiz",
        badge: (
          <Badge icon={JournalBookmark} variant="primary" shape="pill">
            Subject
          </Badge>
        ),
        getDescription: (item) =>
          item.description ||
          "Browse quizzes, challenge your skills, and test your knowledge.",
        getSecondaryContent: (item) =>
          item.createdAt
            ? `Created ${new Date(item.createdAt).toLocaleDateString()}`
            : null,
      };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex h-full flex-col">
      <header className="mb-8 mt-4 flex h-fit shrink-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-end gap-3">
          {isQuizMode && (
            <button
              type="button"
              onClick={handleBackToSubjects}
              className="mb-1 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              Subjects
            </button>
          )}

          <AppHeaderContent
            eyebrow="Overview"
            title={isQuizMode ? selectedSubject.name : "Subjects"}
            description={
              isQuizMode
                ? "Choose a quiz to get started"
                : "Browse your quiz subjects and test your knowledge"
            }
          />
        </div>

        <div className="w-full shrink-0 sm:w-72 md:w-80">
          <SearchInput
            value={searchInput}
            onChange={handleSearch}
            placeholder={
              isQuizMode ? "Search quizzes..." : "Search subjects..."
            }
          />
        </div>
      </header>

      {isQuizMode && <div className="mb-5 w-full border-b border-border/90" />}

      {items.length > 0 ? (
        <GlassScrollableList onScroll={handleScroll}>
          {items.map((item) => (
            <li key={item._id} className="mb-3 w-full last:mb-0">
              <QuizItemCard
                name={itemConfig.getName(item)}
                itemIcon={itemConfig.itemIcon}
                onSelect={() => itemConfig.onSelect(item)}
                hasOption={itemConfig.hasOption}
                onOptionClick={() => itemConfig.onOptionClick?.(item)}
                optionVariant={itemConfig.optionVariant}
                optionIcon={itemConfig.optionIcon}
                optionTitle={itemConfig.optionTitle}
                count={itemConfig.getCount(item)}
                countLabel={itemConfig.countLabel}
                badge={itemConfig.badge}
                description={itemConfig.getDescription(item)}
                secondaryContent={itemConfig.getSecondaryContent(item)}
              />
            </li>
          ))}
        </GlassScrollableList>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState
            title={isQuizMode ? "No quizzes found" : "No subjects found"}
            description={
              isQuizMode
                ? "There are no quizzes matching your search."
                : "There are no subjects matching your search. Try adjusting your query."
            }
          />
        </div>
      )}

      <OptionBox
        isOpen={selectedQuiz !== null}
        onClose={handleQuizOptionClose}
        eyebrow="QUIZ MODE"
        title="Select quiz type"
        description="Choose how you want to take this quiz."
        options={[
          {
            label: "Multiple choices",
            value: "multiple_choice",
          },
          {
            label: "Enumeration",
            value: "enumeration",
          },
        ]}
        onSelect={(quizType) => {
          handleStartQuiz(selectedQuiz, quizType, false);
          handleQuizOptionClose();
        }}
      />
    </div>
  );
};

export default QuizzesPage;
