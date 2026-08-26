const quizSessionService = require("../services/quizSession.service");

const asyncHandler = require("../utils/asyncHandler");

const { successResponse } = require("../utils/response");

const startQuiz = asyncHandler(async (req, res) => {
  const { quizId, quizType, randomizeQuestions } = req.body;

  const session = await quizSessionService.startQuiz(
    req.user._id,
    quizId,
    quizType,
    randomizeQuestions,
  );

  successResponse(res, 201, session);
});

const submitAnswer = asyncHandler(async (req, res) => {
  const { sessionId, answer } = req.body;

  const result = await quizSessionService.submitAnswer(
    req.user._id,
    sessionId,
    answer,
  );

  successResponse(res, 200, result);
});

const nextQuestion = asyncHandler(async (req, res) => {
  const { sessionId } = req.query;

  const result = await quizSessionService.nextQuestion(req.user._id, sessionId);

  successResponse(res, 200, result);
});

module.exports = {
  startQuiz,
  submitAnswer,
  nextQuestion,
};
