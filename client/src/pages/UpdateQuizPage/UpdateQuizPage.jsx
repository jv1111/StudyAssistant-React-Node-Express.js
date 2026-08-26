import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { deleteSavedData, updateQuiz } from "../../api/quiz.api";
import autoSave from "../../helper/autoSave";
import useItemsLoader from "../../hooks/useItemsLoader";
import useSavedDataFetcher from "../../hooks/useSavedDataFetcher";
import QuizEditor from "../../components/quiz/QuizEditor";

const UpdateQuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [quizName, setQuizName] = useState("");
  const [items, setItems] = useState([]);

  useItemsLoader(quizId, setSubject, setQuizName, setItems);

  useSavedDataFetcher("updateQuiz", setItems, setSubject, setQuizName, quizId);

  const saveData = (data) => {
    autoSave("updateQuiz", data, quizId);
  };

  const addQuestion = () => {
    const newItems = [
      ...items,
      {
        question: "",
        answer: "",
      },
    ];

    setItems(newItems);

    saveData({
      items: newItems,
      subject,
      quizName,
    });
  };

  const deleteQuestion = (index) => {
    const newItems = items.filter((_, itemIndex) => itemIndex !== index);

    setItems(newItems);

    saveData({
      items: newItems,
      subject,
      quizName,
    });
  };

  const itemOnChangeHandler = (event, index) => {
    const newItems = items.map((item, itemIndex) =>
      itemIndex === index
        ? {
            ...item,
            [event.target.name]: event.target.value,
          }
        : item,
    );

    setItems(newItems);

    saveData({
      items: newItems,
      subject,
      quizName,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await updateQuiz(quizId, subject, quizName, items);

    if (response.error) {
      alert(response.error);
      return;
    }

    await deleteSavedData("updateQuiz", quizId);

    navigate(`/quiz/${subject}`);
  };

  return (
    <main className="mx-auto w-full max-w-(--content-max-width) px-(--page-padding) py-10">
      <header className="mb-8">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">
          Quiz Builder
        </span>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          Update Quiz
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Update the quiz details and modify its questions.
        </p>
      </header>

      <QuizEditor
        subject={subject}
        quizName={quizName}
        items={items}
        onSubjectChange={(event) => {
          const value = event.target.value;

          setSubject(value);

          saveData({
            items,
            subject: value,
            quizName,
          });
        }}
        onQuizNameChange={(event) => {
          const value = event.target.value;

          setQuizName(value);

          saveData({
            items,
            subject,
            quizName: value,
          });
        }}
        onItemChange={itemOnChangeHandler}
        onDeleteQuestion={deleteQuestion}
        onAddQuestion={addQuestion}
        onSubmit={submitHandler}
        submitLabel="Update Quiz"
        quizInfoDescription="Update the basic details for your quiz."
        questionsDescription="Modify questions and update their correct answers."
      />
    </main>
  );
};

export default UpdateQuizPage;
