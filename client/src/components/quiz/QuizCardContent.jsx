import {
  PatchCheckFill,
  QuestionCircle,
  Download,
  ChevronRight,
} from "react-bootstrap-icons";

import Button from "../common/Button";
import Card from "../common/Card";

const QuizCardContent = ({ quiz, onSelect, onDownload }) => {
  return (
    <div className="flex w-full gap-3">
      <Button
        variant="unstyled"
        onClick={() => onSelect(quiz._id)}
        className="group flex flex-1 rounded-card text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Card className="relative h-full w-full cursor-pointer overflow-hidden bg-surface transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:bg-surface-hover hover:shadow-gold-glow">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative z-10 flex h-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-xs transition-all duration-300 group-hover:-rotate-2 group-hover:scale-105 group-hover:border-primary/40">
                <div className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 blur-xs transition-opacity duration-300 group-hover:opacity-100" />
                <PatchCheckFill
                  size={22}
                  className="relative z-10 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col items-start gap-0.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="line-clamp-1 text-base font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-lg">
                    {quiz.quizName}
                  </h2>

                  <div className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[11px] font-semibold text-primary transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
                    <QuestionCircle size={11} className="text-primary" />
                    <span>
                      {quiz.numberOfItems || 0}{" "}
                      {quiz.numberOfItems === 1 ? "Item" : "Items"}
                    </span>
                  </div>
                </div>

                <p className="line-clamp-2 max-w-3xl text-left text-xs font-normal leading-relaxed text-muted transition-colors duration-300 group-hover:text-muted/90 sm:text-sm">
                  {quiz.subjectName
                    ? `Subject: ${quiz.subjectName}`
                    : "Test your understanding with this practice quiz."}
                </p>
              </div>
            </div>

            <div className="hidden shrink-0 transform text-muted/30 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-primary group-hover:opacity-100 sm:block">
              <ChevronRight size={20} strokeWidth={2} />
            </div>
          </div>
        </Card>
      </Button>

      <Button
        variant="unstyled"
        onClick={(e) => {
          e.stopPropagation();
          onDownload(e, quiz._id);
        }}
        title="Download PDF"
        aria-label="Download PDF"
        className="group flex h-full aspect-square shrink-0 rounded-card outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Card className="flex h-full w-full items-center justify-center bg-surface p-0 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:bg-surface-hover hover:shadow-gold-glow">
          <Download
            size={22}
            className="text-muted transition-all duration-300 group-hover:scale-110 group-hover:text-primary"
          />
        </Card>
      </Button>
    </div>
  );
};

export default QuizCardContent;
