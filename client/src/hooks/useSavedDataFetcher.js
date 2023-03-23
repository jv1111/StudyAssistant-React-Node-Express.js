import { useEffect, useState } from "react";
import { getSavedData } from "../api/QuizApi";

const useSavedDataFetcher = (key, setItems, setSubject, setQuizName) => {
    useEffect(() => {
        const dataFetcher = async () => {
            const savedData = await getSavedData(key);
            if (savedData) {
                const { items, subject, quizName } = savedData.data;
                setItems(items);
                setSubject(subject);
                setQuizName(quizName)
            }
        }
        dataFetcher();
    }, []);
}

export default useSavedDataFetcher;