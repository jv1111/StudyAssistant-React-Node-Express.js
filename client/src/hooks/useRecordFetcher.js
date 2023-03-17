import { useEffect, useState } from "react";
import { getRecord } from "../api/QuizApi";

const useRecordFetcher = (recordId) => {
    const [isLoading, setLoading] = useState(true);
    const [record, setRecord] = useState([]);

    useEffect(() => {
        const getUserRecord = async () => {
            const response = await getRecord(recordId);
            setRecord(response);
            setLoading(false);
        }
        getUserRecord();
    }, []);

    return { isLoading, record }
}

export default useRecordFetcher;