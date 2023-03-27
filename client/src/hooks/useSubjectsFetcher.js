import { useEffect, useState } from "react";
import { getSubjects } from "../api/QuizApi.js";

const useSubjectsFetcher = (searchVal) => {
    const [isLoading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            const response = await getSubjects(searchVal);
            setSubjects(response);
            setLoading(false);
        }
        getItems();
    }, [searchVal]);
    // todo make the search function working, check the server side
    return { isLoading, subjects }
}

export default useSubjectsFetcher;