import api from "./axios";

const getCreateQuizDraft = async () => {
  console.log("[quizDraft] GET /quiz/draft");

  const response = await api.get("/quiz/draft");

  console.log("[quizDraft] GET response:", response.data);

  return response.data;
};

const saveCreateQuizDraft = async (isPreview, subject, quizName, items) => {
  console.log("[quizDraft] PATCH /quiz/draft");

  console.log("[quizDraft] PATCH payload:", {
    isPreview,
    subject,
    quizName,
    items,
  });

  const response = await api.patch("/quiz/draft", {
    isPreview,
    subject,
    quizName,
    items,
  });

  console.log("[quizDraft] PATCH response:", response.data);

  return response.data;
};

const deleteCreateQuizDraft = async () => {
  console.log("[quizDraft] DELETE /quiz/draft");

  const response = await api.delete("/quiz/draft");

  console.log("[quizDraft] DELETE response:", response.data);

  return response.data;
};

export { getCreateQuizDraft, saveCreateQuizDraft, deleteCreateQuizDraft };
