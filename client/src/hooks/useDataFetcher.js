import { useEffect, useState } from "react";

const useDataFetcher = (searchVal, skipCount, data, setData, getDataApi) => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const getItems = async () => {
            const response = await getDataApi(searchVal, skipCount);
            setData([...data, ...response]);
            setLoading(false);
        }
        getItems();
    }, [searchVal, skipCount]);
    // todo make the search function working, check the server side
    return { isLoading }
}

export default useDataFetcher;