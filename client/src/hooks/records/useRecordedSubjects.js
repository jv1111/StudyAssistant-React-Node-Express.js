import { useCallback, useState } from "react";

import useDebounce from "../common/useDebounce";
import useItemFetcher from "../data/useItemFetcher";

import { getRecordedSubjects } from "../../api/quiz/quizRecord.api";

import infinitScroller from "../../helper/infinitScroller";

const useRecordedSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchVal = useDebounce(searchInput, 400);

  const getRecordedSubjectsData = useCallback(({ searchVal, skipCount }) => {
    return getRecordedSubjects(searchVal, skipCount);
  }, []);

  const { isLoading, isFetchingMore, setSkipCount } = useItemFetcher(
    setSubjects,
    searchVal,
    getRecordedSubjectsData,
  );

  const handleSearch = useCallback((event) => {
    setSearchInput(event.target.value);
  }, []);

  const handleScroll = useCallback(
    (event) => {
      if (isFetchingMore) {
        return;
      }

      infinitScroller(event, subjects, setSkipCount);
    },
    [isFetchingMore, subjects, setSkipCount],
  );

  return {
    subjects,
    isLoading,
    isFetchingFromScrollingDown: isFetchingMore,
    searchInput,
    handleSearch,
    handleScroll,
  };
};

export default useRecordedSubjects;
