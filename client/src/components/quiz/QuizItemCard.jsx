import { useState } from "react";
import { ChevronRight } from "react-bootstrap-icons";
import Button from "../common/Button";

const QuizItemCard = ({
  name,
  itemIcon: ItemIcon,
  onSelect,
  hasOption,
  onOptionClick,
  optionVariant = "primary",
  optionIcon: OptionIcon,
  optionTitle,
  count,
  countLabel,
  badge,
  description,
  secondaryContent,
}) => {
  const [isOptionHovered, setIsOptionHovered] = useState(false);

  const showCardHover = !isOptionHovered;

  const cardHoverStyles = showCardHover
    ? "hover:-translate-y-0.5 hover:border-border-hover hover:bg-surface-hover hover:shadow-[0_12px_35px_-8px_rgba(197,155,39,0.12)]"
    : "";

  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`group relative flex w-full cursor-pointer flex-col justify-between gap-3 rounded-card border border-border bg-surface p-4 shadow-sm transition-all duration-300 sm:flex-row sm:items-center ${cardHoverStyles}`}
    >
      {/* Left Section: Icon & Content */}
      <div className="flex min-w-0 flex-1 items-center gap-3.5">
        {/* Icon Container */}
        {ItemIcon && (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light/80 text-primary shadow-xs transition-all duration-300 ${
              showCardHover
                ? "group-hover:scale-105 group-hover:bg-primary group-hover:text-surface group-hover:shadow-sm"
                : ""
            }`}
          >
            <ItemIcon className="h-5 w-5" />
          </div>
        )}

        {/* Text Details */}
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`truncate text-base font-bold text-foreground transition-colors ${
                showCardHover ? "group-hover:text-primary" : ""
              }`}
            >
              {name}
            </h3>

            {badge && <div className="shrink-0">{badge}</div>}
          </div>

          <p className="line-clamp-1 text-xs text-muted">{description}</p>
        </div>
      </div>

      {/* Right Section: Stats, Metadata & Actions */}
      <div className="flex w-full items-center justify-between border-t border-border/60 pt-3 sm:w-auto sm:justify-end sm:gap-4 sm:border-0 sm:pt-0">
        <div className="flex items-center gap-3">
          {/* Compact Count Pill */}
          {count !== undefined && count !== null && (
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-background-secondary/80 px-2.5 py-1 border border-border/40 text-xs font-semibold text-foreground">
              <span className="font-bold text-primary">{count}</span>
              <span className="text-muted text-[11px]">
                {countLabel}
                {count !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          {/* Secondary Content */}
          {secondaryContent && (
            <span className="hidden text-xs font-medium text-muted/70 lg:inline-block">
              {secondaryContent}
            </span>
          )}
        </div>

        {/* Interaction Elements */}
        <div className="flex items-center gap-2">
          {hasOption && OptionIcon && (
            <div
              onMouseEnter={() => setIsOptionHovered(true)}
              onMouseLeave={() => setIsOptionHovered(false)}
            >
              <Button
                variant={optionVariant}
                icon={OptionIcon}
                iconOnly={true}
                title={optionTitle}
                onClick={(e) => {
                  e.stopPropagation();
                  onOptionClick?.(e);
                }}
                className="h-9 w-9 rounded-full shadow-xs transition-transform hover:scale-105"
              />
            </div>
          )}

          {/* Chevron Indicator */}
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-background-secondary text-muted transition-all duration-300 ${
              showCardHover
                ? "group-hover:translate-x-0.5 group-hover:bg-primary group-hover:text-surface group-hover:shadow-xs"
                : ""
            }`}
          >
            <ChevronRight className="h-4 w-4 transition-transform group-hover:scale-110" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizItemCard;
