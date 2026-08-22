import { useSelector } from "react-redux";

import Card from "../common/Card";

const Pad = ({ children, record }) => {
  const auth = useSelector((state) => state.auth);
  const numberOfItems = record.items.length;

  return (
    <>
      <header className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-primary">
            Quiz Review
          </span>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            {record.quizName}
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-muted">
            {record.subject}
          </p>
        </div>

        <dl className="flex gap-8">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">
              Score
            </dt>

            <dd className="mt-1 text-xl font-semibold text-foreground">
              {record.score}
              <span className="text-sm font-medium text-muted">
                {" "}
                / {numberOfItems}
              </span>
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">
              Completed
            </dt>

            <dd className="mt-1 text-sm font-semibold text-foreground">
              {record.date}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">
              Student
            </dt>

            <dd className="mt-1 text-sm font-semibold text-foreground">
              {auth.user.username}
            </dd>
          </div>
        </dl>
      </header>

      {children}
    </>
  );
};

export default Pad;
