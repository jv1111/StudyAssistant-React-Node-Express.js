import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "react-bootstrap-icons";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import QuizDetails from "../../components/quiz/QuizDetails";
import QuizPreviewItem from "../../components/quiz/QuizPreviewItem";
import FeedbackModal from "../../components/common/FeedbackModal";
import Badge from "../../components/common/Badge";
import AppHeaderContent from "../../components/common/AppHeaderContent";

import { createQuiz } from "../../api/quiz.api";
import useCreateQuizDraft from "../../hooks/useCreateQuizDraft";

const MIN_QUESTIONS = 4;

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

  const [editingIndex, setEditingIndex] = useState(null);
  const [editBuffer, setEditBuffer] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [feedback, setFeedback] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
    onConfirm: null,
  });

  const closeFeedback = () => {
    setFeedback((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleStartEdit = (index) => {
    setEditingIndex(index);
    setEditBuffer(structuredClone(items[index]));
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditBuffer(null);
  };

  const handleSaveEdit = () => {
    if (!editBuffer || editingIndex === null) return;

    updateItem(editingIndex, editBuffer);

    handleCancelEdit();
  };

  const handleDeleteItem = (index) => {
    if (items.length <= MIN_QUESTIONS) {
      setFeedback({
        isOpen: true,
        type: "warning",
        title: "Cannot Delete",
        message: `A quiz must contain at least ${MIN_QUESTIONS} questions.`,
        onConfirm: null,
      });

      return;
    }

    deleteQuestion(index);

    if (editingIndex === index) {
      handleCancelEdit();
    }
  };

  const handleFinalSubmit = async () => {
    if (isSaving) return;

    try {
      setIsSaving(true);

      await createQuiz(subject, quizName, items);

      await clearDraft();

      setFeedback({
        isOpen: true,
        type: "success",
        title: "Quiz Saved!",
        message: "Your quiz has been created and saved successfully.",
        onConfirm: () => navigate("/"),
      });
    } catch (error) {
      console.error("Failed to save quiz:", error);

      setFeedback({
        isOpen: true,
        type: "error",
        title: "Submission Failed",
        message:
          error.response?.data?.message ||
          "Failed to save quiz. Please try again.",
        onConfirm: null,
      });
    } finally {
      setIsSaving(false);
    }
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

      <div className="flex flex-col gap-8">
        <QuizDetails subject={subject} quizName={quizName} />

        <section aria-labelledby="preview-questions-title">
          <Card className="card-base">
            <header className="mb-6 flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2
                  id="preview-questions-title"
                  className="text-lg font-bold text-foreground"
                >
                  Question Set
                </h2>

                <p className="text-sm text-muted">
                  Questions and choices can be edited individually below.
                </p>
              </div>

              <Badge
                variant="primary"
                shape="rounded"
                className="self-start sm:self-auto"
              >
                {items.length} {items.length === 1 ? "Question" : "Questions"}
              </Badge>
            </header>

            <div className="flex flex-col gap-6">
              {items.map((item, index) => (
                <QuizPreviewItem
                  key={item._id || index}
                  item={item}
                  index={index}
                  isEditing={editingIndex === index}
                  editBuffer={editBuffer}
                  isDeleteDisabled={items.length <= MIN_QUESTIONS}
                  onStartEdit={() => handleStartEdit(index)}
                  onCancelEdit={handleCancelEdit}
                  onSaveEdit={handleSaveEdit}
                  onDelete={() => handleDeleteItem(index)}
                  onEditBufferChange={setEditBuffer}
                />
              ))}
            </div>
          </Card>
        </section>

        <footer className="sticky bottom-6 flex items-center justify-between gap-4 rounded-card border border-border bg-surface/90 p-4 shadow-lg backdrop-blur-md">
          <span className="text-xs text-muted">
            Review complete? Save your quiz to finalize.
          </span>

          <Button
            type="button"
            fit
            onClick={handleFinalSubmit}
            disabled={editingIndex !== null || isSaving}
            className="ml-auto inline-flex items-center gap-2 px-8 font-semibold shadow-(--shadow-button)"
          >
            <Save size={16} />
            {isSaving ? "Saving..." : "Save Quiz"}
          </Button>
        </footer>
      </div>

      <FeedbackModal
        isOpen={feedback.isOpen}
        onClose={closeFeedback}
        type={feedback.type}
        title={feedback.title}
        message={feedback.message}
        onConfirm={feedback.onConfirm}
      />
    </>
  );
};

export default QuizPreviewPage;
