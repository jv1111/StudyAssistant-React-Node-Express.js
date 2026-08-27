import api from "./axios";

const getDraft = async () => {
  console.log("[quizDraft] GET /quiz/draft");

  const response = await api.get("/quiz/draft");

  console.log("[quizDraft] GET response:", response.data);

  return response.data;
};

const saveDraft = async (subject, quizName, items) => {
  console.log("[quizDraft] PATCH /quiz/draft");
  console.log("[quizDraft] PATCH payload:", {
    subject,
    quizName,
    items,
  });

  const response = await api.patch("/quiz/draft", {
    subject,
    quizName,
    items,
  });

  console.log("[quizDraft] PATCH response:", response.data);

  return response.data;
};

const deleteDraft = async () => {
  console.log("[quizDraft] DELETE /quiz/draft");

  const response = await api.delete("/quiz/draft");

  console.log("[quizDraft] DELETE response:", response.data);

  return response.data;
};

export { getDraft, saveDraft, deleteDraft };
