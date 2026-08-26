import EmptyState from "../common/EmptyState";
import Modal from "../common/Modal";
import Card from "../common/Card";
import Input from "../common/Input";

import useSubjects from "../../hooks/useSubjects";

const SubjectSelectorModal = ({ isOpen, onClose, onSelect }) => {
  const { subjects, isLoading, searchInput, handleSearch, handleScroll } =
    useSubjects();

  const handleSelect = (subject) => {
    onSelect(subject);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card className="w-[min(90vw,600px)]">
        <div className="flex flex-col gap-5">
          <header>
            <h2 className="text-lg font-semibold text-foreground">
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

          <div onScroll={handleScroll} className="max-h-100 overflow-y-auto">
            {isLoading && subjects.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted">
                Loading subjects...
              </div>
            ) : subjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {subjects.map((subject) => (
                  <button
                    key={subject._id}
                    type="button"
                    onClick={() => handleSelect(subject)}
                    className="rounded-xl border border-white/10 bg-white/[0.035] p-4 text-left transition-colors hover:border-primary/40 hover:bg-primary/10"
                  >
                    <h3 className="font-medium text-foreground">
                      {subject.name}
                    </h3>

                    {subject.description && (
                      <p className="mt-1 text-sm text-muted">
                        {subject.description}
                      </p>
                    )}
                  </button>
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
    </Modal>
  );
};

export default SubjectSelectorModal;
