import { useState } from "react";

import useDebounce from "./useDebounce";
import useItemFetcher from "./useItemFetcher";
import useDeferredLoading from "./useDeferredLoading";

import { getRecords } from "../api/quizRecord.api";
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
