import { useEffect, useRef, useState } from "react";

import {
  getCreateQuizDraft,
  saveCreateQuizDraft,
  deleteCreateQuizDraft,
} from "../../api/quiz/quizDraft.api";

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

const useCreateQuizDraft = (initialIsPreview = false) => {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [subject, setSubject] = useState("");
  const [quizName, setQuizName] = useState("");
  const [isPreview, setIsPreview] = useState(initialIsPreview);
  const [isLoadingDraft, setIsLoadingDraft] = useState(true);
  const [hasDraft, setHasDraft] = useState(false);

  const isFirstSave = useRef(true);
  const autosaveTimeout = useRef(null);
  const isDirty = useRef(false);

  // Load saved create quiz draft when entering the page
  useEffect(() => {
    const loadDraft = async () => {
      try {
        const draft = await getCreateQuizDraft();

        if (!draft) {
          return;
        }

        setHasDraft(true);

        setIsPreview(draft.isPreview === true);
        setSubject(draft.subject || "");
        setQuizName(draft.quizName || "");

        if (draft.items?.length) {
          setItems(draft.items);
        }
      } catch (error) {
        console.error("Failed to load create quiz draft:", error);
      } finally {
        setIsLoadingDraft(false);
      }
    };

    loadDraft();
  }, []);

  // Autosave only after the user actually changes something
  useEffect(() => {
    if (isLoadingDraft) return;

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
        await saveCreateQuizDraft(isPreview, subject, quizName, items);

        isDirty.current = false;
      } catch (error) {
        console.error("Failed to save create quiz draft:", error);
      }
    }, 1000);

    return () => {
      if (autosaveTimeout.current) {
        clearTimeout(autosaveTimeout.current);
      }
    };
  }, [isPreview, subject, quizName, items, isLoadingDraft]);

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
        ...DEFAULT_ITEM,
        choices: [...DEFAULT_ITEM.choices],
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

  const clearDraft = async () => {
    try {
      await deleteCreateQuizDraft();

      setHasDraft(false);
      isDirty.current = false;
    } catch (error) {
      console.error("Failed to delete create quiz draft:", error);
      throw error;
    }
  };

  const updateItem = (index, updatedItem) => {
    isDirty.current = true;

    setItems((currentItems) =>
      currentItems.map((item, itemIndex) =>
        itemIndex === index ? updatedItem : item,
      ),
    );
  };

  const switchAIToRandom = () => {
    isDirty.current = true;

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.generationMethod === "ai"
          ? {
              ...item,
              generationMethod: "random",
            }
          : item,
      ),
    );
  };

  const saveCurrentDraft = async (
    updatedItems = items,
    preview = isPreview,
  ) => {
    try {
      await saveCreateQuizDraft(preview, subject, quizName, updatedItems);

      setIsPreview(preview);

      // The current state has now been explicitly saved.
      isDirty.current = false;
    } catch (error) {
      console.error("Failed to save create quiz draft:", error);
      throw error;
    }
  };

  const resetDraft = () => {
    if (autosaveTimeout.current) {
      clearTimeout(autosaveTimeout.current);
      autosaveTimeout.current = null;
    }

    // Reset everything without marking the form as changed.
    isDirty.current = false;

    setItems(
      INITIAL_ITEMS.map((item) => ({
        ...item,
        choices: [...item.choices],
      })),
    );

    setSubject("");
    setQuizName("");
    setIsPreview(initialIsPreview);
    setHasDraft(false);
  };

  return {
    isPreview,
    subject,
    setSubject: handleSubjectChange,
    quizName,
    setQuizName: handleQuizNameChange,
    items,
    isLoadingDraft,
    hasDraft,
    addQuestion,
    deleteQuestion,
    updateItem,
    switchAIToRandom,
    handleItemChange,
    handleChoiceChange,
    saveCurrentDraft,
    clearDraft,
    resetDraft,
  };
};

export default useCreateQuizDraft;
