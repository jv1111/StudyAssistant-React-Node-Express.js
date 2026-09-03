import { Trash, Pencil, Book } from "react-bootstrap-icons";

import Button from "../common/Button";
import Card from "../common/Card";

const ManageQuizCard = ({ quiz, onEditClick, onDeleteClick }) => {
  return (
    <Card className="group relative overflow-hidden bg-surface transition-all duration-300 hover:border-primary/50 hover:bg-surface-hover">
      <div className="relative z-10 flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-xs transition-colors duration-300 group-hover:bg-primary/20">
            <Book size={20} />
          </div>

          <div className="flex flex-col">
            <h3 className="text-base font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
              {quiz.quizName}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-xs font-medium text-muted">
              <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[11px] text-primary">
                {quiz.numberOfItems}{" "}
                {quiz.numberOfItems === 1 ? "Question" : "Questions"}
              </span>

              <span className="opacity-50">•</span>

              <span>{quiz.subjectId?.name || "Unknown Subject"}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            icon={Pencil}
            iconOnly
            onClick={() => onEditClick(quiz)}
            title={`Edit ${quiz.quizName}`}
            className="h-10 w-10 sm:h-11 sm:w-11"
          />

          <Button
            variant="danger"
            icon={Trash}
            iconOnly
            onClick={() => onDeleteClick(quiz)}
            title={`Delete ${quiz.quizName}`}
            className="h-10 w-10 sm:h-11 sm:w-11"
          />
        </div>
      </div>
    </Card>
  );
};

export default ManageQuizCard;
