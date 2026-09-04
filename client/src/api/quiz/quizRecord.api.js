import api from "../axios";

const getRecordedSubjects = async (searchVal, skipCount = 0) => {
  const response = await api.get("/quiz-record/subjects", {
    params: {
      searchQuery: searchVal,
      skipCount,
    },
  });

  return response.data;
};

const getRecordsBySubject = async (subjectId, searchVal, skipCount = 0) => {
  const response = await api.get(`/quiz-record/subjects/${subjectId}`, {
    params: {
      searchQuery: searchVal,
      skipCount,
    },
  });

  return response.data;
};

const getRecordByRecordId = async (recordId) => {
  console.log("getting records by record id", recordId);
  const response = await api.get(`/quiz-record/records/${recordId}`);

  return response.data;
};

export { getRecordedSubjects, getRecordsBySubject, getRecordByRecordId };
