import { useEffect, useState } from "react";

// Prevents creating a new default object on every render
const EMPTY_QUERY_PARAMS = {};

const useItemFetcher = (
  setItems,
  searchVal,
  getDataApi,
  queryParams = EMPTY_QUERY_PARAMS,
) => {
  // Tracks whether data is currently being fetched
  const [isLoading, setLoading] = useState(true);

  // Controls pagination for infinite scrolling
  const [skipCount, setSkipCount] = useState(0);

  useEffect(() => {
    const getItems = async () => {
      setLoading(true);

      try {
        // Fetch data using search, pagination, and extra query parameters
        const apiResponse = await getDataApi({
          ...queryParams,
          searchVal,
          skipCount,
        });

        setItems((currentItems) => {
          // Replace items on a new fetch, otherwise append the next page
          const nextItems =
            skipCount === 0 ? apiResponse : [...currentItems, ...apiResponse];

          // Remove duplicate items
          const seen = new Map();

          for (const item of nextItems) {
            const key =
              item?._id ?? `${item?.name ?? ""}-${item?.recordCount ?? ""}`;

            seen.set(key, item);
          }

          const uniqueItems = [...seen.values()];

          console.log("API response:", apiResponse);
          console.log("Fetched items:", uniqueItems);

          return uniqueItems;
        });
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    };

    // Re-fetch when these values change
    getItems();
  }, [getDataApi, searchVal, skipCount, setItems, queryParams]);

  return {
    isLoading,

    // Used by infinite scrolling to load the next page
    setSkipCount,
  };
};

export default useItemFetcher;
