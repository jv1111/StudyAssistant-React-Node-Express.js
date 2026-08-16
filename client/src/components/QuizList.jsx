import React, { useState } from "react";
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
    <section className="quizzesSection py-4">
      <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="text-white text-fam-kavoon mb-1">Quizzes</h2>

          <p className="text-secondary mb-0">Choose a quiz to get started</p>
        </div>

        <SearchInput
          value={searchInput}
          onChange={handleSearch}
          placeholder="Search quizzes..."
        />
      </header>

      <div className="card bg-dark border-secondary shadow-sm">
        <div className="card-body p-3 p-md-4">
          {quizzes.length > 0 ? (
            <div className="row g-3" onScroll={handleScroll}>
              {quizzes.map((quiz) => (
                <div className="col-12 col-md-6 col-lg-4" key={quiz._id}>
                  <QuizCard
                    quiz={quiz}
                    onSelect={handleQuizSelect}
                    onDownload={handleDownloadPdf}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      <QuizOptionBox
        selectingType={selectedQuiz !== null}
        quizId={selectedQuiz}
        onClose={handleQuizOptionClose}
      />
    </section>
  );
};

export default QuizList;
