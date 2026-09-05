import { useLocation, useNavigate } from "react-router-dom";

import AppHeader from "../../components/common/AppHeader";
import Button from "../../components/common/Button";
import QuizEditorForm from "../../components/quiz/QuizEditorForm";

import { createQuiz } from "../../api/quiz/quiz.api";
import useCreateQuizDraft from "../../hooks/quiz/useCreateQuizDraft";

const QuizPreviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mode = location.state?.mode || "create";

  const {
    subject,
    quizName,
    items,
    isLoadingDraft,
    deleteQuestion,
    updateItem,
    clearDraft,
  } = useCreateQuizDraft(mode, null, true);

  const handleBack = () => {
    navigate("/quiz/create");
  };

  const handleFinalSubmit = async () => {
    await createQuiz(subject, quizName, items);
    await clearDraft();
  };

  const handleSubmitSuccess = () => {
    navigate("/");
  };

  if (isLoadingDraft) {
    return (
      <div className="flex w-full items-center justify-center py-16">
        <p className="text-sm text-muted">Loading quiz preview...</p>
      </div>
    );
  }

  if (!subject || !quizName || !items.length) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-16 text-center">
        <h2 className="text-xl font-bold text-foreground">
          No Preview Data Found
        </h2>

        <p className="mt-2 text-sm text-muted">
          Please generate or create a quiz first.
        </p>

        <Button fit className="mt-6" onClick={handleBack}>
          Go to Quiz Creator
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <AppHeader
        eyebrow="Preview & Review"
        title="Quiz Preview"
        description='Review your generated quiz. Click "Edit" on any question to modify details.'
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
          onSubmit={handleFinalSubmit}
          onSubmitSuccess={handleSubmitSuccess}
          submitLabel="Save Quiz"
          submittingLabel="Saving..."
          description="Review complete? Save your quiz to finalize."
        />
      </div>
    </div>
  );
};

export default QuizPreviewPage;
