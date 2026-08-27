import { useState, useEffect } from "react";
import {
  X,
  CheckCircleFill,
  PlusCircle,
  Trash3,
  Shuffle,
  Magic,
  PencilSquare,
  Pencil,
  InfoCircleFill,
  LockFill,
} from "react-bootstrap-icons";

import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";
import AutoAdjustingInput from "../common/AutoAdjustingInput";
import SubjectSelectorModal from "../quiz/SubjectSelectorModal";
import Badge from "../common/Badge";

const MIN_QUESTIONS = 4;

const GENERATION_METHODS = [
  {
    id: "random",
    label: "Random",
    icon: Shuffle,
    description: "Sample wrong answers from other items",
  },
  {
    id: "ai",
    label: "AI Generated",
    icon: Magic,
    description: "Generate contextual distractors automatically",
  },
  {
    id: "custom",
    label: "Custom Choices",
    icon: PencilSquare,
    description: "Manually specify 4 choice options",
  },
];

const QuizEditor = ({
  subject,
  quizName,
  items,
  onSubjectChange,
  onQuizNameChange,
  onItemChange,
  onChoiceChange,
  onDeleteQuestion,
  onAddQuestion,
  onSubmit,
  isSubmitting,
  submitLabel,
  quizInfoDescription,
  questionsDescription,
}) => {
  const [newSubject, setNewSubject] = useState(subject || "");
  const [newQuizName, setNewQuizName] = useState(quizName || "");
  const [isSubjectLocked, setIsSubjectLocked] = useState(Boolean(subject));
  const [isQuizNameLocked, setIsQuizNameLocked] = useState(Boolean(quizName));

  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  // Check if both subject and quiz title are confirmed/saved
  const isInfoConfirmed = Boolean(subject?.trim() && quizName?.trim());

  useEffect(() => {
    setNewSubject(subject || "");
    setIsSubjectLocked(Boolean(subject));
  }, [subject]);

  useEffect(() => {
    setNewQuizName(quizName || "");
    setIsQuizNameLocked(Boolean(quizName));
  }, [quizName]);

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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!isInfoConfirmed || isSubmitting) return;
    onSubmit(event);
  };

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-8"
      >
        {/* Section 1: Quiz Information */}
        <Card className="card-base">
          <section aria-labelledby="quiz-info-title">
            <header className="mb-6 border-b border-border pb-4">
              <h2
                id="quiz-info-title"
                className="text-lg font-bold text-foreground flex items-center gap-2"
              >
                Quiz Details
                {isInfoConfirmed && (
                  <CheckCircleFill
                    className="text-primary shrink-0"
                    size={18}
                  />
                )}
              </h2>
              <p className="mt-1 text-sm text-muted">{quizInfoDescription}</p>
            </header>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Subject Field */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center justify-between">
                  <span>
                    {subject ? `Subject Name: ${subject}` : "Subject Name"}
                  </span>
                  {subject && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-primary normal-case">
                      <CheckCircleFill size={12} /> Confirmed
                    </span>
                  )}
                </label>

                {subject ? (
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-primary/30 bg-primary-light/30 p-3.5 transition-all">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <CheckCircleFill
                        className="shrink-0 text-primary"
                        size={18}
                      />
                      <span className="truncate text-sm font-bold text-foreground">
                        {subject}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      fit
                      onClick={handleRemoveSubject}
                      aria-label="Change subject"
                      title="Change subject"
                      className="text-xs font-medium"
                    >
                      <Pencil size={13} className="mr-1 inline-block" />
                      Change
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-xl border border-border bg-background/50 p-4 transition-all duration-200 hover:border-border-hover">
                    <div className="flex items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <Input
                          id="newSubject"
                          name="newSubject"
                          value={newSubject}
                          placeholder="e.g. Mathematics, Science"
                          onChange={(event) =>
                            setNewSubject(event.target.value)
                          }
                          disabled={isSubjectLocked}
                        />
                      </div>

                      <Button
                        type="button"
                        fit
                        disabled={!newSubject.trim()}
                        onClick={handleCreateSubject}
                      >
                        Confirm
                      </Button>
                    </div>

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
                  </div>
                )}
              </div>

              {/* Quiz Name Field */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center justify-between">
                  <span>
                    {quizName ? `Quiz Title: ${quizName}` : "Quiz Title"}
                  </span>
                  {quizName && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-primary normal-case">
                      <CheckCircleFill size={12} /> Confirmed
                    </span>
                  )}
                </label>

                {quizName ? (
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-primary/30 bg-primary-light/30 p-3.5 transition-all">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <CheckCircleFill
                        className="shrink-0 text-primary"
                        size={18}
                      />
                      <span className="truncate text-sm font-bold text-foreground">
                        {quizName}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      fit
                      onClick={handleRemoveQuizName}
                      aria-label="Change quiz title"
                      title="Change quiz title"
                      className="text-xs font-medium"
                    >
                      <Pencil size={13} className="mr-1 inline-block" />
                      Change
                    </Button>
                  </div>
                ) : (
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

                      <Button
                        type="button"
                        fit
                        disabled={!newQuizName.trim()}
                        onClick={handleCreateQuizName}
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </Card>

        {/* Section 2: Questions Editor */}
        <section aria-labelledby="questions-title">
          <Card
            className={`card-base transition-opacity duration-200 ${
              !isInfoConfirmed ? "opacity-75" : ""
            }`}
          >
            <header className="mb-6 flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2
                  id="questions-title"
                  className="text-lg font-bold text-foreground flex items-center gap-2"
                >
                  Questions & Answers
                  {!isInfoConfirmed && (
                    <span className="flex items-center gap-1 text-xs font-normal text-amber-500">
                      <LockFill size={13} /> Locked
                    </span>
                  )}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {questionsDescription}
                </p>
              </div>

              <Badge variant="primary" shape="rounded">
                {items.length} {items.length === 1 ? "Question" : "Questions"}
              </Badge>
            </header>

            {/* Lock Warning Banner */}
            {!isInfoConfirmed && (
              <div className="mb-6 flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs font-medium text-amber-600 dark:text-amber-400">
                <InfoCircleFill size={16} className="shrink-0 text-amber-500" />
                <span>
                  Please confirm both the <strong>Subject Name</strong> and{" "}
                  <strong>Quiz Title</strong> above to enable question editing.
                </span>
              </div>
            )}

            <fieldset disabled={!isInfoConfirmed} className="contents">
              <div className="flex flex-col gap-6">
                {items.map((item, index) => {
                  const generationMethod = item.generationMethod || "random";
                  const choices = item.choices || ["", "", "", ""];
                  const isAnswerFilled = Boolean(
                    item.answer && item.answer.trim(),
                  );

                  return (
                    <article
                      key={index}
                      className={`group rounded-xl border border-border bg-surface-hover p-5 transition-all duration-200 ${
                        isInfoConfirmed
                          ? "hover:border-primary/40 hover:shadow-sm"
                          : "opacity-60 cursor-not-allowed"
                      }`}
                    >
                      <header className="mb-4 flex items-center justify-between gap-4 border-b border-border/60 pb-3">
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
                          disabled={
                            !isInfoConfirmed || items.length <= MIN_QUESTIONS
                          }
                          title={
                            !isInfoConfirmed
                              ? "Confirm Subject and Quiz Title to edit questions"
                              : items.length <= MIN_QUESTIONS
                                ? `A quiz must contain at least ${MIN_QUESTIONS} questions`
                                : "Delete question"
                          }
                          className="opacity-80 transition-opacity hover:opacity-100 disabled:opacity-40"
                        >
                          <Trash3 size={15} />
                        </Button>
                      </header>

                      {/* Question Prompt and Correct Answer */}
                      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
                        <div className="lg:col-span-3">
                          <AutoAdjustingInput
                            id={`question-${index}`}
                            name="question"
                            label="Question Prompt"
                            value={item.question}
                            placeholder="Write your question..."
                            onChange={(event) => onItemChange(event, index)}
                            disabled={!isInfoConfirmed}
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
                            disabled={!isInfoConfirmed}
                            required
                          />
                        </div>
                      </div>

                      {/* Choice Generation Method Selector */}
                      <div className="mt-5 flex flex-col gap-2 rounded-lg border border-border/70 bg-background/40 p-3.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold uppercase tracking-wider text-muted">
                            Generation Method
                          </label>

                          {!isAnswerFilled && isInfoConfirmed && (
                            <span className="flex items-center gap-1 text-[11px] text-amber-500">
                              <InfoCircleFill size={11} /> Correct answer
                              required for Custom Choices
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                          {GENERATION_METHODS.map((method) => {
                            const Icon = method.icon;
                            const isSelected = generationMethod === method.id;
                            const isCustomAndDisabled =
                              !isInfoConfirmed ||
                              (method.id === "custom" && !isAnswerFilled);

                            return (
                              <button
                                key={method.id}
                                type="button"
                                disabled={isCustomAndDisabled}
                                title={
                                  !isInfoConfirmed
                                    ? "Confirm Subject and Quiz Title to edit options"
                                    : isCustomAndDisabled
                                      ? "Fill in the Correct Answer above to enable Custom Choices"
                                      : ""
                                }
                                onClick={() =>
                                  onItemChange(
                                    {
                                      target: {
                                        name: "generationMethod",
                                        value: method.id,
                                      },
                                    },
                                    index,
                                  )
                                }
                                className={`flex items-start gap-2.5 rounded-lg border p-2.5 text-left transition-all duration-200 ${
                                  isCustomAndDisabled
                                    ? "cursor-not-allowed opacity-50 border-border/40 bg-surface/50"
                                    : isSelected
                                      ? "border-primary bg-primary-light/50 text-foreground shadow-xs hover:cursor-pointer"
                                      : "border-border/80 bg-surface text-muted hover:border-primary/40 hover:text-foreground hover:cursor-pointer"
                                }`}
                              >
                                <Icon
                                  size={16}
                                  className={`mt-0.5 shrink-0 ${
                                    isSelected && !isCustomAndDisabled
                                      ? "text-primary"
                                      : "text-muted"
                                  }`}
                                />
                                <div className="flex flex-col">
                                  <span className="text-xs font-bold leading-tight">
                                    {method.label}
                                  </span>
                                  <span className="mt-0.5 text-[11px] leading-tight text-muted">
                                    {method.description}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Expandable Custom Choices */}
                        {generationMethod === "custom" && isAnswerFilled && (
                          <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="rounded-xl border border-primary/20 bg-surface p-4 shadow-2xs">
                              <div className="mb-3 flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                                  Custom Choice Options
                                </span>
                                <span className="text-[11px] text-muted">
                                  Provide 4 multiple-choice options
                                </span>
                              </div>

                              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {choices.map((choice, choiceIndex) => (
                                  <Input
                                    key={choiceIndex}
                                    id={`choice-${index}-${choiceIndex}`}
                                    name={`choice-${choiceIndex}`}
                                    label={`Option ${String.fromCharCode(
                                      65 + choiceIndex,
                                    )}`}
                                    value={choice}
                                    placeholder={`Enter option ${String.fromCharCode(
                                      65 + choiceIndex,
                                    )}`}
                                    onChange={(event) =>
                                      onChoiceChange(
                                        event.target.value,
                                        choiceIndex,
                                        index,
                                      )
                                    }
                                    disabled={!isInfoConfirmed}
                                    required={generationMethod === "custom"}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}

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
                  disabled={!isInfoConfirmed}
                  title={
                    !isInfoConfirmed
                      ? "Confirm Subject Name and Quiz Title to add questions"
                      : ""
                  }
                  className="inline-flex items-center gap-2 border-primary/30 text-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PlusCircle size={16} />
                  Add New Question
                </Button>
              </div>
            </fieldset>
          </Card>
        </section>

        {/* Floating Action Footer */}
        <footer className="sticky bottom-6 flex items-center justify-between gap-4 rounded-card border border-border bg-surface/90 p-4 shadow-lg backdrop-blur-md">
          {!isInfoConfirmed && (
            <span className="flex items-center gap-1.5 text-xs text-amber-500">
              <InfoCircleFill size={13} /> Confirm both Subject and Quiz Title
              to unlock and submit
            </span>
          )}
          <Button
            type="submit"
            fit
            disabled={isSubmitting || !isInfoConfirmed}
            title={
              !isInfoConfirmed
                ? "Please confirm both Subject Name and Quiz Title before submitting"
                : ""
            }
            className="ml-auto px-8 font-semibold shadow-(--shadow-button)"
          >
            {isSubmitting ? "Loading..." : submitLabel}
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
