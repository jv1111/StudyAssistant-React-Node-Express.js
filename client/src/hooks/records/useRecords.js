import { useCallback, useEffect, useMemo, useState } from "react";

import useDebounce from "../common/useDebounce";
import useItemFetcher from "../data/useItemFetcher";

import { getRecordsBySubject } from "../../api/quiz/quizRecord.api";

import infinitScroller from "../../helper/infinitScroller";

const useRecords = (subjectId) => {
  const [records, setRecords] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loadedSubjectId, setLoadedSubjectId] = useState(null);

  const searchVal = useDebounce(searchInput, 400);

  const queryParams = useMemo(() => ({ subjectId }), [subjectId]);

  const getRecordsData = useCallback(
    ({ searchVal, skipCount }) => {
      if (!subjectId) {
        return {
          items: [],
          hasMore: false,
        };
      }

      return getRecordsBySubject(subjectId, searchVal, skipCount);
    },
    [subjectId],
  );

  const { isLoading, isFetchingMore, setSkipCount } = useItemFetcher(
    setRecords,
    searchVal,
    getRecordsData,
    queryParams,
  );

  useEffect(() => {
    setLoadedSubjectId(null);
  }, [subjectId]);

  useEffect(() => {
    if (!isLoading && subjectId) {
      setLoadedSubjectId(subjectId);
    }
  }, [isLoading, subjectId]);

  const handleSearch = useCallback((event) => {
    setSearchInput(event.target.value);
  }, []);

  const handleScroll = useCallback(
    (event) => {
      if (isFetchingMore) {
        return;
      }

      infinitScroller(event, records, setSkipCount);
    },
    [isFetchingMore, records, setSkipCount],
  );

  const isSubjectLoading = Boolean(subjectId) && loadedSubjectId !== subjectId;

  return {
    records,
    isLoading: isLoading || isSubjectLoading,
    isFetchingFromScrollingDown: isFetchingMore,
    searchInput,
    handleSearch,
    handleScroll,
  };
};

export default useRecords;
