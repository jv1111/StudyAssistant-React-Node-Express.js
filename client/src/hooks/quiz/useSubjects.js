import { useCallback, useEffect, useState } from "react";

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
  const [isFetchingFromScrollingDown, setIsFetchingFromScrollingDown] =
    useState(false);

  const searchVal = useDebounce(searchInput, 400);

  const getSubjectsData = useCallback(
    ({ searchVal, skipCount }) => getSubjects(searchVal, skipCount),
    [],
  );

  const { isLoading, setSkipCount } = useItemFetcher(
    setSubjects,
    searchVal,
    getSubjectsData,
  );

  useEffect(() => {
    setSubjects([]);
    setSkipCount(0);
    setIsFetchingFromScrollingDown(false);
  }, [searchVal, setSkipCount]);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleScroll = (event) => {
    const isScrollingDown = infinitScroller(event, subjects, setSkipCount);

    if (isScrollingDown) {
      setIsFetchingFromScrollingDown(true);
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    await deleteSubject(subjectId);

    setSubjects((currentSubjects) =>
      currentSubjects.filter((subject) => subject._id !== subjectId),
    );
  };

  const handleDeleteAllSubjects = async () => {
    await deleteAllSubjects();

    setSubjects([]);
  };

  return {
    subjects,
    isLoading,
    isFetchingFromScrollingDown,
    searchInput,
    handleSearch,
    handleScroll,
    handleDeleteSubject,
    handleDeleteAllSubjects,
  };
};

export default useSubjects;
