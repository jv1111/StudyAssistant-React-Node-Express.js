import api from "../axios";

const getCreateQuizDraft = async () => {
  const response = await api.get("/quiz/draft/create");

  return response.data;
};

const saveCreateQuizDraft = async (isPreview, subject, quizName, items) => {
  const response = await api.patch("/quiz/draft/create", {
    isPreview,
    subject,
    quizName,
    items,
  });

  return response.data;
};

const deleteCreateQuizDraft = async () => {
  const response = await api.delete("/quiz/draft/create");

  return response.data;
};

const getUpdateQuizDraft = async (quizId) => {
  const response = await api.get("/quiz/draft/update", {
    params: {
      quizId,
    },
  });

  return response.data;
};

const saveUpdateQuizDraft = async (quizId, subject, quizName, items) => {
  const response = await api.patch("/quiz/draft/update", {
    quizId,
    subject,
    quizName,
    items,
  });

  return response.data;
};

const deleteUpdateQuizDraft = async (quizId) => {
  const response = await api.delete("/quiz/draft/update", {
    params: {
      quizId,
    },
  });

  return response.data;
};

export {
  getCreateQuizDraft,
  saveCreateQuizDraft,
  deleteCreateQuizDraft,
  getUpdateQuizDraft,
  saveUpdateQuizDraft,
  deleteUpdateQuizDraft,
};
