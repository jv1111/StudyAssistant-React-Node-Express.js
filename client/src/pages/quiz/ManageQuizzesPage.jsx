import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash,
  Collection,
  Book,
  JournalBookmark,
} from "react-bootstrap-icons";

import EmptyState from "../../components/common/EmptyState";
import OptionBox from "../../components/common/OptionBox";
import Badge from "../../components/common/Badge";
import QuizItemCard from "../../components/quiz/QuizItemCard";
import GlassScrollableList from "../../components/common/GlassScrollableList";
import Button from "../../components/common/Button";
import AppHeader from "../../components/common/AppHeader";
import Loading from "../../components/common/Loading";
import Panel from "../../components/common/Panel";

import useSubjects from "../../hooks/quiz/useSubjects";
import useQuizzes from "../../hooks/quiz/useQuizzes";

const ManageQuizzesPage = () => {
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  const isQuizMode = Boolean(selectedSubject);

  const {
    subjects,
    isLoading: isSubjectsLoading,
    isFetchingFromScrollingDown: isFetchingSubjects,
    searchInput: subjectSearchInput,
    handleSearch: handleSubjectSearch,
    handleScroll: handleSubjectScroll,
    handleDeleteSubject,
    handleDeleteAllSubjects,
  } = useSubjects();

  const {
    quizzes,
    isLoading: isQuizzesLoading,
    isFetchingFromScrollingDown: isFetchingQuizzes,
    searchInput: quizSearchInput,
    handleSearch: handleQuizSearch,
    handleScroll: handleQuizScroll,
    handleDeleteQuiz,
    handleDeleteAllQuizzes,
  } = useQuizzes(selectedSubject?._id);

  const items = isQuizMode ? quizzes : subjects;
  const isLoading = isQuizMode ? isQuizzesLoading : isSubjectsLoading;

  const isFetchingFromScrollingDown = isQuizMode
    ? isFetchingQuizzes
    : isFetchingSubjects;

  const searchInput = isQuizMode ? quizSearchInput : subjectSearchInput;

  const handleSearch = isQuizMode ? handleQuizSearch : handleSubjectSearch;

  const handleScroll = isQuizMode ? handleQuizScroll : handleSubjectScroll;

  const hasItems = items.length > 0;

  const handleCreateQuiz = () => {
    navigate("/quiz/create");
  };

  const handleSelectSubject = (subject) => {
    setDeleteTarget(null);
    setSelectedSubject(subject);
  };

  const handleSelectQuiz = (quiz) => {
    navigate(`/quiz/update/${quiz._id}`);
  };

  const handleBackToSubjects = () => {
    setDeleteTarget(null);
    setSelectedSubject(null);
  };

  const handleOpenDelete = (item) => {
    setDeleteTarget(item);
  };

  const handleCloseDelete = () => {
    setDeleteTarget(null);
  };

  const handleOpenDeleteAll = () => {
    setShowDeleteAllModal(true);
  };

  const handleCloseDeleteAll = () => {
    setShowDeleteAllModal(false);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      if (isQuizMode) {
        await handleDeleteQuiz(deleteTarget._id);
      } else {
        await handleDeleteSubject(deleteTarget._id);
      }

      handleCloseDelete();
    } catch (error) {
      console.error(
        `Failed to delete ${isQuizMode ? "quiz" : "subject"}:`,
        error,
      );
    }
  };

  const handleConfirmDeleteAll = async () => {
    try {
      if (isQuizMode) {
        await handleDeleteAllQuizzes();
      } else {
        await handleDeleteAllSubjects();
      }

      handleCloseDeleteAll();
    } catch (error) {
      console.error(
        `Failed to delete all ${isQuizMode ? "quizzes" : "subjects"}:`,
        error,
      );
    }
  };

  const itemConfig = isQuizMode
    ? {
        onSelect: handleSelectQuiz,
        getName: (item) => item.quizName,
        itemIcon: Book,
        getCount: (item) => item.numberOfItems,
        countLabel: "Question",
        badge: null,
        getDescription: () =>
          "Review and update this quiz to keep its questions and content up to date.",
        getSecondaryContent: (item) =>
          item.subjectId?.name || "Unknown Subject",
      }
    : {
        onSelect: handleSelectSubject,
        getName: (item) => item.name,
        itemIcon: JournalBookmark,
        getCount: (item) => item.quizCount,
        countLabel: "Quiz",
        badge: (
          <Badge icon={JournalBookmark} variant="primary" shape="pill">
            Subject
          </Badge>
        ),
        getDescription: (item) =>
          item.description ||
          "Explore quizzes, challenge your skills, and master this subject.",
        getSecondaryContent: (item) =>
          item.createdAt
            ? `Created ${new Date(item.createdAt).toLocaleDateString()}`
            : null,
      };

  const deleteConfig = isQuizMode
    ? {
        eyebrow: "DELETE QUIZ",
        title: "Delete quiz?",
        getDescription: (item) =>
          `Are you sure you want to delete "${item.quizName}"? This action cannot be undone.`,
      }
    : {
        eyebrow: "DELETE SUBJECT",
        title: "Delete subject?",
        getDescription: (item) =>
          `Are you sure you want to delete "${item.name}"? This will also delete all quizzes under this subject.`,
      };

  const deleteAllConfig = isQuizMode
    ? {
        eyebrow: "DELETE ALL QUIZZES",
        title: "Delete all quizzes?",
        description:
          "Are you sure you want to delete all quizzes in this subject? This action is permanent and cannot be undone.",
        label: "Delete All Quizzes",
      }
    : {
        eyebrow: "DELETE ALL SUBJECTS",
        title: "Delete all subjects?",
        description:
          "Are you sure you want to delete all subjects? This will also delete all of your quizzes.",
        label: "Delete All Subjects",
      };

  const emptyStateDescription = isQuizMode
    ? quizSearchInput
      ? "There are no quizzes matching your search. Try adjusting your query."
      : "This subject does not have any quizzes yet."
    : subjectSearchInput
      ? "There are no subjects matching your search. Try adjusting your query."
      : "There are no subjects to manage yet.";

  return (
    <div className="flex h-screen w-full flex-col">
      <AppHeader
        eyebrow="Administration"
        title={isQuizMode ? selectedSubject.name : "Manage Quizzes"}
        description={
          isQuizMode
            ? "Manage the quizzes in this subject."
            : "Manage your subjects and organize your quizzes."
        }
        showBackButton={isQuizMode}
        onBack={handleBackToSubjects}
        searchValue={searchInput}
        onSearch={handleSearch}
        searchPlaceholder={
          isQuizMode ? "Search quizzes..." : "Search subjects to manage..."
        }
      />

      <div className="mb-5 flex min-h-0 flex-1">
        <GlassScrollableList
          onScroll={handleScroll}
          isFetchingMore={isFetchingFromScrollingDown}
        >
          {hasItems ? (
            items.map((item) => (
              <li
                key={item._id}
                className="flex w-full items-center justify-center"
              >
                <QuizItemCard
                  name={itemConfig.getName(item)}
                  itemIcon={itemConfig.itemIcon}
                  onSelect={() => itemConfig.onSelect(item)}
                  onOptionClick={() => handleOpenDelete(item)}
                  hasOption
                  optionVariant="danger"
                  optionIcon={Trash}
                  optionTitle={`Delete ${itemConfig.getName(item)}`}
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
                icon={Collection}
                title={isQuizMode ? "No quizzes found" : "No subjects found"}
                description={emptyStateDescription}
              />
            </li>
          )}
        </GlassScrollableList>
      </div>

      <Panel className="mb-5 flex justify-end gap-3 p-3">
        {hasItems && (
          <Button
            variant="danger"
            icon={Trash}
            fit
            onClick={handleOpenDeleteAll}
            className="w-full sm:w-auto"
          >
            {deleteAllConfig.label}
          </Button>
        )}

        <Button
          variant="primary"
          fit
          onClick={handleCreateQuiz}
          className="w-full sm:w-auto"
        >
          Create Quiz
        </Button>
      </Panel>

      <OptionBox
        isOpen={Boolean(deleteTarget)}
        onClose={handleCloseDelete}
        eyebrow={deleteConfig.eyebrow}
        title={deleteConfig.title}
        description={
          deleteTarget ? deleteConfig.getDescription(deleteTarget) : ""
        }
        options={[
          {
            label: "Yes",
            value: "yes",
            variant: "danger",
          },
        ]}
        onSelect={handleConfirmDelete}
        closeLabel="Cancel"
        closeVariant="secondary"
      />

      <OptionBox
        isOpen={showDeleteAllModal}
        onClose={handleCloseDeleteAll}
        eyebrow={deleteAllConfig.eyebrow}
        title={deleteAllConfig.title}
        description={deleteAllConfig.description}
        options={[
          {
            label: "Yes",
            value: "yes",
            variant: "danger",
          },
        ]}
        onSelect={handleConfirmDeleteAll}
        closeLabel="Cancel"
        closeVariant="secondary"
      />
    </div>
  );
};

export default ManageQuizzesPage;
