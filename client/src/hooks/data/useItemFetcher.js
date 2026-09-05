import { useEffect, useState } from "react";

// Shared empty object for hooks that do not need extra query parameters.
const EMPTY_QUERY_PARAMS = {};

const mergeItems = (currentItems, newItems, skipCount) => {
  // Replace items on the first fetch; append on later pages.
  const nextItems = skipCount === 0 ? newItems : [...currentItems, ...newItems];

  // Remove duplicate items using _id.
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
  const [isLoading, setLoading] = useState(true);
  const [skipCount, setSkipCount] = useState(0);

  const fetchItems = async () => {
    setLoading(true);

    try {
      const apiResponse = await getDataApi({
        ...queryParams,
        searchVal,
        skipCount,
      });

      setItems((currentItems) =>
        mergeItems(currentItems, apiResponse, skipCount),
      );
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [getDataApi, searchVal, skipCount, queryParams]);

  return {
    isLoading,
    setSkipCount,
  };
};

export default useItemFetcher;
