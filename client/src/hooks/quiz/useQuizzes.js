import { useCallback, useEffect, useMemo, useState } from "react";

import useDebounce from "../common/useDebounce";
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
  const [loadedSubjectId, setLoadedSubjectId] = useState(null);

  const searchVal = useDebounce(searchInput, 400);

  const queryParams = useMemo(() => ({ subjectId }), [subjectId]);

  const getQuizzesData = useCallback(({ subjectId, searchVal, skipCount }) => {
    if (!subjectId) {
      return [];
    }

    return getQuizzes(subjectId, searchVal, skipCount);
  }, []);

  const { isLoading, isFetchingMore, setSkipCount } = useItemFetcher(
    setQuizzes,
    searchVal,
    getQuizzesData,
    queryParams,
  );

  useEffect(() => {
    setLoadedSubjectId(null);
  }, [subjectId]);

  useEffect(() => {
    if (!isLoading && subjectId) {
      setLoadedSubjectId(subjectId);
    }
  }, [isLoading, subjectId]);

  const handleSearch = useCallback((event) => {
    setSearchInput(event.target.value);
  }, []);

  const handleScroll = useCallback(
    (event) => {
      if (isFetchingMore) {
        return;
      }

      infinitScroller(event, quizzes, setSkipCount);
    },
    [isFetchingMore, quizzes, setSkipCount],
  );

  const handleStartQuiz = useCallback(
    async (quizId, quizType, randomizeQuestions) => {
      return startQuiz(quizId, quizType, randomizeQuestions);
    },
    [],
  );

  const handleDeleteQuiz = useCallback(async (quizId) => {
    await deleteQuiz(quizId);

    setQuizzes((currentQuizzes) =>
      currentQuizzes.filter((quiz) => quiz._id !== quizId),
    );
  }, []);

  const handleDeleteAllQuizzes = useCallback(async () => {
    if (!subjectId) {
      return;
    }

    await deleteAllQuizzes(subjectId);

    setQuizzes([]);
  }, [subjectId]);

  const isSubjectLoading = Boolean(subjectId) && loadedSubjectId !== subjectId;

  return {
    quizzes,
    isLoading: isLoading || isSubjectLoading,
    isFetchingFromScrollingDown: isFetchingMore,
    searchInput,
    handleSearch,
    handleScroll,
    handleStartQuiz,
    handleDeleteQuiz,
    handleDeleteAllQuizzes,
  };
};

export default useQuizzes;
