import { useCallback, useEffect, useMemo, useState } from "react";

import useDebounce from "../common/useDebounce";
import useItemFetcher from "../data/useItemFetcher";
import useDeferredLoading from "../common/useDeferredLoading";

import { getRecordsBySubject } from "../../api/quiz/quizRecord.api";

import infinitScroller from "../../helper/infinitScroller";

const useRecords = (subjectId) => {
  const [records, setRecords] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loadedSubjectId, setLoadedSubjectId] = useState(null);

  const searchVal = useDebounce(searchInput, 400);

  const queryParams = useMemo(
    () => ({
      subjectId,
    }),
    [subjectId],
  );

  const getRecordsData = useCallback(
    async ({ subjectId, searchVal, skipCount }) => {
      if (!subjectId) {
        return [];
      }

      return getRecordsBySubject(subjectId, searchVal, skipCount);
    },
    [],
  );

  const { isLoading: isFetching, setSkipCount } = useItemFetcher(
    setRecords,
    searchVal,
    getRecordsData,
    queryParams,
  );

  useEffect(() => {
    setRecords([]);
    setSkipCount(0);
    setLoadedSubjectId(null);
  }, [subjectId, setSkipCount]);

  useEffect(() => {
    if (!isFetching && subjectId) {
      setLoadedSubjectId(subjectId);
    }
  }, [isFetching, subjectId]);

  const isLoading =
    Boolean(subjectId) && (isFetching || loadedSubjectId !== subjectId);

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
