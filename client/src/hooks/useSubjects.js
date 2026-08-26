import { useState } from "react";

import useDebounce from "./useDebounce";
import useItemFetcher from "./useItemFetcher";

import { getSubjects } from "../api/quiz.api";

import infinitScroller from "../helper/infinitScroller";

const useSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchVal = useDebounce(searchInput, 400);

  const { isLoading, setSkipCount } = useItemFetcher(
    setSubjects,
    searchVal,
    getSubjects,
  );

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleScroll = (event) => {
    infinitScroller(event, subjects, setSkipCount);
  };

  return {
    subjects,
    isLoading,
    searchInput,
    handleSearch,
    handleScroll,
  };
};

export default useSubjects;
