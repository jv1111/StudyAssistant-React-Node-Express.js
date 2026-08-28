import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import QuizEditor from "../../components/quiz/QuizEditor";
import { previewQuiz } from "../../api/quiz.api";
import useCreateQuizDraft from "../../hooks/useCreateQuizDraft";
import AppHeaderContent from "../../components/common/AppHeaderContent";
import OptionBox from "../../components/common/OptionBox";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";

const CreateQuizPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [hasHandledDraft, setHasHandledDraft] = useState(false);

  const navigate = useNavigate();

  const {
    isPreview,
    subject,
    setSubject,
    quizName,
    setQuizName,
    items,
    isLoadingDraft,
    hasDraft,
    addQuestion,
    deleteQuestion,
    handleItemChange,
    handleChoiceChange,
    saveCurrentDraft,
    clearDraft,
    resetDraft,
  } = useCreateQuizDraft(false);

  useEffect(() => {
    if (isLoadingDraft) return;

    // Only ask about the draft once.
    if (hasDraft && !hasHandledDraft) {
      setShowDraftModal(true);
      return;
    }

    // If the existing draft is already in preview mode,
    // continue to the preview page after the draft has been handled.
    if (hasHandledDraft && isPreview) {
      navigate("/quiz/create/preview", {
        state: {
          mode: "create",
        },
        replace: true,
      });
    }
  }, [isLoadingDraft, hasDraft, hasHandledDraft, isPreview, navigate]);

  const handleDraftOption = async (option) => {
    if (option === "continue") {
      setHasHandledDraft(true);
      setShowDraftModal(false);

      return;
    }

    if (option === "new") {
      try {
        await clearDraft();
        resetDraft();

        setHasHandledDraft(true);
        setShowDraftModal(false);
      } catch (error) {
        console.error("Failed to create a new quiz:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await previewQuiz(subject, quizName, items);

      await saveCurrentDraft(response.items, true);

      navigate("/quiz/create/preview", {
        state: {
          mode: "create",
        },
      });
    } catch (error) {
      console.error("Failed to preview quiz:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingDraft) {
    return (
      <div className="flex min-h-64 items-center justify-center text-sm text-muted">
        Loading quiz draft...
      </div>
    );
  }

  // Don't render the editor while the existing draft is already
  // in preview mode. The modal still needs to be rendered.
  const shouldHideEditor = isPreview && !showDraftModal;

  return (
    <>
      {!shouldHideEditor && (
        <>
          <header className="mb-8 flex h-fit flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <AppHeaderContent
              eyebrow="Quiz Builder"
              title="Create New Quiz"
              description="Design your quiz by specifying a subject, providing a title, and adding your question set with flexible distractor generation."
            />
          </header>

          <QuizEditor
            subject={subject}
            quizName={quizName}
            items={items}
            onSubjectChange={(event) => setSubject(event.target.value)}
            onQuizNameChange={(event) => setQuizName(event.target.value)}
            onItemChange={handleItemChange}
            onChoiceChange={handleChoiceChange}
            onDeleteQuestion={deleteQuestion}
            onAddQuestion={addQuestion}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitLabel="Preview Quiz"
            quizInfoDescription="Set up basic subject and title information."
            questionsDescription="Input question prompts, target answers, and distractor generation methods."
          />
        </>
      )}

      <Modal isOpen={showDraftModal} onClose={() => setShowDraftModal(false)}>
        <Card className="max-w-md">
          <OptionBox
            eyebrow="QUIZ DRAFT"
            title="Draft found"
            description="You have an existing quiz draft. Would you like to continue working on it or start a new quiz?"
            options={[
              {
                label: "Continue with draft",
                value: "continue",
              },
              {
                label: "Create new",
                value: "new",
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

export default CreateQuizPage;
