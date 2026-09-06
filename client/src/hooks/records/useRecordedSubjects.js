import { useCallback, useEffect, useState } from "react";

import useDebounce from "../common/useDebounce";
import useItemFetcher from "../data/useItemFetcher";

import { getRecordedSubjects } from "../../api/quiz/quizRecord.api";

import infinitScroller from "../../helper/infinitScroller";

const useRecordedSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const searchVal = useDebounce(searchInput, 400);

  const getRecordedSubjectsData = useCallback(
    ({ searchVal, skipCount }) => getRecordedSubjects(searchVal, skipCount),
    [],
  );

  const { isLoading: isFetching, setSkipCount } = useItemFetcher(
    setSubjects,
    searchVal,
    getRecordedSubjectsData,
  );

  useEffect(() => {
    if (isFetching) {
      setIsLoading(true);
      return;
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, [isFetching]);

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

export default useRecordedSubjects;
