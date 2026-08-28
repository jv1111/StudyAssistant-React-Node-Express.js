import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import QuizEditor from "../../components/quiz/QuizEditor";
import { updateQuiz } from "../../api/quiz.api";
import useCreateQuizDraft from "../../hooks/useCreateQuizDraft";
import AppHeaderContent from "../../components/common/AppHeaderContent";

const UpdateQuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    subject,
    setSubject,
    quizName,
    setQuizName,
    items,
    isLoadingDraft,
    addQuestion,
    deleteQuestion,
    handleItemChange,
    handleChoiceChange,
    saveCurrentDraft,
  } = useCreateQuizDraft(quizId);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await updateQuiz(quizId, subject, quizName, items);

      if (response.error) {
        alert(response.error);
        return;
      }

      await saveCurrentDraft(items);

      navigate(`/quiz/${subject}`);
    } catch (error) {
      console.error("Failed to update quiz:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingDraft) {
    return (
      <div className="flex min-h-64 items-center justify-center text-sm text-muted">
        Loading quiz draft...
      </div>
    );
  }

  return (
    <>
      <header className="mb-8 flex h-fit flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <AppHeaderContent
          eyebrow="Quiz Builder"
          title="Update Quiz"
          description="Update the quiz details and modify its questions."
        />
      </header>

      <QuizEditor
        subject={subject}
        quizName={quizName}
        items={items}
        onSubjectChange={(event) => setSubject(event.target.value)}
        onQuizNameChange={(event) => setQuizName(event.target.value)}
        onItemChange={handleItemChange}
        onChoiceChange={handleChoiceChange}
        onDeleteQuestion={deleteQuestion}
        onAddQuestion={addQuestion}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Update Quiz"
        quizInfoDescription="Update the basic details for your quiz."
        questionsDescription="Modify questions and update their correct answers."
      />
    </>
  );
};

export default UpdateQuizPage;
