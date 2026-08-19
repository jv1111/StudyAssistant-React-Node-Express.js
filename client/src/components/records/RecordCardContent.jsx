import { useNavigate } from "react-router-dom";

import Button from "../common/Button";

const RecordCardContent = ({ record }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full min-h-44 flex-col">
      <div>
        <span className="text-xs font-medium uppercase tracking-wider text-primary">
          Quiz Record
        </span>

        <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          {record.quizName}
        </h2>

        <time className="mt-1 block text-sm text-muted">{record.date}</time>
      </div>

      <div className="my-4 h-px bg-white/10" />

      <dl className="grid grid-cols-2 gap-4">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-muted">
            Score
          </dt>

          <dd className="mt-1 text-lg font-semibold text-foreground">
            {record.score}
          </dd>
        </div>

        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-muted">
            Questions
          </dt>

          <dd className="mt-1 text-lg font-semibold text-foreground">
            {record.numberOfItems}
          </dd>
        </div>
      </dl>

      <div className="mt-auto pt-6">
        <Button
          type="button"
          fit
          onClick={() => navigate(`/quiz/records/${record._id}`)}
        >
          Select
        </Button>
      </div>
    </div>
  );
};

export default RecordCardContent;
