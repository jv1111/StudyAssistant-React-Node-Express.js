import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash, Collection } from "react-bootstrap-icons";

import AppHeaderContent from "../../components/common/AppHeaderContent";
import SearchInput from "../../components/common/SearchInput";
import GlassScrollableList from "../../components/common/GlassScrollableList";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import OptionBox from "../../components/common/OptionBox";
import ManageSubjectCard from "../../components/quiz/ManageSubjectCard.jsx";

import useSubjects from "../../hooks/quiz/useSubjects";

const ManageSubjectsPage = () => {
  const navigate = useNavigate();

  const [deleteSubjectTarget, setDeleteSubjectTarget] = useState(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  const {
    subjects,
    isLoading,
    searchInput,
    handleSearch,
    handleScroll,
    handleDeleteSubject,
    handleDeleteAllSubjects,
  } = useSubjects();

  const handleCreateQuiz = () => {
    navigate("/quiz/create");
  };

  const handleSelectSubject = (subject) => {
    navigate(`/quiz/subjects/${subject._id}`);
  };

  const handleOpenDeleteSubject = (subject) => {
    setDeleteSubjectTarget(subject);
  };

  const handleCloseDeleteSubject = () => {
    setDeleteSubjectTarget(null);
  };

  const handleConfirmDeleteSubject = async () => {
    try {
      await handleDeleteSubject(deleteSubjectTarget._id);
      handleCloseDeleteSubject();
    } catch (error) {
      console.error("Failed to delete subject:", error);
    }
  };

  const handleOpenDeleteAll = () => {
    setShowDeleteAllModal(true);
  };

  const handleCloseDeleteAll = () => {
    setShowDeleteAllModal(false);
  };

  const handleConfirmDeleteAll = async () => {
    try {
      await handleDeleteAllSubjects();
      handleCloseDeleteAll();
    } catch (error) {
      console.error("Failed to delete all subjects:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-sm text-muted">Loading subjects...</span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <header className="mb-6 mt-4 flex h-fit shrink-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <AppHeaderContent
          eyebrow="Administration"
          title="Manage Quizzes"
          description="Manage your subjects and organize your quizzes."
        />
      </header>

      <div className="mb-5 flex flex-col-reverse gap-4 border-b border-border/90 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full shrink-0 sm:w-72 md:w-96">
          <SearchInput
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search subjects to manage..."
          />
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

          {subjects.length > 0 && (
            <Button
              variant="danger"
              icon={Trash}
              fit
              onClick={handleOpenDeleteAll}
              className="w-full sm:w-auto"
            >
              Delete All Subjects
            </Button>
          )}
        </div>
      </div>

      {subjects.length > 0 ? (
        <GlassScrollableList onScroll={handleScroll}>
          {subjects.map((subject) => (
            <li key={subject._id} className="w-full">
              <ManageSubjectCard
                subject={subject}
                onSelect={() => handleSelectSubject(subject)}
                onDeleteClick={handleOpenDeleteSubject}
              />
            </li>
          ))}
        </GlassScrollableList>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState
            icon={Collection}
            title="No subjects found"
            description="There are no subjects matching your search. Try adjusting your query."
          />
        </div>
      )}

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

      <OptionBox
        isOpen={showDeleteAllModal}
        onClose={handleCloseDeleteAll}
        eyebrow="DELETE ALL SUBJECTS"
        title="Delete all subjects?"
        description="Are you sure you want to delete all subjects? This will also delete all of your quizzes."
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

export default ManageSubjectsPage;
