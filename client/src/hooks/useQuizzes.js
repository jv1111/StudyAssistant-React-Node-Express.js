import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import useDebounce from "./useDebounce";
import useItemFetcher from "./useItemFetcher";

import { getQuizzes } from "../api/quiz.api";

import infinitScroller from "../helper/infinitScroller";

const useQuizzes = () => {
  const { subject } = useParams();

  const [quizzes, setQuizzes] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchVal = useDebounce(searchInput, 400);

  const queryParams = useMemo(() => ({ subject }), [subject]);

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

  return {
    quizzes,
    isLoading,
    searchInput,
    handleSearch,
    handleScroll,
  };
};

export default useQuizzes;
