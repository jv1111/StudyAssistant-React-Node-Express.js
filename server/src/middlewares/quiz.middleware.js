const QuizSession = require("../models/quizSession.model");

const { getScore } = require("../services/quiz.service");

const asyncHandler = require("../utils/asyncHandler");

const { successResponse } = require("../utils/response");

const finishedQuizChecker = asyncHandler(async (req, res, next) => {
  const { quizId } = req.query;

  const quizSession = await QuizSession.find({
    userId: req.user._id,
    quizId,
  });

  const unansweredItems = quizSession.filter((item) => !item.answered);

  if (quizSession.length > 0 && unansweredItems.length === 0) {
    return successResponse(res, 200, {
      subject: quizSession[0].subject,
      quizName: quizSession[0].quizName,
      score: getScore(quizSession),
      numberOfItems: quizSession.length,
      quizEnded: true,
    });
  }

  next();
});

module.exports = {
  finishedQuizChecker,
};
