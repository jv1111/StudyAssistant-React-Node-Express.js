import { useCallback, useState } from "react";

import useDebounce from "../common/useDebounce";
import useDeferredLoading from "../common/useDeferredLoading";
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

  const getSubjectsData = useCallback(
    ({ searchVal, skipCount }) => getSubjects(searchVal, skipCount),
    [],
  );

  const { isLoading, setSkipCount } = useItemFetcher(
    setSubjects,
    searchVal,
    getSubjectsData,
  );

  const showLoading = useDeferredLoading(isLoading);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleScroll = (event) => {
    infinitScroller(event, subjects, setSkipCount);
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
    isLoading: showLoading,
    searchInput,
    handleSearch,
    handleScroll,
    handleDeleteSubject,
    handleDeleteAllSubjects,
  };
};

export default useSubjects;
