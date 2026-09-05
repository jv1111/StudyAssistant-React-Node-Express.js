import { useEffect, useState } from "react";

const EMPTY_QUERY_PARAMS = {};

const useItemFetcher = (
  setItems,
  searchVal,
  getDataApi,
  queryParams = EMPTY_QUERY_PARAMS,
) => {
  const [isLoading, setLoading] = useState(true);
  const [skipCount, setSkipCount] = useState(0);

  useEffect(() => {
    const getItems = async () => {
      setLoading(true);

      const apiResponse = await getDataApi({
        ...queryParams,
        searchVal,
        skipCount,
      });

      setItems((currentItems) => {
        const nextItems =
          skipCount === 0 ? apiResponse : [...currentItems, ...apiResponse];

        const seen = new Map();

        for (const item of nextItems) {
          if (!item?._id) continue;
          seen.set(item._id, item);
        }

        return [...seen.values()];
      });

      setLoading(false);
    };

    getItems();
  }, [getDataApi, searchVal, skipCount, setItems, queryParams]);

  return {
    isLoading,
    setSkipCount,
  };
};

export default useItemFetcher;
