import {
  JournalBookmark,
  CollectionPlay,
  ChevronRight,
} from "react-bootstrap-icons";

import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";

const SubjectCard = ({ subject, onSelect }) => {
  return (
    <Button
      variant="unstyled"
      onClick={onSelect}
      className="block w-full rounded-card text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="group relative cursor-pointer overflow-hidden bg-surface transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:bg-surface-hover hover:shadow-gold-glow">
        {/* Decorative background glow that activates on hover */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10 flex h-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left Section: Icon & Info Container */}
          <div className="flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            {/* Compact Subject Icon */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-xs transition-all duration-300 group-hover:-rotate-2 group-hover:scale-105 group-hover:border-primary/40">
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 blur-xs transition-opacity duration-300 group-hover:opacity-100" />

              <JournalBookmark
                size={22}
                className="relative z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Text Details */}
            <div className="flex flex-1 flex-col items-start gap-0.5">
              {/* Title & Badge Row */}
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="line-clamp-1 text-base font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-lg">
                  {subject.name}
                </h2>

                {/* Compact Quiz Count Badge */}
                {subject.quizCount !== undefined ? (
                  <div className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[11px] font-semibold text-primary transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
                    <CollectionPlay size={11} className="text-primary" />

                    <span>
                      {subject.quizCount}{" "}
                      {subject.quizCount === 1 ? "Quiz" : "Quizzes"}
                    </span>
                  </div>
                ) : (
                  <Badge icon={JournalBookmark} variant="primary" shape="pill">
                    Subject
                  </Badge>
                )}
              </div>

              {/* Compact Subject Description */}
              <p className="line-clamp-2 max-w-3xl text-left text-xs font-normal leading-relaxed text-muted transition-colors duration-300 group-hover:text-muted/90 sm:text-sm">
                {subject.description ||
                  "Explore quizzes, challenge your skills, and master this subject."}
              </p>
            </div>
          </div>

          {/* Right Section: Compact Animated Chevron */}
          <div className="hidden shrink-0 transform text-muted/30 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-primary group-hover:opacity-100 sm:block">
            <ChevronRight size={20} strokeWidth={2} />
          </div>
        </div>
      </Card>
    </Button>
  );
};

export default SubjectCard;
