import { useState } from "react";
import { saveAs } from "file-saver";

import EmptyState from "../../components/common/EmptyState";
import QuizCardContent from "../../components/quiz/QuizCardContent";
import QuizOptionBox from "../../components/quiz/QuizOptionBox";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import AppHeaderContent from "../../components/common/AppHeaderContent";
import SearchInput from "../../components/common/SearchInput";

import useQuizzes from "../../hooks/useQuizzes";
import { deleteFile, getPdf, setPDFOnServer } from "../../api/quiz.api";

import LoadingPage from "../Loading/LoadingPage";

const QuizPage = () => {
  const {
    quizzes,
    isLoading,
    searchInput,
    handleSearch,
    handleScroll,
    handleStartQuiz,
  } = useQuizzes();

  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleQuizSelect = (quizId) => {
    setSelectedQuiz(quizId);
  };

  const handleQuizOptionClose = () => {
    setSelectedQuiz(null);
  };

  const handleDownloadPdf = async (event, quizId) => {
    event.stopPropagation();

    const pdfData = await setPDFOnServer(quizId);
    const pdf = await getPdf(pdfData.pdfName);

    saveAs(pdf, pdfData.pdfName);

    await deleteFile(pdfData.path);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <header className="mb-8 flex h-fit flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <AppHeaderContent
          eyebrow="Overview"
          title="Quizzes"
          description="Choose a quiz to get started"
        />

        <div className="w-full shrink-0 sm:w-72 md:w-80">
          <SearchInput
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search quizzes..."
          />
        </div>
      </header>

      {quizzes.length > 0 ? (
        <ul
          onScroll={handleScroll}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {quizzes.map((quiz) => (
            <li key={quiz._id} className="h-full">
              <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <QuizCardContent
                  quiz={quiz}
                  onSelect={handleQuizSelect}
                  onDownload={handleDownloadPdf}
                />
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No quizzes found"
          description="There are no quizzes matching your search."
        />
      )}

      <Modal isOpen={selectedQuiz !== null} onClose={handleQuizOptionClose}>
        <Card className="max-w-md">
          <QuizOptionBox
            quizId={selectedQuiz}
            onClose={handleQuizOptionClose}
            onStartQuiz={(quizId, quizType) =>
              handleStartQuiz(quizId, quizType, false)
            }
          />
        </Card>
      </Modal>
    </div>
  );
};

export default QuizPage;
