import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useDebounce from "./useDebounce";
import useItemFetcher from "./useItemFetcher";

import { getQuizzes } from "../api/quiz.api";
import { startQuiz } from "../api/quizSession.api";

import infinitScroller from "../helper/infinitScroller";

const useQuizzes = () => {
  const { subjectId } = useParams();
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

    navigate(`/quiz/session/${response.sessionId}`);
  };

  return {
    quizzes,
    isLoading,
    searchInput,
    handleSearch,
    handleScroll,
    handleStartQuiz,
  };
};

export default useQuizzes;
