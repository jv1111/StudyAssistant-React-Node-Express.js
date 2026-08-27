import { useState } from "react";
import { useNavigate } from "react-router-dom";

import QuizEditor from "../../components/quiz/QuizEditor";
import { previewQuiz } from "../../api/quiz.api";
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

  const addQuestion = () => {
    setItems((currentItems) => [...currentItems, { ...DEFAULT_ITEM }]);
  };

  const deleteQuestion = (index) => {
    setItems((currentItems) =>
      currentItems.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const handleItemChange = (event, index) => {
    const { name, value } = event.target;

    setItems((currentItems) =>
      currentItems.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [name]: value } : item,
      ),
    );
  };

  const handleChoiceChange = (choiceValue, choiceIndex, questionIndex) => {
    setItems((currentItems) =>
      currentItems.map((item, itemIndex) => {
        if (itemIndex !== questionIndex) return item;

        const choices = [...item.choices];
        choices[choiceIndex] = choiceValue;

        return {
          ...item,
          choices,
        };
      }),
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await previewQuiz(subject, quizName, items);

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
