import { useEffect, useRef, useState } from "react";

import { getDraft, saveDraft, deleteDraft } from "../api/quizDraft.api";

const DEFAULT_ITEM = {
  question: "",
  answer: "",
  generationMethod: "random",
  choices: ["", "", "", ""],
};

const INITIAL_ITEMS = Array.from({ length: 4 }, () => ({
  ...DEFAULT_ITEM,
  choices: [...DEFAULT_ITEM.choices],
}));

const useQuizDraft = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [subject, setSubject] = useState("");
  const [quizName, setQuizName] = useState("");
  const [isLoadingDraft, setIsLoadingDraft] = useState(true);

  const isFirstSave = useRef(true);

  // Load saved draft when entering the page
  useEffect(() => {
    const loadDraft = async () => {
      try {
        const draft = await getDraft();

        if (!draft) return;

        setSubject(draft.subject || "");
        setQuizName(draft.quizName || "");

        if (draft.items?.length) {
          setItems(draft.items);
        }
      } catch (error) {
        console.error("Failed to load quiz draft:", error);
      } finally {
        setIsLoadingDraft(false);
      }
    };

    loadDraft();
  }, []);

  // Autosave draft after changes
  useEffect(() => {
    if (isLoadingDraft) return;

    if (isFirstSave.current) {
      isFirstSave.current = false;
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        await saveDraft(subject, quizName, items);
      } catch (error) {
        console.error("Failed to save quiz draft:", error);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [subject, quizName, items, isLoadingDraft]);

  const addQuestion = () => {
    setItems((currentItems) => [
      ...currentItems,
      {
        ...DEFAULT_ITEM,
        choices: [...DEFAULT_ITEM.choices],
      },
    ]);
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

  const clearDraft = async () => {
    try {
      await deleteDraft();
    } catch (error) {
      console.error("Failed to delete quiz draft:", error);
      throw error;
    }
  };

  return {
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
    clearDraft,
  };
};

export default useQuizDraft;
