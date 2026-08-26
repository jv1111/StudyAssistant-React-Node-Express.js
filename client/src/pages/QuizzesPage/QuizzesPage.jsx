import { useState } from "react";
import { saveAs } from "file-saver";

import EmptyState from "../../components/common/EmptyState";
import QuizCardContent from "../../components/quiz/QuizCardContent";
import QuizOptionBox from "../../components/quiz/QuizOptionBox";
import SearchInput from "../../components/common/SearchInput";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";

import useQuizzes from "../../hooks/useQuizzes";

import { deleteFile, getPdf, setPDFOnServer } from "../../api/quiz.api";

import LoadingPage from "../Loading/LoadingPage";
import ListPageLayout from "../../components/common/ListPageLayout";

const QuizPage = () => {
  const { quizzes, isLoading, searchInput, handleSearch, handleScroll } =
    useQuizzes();

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
    <ListPageLayout
      title="Quizzes"
      description="Choose a quiz to get started"
      searchInput={searchInput}
      onSearch={handleSearch}
      searchPlaceholder="Search quizzes..."
    >
      {quizzes.length > 0 ? (
        <ul
          onScroll={handleScroll}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {quizzes.map((quiz) => (
            <li key={quiz._id}>
              <Card>
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
          />
        </Card>
      </Modal>
    </ListPageLayout>
  );
};

export default QuizPage;
