import { useEffect, useState } from "react";
import { getQuestion } from "../api/QuizApi";

const useQuestionFetcher = (quizId, numAnswered) => {
    const [isLoading, setLoading] = useState(true);
    const [quizEnded, setQuizEnded] = useState(false);
    const [item, setItem] = useState({});

    useEffect(() => {
        const getQuizItem = async () => {
            const quizItem = await getQuestion(quizId);
            if (quizItem.quizEnded) {
                setQuizEnded(true);
            } else {
                setItem(quizItem);
            }
            setLoading(false);
        }
        getQuizItem();
    }, [numAnswered]);

    return { isLoading, item, quizEnded }
}

export default useQuestionFetcher;