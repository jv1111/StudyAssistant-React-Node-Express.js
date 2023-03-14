import { useEffect, useState } from "react";
import { getQuizzes } from "../api/QuizApi.js";

const useQuizzesFetcher = (subject) => {
    const [isLoading, setLoading] = useState(true);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            const response = await getQuizzes(subject);
            setQuizzes(response);
            setLoading(false);
        }
        getItems();
    }, []);

    return { isLoading, quizzes }
}

export default useQuizzesFetcher;