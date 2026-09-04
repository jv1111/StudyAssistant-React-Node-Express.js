import { useCallback, useState } from "react";

import useDebounce from "../common/useDebounce";
import useItemFetcher from "../data/useItemFetcher";
import useDeferredLoading from "../common/useDeferredLoading";

import { getRecordedSubjects } from "../../api/quiz/quizRecord.api";

import infinitScroller from "../../helper/infinitScroller";

const useRecordedSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchVal = useDebounce(searchInput, 400);

  const getRecordedSubjectsData = useCallback(
    ({ searchVal, skipCount }) => getRecordedSubjects(searchVal, skipCount),
    [],
  );

  const { isLoading, setSkipCount } = useItemFetcher(
    setSubjects,
    searchVal,
    getRecordedSubjectsData,
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

export default useRecordedSubjects;
