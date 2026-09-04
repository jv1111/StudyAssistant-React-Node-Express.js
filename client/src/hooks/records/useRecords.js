import { useState } from "react";

import useDebounce from "../common/useDebounce";
import useItemFetcher from "../data/useItemFetcher";
import useDeferredLoading from "../common/useDeferredLoading";

import {
  getRecordedSubjects,
  getRecordsBySubject,
} from "../../api/quiz/quizRecord.api";

import infinitScroller from "../../helper/infinitScroller";

const useRecords = (subjectId = null) => {
  const [records, setRecords] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchVal = useDebounce(searchInput, 400);

  const fetchRecords = subjectId ? getRecordsBySubject : getRecordedSubjects;

  const { isLoading, setSkipCount } = useItemFetcher(
    setRecords,
    searchVal,
    fetchRecords,
    subjectId,
  );

  const showLoading = useDeferredLoading(isLoading, 200);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleScroll = (event) => {
    infinitScroller(event, records, setSkipCount);
  };

  return {
    records,
    isLoading: showLoading,
    searchInput,
    handleSearch,
    handleScroll,
  };
};

export default useRecords;
