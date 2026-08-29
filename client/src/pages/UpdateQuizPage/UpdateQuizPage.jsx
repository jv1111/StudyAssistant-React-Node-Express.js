import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import QuizEditorForm from "../../components/quiz/QuizEditorForm";
import AppHeaderContent from "../../components/common/AppHeaderContent";
import OptionBox from "../../components/common/OptionBox";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";

import { updateQuiz } from "../../api/quiz.api";
import useUpdateQuizDraft from "../../hooks/useUpdateQuizDraft";

const UpdateQuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [hasHandledDraft, setHasHandledDraft] = useState(false);

  const {
    subject,
    quizName,
    items,
    isLoadingDraft,
    hasDraft,
    updateItem,
    deleteQuestion,
    clearDraft,
    reloadQuiz,
  } = useUpdateQuizDraft(quizId);

  useEffect(() => {
    if (isLoadingDraft) {
      return;
    }

    // Ask the user what to do with the existing draft.
    if (hasDraft && !hasHandledDraft) {
      setShowDraftModal(true);
    }
  }, [isLoadingDraft, hasDraft, hasHandledDraft]);

  const handleDraftOption = async (option) => {
    if (option === "continue") {
      setHasHandledDraft(true);
      setShowDraftModal(false);

      return;
    }

    if (option === "clear") {
      try {
        await clearDraft();
        await reloadQuiz();

        setHasHandledDraft(true);
        setShowDraftModal(false);
      } catch (error) {
        console.error("Failed to clear quiz draft:", error);
      }
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await updateQuiz(quizId, subject, quizName, items);

      await clearDraft();

      navigate(`/quiz/${subject}`);
    } catch (error) {
      console.error("Failed to update quiz:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingDraft) {
    return (
      <div className="flex min-h-64 items-center justify-center text-sm text-muted">
        Loading quiz...
      </div>
    );
  }

  return (
    <>
      <header className="mb-8 flex h-fit flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <AppHeaderContent
          eyebrow="Quiz Builder"
          title="Update Quiz"
          description="Update the quiz details and modify its questions."
        />
      </header>

      <QuizEditorForm
        subject={subject}
        quizName={quizName}
        items={items}
        onUpdateItem={updateItem}
        onDeleteItem={deleteQuestion}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Update Quiz"
        submittingLabel="Updating..."
        description="Review your changes and save the quiz when you're finished."
      />

      <Modal isOpen={showDraftModal} onClose={() => setShowDraftModal(false)}>
        <Card className="max-w-md">
          <OptionBox
            eyebrow="QUIZ DRAFT"
            title="Draft found"
            description="You have unsaved changes for this quiz. Would you like to continue with the draft or clear it and use the saved quiz?"
            options={[
              {
                label: "Continue with draft",
                value: "continue",
              },
              {
                label: "Clear draft",
                value: "clear",
              },
            ]}
            onSelect={handleDraftOption}
            onClose={() => setShowDraftModal(false)}
            closeLabel="Cancel"
          />
        </Card>
      </Modal>
    </>
  );
};

export default UpdateQuizPage;
