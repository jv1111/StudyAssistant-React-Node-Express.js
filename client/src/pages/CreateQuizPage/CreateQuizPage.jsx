import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import { createQuiz, deleteSavedData } from "../../api/quiz.api";
import useSavedDataFetcher from "../../hooks/useSavedDataFetcher";
import autoSave from "../../helper/autoSave";
import QuizEditor from "../../components/quiz/QuizEditor";

const CreateQuizPage = () => {
  const [items, setItems] = useState(onLoad_items);
  const [subject, setSubject] = useState("");
  const [quizName, setQuizName] = useState("");

  const navigate = useNavigate();

  useSavedDataFetcher("createQuiz", setItems, setSubject, setQuizName);

  const saveData = (data) => {
    autoSave("createQuiz", data);
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

    const response = await createQuiz(subject, quizName, items);

    if (response.error) {
      alert(response.error);
      return;
    }

    await deleteSavedData("createQuiz");
    navigate("/");
  };

  return (
    <main className="mx-auto w-full max-w-(--content-max-width) px-(--page-padding) py-10">
      <header className="mb-8">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">
          Quiz Builder
        </span>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          Create Quiz
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Create a quiz by providing the basic information and adding questions.
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
        submitLabel="Create Quiz"
        quizInfoDescription="Provide the basic details for your quiz."
        questionsDescription="Add questions and provide the correct answers."
      />
    </main>
  );
};

const MIN_QUESTIONS = 4;

const onLoad_items = [
  {
    question: "",
    answer: "",
  },
  {
    question: "",
    answer: "",
  },
  {
    question: "",
    answer: "",
  },
  {
    question: "",
    answer: "",
  },
];

export default CreateQuizPage;
