import api from "../axios";

const startQuiz = async (quizId, quizType, randomizeQuestions) => {
  const response = await api.post("/quiz-session/start", {
    quizId,
    quizType,
    randomizeQuestions,
  });

  return response.data;
};

const submitAnswer = async (sessionId, quizType, answer) => {
  const response = await api.put("/quiz-session/submit", {
    sessionId,
    quizType,
    answer,
  });

  return response.data;
};

const nextQuestion = async (sessionId, quizType) => {
  const response = await api.get("/quiz-session/next", {
    params: {
      sessionId,
      quizType,
    },
  });

  return response.data;
};

export { startQuiz, submitAnswer, nextQuestion };
