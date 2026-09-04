import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import QuizEditor from "../../components/quiz/QuizEditor";
import { previewQuiz } from "../../api/quiz/quiz.api";
import useCreateQuizDraft from "../../hooks/quiz/useCreateQuizDraft";
import AppHeaderContent from "../../components/common/AppHeaderContent";
import OptionBox from "../../components/common/OptionBox";
import FeedbackModal from "../../components/common/FeedbackModal";
import LoadingPage from "../common/LoadingPage";
import AppHeader from "../../components/common/AppHeader";

const CreateQuizPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [hasHandledDraft, setHasHandledDraft] = useState(false);

  const [feedback, setFeedback] = useState({
    isOpen: false,
    type: "error",
    title: "",
    message: "",
    isAIError: false,
  });

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
    switchAIToRandom,
    handleItemChange,
    handleChoiceChange,
    saveCurrentDraft,
    clearDraft,
    resetDraft,
  } = useCreateQuizDraft(false);

  useEffect(() => {
    if (isLoadingDraft) return;

    if (hasDraft && !hasHandledDraft) {
      setShowDraftModal(true);
      return;
    }

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

  const handleCloseFeedback = () => {
    if (isSubmitting) return;

    setFeedback((previous) => ({
      ...previous,
      isOpen: false,
    }));
  };

  const submitQuizPreview = async () => {
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

      const errorCode = error.response?.data?.code;
      const errorMessage =
        error.response?.data?.message ||
        "Failed to preview quiz. Please try again.";

      if (errorCode === "AI_GENERATION_FAILED") {
        setFeedback({
          isOpen: true,
          type: "error",
          title: "AI Generation Failed",
          message: errorMessage,
          isAIError: true,
        });

        return;
      }

      setFeedback({
        isOpen: true,
        type: "error",
        title: "Unable to Preview Quiz",
        message: errorMessage,
        isAIError: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSwitchToRandomize = () => {
    switchAIToRandom();

    setFeedback((previous) => ({
      ...previous,
      isOpen: false,
    }));
  };

  const handleTryAgainWithAI = async () => {
    if (isSubmitting) return;

    setFeedback((previous) => ({
      ...previous,
      message: "Generating choices with AI. Please wait...",
    }));

    await submitQuizPreview();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await submitQuizPreview();
  };

  if (isLoadingDraft) {
    return <LoadingPage />;
  }

  const shouldHideEditor = isPreview && !showDraftModal;

  return (
    <div className="flex flex-col w-full">
      {!shouldHideEditor && (
        <>
          <AppHeader
            eyebrow="Quiz Builder"
            title="Create New Quiz"
            description="Design your quiz by specifying a subject, providing a title, and adding your question set with flexible distractor generation."
          />

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

      <OptionBox
        isOpen={showDraftModal}
        onClose={() => setShowDraftModal(false)}
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
            variant: "secondary",
          },
        ]}
        onSelect={handleDraftOption}
        showCancel={false}
      />

      <FeedbackModal
        isOpen={feedback.isOpen}
        onClose={handleCloseFeedback}
        type={feedback.type}
        title={feedback.title}
        message={feedback.message}
        options={
          feedback.isAIError
            ? [
                {
                  label: "Switch to Randomize",
                  value: "random",
                  variant: "secondary",
                  onClick: handleSwitchToRandomize,
                  disabled: isSubmitting,
                },
                {
                  label: isSubmitting ? "Generating..." : "Try Again with AI",
                  value: "ai",
                  onClick: handleTryAgainWithAI,
                  disabled: isSubmitting,
                },
              ]
            : undefined
        }
      />
    </div>
  );
};

export default CreateQuizPage;
