// components/quiz/QuizEditor.jsx

import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

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
  return (
    <form
      autoComplete="off"
      onSubmit={onSubmit}
      className="flex flex-col gap-6"
    >
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

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input
              id="subject"
              name="subject"
              label="Subject"
              value={subject}
              placeholder="e.g. Mathematics"
              onChange={onSubjectChange}
              required
            />

            <Input
              id="quizName"
              name="quizName"
              label="Quiz Name"
              value={quizName}
              placeholder="e.g. Algebra Quiz"
              onChange={onQuizNameChange}
              required
            />
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

              <p className="mt-1 text-sm text-muted">{questionsDescription}</p>
            </div>

            <span className="text-sm text-muted">{items.length} questions</span>
          </header>

          <div className="flex flex-col gap-4">
            {items.map((item, index) => (
              <article
                key={index}
                className="rounded-xl border border-white/10 bg-white/[0.035] p-5 transition-colors duration-200 hover:border-white/15 hover:bg-white/5"
              >
                <header className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-primary">
                      Question {index + 1}
                    </span>

                    <h3 className="mt-1 text-base font-semibold text-foreground">
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
                    Delete
                  </Button>
                </header>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={`question-${index}`}
                      className="text-sm font-medium text-foreground"
                    >
                      Question
                    </label>

                    <textarea
                      id={`question-${index}`}
                      rows="4"
                      name="question"
                      value={item.question}
                      placeholder="Enter your question..."
                      onChange={(event) => onItemChange(event, index)}
                      required
                      className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted outline-none backdrop-blur-xl transition-all duration-200 focus:border-primary/50 focus:bg-white/8 focus:ring-2 focus:ring-primary/10"
                    />
                  </div>

                  <Input
                    id={`answer-${index}`}
                    name="answer"
                    label="Answer"
                    value={item.answer}
                    placeholder="Enter the correct answer..."
                    onChange={(event) => onItemChange(event, index)}
                    required
                  />
                </div>
              </article>
            ))}
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

      <footer className="flex justify-end">
        <Button type="submit" fit>
          {submitLabel}
        </Button>
      </footer>
    </form>
  );
};

export default QuizEditor;
