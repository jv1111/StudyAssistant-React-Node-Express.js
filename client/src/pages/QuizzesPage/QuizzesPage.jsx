import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

import EmptyState from "../../components/common/EmptyState";
import OptionBox from "../../components/common/OptionBox";
import QuizCardContent from "../../components/quiz/QuizCardContent";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import AppHeaderContent from "../../components/common/AppHeaderContent";
import SearchInput from "../../components/common/SearchInput";
import GlassScrollableGrid from "../../components/common/GlassScrollableGrid"; // <-- Import the new component

import useQuizzes from "../../hooks/useQuizzes";
import { downloadPdf } from "../../api/quiz.api";

import LoadingPage from "../Loading/LoadingPage";

const QuizzesPage = () => {
  const navigate = useNavigate();

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

  const handleEditQuiz = (quizId) => {
    navigate(`/quiz/update/${quizId}`);
  };

  const handleDownloadPdf = async (event, quizId) => {
    event.stopPropagation();

    const response = await downloadPdf(quizId);

    const contentDisposition = response.headers["content-disposition"];
    const fileName =
      contentDisposition?.match(/filename="?([^"]+)"?/)?.[1] || "quiz.pdf";

    saveAs(response.data, fileName);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    // Changed root wrapper to flex column so the glass grid can expand to fill the remaining height
    <div className="flex h-full flex-col">
      <header className="mb-8 mt-4 flex h-fit shrink-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
        <GlassScrollableGrid onScroll={handleScroll}>
          {quizzes.map((quiz) => (
            <li key={quiz._id} className="h-full">
              <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <QuizCardContent
                  quiz={quiz}
                  onSelect={handleQuizSelect}
                  onEdit={handleEditQuiz}
                  onDownload={handleDownloadPdf}
                />
              </Card>
            </li>
          ))}
        </GlassScrollableGrid>
      ) : (
        <div className="flex-1">
          <EmptyState
            title="No quizzes found"
            description="There are no quizzes matching your search."
          />
        </div>
      )}

      <OptionBox
        isOpen={selectedQuiz !== null}
        onClose={handleQuizOptionClose}
        eyebrow="QUIZ MODE"
        title="Select quiz type"
        description="Choose how you want to take this quiz."
        options={[
          {
            label: "Multiple choices",
            value: "multiple_choice",
          },
          {
            label: "Enumeration",
            value: "enumeration",
          },
        ]}
        onSelect={(quizType) => {
          handleStartQuiz(selectedQuiz, quizType, false);
        }}
      />
    </div>
  );
};

export default QuizzesPage;
