import { useCallback, useEffect, useMemo, useState } from "react";

import useDebounce from "../common/useDebounce";
import useItemFetcher from "../data/useItemFetcher";

import { getRecordsBySubject } from "../../api/quiz/quizRecord.api";

import infinitScroller from "../../helper/infinitScroller";

const useRecords = (subjectId) => {
  const [records, setRecords] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadedSubjectId, setLoadedSubjectId] = useState(null);

  const searchVal = useDebounce(searchInput, 400);

  const queryParams = useMemo(
    () => ({
      subjectId,
    }),
    [subjectId],
  );

  const getRecordsData = useCallback(({ subjectId, searchVal, skipCount }) => {
    if (!subjectId) {
      return [];
    }

    return getRecordsBySubject(subjectId, searchVal, skipCount);
  }, []);

  const { isLoading: isFetching, setSkipCount } = useItemFetcher(
    setRecords,
    searchVal,
    getRecordsData,
    queryParams,
  );

  /*
   * Clear the previous records when changing subjects.
   *
   * loadedSubjectId is intentionally reset so that the returned
   * loading state becomes true immediately for the new subject.
   */
  useEffect(() => {
    setRecords([]);
    setSkipCount(0);
    setLoadedSubjectId(null);

    if (subjectId) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [subjectId, setSkipCount]);

  /*
   * Keep loading active while fetching.
   *
   * Once fetching finishes, keep the loader visible for another
   * 1.5 seconds before marking this subject as fully loaded.
   */
  useEffect(() => {
    if (!subjectId) {
      setIsLoading(false);
      setLoadedSubjectId(null);
      return;
    }

    if (isFetching) {
      setIsLoading(true);
      return;
    }

    const timeout = setTimeout(() => {
      setLoadedSubjectId(subjectId);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, [subjectId, isFetching]);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleScroll = (event) => {
    infinitScroller(event, records, setSkipCount);
  };

  /*
   * This is the important part.
   *
   * When subjectId changes, loadedSubjectId still contains the
   * previous subject (or null), so this becomes true immediately
   * during the render that switches into record mode.
   *
   * This prevents EmptyState from flashing before useEffect runs.
   */
  const isSubjectLoading = Boolean(subjectId) && loadedSubjectId !== subjectId;

  return {
    records,
    isLoading:
      Boolean(subjectId) && (isLoading || isFetching || isSubjectLoading),
    searchInput,
    handleSearch,
    handleScroll,
  };
};

export default useRecords;
