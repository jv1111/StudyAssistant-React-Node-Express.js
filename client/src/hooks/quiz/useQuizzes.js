import { useCallback, useEffect, useMemo, useState } from "react";

import useDebounce from "../common/useDebounce";
import useDeferredLoading from "../common/useDeferredLoading";
import useItemFetcher from "../data/useItemFetcher";

import {
  getQuizzes,
  deleteQuiz,
  deleteAllQuizzes,
} from "../../api/quiz/quiz.api";
import { startQuiz } from "../../api/quiz/quizSession.api";

import infinitScroller from "../../helper/infinitScroller";

const useQuizzes = (subjectId) => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchVal = useDebounce(searchInput, 400);

  const queryParams = useMemo(() => ({ subjectId }), [subjectId]);

  // Prevent fetching quizzes until a subject is selected.
  const getQuizzesData = useCallback(({ subjectId, searchVal, skipCount }) => {
    if (!subjectId) {
      return [];
    }

    return getQuizzes(subjectId, searchVal, skipCount);
  }, []);

  const { isLoading, setSkipCount } = useItemFetcher(
    setQuizzes,
    searchVal,
    getQuizzesData,
    queryParams,
  );

  const showLoading = useDeferredLoading(isLoading);

  // Reset the quiz list when changing subjects.
  useEffect(() => {
    setQuizzes([]);
    setSkipCount(0);
  }, [subjectId, setSkipCount]);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleScroll = (event) => {
    infinitScroller(event, quizzes, setSkipCount);
  };

  const handleStartQuiz = async (quizId, quizType, randomizeQuestions) => {
    return startQuiz(quizId, quizType, randomizeQuestions);
  };

  const handleDeleteQuiz = async (quizId) => {
    await deleteQuiz(quizId);

    setQuizzes((currentQuizzes) =>
      currentQuizzes.filter((quiz) => quiz._id !== quizId),
    );
  };

  const handleDeleteAllQuizzes = async () => {
    if (!subjectId) {
      return;
    }

    await deleteAllQuizzes(subjectId);

    setQuizzes([]);
  };

  return {
    quizzes,
    isLoading: showLoading,
    searchInput,
    handleSearch,
    handleScroll,
    handleStartQuiz,
    handleDeleteQuiz,
    handleDeleteAllQuizzes,
  };
};

export default useQuizzes;
