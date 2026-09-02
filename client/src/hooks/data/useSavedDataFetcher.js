import { useEffect } from "react";
import { getSavedData } from "../../api/quiz/quiz.api";

const useSavedDataFetcher = (
  key,
  setItems,
  setSubject,
  setQuizName,
  quizId,
) => {
  useEffect(() => {
    const dataFetcher = async () => {
      const savedData = await getSavedData(key, quizId); //todo add quiz id to params for validation
      if (savedData) {
        const { items, subject, quizName } = savedData.data;
        setItems(items);
        setSubject(subject);
        setQuizName(quizName);
      }
    };
    dataFetcher();
  }, [key, quizId, setItems, setQuizName, setSubject]);
};

export default useSavedDataFetcher;
