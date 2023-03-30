import { useEffect, useState } from "react";
import { getSubjects } from "../api/QuizApi";

const useSubjectsFetcher = (subjects, setSubjects, searchVal) => {
    const [isLoading, setLoading] = useState(true);
    const [isSearching, setSearching] = useState(false);
    const [skipCount, setSkipCount] = useState(0);

    useEffect(() => {
        const getItems = async () => {
            const apiResponse = await getSubjects(searchVal, skipCount);
            if (!isSearching) setSubjects([...subjects, ...apiResponse]);//append new data
            if (isSearching) {
                setSubjects(apiResponse);//reset new data
                setSearching(false);
            }
            setLoading(false);
        }
        getItems();
    }, [skipCount, searchVal])

    return { isLoading, setSearching, setSkipCount }
}

export default useSubjectsFetcher;