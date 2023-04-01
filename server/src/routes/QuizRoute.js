const express = require("express");
const router = express.Router();
const QuizController = require("../controllers/QuizController.js");
const QuizMiddleware = require("../middlewares/QuizMiddlewares");
const { VerifyAuth } = require("../middlewares/UserMiddleware");

router.put(
    "/create",
    VerifyAuth,//check if the user is logged in
    QuizController.createQuiz
);

router.get(
    "/subjectsList",
    VerifyAuth,//check if the user is logged in
    QuizController.getSubjects
);

router.get(
    "/quizList",
    VerifyAuth,//check if the user is logged in
    QuizController.getQuizzes
);

router.get(
    "/startQuiz",
    VerifyAuth,//check if the user is logged in
    QuizMiddleware.finishedQuizChecker,//return quizEnded: true if there is no unanswered item
    QuizController.startQuiz
);

router.put(
    "/submitAnswer",
    VerifyAuth,//check if the user is logged in
    QuizController.submitAnswer
);

router.put(
    "/saveRecord",
    VerifyAuth,//check if the user is logged in
    QuizController.saveQuizRecord
);


router.get(
    "/records",
    VerifyAuth,//check if the user is logged in
    QuizController.getQuizRecords
);

router.get(
    "/record",
    VerifyAuth,//check if the user is logged in
    QuizController.getQuizRecord
);

router.put(
    "/saveData",
    VerifyAuth,//check if the user is logged in
    QuizController.saveData
);

router.get(
    "/savedData",
    VerifyAuth,//check if the user is logged in
    QuizController.getSavedData
);

router.delete(
    "/savedData",
    VerifyAuth,//check if the user is logged in
    QuizController.deleteSavedData
);

module.exports = router;