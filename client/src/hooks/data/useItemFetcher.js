import { useCallback, useEffect, useRef, useState } from "react";
import { customDelay } from "../../utils/delay";

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
  const previousQueryRef = useRef(null);

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
        await customDelay(1000);
        const apiResponse = await getDataApi({
          ...queryParams,
          searchVal,
          skipCount: currentSkipCount,
        });

        if (requestId !== requestIdRef.current) {
          return;
        }

        setItems((currentItems) =>
          mergeItems(currentItems, apiResponse, currentSkipCount),
        );
      } catch (error) {
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
    const queryKey = JSON.stringify({
      ...queryParams,
      searchVal,
    });

    const queryChanged = previousQueryRef.current !== queryKey;

    if (queryChanged) {
      previousQueryRef.current = queryKey;

      // Invalidate any request belonging to the previous query.
      requestIdRef.current += 1;

      setItems([]);
      setSkipCount(0);
      setIsLoading(true);
      setIsFetchingMore(false);

      fetchItems(0);

      return;
    }

    fetchItems(skipCount);
  }, [fetchItems, queryParams, searchVal, setItems, skipCount]);

  return {
    isLoading,
    isFetchingMore,
    setSkipCount,
  };
};

export default useItemFetcher;
