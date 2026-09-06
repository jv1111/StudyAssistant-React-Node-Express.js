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
  const [isFetchingFromScrollingDown, setIsFetchingFromScrollingDown] =
    useState(false);
  const [loadedSubjectId, setLoadedSubjectId] = useState(null);

  const searchVal = useDebounce(searchInput, 400);

  const queryParams = useMemo(() => ({ subjectId }), [subjectId]);

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

  useEffect(() => {
    setQuizzes([]);
    setSkipCount(0);
    setIsFetchingFromScrollingDown(false);
    setLoadedSubjectId(null);
  }, [subjectId, searchVal, setSkipCount]);

  useEffect(() => {
    if (!isLoading && subjectId) {
      setLoadedSubjectId(subjectId);
    }
  }, [isLoading, subjectId]);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleScroll = (event) => {
    const isScrollingDown = infinitScroller(event, quizzes, setSkipCount);

    if (isScrollingDown) {
      setIsFetchingFromScrollingDown(true);
    }
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

  const isSubjectLoading = subjectId && loadedSubjectId !== subjectId;

  return {
    quizzes,
    isLoading: isLoading || isSubjectLoading,
    isFetchingFromScrollingDown,
    searchInput,
    handleSearch,
    handleScroll,
    handleStartQuiz,
    handleDeleteQuiz,
    handleDeleteAllQuizzes,
  };
};

export default useQuizzes;
