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
  const [hasMore, setHasMore] = useState(true);
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
        await customDelay(500);
        const response = await getDataApi({
          ...queryParams,
          searchVal,
          skipCount: currentSkipCount,
        });

        // Ignore responses from outdated requests.
        if (requestId !== requestIdRef.current) {
          return;
        }

        const { items = [], hasMore: nextHasMore = false } = response;

        setItems((currentItems) =>
          mergeItems(currentItems, items, currentSkipCount),
        );

        setHasMore(nextHasMore);
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

      // Invalidate any request belonging to the
      // previous query.
      requestIdRef.current += 1;

      setItems([]);
      setHasMore(true);
      setIsLoading(true);
      setIsFetchingMore(false);

      /*
       * When the current page is not the first page,
       * reset pagination first. The resulting render
       * will trigger the first-page request.
       */
      if (skipCount !== 0) {
        setSkipCount(0);
        return;
      }

      /*
       * When already on the first page, fetch immediately.
       */
      fetchItems(0);

      return;
    }

    /*
     * Fetch subsequent pages when skipCount changes.
     */
    if (skipCount > 0 && hasMore) {
      fetchItems(skipCount);
    }
  }, [fetchItems, hasMore, queryParams, searchVal, setItems, skipCount]);

  const handleSetSkipCount = useCallback(
    (nextSkipCount) => {
      if (isLoading || isFetchingMore || !hasMore) {
        return;
      }

      setSkipCount(nextSkipCount);
    },
    [hasMore, isFetchingMore, isLoading],
  );

  return {
    isLoading,
    isFetchingMore,
    hasMore,
    setSkipCount: handleSetSkipCount,
  };
};

export default useItemFetcher;
