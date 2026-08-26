import api from "./axios";

const createQuiz = async (subject, quizName, items) => {
  const response = await api.post("/quiz/create", {
    subject,
    quizName,
    items,
  });

  return response.data;
};

const getSubjects = async ({ searchVal, skipCount }) => {
  const response = await api.get("/quiz/subjectsList", {
    params: {
      searchQuery: searchVal,
      skipCount,
    },
  });

  return response.data;
};

const getQuizzes = async ({ subjectId, searchVal, skipCount }) => {
  const response = await api.get("/quiz/quizList", {
    params: {
      subjectId,
      searchQuery: searchVal,
      skipCount,
    },
  });

  return response.data;
};

const getQuestion = async (quizId) => {
  const response = await api.get("/quiz/startQuiz", {
    params: { quizId },
  });

  return response.data;
};

const submitAnswer = async (questionId, answer) => {
  const response = await api.put("/quiz/submitAnswer", {
    questionId,
    answer,
  });

  return response.data;
};

const saveQuizRecord = async (quizId) => {
  const response = await api.put("/quiz/saveRecord", {
    quizId,
  });

  return response.data;
};

const getRecords = async ({ searchVal, skipCount }) => {
  const response = await api.get("/quiz/records", {
    params: {
      searchQuery: searchVal,
      skipCount,
    },
  });

  return response.data;
};

const getRecord = async (recordId) => {
  const response = await api.get("/quiz/record", {
    params: { recordId },
  });

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
    params: { quizId },
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

const setPDFOnServer = async (quizId) => {
  const response = await api.put("/quiz/pdf", {
    quizId,
  });

  return response.data;
};

const getPdf = async (pdfId) => {
  const response = await api.get("/quiz/pdf", {
    params: { pdfId },
    responseType: "blob",
  });

  return response.data;
};

const deleteFile = async (filePath) => {
  const response = await api.delete("/quiz/file", {
    params: { filePath },
  });

  return response.data;
};

export {
  deleteFile,
  getSubjects,
  getQuizzes,
  getQuestion,
  submitAnswer,
  saveQuizRecord,
  getRecords,
  getRecord,
  createQuiz,
  saveData,
  getSavedData,
  deleteSavedData,
  getItemsApi,
  updateQuiz,
  setPDFOnServer,
  getPdf,
};
