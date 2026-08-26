import { useEffect, useState } from "react";
import { getRecords } from "../api/quiz.api";

const useRecordsFetcher = (subject, searchVal) => {
  const [isLoading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const getUserRecords = async () => {
      const response = await getRecords(subject, searchVal);
      setRecords(response);
      setLoading(false);
    };
    getUserRecords();
  }, [searchVal]);

  return { isLoading, records };
};

export default useRecordsFetcher;
