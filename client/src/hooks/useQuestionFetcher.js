import { useEffect, useState } from "react";
import { getQuestion } from "../api/QuizApi";

const useQuestionFetcher = (quizId) => {
    const [isLoading, setLoading] = useState(true);
    const [item, setItem] = useState({});

    useEffect(() => {
        const getQuizItem = async () => {
            const quizItem = await getQuestion(quizId);
            setItem(quizItem);
            setLoading(false);
        }
        getQuizItem();
    }, []);

    return { isLoading, item }
}

export default useQuestionFetcher;