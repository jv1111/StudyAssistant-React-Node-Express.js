import { useCallback, useState } from "react";

import useDebounce from "../common/useDebounce";
import useItemFetcher from "../data/useItemFetcher";

import {
  getSubjects,
  deleteSubject,
  deleteAllSubjects,
} from "../../api/quiz/quiz.api";

import infinitScroller from "../../helper/infinitScroller";

const useSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchVal = useDebounce(searchInput, 400);

  const getSubjectsData = useCallback(({ searchVal, skipCount }) => {
    return getSubjects(searchVal, skipCount);
  }, []);

  const { isLoading, isFetchingMore, setSkipCount } = useItemFetcher(
    setSubjects,
    searchVal,
    getSubjectsData,
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

  const handleDeleteSubject = useCallback(async (subjectId) => {
    await deleteSubject(subjectId);

    setSubjects((currentSubjects) =>
      currentSubjects.filter((subject) => subject._id !== subjectId),
    );
  }, []);

  const handleDeleteAllSubjects = useCallback(async () => {
    await deleteAllSubjects();

    setSubjects([]);
  }, []);

  return {
    subjects,
    isLoading,
    isFetchingFromScrollingDown: isFetchingMore,
    searchInput,
    handleSearch,
    handleScroll,
    handleDeleteSubject,
    handleDeleteAllSubjects,
  };
};

export default useSubjects;
