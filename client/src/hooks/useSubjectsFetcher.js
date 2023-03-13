import { useEffect, useState } from "react";
import { getSubjects } from "../api/QuizApi.js";

const useSubjectsFetcher = () => {
    const [isLoading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            const response = await getSubjects();
            setSubjects(response);
            setLoading(false);
        }
        getItems();
    }, []);

    return { isLoading, subjects }
}

export default useSubjectsFetcher;