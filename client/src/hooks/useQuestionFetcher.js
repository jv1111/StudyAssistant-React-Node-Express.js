import { useEffect, useState } from "react";
import { getQuestion } from "../api/QuizApi";

const useQuestionFetcher = (quizId, numAnswered) => {
    const [isLoading, setLoading] = useState(true);
    const [item, setItem] = useState({});

    useEffect(() => {
        const getQuizItem = async () => {
            const quizItem = await getQuestion(quizId);
            setItem(quizItem);
            setLoading(false);
        }
        getQuizItem();
    }, [numAnswered]);

    return { isLoading, item }
}

export default useQuestionFetcher;