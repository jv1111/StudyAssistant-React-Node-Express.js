import { useCallback, useEffect, useRef, useState } from "react";

const EMPTY_QUERY_PARAMS = {};

const mergeItems = (currentItems, newItems, skipCount) => {
  const nextItems = skipCount === 0 ? newItems : [...currentItems, ...newItems];

  const seen = new Map();

  for (const item of nextItems) {
    const key = item?._id ?? `${item?.name ?? ""}-${item?.recordCount ?? ""}`;

    seen.set(key, item);
  }

  return [...seen.values()];
};

const useItemFetcher = (
  setItems,
  searchVal,
  getDataApi,
  queryParams = EMPTY_QUERY_PARAMS,
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [skipCount, setSkipCount] = useState(0);

  const requestIdRef = useRef(0);
  const previousSearchRef = useRef(searchVal);

  const fetchItems = useCallback(
    async (currentSkipCount) => {
      const requestId = ++requestIdRef.current;
      const isFirstPage = currentSkipCount === 0;

      if (isFirstPage) {
        setIsLoading(true);
      } else {
        setIsFetchingMore(true);
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const apiResponse = await getDataApi({
          ...queryParams,
          searchVal,
          skipCount: currentSkipCount,
        });

        // Ignore an outdated response.
        if (requestId !== requestIdRef.current) {
          return;
        }

        setItems((currentItems) =>
          mergeItems(currentItems, apiResponse, currentSkipCount),
        );
      } catch (error) {
        // Ignore errors from outdated requests.
        if (requestId !== requestIdRef.current) {
          return;
        }

        console.error("Failed to fetch items:", error);
      } finally {
        if (requestId !== requestIdRef.current) {
          return;
        }

        if (isFirstPage) {
          setIsLoading(false);
        } else {
          setIsFetchingMore(false);
        }
      }
    },
    [getDataApi, queryParams, searchVal, setItems],
  );

  useEffect(() => {
    const searchChanged = previousSearchRef.current !== searchVal;

    if (searchChanged) {
      previousSearchRef.current = searchVal;

      requestIdRef.current += 1;

      setItems([]);
      setSkipCount(0);
      setIsFetchingMore(false);

      // Fetch the new search immediately when the current
      // pagination position is already zero.
      if (skipCount === 0) {
        fetchItems(0);
      }

      return;
    }

    fetchItems(skipCount);
  }, [fetchItems, searchVal, setItems, skipCount]);

  return {
    isLoading,
    isFetchingMore,
    setSkipCount,
  };
};

export default useItemFetcher;
