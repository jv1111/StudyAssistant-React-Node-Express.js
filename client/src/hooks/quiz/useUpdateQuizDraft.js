import { useEffect, useRef, useState } from "react";

import {
  getUpdateQuizDraft,
  saveUpdateQuizDraft,
  deleteUpdateQuizDraft,
} from "../../api/quiz/quizDraft.api";

import { getQuizById } from "../../api/quiz/quiz.api";

const useUpdateQuizDraft = (quizId) => {
  const [subjectId, setSubjectId] = useState("");
  const [items, setItems] = useState([]);
  const [subject, setSubject] = useState("");
  const [quizName, setQuizName] = useState("");
  const [isLoadingDraft, setIsLoadingDraft] = useState(true);
  const [hasDraft, setHasDraft] = useState(false);

  const isFirstSave = useRef(true);
  const autosaveTimeout = useRef(null);
  const isDirty = useRef(false);

  const loadQuiz = async () => {
    const quiz = await getQuizById(quizId);
    setSubjectId(quiz.subjectId?._id || quiz.subjectId || "");
    setSubject(quiz.subject || quiz.subjectId?.name || "");
    setQuizName(quiz.quizName || "");
    setItems(quiz.items || []);

    isDirty.current = false;
    isFirstSave.current = true;
  };

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const draft = await getUpdateQuizDraft(quizId);

        if (draft) {
          setHasDraft(true);

          setSubject(draft.subject || "");
          setQuizName(draft.quizName || "");

          if (draft.items?.length) {
            setItems(draft.items);
          }

          return;
        }

        await loadQuiz();
      } catch (error) {
        console.error("Failed to load update quiz:", error);
      } finally {
        setIsLoadingDraft(false);
      }
    };

    loadQuizData();
  }, [quizId]);

  useEffect(() => {
    if (isLoadingDraft) {
      return;
    }

    if (isFirstSave.current) {
      isFirstSave.current = false;
      return;
    }

    if (!isDirty.current) {
      return;
    }

    if (autosaveTimeout.current) {
      clearTimeout(autosaveTimeout.current);
    }

    autosaveTimeout.current = setTimeout(async () => {
      try {
        await saveUpdateQuizDraft(quizId, subject, quizName, items);

        isDirty.current = false;
      } catch (error) {
        console.error("Failed to save update quiz draft:", error);
      }
    }, 1000);

    return () => {
      if (autosaveTimeout.current) {
        clearTimeout(autosaveTimeout.current);
      }
    };
  }, [quizId, subject, quizName, items, isLoadingDraft]);

  const handleSubjectChange = (value) => {
    isDirty.current = true;
    setSubject(value);
  };

  const handleQuizNameChange = (value) => {
    isDirty.current = true;
    setQuizName(value);
  };

  const addQuestion = () => {
    isDirty.current = true;

    setItems((currentItems) => [
      ...currentItems,
      {
        question: "",
        answer: "",
        generationMethod: "ai",
        choices: ["", "", "", ""],
      },
    ]);
  };

  const deleteQuestion = (index) => {
    isDirty.current = true;

    setItems((currentItems) =>
      currentItems.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const handleItemChange = (event, index) => {
    const { name, value } = event.target;

    isDirty.current = true;

    setItems((currentItems) =>
      currentItems.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [name]: value,
            }
          : item,
      ),
    );
  };

  const handleChoiceChange = (choiceValue, choiceIndex, questionIndex) => {
    isDirty.current = true;

    setItems((currentItems) =>
      currentItems.map((item, index) =>
        index === questionIndex
          ? {
              ...item,
              choices: item.choices.map((choice, index) =>
                index === choiceIndex ? choiceValue : choice,
              ),
            }
          : item,
      ),
    );
  };

  const updateItem = (index, updatedItem) => {
    isDirty.current = true;

    setItems((currentItems) =>
      currentItems.map((item, itemIndex) =>
        itemIndex === index ? updatedItem : item,
      ),
    );
  };

  const clearDraft = async () => {
    try {
      if (autosaveTimeout.current) {
        clearTimeout(autosaveTimeout.current);
        autosaveTimeout.current = null;
      }

      await deleteUpdateQuizDraft(quizId);

      setHasDraft(false);
      isDirty.current = false;
    } catch (error) {
      console.error("Failed to delete update quiz draft:", error);
      throw error;
    }
  };

  const reloadQuiz = async () => {
    try {
      if (autosaveTimeout.current) {
        clearTimeout(autosaveTimeout.current);
        autosaveTimeout.current = null;
      }

      await loadQuiz();
      setHasDraft(false);
    } catch (error) {
      console.error("Failed to reload quiz:", error);
      throw error;
    }
  };

  return {
    subject,
    subjectId,
    setSubject: handleSubjectChange,
    quizName,
    setQuizName: handleQuizNameChange,
    items,
    isLoadingDraft,
    hasDraft,
    addQuestion,
    deleteQuestion,
    updateItem,
    handleItemChange,
    handleChoiceChange,
    clearDraft,
    reloadQuiz,
  };
};

export default useUpdateQuizDraft;
