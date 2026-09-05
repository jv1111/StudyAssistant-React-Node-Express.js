import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import QuizEditorForm from "../../components/quiz/QuizEditorForm";
import AppHeader from "../../components/common/AppHeader";
import OptionBox from "../../components/common/OptionBox";

import { updateQuiz } from "../../api/quiz/quiz.api";
import useUpdateQuizDraft from "../../hooks/quiz/useUpdateQuizDraft";

const UpdateQuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [hasHandledDraft, setHasHandledDraft] = useState(false);

  const {
    subject,
    subjectId,
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

    if (hasDraft && !hasHandledDraft) {
      setShowDraftModal(true);
    }
  }, [isLoadingDraft, hasDraft, hasHandledDraft]);

  const handleBack = () => {
    navigate(`/quiz/manage`);
  };

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitSuccess = () => {
    navigate(`/quiz/${subjectId}`);
  };

  if (isLoadingDraft) {
    return (
      <div className="flex w-full items-center justify-center py-16">
        <p className="text-sm text-muted">Loading quiz...</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <AppHeader
        eyebrow="Quiz Builder"
        title="Update Quiz"
        description="Update the quiz details and modify its questions."
        showBackButton
        onBack={handleBack}
      />

      <div className="mb-5">
        <QuizEditorForm
          subject={subject}
          quizName={quizName}
          items={items}
          onUpdateItem={updateItem}
          onDeleteItem={deleteQuestion}
          onSubmit={handleSubmit}
          onSubmitSuccess={handleSubmitSuccess}
          isSubmitting={isSubmitting}
          submitLabel="Update Quiz"
          submittingLabel="Updating..."
          description="Review your changes and save the quiz when you're finished."
        />
      </div>

      <OptionBox
        isOpen={showDraftModal}
        onClose={() => setShowDraftModal(false)}
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
        showCancel={false}
      />
    </div>
  );
};

export default UpdateQuizPage;
