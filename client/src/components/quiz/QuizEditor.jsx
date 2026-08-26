import { useState } from "react";
import {
  X,
  CheckCircleFill,
  PlusCircle,
  Trash3,
  Magic,
} from "react-bootstrap-icons";

import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";
import AutoAdjustingInput from "../common/AutoAdjustingInput";
import SubjectSelectorModal from "../quiz/SubjectSelectorModal";

const MIN_QUESTIONS = 4;

const QuizEditor = ({
  subject,
  quizName,
  items,
  onSubjectChange,
  onQuizNameChange,
  onItemChange,
  onDeleteQuestion,
  onAddQuestion,
  onSubmit,
  submitLabel,
  quizInfoDescription,
  questionsDescription,
}) => {
  const [newSubject, setNewSubject] = useState("");
  const [newQuizName, setNewQuizName] = useState(quizName || "");
  const [isSubjectLocked, setIsSubjectLocked] = useState(Boolean(subject));
  const [isQuizNameLocked, setIsQuizNameLocked] = useState(Boolean(quizName));

  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  const handleCreateSubject = () => {
    const trimmedSubject = newSubject.trim();
    if (!trimmedSubject) return;

    onSubjectChange({
      target: { name: "subject", value: trimmedSubject },
    });

    setNewSubject(trimmedSubject);
    setIsSubjectLocked(true);
  };

  const handleSubjectSelect = (selectedSubject) => {
    onSubjectChange({
      target: { name: "subject", value: selectedSubject.name },
    });

    setNewSubject(selectedSubject.name);
    setIsSubjectLocked(true);
    setIsSubjectModalOpen(false);
  };

  const handleRemoveSubject = () => {
    onSubjectChange({
      target: { name: "subject", value: "" },
    });

    setNewSubject("");
    setIsSubjectLocked(false);
  };

  const handleQuizNameChange = (event) => {
    setNewQuizName(event.target.value);
  };

  const handleCreateQuizName = () => {
    const trimmedQuizName = newQuizName.trim();
    if (!trimmedQuizName) return;

    onQuizNameChange({
      target: { name: "quizName", value: trimmedQuizName },
    });

    setNewQuizName(trimmedQuizName);
    setIsQuizNameLocked(true);
  };

  const handleRemoveQuizName = () => {
    onQuizNameChange({
      target: { name: "quizName", value: "" },
    });

    setNewQuizName("");
    setIsQuizNameLocked(false);
  };

  const handleFillSampleData = () => {
    onSubjectChange({
      target: { name: "subject", value: "Mathematics" },
    });
    setNewSubject("Mathematics");
    setIsSubjectLocked(true);

    onQuizNameChange({
      target: { name: "quizName", value: "Basic Algebra Quiz" },
    });
    setNewQuizName("Basic Algebra Quiz");
    setIsQuizNameLocked(true);

    [
      ["What is 5 + 7?", "12"],
      ["What is 10 × 3?", "30"],
      ["What is 2x = 10?", "5"],
      ["What is the square root of 64?", "8"],
    ].forEach(([question, answer], index) => {
      onItemChange({ target: { name: "question", value: question } }, index);
      onItemChange({ target: { name: "answer", value: answer } }, index);
    });
  };

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={onSubmit}
        className="flex flex-col gap-8"
      >
        {/* Sample Data Utility Bar */}
        <div className="flex items-center justify-between rounded-card border border-primary/20 bg-primary-light/50 px-5 py-3">
          <span className="text-xs font-semibold text-primary">
            Quick Setup Utility
          </span>
          <Button
            type="button"
            variant="secondary"
            onClick={handleFillSampleData}
            className="inline-flex items-center gap-2 text-xs"
          >
            <Magic size={14} />
            Fill Sample Data
          </Button>
        </div>

        {/* Section 1: Quiz Information */}
        <Card className="card-base">
          <section aria-labelledby="quiz-info-title">
            <header className="mb-6 border-b border-border pb-4">
              <h2
                id="quiz-info-title"
                className="text-lg font-bold text-foreground"
              >
                Quiz Details
              </h2>
              <p className="mt-1 text-sm text-muted">{quizInfoDescription}</p>
            </header>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Subject Field */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Subject Name
                </label>

                <div className="rounded-xl border border-border bg-background/50 p-4 transition-all duration-200 hover:border-border-hover">
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <Input
                        id="newSubject"
                        name="newSubject"
                        value={newSubject}
                        placeholder="e.g. Mathematics, Science"
                        onChange={(event) => setNewSubject(event.target.value)}
                        disabled={isSubjectLocked}
                      />
                    </div>

                    {subject ? (
                      <Button
                        type="button"
                        variant="danger"
                        fit
                        onClick={handleRemoveSubject}
                        aria-label="Remove subject"
                        title="Change subject"
                      >
                        <X size={18} />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        fit
                        disabled={!newSubject.trim()}
                        onClick={handleCreateSubject}
                      >
                        Confirm
                      </Button>
                    )}
                  </div>

                  {!subject && (
                    <>
                      <div className="my-3 flex items-center gap-3">
                        <div className="h-px flex-1 bg-border" />
                        <span className="shrink-0 text-[11px] font-bold text-muted">
                          OR
                        </span>
                        <div className="h-px flex-1 bg-border" />
                      </div>

                      <Button
                        type="button"
                        variant="secondary"
                        disabled={Boolean(subject)}
                        onClick={() => setIsSubjectModalOpen(true)}
                        className="w-full text-xs font-medium"
                      >
                        Select Existing Subject
                      </Button>
                    </>
                  )}

                  {subject && (
                    <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-primary">
                      <CheckCircleFill size={13} /> Saved to {subject}
                    </p>
                  )}
                </div>
              </div>

              {/* Quiz Name Field */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Quiz Title
                </label>

                <div className="rounded-xl border border-border bg-background/50 p-4 transition-all duration-200 hover:border-border-hover">
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <Input
                        id="quizName"
                        name="quizName"
                        value={newQuizName}
                        placeholder="e.g. Midterm Examination"
                        onChange={handleQuizNameChange}
                        disabled={isQuizNameLocked}
                      />
                    </div>

                    {quizName ? (
                      <Button
                        type="button"
                        variant="danger"
                        fit
                        onClick={handleRemoveQuizName}
                        aria-label="Remove quiz name"
                        title="Change quiz name"
                      >
                        <X size={18} />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        fit
                        disabled={!newQuizName.trim()}
                        onClick={handleCreateQuizName}
                      >
                        Confirm
                      </Button>
                    )}
                  </div>

                  {quizName && (
                    <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-primary">
                      <CheckCircleFill size={13} /> Quiz title confirmed
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Section 2: Questions Editor */}
        <section aria-labelledby="questions-title">
          <Card className="card-base">
            <header className="mb-6 flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2
                  id="questions-title"
                  className="text-lg font-bold text-foreground"
                >
                  Questions & Answers
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {questionsDescription}
                </p>
              </div>

              <span className="badge-primary self-start sm:self-auto">
                {items.length} {items.length === 1 ? "Question" : "Questions"}
              </span>
            </header>

            <div className="flex flex-col gap-5">
              {items.map((item, index) => (
                <article
                  key={index}
                  className="group rounded-xl border border-border bg-surface-hover p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-sm"
                >
                  <header className="mb-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      <h3 className="text-sm font-semibold text-foreground">
                        Question #{index + 1}
                      </h3>
                    </div>

                    <Button
                      type="button"
                      variant="danger"
                      fit
                      onClick={() => onDeleteQuestion(index)}
                      disabled={items.length <= MIN_QUESTIONS}
                      title={
                        items.length <= MIN_QUESTIONS
                          ? `A quiz must contain at least ${MIN_QUESTIONS} questions`
                          : "Delete question"
                      }
                      className="opacity-80 transition-opacity hover:opacity-100"
                    >
                      <Trash3 size={15} />
                    </Button>
                  </header>

                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                      <AutoAdjustingInput
                        id={`question-${index}`}
                        name="question"
                        label="Question Prompt"
                        value={item.question}
                        placeholder="Write your question..."
                        onChange={(event) => onItemChange(event, index)}
                        required
                      />
                    </div>

                    <div className="lg:col-span-2">
                      <AutoAdjustingInput
                        id={`answer-${index}`}
                        name="answer"
                        label="Correct Answer"
                        value={item.answer}
                        placeholder="Expected answer..."
                        onChange={(event) => onItemChange(event, index)}
                        required
                      />
                    </div>
                  </div>
                </article>
              ))}

              {items.length === 0 && (
                <div className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted">
                  No questions created yet. Click below to add your first
                  question.
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-center border-t border-border pt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={onAddQuestion}
                className="inline-flex items-center gap-2 border-primary/30 text-primary hover:bg-primary-light"
              >
                <PlusCircle size={16} />
                Add New Question
              </Button>
            </div>
          </Card>
        </section>

        {/* Floating Action Footer */}
        <footer className="sticky bottom-6 flex justify-end rounded-card border border-border bg-surface/90 p-4 shadow-lg backdrop-blur-md">
          <Button
            type="submit"
            fit
            className="px-8 font-semibold shadow-(--shadow-button)"
          >
            {submitLabel}
          </Button>
        </footer>
      </form>

      <SubjectSelectorModal
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        onSelect={handleSubjectSelect}
      />
    </>
  );
};

export default QuizEditor;
