import api from "../axios";

const startQuiz = async (quizId, quizType, randomizeQuestions) => {
  const payload = {
    quizId,
    quizType,
    randomizeQuestions,
  };

  const response = await api.post("/quiz-session/start", payload);

  return response.data;
};

const submitAnswer = async (sessionId, quizType, answer) => {
  console.log("API Submit Answer:", {
    sessionId,
    quizType,
    answer,
    answerType: typeof answer,
  });

  const payload = {
    sessionId,
    quizType,
    answer,
  };

  const response = await api.put("/quiz-session/submit", payload);

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
