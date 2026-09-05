import api from "../axios";

const createQuiz = async (subject, quizName, items) => {
  const response = await api.post("/quiz/create", {
    subject,
    quizName,
    items,
  });

  return response.data;
};

const previewQuiz = async (subject, quizName, items) => {
  const response = await api.post("/quiz/preview", {
    subject,
    quizName,
    items,
  });

  return response.data;
};

const getSubjects = async (searchVal, skipCount) => {
  const response = await api.get("/quiz/subjectsList", {
    params: {
      searchQuery: searchVal,
      skipCount,
    },
  });

  return response.data;
};

const getQuizzes = async (subjectId, searchVal, skipCount = 0) => {
  if (!subjectId) {
    return [];
  }

  const response = await api.get("/quiz/quizList", {
    params: {
      subjectId,
      searchQuery: searchVal,
      skipCount,
    },
  });

  return response.data;
};

const getQuizById = async (quizId) => {
  const response = await api.get(`/quiz/${quizId}`);

  return response.data;
};

const saveData = async (key, data, quizId) => {
  const response = await api.put("/quiz/saveData", {
    key,
    data,
    quizId,
  });

  return response.data;
};

const getSavedData = async (key, quizId) => {
  const response = await api.get("/quiz/savedData", {
    params: {
      key,
      quizId,
    },
  });

  return response.data;
};

const deleteSavedData = async (key, quizId) => {
  const response = await api.delete("/quiz/savedData", {
    params: {
      key,
      quizId,
    },
  });

  return response.data;
};

const getItemsApi = async (quizId) => {
  const response = await api.get("/quiz/items", {
    params: {
      quizId,
    },
  });

  return response.data;
};

const updateQuiz = async (quizId, subject, quizName, items) => {
  const response = await api.put("/quiz/update", {
    quizId,
    subject,
    quizName,
    items,
  });

  return response.data;
};

const deleteQuiz = async (quizId) => {
  const response = await api.delete(`/quiz/${quizId}`);

  return response.data;
};

const deleteAllQuizzes = async (subjectId) => {
  const response = await api.delete(`/quiz/subjects/${subjectId}/quizzes`);

  return response.data;
};

const deleteSubject = async (subjectId) => {
  const response = await api.delete(`/quiz/subjects/${subjectId}`);
  return response.data;
};

const deleteAllSubjects = async () => {
  const response = await api.delete("/quiz/subjects");
  return response.data;
};

const downloadPdf = async (quizId) => {
  const response = await api.get(`/quiz/${quizId}/pdf`, {
    responseType: "blob",
  });

  return response;
};

export {
  createQuiz,
  previewQuiz,
  getSubjects,
  getQuizzes,
  getQuizById,
  saveData,
  getSavedData,
  deleteSavedData,
  getItemsApi,
  updateQuiz,
  deleteQuiz,
  deleteAllQuizzes,
  deleteSubject,
  deleteAllSubjects,
  downloadPdf,
};
