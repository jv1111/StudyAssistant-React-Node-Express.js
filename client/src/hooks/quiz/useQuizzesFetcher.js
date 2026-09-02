import { useEffect, useState } from "react";
import { getQuizzes } from "../../api/quiz/quiz.api";

const useQuizzesFetcher = (
  subject,
  searchVal,
  skipCount,
  quizzes,
  setQuizzes,
) => {
  const [isLoading, setLoading] = useState(true);
  const [prevSkipCount, setPrevSkipCount] = useState(0);

  const appendNewSetOfData = (
    quizzes,
    setQuizzes,
    response,
    setPrevSkipCount,
  ) => {
    setQuizzes([...quizzes, ...response]);
    setPrevSkipCount(skipCount);
  };

  useEffect(() => {
    const getItems = async () => {
      const response = await getQuizzes(subject, searchVal, skipCount);
      if (skipCount !== prevSkipCount)
        appendNewSetOfData(quizzes, setQuizzes, response, setPrevSkipCount); //append new data if scrolled
      if (skipCount === prevSkipCount) setQuizzes(response); //set new set of data
      setLoading(false);
    };
    getItems();
  }, [searchVal, skipCount]);

  return { isLoading };
};

export default useQuizzesFetcher;
