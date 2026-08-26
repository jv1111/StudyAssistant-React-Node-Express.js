import { useNavigate } from "react-router-dom";

import Button from "../common/Button";

const SubjectCardContent = ({ subject }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full min-h-44 flex-col">
      <div>
        <span className="text-xs font-medium uppercase tracking-wider text-primary">
          Subject
        </span>

        <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          {subject.name}
        </h2>
      </div>

      <div className="my-4 h-px bg-white/10" />

      <p className="text-sm leading-relaxed text-muted">
        Explore quizzes and test your knowledge in this subject.
      </p>

      <div className="mt-auto pt-6">
        <Button
          type="button"
          fit
          onClick={() => navigate(`quiz/${subject._id}`)}
        >
          Select
        </Button>
      </div>
    </div>
  );
};

export default SubjectCardContent;
