import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchVal = useDebounce(searchInput, 400);

  const queryParams = useMemo(() => ({ subjectId }), [subjectId]);

  const { isLoading, setSkipCount } = useItemFetcher(
    setQuizzes,
    searchVal,
    getQuizzes,
    queryParams,
  );

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleScroll = (event) => {
    infinitScroller(event, quizzes, setSkipCount);
  };

  const handleStartQuiz = async (quizId, quizType, randomizeQuestions) => {
    const response = await startQuiz(quizId, quizType, randomizeQuestions);

    const sessionPath = `/quiz/session/${quizType}/${response.sessionId}`;

    navigate(sessionPath);
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
    isLoading,
    searchInput,
    handleSearch,
    handleScroll,
    handleStartQuiz,
    handleDeleteQuiz,
    handleDeleteAllQuizzes,
  };
};

export default useQuizzes;
