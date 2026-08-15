const express = require("express");

const quizController = require("../controllers/quiz.controller");
const quizMiddleware = require("../middlewares/quiz.middleware");
const { verifyAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(verifyAuth);

router.put("/create", quizController.createQuiz);

router.get("/subjectsList", quizController.getSubjects);

router.get("/quizList", quizController.getQuizzes);

router.get(
  "/startQuiz",
  quizMiddleware.finishedQuizChecker,
  quizController.startQuiz,
);

router.put("/submitAnswer", quizController.submitAnswer);

router.put("/saveRecord", quizController.saveQuizRecord);

router.get("/records", quizController.getQuizRecords);

router.get("/record", quizController.getQuizRecord);

router.put("/saveData", quizController.saveData);

router.get("/savedData", quizController.getSavedData);

router.delete("/savedData", quizController.deleteSavedData);

router.get("/items", quizController.getItems);

router.put("/update", quizController.updateQuiz);

router.put("/pdf", quizController.createPdf);

router.get("/pdf", quizController.getPdf);

router.delete("/file", quizController.deleteFile);

module.exports = router;
