import { useEffect, useState } from "react";
import { getQuizzes } from "../api/QuizApi.js";

const useQuizzesFetcher = (subject, searchVal) => {
    const [isLoading, setLoading] = useState(true);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            const response = await getQuizzes(subject, searchVal);
            setQuizzes(response);
            setLoading(false);
        }
        getItems();
    }, [searchVal]);

    return { isLoading, quizzes }
}

export default useQuizzesFetcher;