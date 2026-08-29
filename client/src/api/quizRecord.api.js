import api from "./axios";

const getRecords = async ({ searchVal, skipCount = 0 }) => {
  const response = await api.get("/quiz-record/list", {
    params: {
      searchQuery: searchVal,
      skipCount,
    },
  });

  return response.data;
};

const getRecordByRecordId = async (recordId) => {
  const response = await api.get("/quiz-record/record", {
    params: {
      recordId,
    },
  });

  return response.data;
};

export { getRecords, getRecordByRecordId };
