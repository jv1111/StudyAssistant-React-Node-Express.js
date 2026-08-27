import { useState } from "react";
import { useNavigate } from "react-router-dom";

import QuizEditor from "../../components/quiz/QuizEditor";
import { previewQuiz } from "../../api/quiz.api";
import useSavedDataFetcher from "../../hooks/useSavedDataFetcher";
import autoSave from "../../helper/autoSave";
import Badge from "../../components/common/Badge";
import AppHeaderContent from "../../components/common/AppHeaderContent";

const DEFAULT_ITEM = {
  question: "",
  answer: "",
  generationMethod: "random",
  choices: ["", "", "", ""],
};

const INITIAL_ITEMS = [
  { ...DEFAULT_ITEM },
  { ...DEFAULT_ITEM },
  { ...DEFAULT_ITEM },
  { ...DEFAULT_ITEM },
];

const CreateQuizPage = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [subject, setSubject] = useState("");
  const [quizName, setQuizName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useSavedDataFetcher("createQuiz", setItems, setSubject, setQuizName);

  const saveData = (data) => {
    autoSave("createQuiz", data);
  };

  const addQuestion = () => {
    const newItems = [...items, { ...DEFAULT_ITEM }];

    setItems(newItems);
    saveData({ items: newItems, subject, quizName });
  };

  const deleteQuestion = (index) => {
    const newItems = items.filter((_, itemIndex) => itemIndex !== index);

    setItems(newItems);
    saveData({ items: newItems, subject, quizName });
  };

  const handleItemChange = (event, index) => {
    const { name, value } = event.target;
    const newItems = items.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [name]: value } : item,
    );

    setItems(newItems);
    saveData({ items: newItems, subject, quizName });
  };

  const handleChoiceChange = (choiceValue, choiceIndex, questionIndex) => {
    const newItems = items.map((item, itemIndex) => {
      if (itemIndex !== questionIndex) return item;

      const currentChoices = item.choices || ["", "", "", ""];
      const updatedChoices = [...currentChoices];
      updatedChoices[choiceIndex] = choiceValue;

      return { ...item, choices: updatedChoices };
    });

    setItems(newItems);
    saveData({ items: newItems, subject, quizName });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      console.log("Preview payload:", {
        subject,
        quizName,
        items,
      });

      const response = await previewQuiz(subject, quizName, items);

      if (response.error) {
        alert(response.error);
        return;
      }

      navigate("/quiz/create/preview", {
        state: response,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        onSubjectChange={(event) => {
          const value = event.target.value;

          setSubject(value);
          saveData({ items, subject: value, quizName });
        }}
        onQuizNameChange={(event) => {
          const value = event.target.value;

          setQuizName(value);
          saveData({ items, subject, quizName: value });
        }}
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
