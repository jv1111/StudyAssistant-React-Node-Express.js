import { useEffect, useMemo, useState } from "react";

const useItemFetcher = (items, setItems, searchVal, getDataApi, queryParams) => {
    const [isLoading, setLoading] = useState(true);
    const [skipCount, setSkipCount] = useState(0);//the number of item to skip/taken
    const queryKey = JSON.stringify(queryParams || {});
    const params = useMemo(() => JSON.parse(queryKey), [queryKey]);

    useEffect(() => {
        const getItems = async () => {
            const apiResponse = await getDataApi({ ...params, searchVal, skipCount });
            setItems(currentItems => skipCount === 0 ? apiResponse : [...currentItems, ...apiResponse]);
            setLoading(false);
        }
        getItems();
    }, [getDataApi, params, searchVal, setItems, skipCount])

    return { isLoading, setSearching: () => {}, setSkipCount }
}

export default useItemFetcher;
