import { useEffect, useState } from "react";
import { getQuestion } from "../api/QuizApi";

const useQuestionFetcher = (quizId, numAnswered) => {
    const [isLoading, setLoading] = useState(true);
    const [quizEnded, setQuizEnded] = useState(false);
    const [item, setItem] = useState({});

    useEffect(() => {
        const getQuizItem = async () => {
            const quizItem = await getQuestion(quizId);
            setItem(quizItem);
            if (quizItem.quizEnded) {
                setQuizEnded(true);
            }
            setLoading(false);
        }
        getQuizItem();
    }, [numAnswered, quizId]);

    return { isLoading, item, quizEnded }
}

export default useQuestionFetcher;
