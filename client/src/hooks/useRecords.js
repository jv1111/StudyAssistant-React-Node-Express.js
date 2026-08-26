import { useState } from "react";

import useDebounce from "./useDebounce";
import useItemFetcher from "./useItemFetcher";

import { getRecords } from "../api/quiz.api";

import infinitScroller from "../helper/infinitScroller";

const useRecords = () => {
  const [records, setRecords] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchVal = useDebounce(searchInput, 400);

  const { isLoading, setSkipCount } = useItemFetcher(
    setRecords,
    searchVal,
    getRecords,
  );

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleScroll = (event) => {
    infinitScroller(event, records, setSkipCount);
  };

  return {
    records,
    isLoading,
    searchInput,
    handleSearch,
    handleScroll,
  };
};

export default useRecords;
