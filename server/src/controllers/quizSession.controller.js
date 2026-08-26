const quizSessionService = require("../services/quizSession.service");

const asyncHandler = require("../utils/asyncHandler");

const startQuiz = asyncHandler(async (req, res) => {
  const { quizId, quizType, randomizeQuestions } = req.body;

  const session = await quizSessionService.startQuiz(
    req.user._id,
    quizId,
    quizType,
    randomizeQuestions,
  );

  res.status(201).json(session);
});

const submitAnswer = asyncHandler(async (req, res) => {
  const { sessionId, answer } = req.body;

  const result = await quizSessionService.submitAnswer(
    req.user._id,
    sessionId,
    answer,
  );

  res.status(200).json(result);
});

const nextQuestion = asyncHandler(async (req, res) => {
  const { sessionId } = req.query;

  const result = await quizSessionService.nextQuestion(req.user._id, sessionId);

  res.status(200).json(result);
});

module.exports = {
  startQuiz,
  submitAnswer,
  nextQuestion,
};
