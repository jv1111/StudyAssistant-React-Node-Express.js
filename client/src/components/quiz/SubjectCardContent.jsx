import { useNavigate } from "react-router-dom";
import { JournalBookmark, ArrowRight } from "react-bootstrap-icons";
import Button from "../common/Button";
import Badge from "../common/Badge";

const SubjectCardContent = ({ subject }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full min-h-48 flex-col justify-between p-1">
      <div>
        <div className="flex items-center justify-between gap-2">
          <Badge icon={JournalBookmark} variant="primary" shape="rounded">
            Subject
          </Badge>
        </div>

        <h2 className="mt-3.5 text-xl font-bold tracking-tight text-foreground line-clamp-1">
          {subject.name}
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
          Explore quizzes and test your knowledge in this subject.
        </p>
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <Button
          type="button"
          fit
          onClick={() => navigate(`quiz/${subject._id}`)}
          className="w-full sm:w-auto"
        >
          <span className="flex items-center justify-center gap-2">
            <span>Select Subject</span>
            <ArrowRight size={14} />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SubjectCardContent;
