import { useState, useEffect, useCallback } from "react";
import { getRecordByRecordId } from "../../api/quiz/quizRecord.api";

const useRecord = (recordId) => {
  const [record, setRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecord = useCallback(async () => {
    if (!recordId) return;

    try {
      setIsLoading(true);
      const data = await getRecordByRecordId(recordId);
      setRecord(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch quiz record:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [recordId]);

  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);

  return { record, isLoading, error };
};

export default useRecord;
