import { useState } from "react";
import { useNavigate } from "react-router-dom";

import QuizEditor from "../../components/quiz/QuizEditor";
import { previewQuiz } from "../../api/quiz.api";
import useQuizDraft from "../../hooks/useQuizDraft";
import AppHeaderContent from "../../components/common/AppHeaderContent";

const CreateQuizPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

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
  } = useQuizDraft();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await previewQuiz(subject, quizName, items);

      await saveCurrentDraft(response.items);

      navigate("/quiz/create/preview");
    } catch (error) {
      console.error("Failed to preview quiz:", error);
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
          title="Create New Quiz"
          description="Design your quiz by specifying a subject, providing a title, and adding your question set with flexible distractor generation."
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
        submitLabel="Preview Quiz"
        quizInfoDescription="Set up basic subject and title information."
        questionsDescription="Input question prompts, target answers, and distractor generation methods."
      />
    </>
  );
};

export default CreateQuizPage;
