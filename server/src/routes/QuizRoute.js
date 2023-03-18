const express = require("express");
const router = express.Router();
const QuizController = require("../controllers/QuizController.js");
const QuizMiddleware = require("../middlewares/QuizMiddlewares");

router.post(
    "/create",
    QuizController.createQuiz
);

router.get(
    "/subjectsList",
    QuizController.getSubjects
);

router.get(
    "/quizList",
    QuizController.getQuizzes
);

router.get(
    "/startQuiz",
    QuizMiddleware.finishedQuizChecker,//return quizEnded: true if there is no unanswered item
    QuizController.startQuiz
);

router.put(
    "/submitAnswer",
    QuizController.submitAnswer
);

router.put(
    "/saveRecord",
    QuizController.saveQuizRecord
);


router.get(
    "/records",
    QuizController.getQuizRecords
);

router.get(
    "/record",
    QuizController.getQuizRecord
);

module.exports = router;