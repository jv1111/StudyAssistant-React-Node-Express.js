import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";

import Button from "../../components/common/Button";
import AppHeaderContent from "../../components/common/AppHeaderContent";
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

  const handleFinalSubmit = async () => {
    await createQuiz(subject, quizName, items);
    await clearDraft();
  };

  const handleSubmitSuccess = () => {
    navigate("/");
  };

  if (isLoadingDraft) {
    return (
      <div className="layout-container py-16 text-center">
        <p className="text-sm text-muted">Loading quiz preview...</p>
      </div>
    );
  }

  if (!subject || !quizName || !items.length) {
    return (
      <div className="layout-container py-16 text-center">
        <h2 className="text-xl font-bold text-foreground">
          No Preview Data Found
        </h2>

        <p className="mt-2 text-sm text-muted">
          Please generate or create a quiz first.
        </p>

        <Button
          fit
          className="mt-6 inline-flex items-center gap-2"
          onClick={() => navigate("/quiz/create")}
        >
          <ArrowLeft size={16} />
          Go to Quiz Creator
        </Button>
      </div>
    );
  }

  return (
    <>
      <header className="mb-8 flex h-fit flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <AppHeaderContent
          eyebrow="Preview & Review"
          title="Quiz Preview"
          description='Review your generated quiz. Click "Edit" on any question to modify details.'
        />
      </header>

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
    </>
  );
};

export default QuizPreviewPage;
