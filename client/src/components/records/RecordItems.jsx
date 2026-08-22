import { CheckCircle, XCircle } from "react-bootstrap-icons";

const RecordItems = ({ record }) => {
  return (
    <section aria-labelledby="record-items-title">
      <header className="mb-6">
        <h2
          id="record-items-title"
          className="text-lg font-semibold text-foreground"
        >
          Questions
        </h2>

        <p className="mt-1 text-sm text-muted">
          Review your answers for each question.
        </p>
      </header>

      <ol className="flex w-fit flex-col gap-5">
        {record.items.map((item, index) => (
          <li
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.035] p-5 w-fit min-w-100"
          >
            <header className="flex items-center justify-between gap-4">
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                Question {index + 1}
              </span>

              {item.correct ? (
                <span className="flex items-center gap-2 text-sm font-semibold text-success">
                  <CheckCircle />
                  Correct
                </span>
              ) : (
                <span className="flex items-center gap-2 text-sm font-semibold text-danger">
                  <XCircle />
                  Incorrect
                </span>
              )}
            </header>

            <h3 className="mt-4 text-base font-semibold leading-relaxed text-foreground">
              {item.question}
            </h3>

            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                Your Answer
              </p>

              <p
                className={`mt-2 w-fit max-w-full rounded-xl border px-4 py-3 text-sm font-medium ${
                  item.correct
                    ? "border-success/20 bg-success/10 text-success"
                    : "border-danger/20 bg-danger/10 text-danger"
                }`}
              >
                {item.userAnswer}
              </p>
            </div>

            {!item.correct && (
              <div className="mt-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                  Correct Answer
                </p>

                <p className="mt-2 w-fit max-w-full rounded-xl border border-success/20 bg-success/10 px-4 py-3 text-sm font-medium text-success">
                  {item.answer}
                </p>
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default RecordItems;
