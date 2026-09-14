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
import SelectableOption from "../common/SelectableOption";

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
    setIsSubjectLocked(true);
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
        <Card className="card-base">
          <section aria-labelledby="quiz-info-title">
            <header className="mb-6 border-b border-border pb-4">
              <h2
                id="quiz-info-title"
                className="flex items-center gap-2 text-lg font-bold text-foreground"
              >
                Quiz Details
                {isInfoConfirmed && (
                  <CheckCircleFill
                    className="shrink-0 text-primary"
                    size={18}
                  />
                )}
              </h2>

              <p className="mt-1 text-sm text-muted">{quizInfoDescription}</p>
            </header>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted">
                  <span>
                    {subject ? `Subject Name: ${subject}` : "Subject Name"}
                  </span>

                  {subject && (
                    <span className="flex items-center gap-1 text-[11px] font-bold normal-case text-primary">
                      <CheckCircleFill size={12} />
                      Confirmed
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

              <div className="flex flex-col gap-2">
                <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted">
                  <span>
                    {quizName ? `Quiz Title: ${quizName}` : "Quiz Title"}
                  </span>

                  {quizName && (
                    <span className="flex items-center gap-1 text-[11px] font-bold normal-case text-primary">
                      <CheckCircleFill size={12} />
                      Confirmed
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

        <section aria-labelledby="questions-title">
          <Card
            className={`relative card-base transition-all duration-300 ${
              !isInfoConfirmed ? "border-notice/40 bg-surface/50" : ""
            }`}
          >
            <header className="mb-6 flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2
                  id="questions-title"
                  className="flex items-center gap-2 text-lg font-bold text-foreground"
                >
                  Questions & Answers
                  {!isInfoConfirmed && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-notice/20 bg-notice-light px-2.5 py-0.5 text-xs font-semibold text-notice">
                      <LockFill size={12} />
                      Locked
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

            {!isInfoConfirmed && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-notice/30 bg-notice-light p-4 text-xs font-medium text-notice shadow-xs sm:items-center">
                <div className="shrink-0 rounded-lg bg-notice/20 p-2 text-notice">
                  <LockFill size={18} />
                </div>

                <div className="flex-1">
                  <span className="mb-0.5 block text-sm font-bold">
                    Question editing is locked
                  </span>

                  <span>
                    Please confirm both the <strong>Subject Name</strong> and{" "}
                    <strong>Quiz Title</strong> above to unlock and start
                    creating questions.
                  </span>
                </div>
              </div>
            )}

            <fieldset disabled={!isInfoConfirmed} className="contents">
              <div
                className={`flex flex-col gap-6 transition-all duration-300 ${
                  !isInfoConfirmed
                    ? "pointer-events-none select-none opacity-40 grayscale-[25%]"
                    : ""
                }`}
              >
                {items.map((item, index) => {
                  const generationMethod = item.generationMethod || "random";

                  const choices = item.choices || ["", "", "", ""];

                  const isAnswerFilled = Boolean(
                    item.answer && item.answer.trim(),
                  );

                  return (
                    <article
                      key={index}
                      className="group rounded-xl border border-border bg-surface-hover p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-sm"
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
                          disabled={items.length <= MIN_QUESTIONS}
                          title={
                            items.length <= MIN_QUESTIONS
                              ? `A quiz must contain at least ${MIN_QUESTIONS} questions`
                              : "Delete question"
                          }
                          className="opacity-80 transition-opacity hover:opacity-100 disabled:opacity-40"
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

                      <div className="mt-5 flex flex-col gap-2 rounded-lg border border-border/70 bg-background/40 p-3.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold uppercase tracking-wider text-muted">
                            Generation Method
                          </label>

                          {!isAnswerFilled && (
                            <span className="flex items-center gap-1 text-[11px] text-notice">
                              <InfoCircleFill size={11} />
                              Correct answer required for Custom Choices
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                          {GENERATION_METHODS.map((method) => {
                            const isSelected = generationMethod === method.id;

                            const isCustomAndDisabled =
                              method.id === "custom" && !isAnswerFilled;

                            return (
                              <SelectableOption
                                key={method.id}
                                selected={isSelected}
                                disabled={isCustomAndDisabled}
                                title={
                                  isCustomAndDisabled
                                    ? "Fill in the Correct Answer above to enable Custom Choices"
                                    : ""
                                }
                                icon={method.icon}
                                label={method.label}
                                description={method.description}
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
                              />
                            );
                          })}
                        </div>

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

              <div
                className={`mt-8 flex justify-center border-t border-border pt-6 transition-opacity duration-300 ${
                  !isInfoConfirmed ? "pointer-events-none opacity-40" : ""
                }`}
              >
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
            </fieldset>
          </Card>
        </section>

        <footer className="sticky bottom-6 flex items-center justify-between gap-4 rounded-card border border-border bg-surface/90 p-4 shadow-lg backdrop-blur-md">
          {!isInfoConfirmed ? (
            <span className="flex items-center gap-1.5 text-xs font-medium text-notice">
              <LockFill size={13} className="shrink-0" />
              Confirm both Subject and Quiz Title to unlock and submit
            </span>
          ) : (
            <span className="text-xs text-muted">
              All details confirmed. Ready to submit!
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
