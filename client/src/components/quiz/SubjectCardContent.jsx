import { useNavigate } from "react-router-dom";
import {
  JournalBookmark,
  ArrowRight,
  CollectionPlay,
} from "react-bootstrap-icons";
import Button from "../common/Button";
import Badge from "../common/Badge";

const SubjectCardContent = ({ subject }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        {/* Top Header: Icon & Metadata Badge */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs transition-transform duration-300 group-hover:scale-105">
            <JournalBookmark size={22} />
          </div>

          {/* Render Quiz Count if available, otherwise default Badge */}
          {subject.quizCount !== undefined ? (
            <div className="flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-semibold text-muted">
              <CollectionPlay size={12} className="text-primary" />
              <span>
                {subject.quizCount}{" "}
                {subject.quizCount === 1 ? "Quiz" : "Quizzes"}
              </span>
            </div>
          ) : (
            <Badge icon={JournalBookmark} variant="primary" shape="rounded">
              Subject
            </Badge>
          )}
        </div>

        {/* Subject Title */}
        <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary line-clamp-1">
          {subject.name}
        </h2>

        {/* Subject Description */}
        <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
          {subject.description ||
            "Explore quizzes, challenge your skills, and master this subject."}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-6 border-t border-border/60 pt-4">
        <Button
          type="button"
          fit
          onClick={() => navigate(`quiz/${subject._id}`)}
          className="w-full justify-between gap-2 shadow-xs group-hover:shadow-md transition-all"
        >
          <span>Select Subject</span>
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Button>
      </div>
    </div>
  );
};

export default SubjectCardContent;
