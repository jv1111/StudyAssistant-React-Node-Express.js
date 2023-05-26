import { useEffect, useState } from "react";
import { getItemsApi } from "../api/QuizApi";

const useItemsLoader = (quizId, setSubject, setQuizName, setItems) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getItems = async () => {
            const response = await getItemsApi(quizId);
            setItems(response.items);
            setSubject(response.subject);
            setQuizName(response.quizName);
            setIsLoading(false);
        }
        getItems();
    }, []);
    return { isLoading };
}

export default useItemsLoader;