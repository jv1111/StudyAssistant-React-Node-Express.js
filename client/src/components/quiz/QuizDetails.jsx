import { CheckCircleFill, LockFill } from "react-bootstrap-icons";

import Card from "../common/Card";

const QuizDetails = ({ subject, quizName }) => {
  return (
    <Card className="card-base">
      <section aria-labelledby="preview-details-title">
        <header className="mb-4 flex items-center justify-between border-b border-border pb-3">
          <h2
            id="preview-details-title"
            className="flex items-center gap-2 text-lg font-bold text-foreground"
          >
            Quiz Details
            <CheckCircleFill className="shrink-0 text-primary" size={18} />
          </h2>

          <span className="flex items-center gap-1 text-xs font-semibold text-muted">
            <LockFill size={12} />
            Read-Only
          </span>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-background/50 p-4">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
              Subject
            </span>

            <span className="text-base font-bold text-foreground">
              {subject || "N/A"}
            </span>
          </div>

          <div className="rounded-xl border border-border bg-background/50 p-4">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
              Quiz Title
            </span>

            <span className="text-base font-bold text-foreground">
              {quizName || "N/A"}
            </span>
          </div>
        </div>
      </section>
    </Card>
  );
};

export default QuizDetails;
