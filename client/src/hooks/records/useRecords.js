import { useCallback, useEffect, useMemo, useState } from "react";

import useDebounce from "../common/useDebounce";
import useItemFetcher from "../data/useItemFetcher";
import useDeferredLoading from "../common/useDeferredLoading";

import { getRecordsBySubject } from "../../api/quiz/quizRecord.api";

import infinitScroller from "../../helper/infinitScroller";

const useRecords = (subjectId) => {
  const [records, setRecords] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchVal = useDebounce(searchInput, 400);

  // Keep the query object stable between renders.
  const queryParams = useMemo(
    () => ({
      subjectId,
    }),
    [subjectId],
  );

  // Prevent the API request when no subject is selected.
  const getRecordsData = useCallback(({ subjectId, searchVal, skipCount }) => {
    if (!subjectId) {
      return [];
    }

    return getRecordsBySubject(subjectId, searchVal, skipCount);
  }, []);

  const { isLoading, setSkipCount } = useItemFetcher(
    setRecords,
    searchVal,
    getRecordsData,
    queryParams,
  );

  // Clear previous records when switching subjects.
  useEffect(() => {
    setRecords([]);
    setSkipCount(0);
  }, [subjectId, setSkipCount]);

  const showLoading = useDeferredLoading(Boolean(subjectId) && isLoading, 200);

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
