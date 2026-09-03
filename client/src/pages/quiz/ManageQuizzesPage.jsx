import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash, Collection, ArrowLeft } from "react-bootstrap-icons";

import AppHeaderContent from "../../components/common/AppHeaderContent";
import SearchInput from "../../components/common/SearchInput";
import GlassScrollableList from "../../components/common/GlassScrollableList";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import OptionBox from "../../components/common/OptionBox";
import ManageItemCard from "../../components/quiz/ManageItemCard.jsx";

import useSubjects from "../../hooks/quiz/useSubjects";
import useQuizzes from "../../hooks/quiz/useQuizzes";

const ManageQuizzesPage = () => {
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useState(null);

  const [deleteSubjectTarget, setDeleteSubjectTarget] = useState(null);
  const [deleteQuizTarget, setDeleteQuizTarget] = useState(null);

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

  const handleOpenDeleteSubject = (subject) => {
    setDeleteSubjectTarget(subject);
  };

  const handleCloseDeleteSubject = () => {
    setDeleteSubjectTarget(null);
  };

  const handleOpenDeleteQuiz = (quiz) => {
    setDeleteQuizTarget(quiz);
  };

  const handleCloseDeleteQuiz = () => {
    setDeleteQuizTarget(null);
  };

  const handleOpenDeleteAll = () => {
    setShowDeleteAllModal(true);
  };

  const handleCloseDeleteAll = () => {
    setShowDeleteAllModal(false);
  };

  const handleConfirmDeleteSubject = async () => {
    if (!deleteSubjectTarget) {
      return;
    }

    try {
      await handleDeleteSubject(deleteSubjectTarget._id);
      handleCloseDeleteSubject();
    } catch (error) {
      console.error("Failed to delete subject:", error);
    }
  };

  const handleConfirmDeleteQuiz = async () => {
    if (!deleteQuizTarget) {
      return;
    }

    try {
      await handleDeleteQuiz(deleteQuizTarget._id);
      handleCloseDeleteQuiz();
    } catch (error) {
      console.error("Failed to delete quiz:", error);
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
    <div className="flex h-full flex-col">
      <header className="mb-6 mt-4 flex h-fit shrink-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <AppHeaderContent
          eyebrow="Administration"
          title="Manage Quizzes"
          description={
            isQuizMode
              ? `Manage the quizzes in ${selectedSubject.name}.`
              : "Manage your subjects and organize your quizzes."
          }
        />
      </header>

      <div className="mb-5 flex flex-col-reverse gap-4 border-b border-border/90 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-3 sm:w-auto">
          {isQuizMode && (
            <Button
              variant="secondary"
              icon={ArrowLeft}
              iconOnly
              onClick={handleBackToSubjects}
              title="Back to subjects"
              className="h-10 w-10 shrink-0"
            />
          )}

          <div className="w-full shrink-0 sm:w-72 md:w-96">
            <SearchInput
              value={searchInput}
              onChange={handleSearch}
              placeholder={
                isQuizMode
                  ? "Search quizzes..."
                  : "Search subjects to manage..."
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <Button
            variant="primary"
            fit
            onClick={handleCreateQuiz}
            className="w-full sm:w-auto"
          >
            Create Quiz
          </Button>

          {hasItems && (
            <Button
              variant="danger"
              icon={Trash}
              fit
              onClick={handleOpenDeleteAll}
              className="w-full sm:w-auto"
            >
              Delete All {isQuizMode ? "Quizzes" : "Subjects"}
            </Button>
          )}
        </div>
      </div>

      {hasItems ? (
        <GlassScrollableList onScroll={handleScroll}>
          {items.map((item) => (
            <li key={item._id} className="mb-3 w-full last:mb-0">
              <ManageItemCard
                item={item}
                onSelect={isQuizMode ? handleSelectQuiz : handleSelectSubject}
                onDeleteClick={
                  isQuizMode ? handleOpenDeleteQuiz : handleOpenDeleteSubject
                }
                nameKey={isQuizMode ? "quizName" : "name"}
                countKey={isQuizMode ? "numberOfItems" : "quizCount"}
                countLabel={isQuizMode ? "Question" : "Quiz"}
                secondaryContent={
                  isQuizMode
                    ? item.subjectId?.name || "Unknown Subject"
                    : `Created ${new Date(item.createdAt).toLocaleDateString()}`
                }
              />
            </li>
          ))}
        </GlassScrollableList>
      ) : (
        <div className="flex flex-1 items-center justify-center">
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

      {/* Delete Subject */}
      <OptionBox
        isOpen={Boolean(deleteSubjectTarget)}
        onClose={handleCloseDeleteSubject}
        eyebrow="DELETE SUBJECT"
        title="Delete subject?"
        description={
          deleteSubjectTarget
            ? `Are you sure you want to delete "${deleteSubjectTarget.name}"? This will also delete all quizzes under this subject.`
            : ""
        }
        options={[
          {
            label: "Yes",
            value: "yes",
            variant: "danger",
          },
        ]}
        onSelect={handleConfirmDeleteSubject}
        closeLabel="Cancel"
        closeVariant="secondary"
      />

      {/* Delete Quiz */}
      <OptionBox
        isOpen={Boolean(deleteQuizTarget)}
        onClose={handleCloseDeleteQuiz}
        eyebrow="DELETE QUIZ"
        title="Delete quiz?"
        description={
          deleteQuizTarget
            ? `Are you sure you want to delete "${deleteQuizTarget.quizName}"? This action cannot be undone.`
            : ""
        }
        options={[
          {
            label: "Yes",
            value: "yes",
            variant: "danger",
          },
        ]}
        onSelect={handleConfirmDeleteQuiz}
        closeLabel="Cancel"
        closeVariant="secondary"
      />

      {/* Delete All */}
      <OptionBox
        isOpen={showDeleteAllModal}
        onClose={handleCloseDeleteAll}
        eyebrow={isQuizMode ? "DELETE ALL QUIZZES" : "DELETE ALL SUBJECTS"}
        title={isQuizMode ? "Delete all quizzes?" : "Delete all subjects?"}
        description={
          isQuizMode
            ? "Are you sure you want to delete all quizzes in this subject? This action is permanent and cannot be undone."
            : "Are you sure you want to delete all subjects? This will also delete all of your quizzes."
        }
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
