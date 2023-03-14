const express = require("express");
const router = express.Router();
const QuizController = require("../controllers/QuizController.js");

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
    QuizController.startQuiz
);

router.put(
    "/submitAnswer",
    QuizController.submitAnswer
)

module.exports = router;