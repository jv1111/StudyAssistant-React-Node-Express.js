import { useEffect, useState } from "react";
import { getRecords } from "../api/QuizApi";

const useRecordsFetcher = (subject) => {
    const [isLoading, setLoading] = useState(true);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const getUserRecords = async () => {
            const response = await getRecords(subject);
            setRecords(response);
            setLoading(false);
        }
        getUserRecords();
    }, []);

    return { isLoading, records }
}

export default useRecordsFetcher;