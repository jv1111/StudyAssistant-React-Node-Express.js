import { useEffect, useState } from "react";

const useItemFetcher = (items, setItems, searchVal, getDataApi, queryParams) => {
    const [isLoading, setLoading] = useState(true);
    const [isSearching, setSearching] = useState(false);
    const [skipCount, setSkipCount] = useState(0);//the number of item to skip/taken
    if (!queryParams) queryParams = {};

    useEffect(() => {
        const getItems = async () => {
            queryParams.searchVal = searchVal;
            queryParams.skipCount = skipCount;
            const apiResponse = await getDataApi(queryParams);
            if (!isSearching) setItems([...items, ...apiResponse]);//append new data
            if (isSearching) {
                setItems(apiResponse);//reset new data
                setSearching(false);
            }
            setLoading(false);
        }
        getItems();
    }, [skipCount, searchVal])

    return { isLoading, setSearching, setSkipCount }
}

export default useItemFetcher;