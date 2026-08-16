import { useState } from "react";
import { saveAs } from "file-saver";

import EmptyState from "./EmptyState";
import QuizCard from "./QuizCard";
import QuizOptionBox from "./QuizOptionBox";
import SearchInput from "./SearchInput";

import useQuizzes from "../hooks/useQuizzes";

import { deleteFile, getPdf, setPDFOnServer } from "../api/QuizApi";

import LoadingPage from "../pages/Loading/LoadingPage";

const QuizList = () => {
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
    <section className="list-page" aria-labelledby="quiz-list-title">
      <header className="list-page-header">
        <div>
          <h1 id="quiz-list-title" className="list-page-title">
            Quizzes
          </h1>

          <p className="list-page-description">Choose a quiz to get started</p>
        </div>

        <SearchInput
          value={searchInput}
          onChange={handleSearch}
          placeholder="Search quizzes..."
        />
      </header>

      {quizzes.length > 0 ? (
        <ul className="list-page-grid" onScroll={handleScroll}>
          {quizzes.map((quiz) => (
            <li key={quiz._id}>
              <QuizCard
                quiz={quiz}
                onSelect={handleQuizSelect}
                onDownload={handleDownloadPdf}
              />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No quizzes found"
          description="There are no quizzes matching your search."
        />
      )}

      <QuizOptionBox
        selectingType={selectedQuiz !== null}
        quizId={selectedQuiz}
        onClose={handleQuizOptionClose}
      />
    </section>
  );
};

export default QuizList;
