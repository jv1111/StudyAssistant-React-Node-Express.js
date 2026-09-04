import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash,
  Collection,
  ArrowLeft,
  Book,
  JournalBookmark,
} from "react-bootstrap-icons";

import AppHeaderContent from "../../components/common/AppHeaderContent";
import SearchInput from "../../components/common/SearchInput";
import GlassScrollableList from "../../components/common/GlassScrollableList";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import OptionBox from "../../components/common/OptionBox";
import Badge from "../../components/common/Badge";
import QuizItemCard from "../../components/quiz/QuizItemCard";

import useSubjects from "../../hooks/quiz/useSubjects";
import useQuizzes from "../../hooks/quiz/useQuizzes";
import AppHeader from "../../components/common/AppHeader";

const ManageQuizzesPage = () => {
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  const isQuizMode = Boolean(selectedSubject);

  const {
    subjects,
    isLoading: isSubjectsLoading,
    searchInput: subjectSearchInput,
    handleSearch: handleSubjectSearch,
    handleScroll: handleSubjectScroll,
    handleDeleteSubject,
    handleDeleteAllSubjects,
  } = useSubjects();

  const {
    quizzes,
    isLoading: isQuizzesLoading,
    searchInput: quizSearchInput,
    handleSearch: handleQuizSearch,
    handleScroll: handleQuizScroll,
    handleDeleteQuiz,
    handleDeleteAllQuizzes,
  } = useQuizzes(selectedSubject?._id);

  const isLoading = isQuizMode ? isQuizzesLoading : isSubjectsLoading;
  const items = isQuizMode ? quizzes : subjects;
  const searchInput = isQuizMode ? quizSearchInput : subjectSearchInput;

  const handleSearch = isQuizMode ? handleQuizSearch : handleSubjectSearch;

  const handleScroll = isQuizMode ? handleQuizScroll : handleSubjectScroll;

  const handleCreateQuiz = () => {
    navigate("/quiz/create");
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const handleSelectQuiz = (quiz) => {
    navigate(`/quiz/update/${quiz._id}`);
  };

  const handleBackToSubjects = () => {
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
        onOptionClick: handleOpenDelete,
        getName: (item) => item.quizName,
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
        onOptionClick: handleOpenDelete,
        getName: (item) => item.name,
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

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-sm text-muted">
          Loading {isQuizMode ? "quizzes" : "subjects"}...
        </span>
      </div>
    );
  }

  const hasItems = items.length > 0;

  return (
    <div className="flex flex-col w-full ">
      <AppHeader
        eyebrow="Administration"
        title={isQuizMode ? selectedSubject.name : "Manage Quizzes"}
        description={
          isQuizMode
            ? "Manage the quizzes in this subject."
            : "Manage your subjects and organize your quizzes."
        }
        leading={
          isQuizMode && (
            <Button
              variant="secondary"
              icon={ArrowLeft}
              iconOnly
              onClick={handleBackToSubjects}
              title="Back to subjects"
              className="mb-1 h-10 w-10 shrink-0"
            />
          )
        }
        searchValue={searchInput}
        onSearch={handleSearch}
        searchPlaceholder={
          isQuizMode ? "Search quizzes..." : "Search subjects to manage..."
        }
      />

      {/* Items */}
      <div className="min-h-0 flex-1 mb-5">
        {hasItems ? (
          <GlassScrollableList onScroll={handleScroll}>
            {items.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-center mb-3 w-full last:mb-0 "
              >
                <QuizItemCard
                  name={itemConfig.getName(item)}
                  itemIcon={Book}
                  onSelect={() => itemConfig.onSelect(item)}
                  onOptionClick={() => itemConfig.onOptionClick(item)}
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
            ))}
          </GlassScrollableList>
        ) : (
          <div className="flex h-full items-center justify-center">
            <EmptyState
              icon={Collection}
              title={isQuizMode ? "No quizzes found" : "No subjects found"}
              description={
                isQuizMode
                  ? quizSearchInput
                    ? "There are no quizzes matching your search. Try adjusting your query."
                    : "This subject does not have any quizzes yet."
                  : subjectSearchInput
                    ? "There are no subjects matching your search. Try adjusting your query."
                    : "There are no subjects to manage yet."
              }
            />
          </div>
        )}
      </div>

      <div className="pb-5 flex flex-col-reverse gap-3 border-t border-border/90 sm:flex-row sm:justify-end">
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
      </div>

      {/* Delete Item */}
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

      {/* Delete All */}
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
