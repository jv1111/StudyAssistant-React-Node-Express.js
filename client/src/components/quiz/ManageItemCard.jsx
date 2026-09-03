import { Trash, Book, ChevronRight } from "react-bootstrap-icons";

import Button from "../common/Button";
import Card from "../common/Card";

const ManageItemCard = ({
  item,
  onSelect,
  onDeleteClick,
  nameKey = "name",
  countKey = "quizCount",
  countLabel = "Quiz",
  secondaryContent,
}) => {
  const name = item[nameKey];
  const count = item[countKey];

  const hasCount = count !== undefined && count !== null;

  return (
    <Button
      variant="unstyled"
      onClick={() => onSelect(item)}
      className="block w-full rounded-card text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="group relative cursor-pointer overflow-hidden bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-surface-hover hover:shadow-gold-glow">
        <div className="relative z-10 flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-xs transition-colors duration-300 group-hover:bg-primary/20">
              <Book size={20} />
            </div>

            <div className="flex flex-col">
              <h3 className="text-base font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
                {name}
              </h3>

              <div className="mt-1 flex items-center gap-2 text-xs font-medium text-muted">
                {hasCount && (
                  <>
                    <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[11px] text-primary">
                      {count} {count === 1 ? countLabel : `${countLabel}s`}
                    </span>

                    <span className="opacity-50">•</span>
                  </>
                )}

                <span>
                  {secondaryContent ??
                    `Created ${new Date(item.createdAt).toLocaleDateString()}`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              variant="danger"
              icon={Trash}
              iconOnly
              onClick={(event) => {
                event.stopPropagation();
                onDeleteClick(item);
              }}
              title={`Delete ${name}`}
              className="h-10 w-10 sm:h-11 sm:w-11"
            />

            <div className="hidden shrink-0 text-muted/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary sm:block">
              <ChevronRight size={20} />
            </div>
          </div>
        </div>
      </Card>
    </Button>
  );
};

export default ManageItemCard;
