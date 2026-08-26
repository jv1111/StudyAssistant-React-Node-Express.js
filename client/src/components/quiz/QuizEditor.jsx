import { useState } from "react";
import { X } from "react-bootstrap-icons";

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
      target: {
        name: "subject",
        value: trimmedSubject,
      },
    });

    setNewSubject(trimmedSubject);
    setIsSubjectLocked(true);
  };

  const handleSubjectSelect = (selectedSubject) => {
    onSubjectChange({
      target: {
        name: "subject",
        value: selectedSubject.name,
      },
    });

    setNewSubject(selectedSubject.name);
    setIsSubjectModalOpen(false);
  };

  const handleRemoveSubject = () => {
    onSubjectChange({
      target: {
        name: "subject",
        value: "",
      },
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
      target: {
        name: "quizName",
        value: trimmedQuizName,
      },
    });

    setNewQuizName(trimmedQuizName);
    setIsQuizNameLocked(true);
  };

  const handleRemoveQuizName = () => {
    onQuizNameChange({
      target: {
        name: "quizName",
        value: "",
      },
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
        className="flex flex-col gap-6"
      >
        <Button
          type="button"
          variant="secondary"
          onClick={handleFillSampleData}
        >
          Fill Sample Data
        </Button>
        <Card>
          <section aria-labelledby="quiz-info-title">
            <header className="mb-6">
              <h2
                id="quiz-info-title"
                className="text-lg font-semibold text-foreground"
              >
                Quiz Information
              </h2>

              <p className="mt-1 text-sm text-muted">{quizInfoDescription}</p>
            </header>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Subject */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-foreground">
                  Subject
                </label>

                <div className="flex flex-col gap-3 rounded-xl border border-dashed border-white/10 p-4">
                  <div className="flex items-end gap-3">
                    <div className="min-w-0 flex-1">
                      <Input
                        id="newSubject"
                        name="newSubject"
                        value={newSubject}
                        placeholder="e.g. Mathematics"
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
                        title="Remove subject"
                      >
                        <X size={16} />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        fit
                        disabled={!newSubject.trim()}
                        onClick={handleCreateSubject}
                      >
                        OK
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/10" />

                    <span className="shrink-0 text-xs text-muted">OR</span>

                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    disabled={Boolean(subject)}
                    onClick={() => setIsSubjectModalOpen(true)}
                  >
                    Select Subject
                  </Button>
                </div>
              </div>

              {/* Quiz Name */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-foreground">
                  Quiz Name
                </label>

                <div className="flex flex-col gap-3 rounded-xl border border-dashed border-white/10 p-4">
                  <div className="flex items-end gap-3">
                    <div className="min-w-0 flex-1">
                      <Input
                        id="quizName"
                        name="quizName"
                        value={newQuizName}
                        placeholder="e.g. Algebra Quiz"
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
                        title="Remove quiz name"
                      >
                        <X size={16} />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        fit
                        disabled={!newQuizName.trim()}
                        onClick={handleCreateQuizName}
                      >
                        OK
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        <section aria-labelledby="questions-title">
          <Card>
            <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2
                  id="questions-title"
                  className="text-lg font-semibold text-foreground"
                >
                  Questions
                </h2>

                <p className="mt-1 text-sm text-muted">
                  {questionsDescription}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted">
                  {items.length} question
                  {items.length !== 1 ? "s" : ""}
                </span>
              </div>
            </header>

            <div className="flex flex-col gap-4">
              {items.map((item, index) => (
                <article
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/[0.035] p-5 transition-colors duration-200 hover:border-white/15 hover:bg-white/5"
                >
                  <header className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                        {index + 1}
                      </span>

                      <h3 className="text-sm font-medium text-foreground">
                        Question {index + 1}
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
                    >
                      <X size={16} />
                    </Button>
                  </header>

                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                      <AutoAdjustingInput
                        id={`question-${index}`}
                        name="question"
                        label="Question"
                        value={item.question}
                        placeholder="Enter your question..."
                        onChange={(event) => onItemChange(event, index)}
                        required
                      />
                    </div>

                    <div className="lg:col-span-2">
                      <AutoAdjustingInput
                        id={`answer-${index}`}
                        name="answer"
                        label="Answer"
                        value={item.answer}
                        placeholder="Enter the correct answer..."
                        onChange={(event) => onItemChange(event, index)}
                        required
                      />
                    </div>
                  </div>
                </article>
              ))}

              {items.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-sm text-muted">
                  No questions yet — add your first one below.
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-center border-t border-white/10 pt-6">
              <Button
                type="button"
                variant="secondary"
                fit
                onClick={onAddQuestion}
              >
                + Add Question
              </Button>
            </div>
          </Card>
        </section>

        <footer className="sticky bottom-4 flex justify-end">
          <Button type="submit" fit>
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
