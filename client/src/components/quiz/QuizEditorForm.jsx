import { useState } from "react";
import { Save } from "react-bootstrap-icons";

import Card from "../common/Card";
import Button from "../common/Button";
import QuizDetails from "./QuizDetails";
import QuizEditorItem from "./QuizEditorItem";
import FeedbackModal from "../common/FeedbackModal";
import Badge from "../common/Badge";

const MIN_QUESTIONS = 4;

const QuizEditorForm = ({
  subject,
  quizName,
  items,
  onUpdateItem,
  onDeleteItem,
  onSubmit,
  onSubmitSuccess = null,
  isSubmitting = false,
  submitLabel = "Save Quiz",
  submittingLabel = "Saving...",
  description = "Review and update your quiz before saving.",
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editBuffer, setEditBuffer] = useState(null);

  const [feedback, setFeedback] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
    onConfirm: null,
  });

  const closeFeedback = () => {
    const callback = feedback.onConfirm;

    setFeedback((previous) => ({
      ...previous,
      isOpen: false,
    }));

    if (callback) {
      callback();
    }
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
    if (!editBuffer || editingIndex === null) {
      return;
    }

    onUpdateItem(editingIndex, editBuffer);

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

    onDeleteItem(index);

    if (editingIndex === index) {
      handleCancelEdit();
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    try {
      await onSubmit();

      setFeedback({
        isOpen: true,
        type: "success",
        title: "Quiz Saved",
        message: "Your quiz has been saved successfully.",
        onConfirm: onSubmitSuccess,
      });
    } catch (error) {
      console.error("Failed to submit quiz:", error);

      setFeedback({
        isOpen: true,
        type: "error",
        title: "Submission Failed",
        message:
          error.response?.data?.message ||
          "Failed to save quiz. Please try again.",
        onConfirm: null,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <QuizDetails subject={subject} quizName={quizName} />

        <section aria-labelledby="quiz-edit-questions-title">
          <Card className="card-base">
            <header className="mb-6 flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2
                  id="quiz-edit-questions-title"
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
                <QuizEditorItem
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
          <span className="text-xs text-muted">{description}</span>

          <Button
            type="button"
            fit
            onClick={handleSubmit}
            disabled={editingIndex !== null || isSubmitting}
            className="ml-auto inline-flex items-center gap-2 px-8 font-semibold shadow-(--shadow-button)"
          >
            <Save size={16} />
            {isSubmitting ? submittingLabel : submitLabel}
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

export default QuizEditorForm;
