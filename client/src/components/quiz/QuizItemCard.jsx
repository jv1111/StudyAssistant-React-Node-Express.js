import { ChevronRight } from "react-bootstrap-icons";

import Button from "../common/Button";
import Card from "../common/Card";

const QuizItemCard = ({
  name,
  itemIcon: ItemIcon,
  onSelect,
  onOptionClick,
  hasOption = false,
  optionVariant = "ghost",
  optionIcon,
  optionTitle,
  count,
  countLabel = "Quiz",
  secondaryContent,
  badge,
  description,
}) => {
  const hasCount = count !== undefined && count !== null;

  return (
    <Card className="group relative w-full overflow-hidden bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-surface-hover hover:shadow-gold-glow">
      <div className="relative z-10 flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant="unstyled"
          onClick={onSelect}
          className="min-w-0 flex-1 rounded-none p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-xs transition-colors duration-300 group-hover:bg-primary/20">
              <ItemIcon size={20} />
            </div>

            <div className="flex min-w-0 flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
                  {name}
                </h3>

                {badge}
              </div>

              {description && (
                <p className="mt-0.5 line-clamp-2 max-w-3xl text-xs font-normal leading-relaxed text-muted transition-colors duration-300 group-hover:text-muted/90 sm:text-sm">
                  {description}
                </p>
              )}

              {hasCount && (
                <div className="mt-1 flex items-center gap-2 text-xs font-medium text-muted">
                  <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[11px] text-primary">
                    {count} {count === 1 ? countLabel : `${countLabel}s`}
                  </span>

                  {secondaryContent && (
                    <>
                      <span className="opacity-50">•</span>
                      <span>{secondaryContent}</span>
                    </>
                  )}
                </div>
              )}

              {!hasCount && secondaryContent && (
                <div className="mt-1 text-xs font-medium text-muted">
                  {secondaryContent}
                </div>
              )}
            </div>
          </div>
        </Button>

        <div className="flex items-center justify-end gap-2">
          {hasOption && (
            <Button
              variant={optionVariant}
              icon={optionIcon}
              iconOnly
              onClick={onOptionClick}
              title={optionTitle}
              className="h-10 w-10 sm:h-11 sm:w-11"
            />
          )}

          <button
            type="button"
            onClick={onSelect}
            aria-label={`Select ${name}`}
            className="hidden shrink-0 text-muted/30 outline-none transition-all duration-300 hover:text-primary focus-visible:text-primary sm:block"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default QuizItemCard;
