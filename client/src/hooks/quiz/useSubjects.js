import { useState } from "react";

import useDebounce from "../common/useDebounce";
import useItemFetcher from "../data/useItemFetcher";
import useDeferredLoading from "../common/useDeferredLoading"; // Import hook

import { getSubjects } from "../../api/quiz/quiz.api";
import infinitScroller from "../../helper/infinitScroller";

const useSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchVal = useDebounce(searchInput, 400);

  const { isLoading, setSkipCount } = useItemFetcher(
    setSubjects,
    searchVal,
    getSubjects,
  );

  const showLoading = useDeferredLoading(isLoading, 200);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleScroll = (event) => {
    infinitScroller(event, subjects, setSkipCount);
  };

  return {
    subjects,
    isLoading: showLoading,
    searchInput,
    handleSearch,
    handleScroll,
  };
};

export default useSubjects;
