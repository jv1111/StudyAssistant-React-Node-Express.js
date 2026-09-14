import { ChevronRight } from "react-bootstrap-icons";
import EmptyState from "../common/EmptyState";
import ModalContainer from "../common/ModalContainer";
import Card from "../common/Card";
import Input from "../common/Input";

import useSubjects from "../../hooks/quiz/useSubjects";
import Button from "../common/Button";

const SubjectSelectorModal = ({ isOpen, onClose, onSelect }) => {
  const { subjects, isLoading, searchInput, handleSearch, handleScroll } =
    useSubjects();

  const handleSelect = (subject) => {
    onSelect(subject);
    onClose();
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <Card className="w-[min(90vw,600px)]">
        <div className="flex flex-col gap-5">
          <header className="border-b border-border/60 pb-3">
            <h2 className="text-lg font-bold text-foreground">
              Select Subject
            </h2>

            <p className="mt-1 text-sm text-muted">
              Choose an existing subject for your quiz.
            </p>
          </header>

          <Input
            id="subject-search"
            name="subject-search"
            label="Search"
            value={searchInput}
            placeholder="Search subjects..."
            onChange={handleSearch}
          />

          <div
            onScroll={handleScroll}
            className="max-h-96 overflow-y-auto pr-1"
          >
            {isLoading && subjects.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted">
                Loading subjects...
              </div>
            ) : subjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 py-2">
                {subjects.map((subject) => (
                  <Button
                    key={subject._id}
                    variant="card"
                    onClick={() => handleSelect(subject)}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-foreground transition-colors group-hover:text-primary-hover">
                          {subject.name}
                        </h3>
                        <ChevronRight
                          size={14}
                          className="shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                        />
                      </div>

                      {subject.description && (
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">
                          {subject.description}
                        </p>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No subjects found"
                description="There are no subjects matching your search."
              />
            )}

            {isLoading && subjects.length > 0 && (
              <p className="py-4 text-center text-sm text-muted">
                Loading more...
              </p>
            )}
          </div>
        </div>
      </Card>
    </ModalContainer>
  );
};

export default SubjectSelectorModal;
