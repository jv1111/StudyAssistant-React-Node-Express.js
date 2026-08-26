const express = require("express");

const quizController = require("../controllers/quiz.controller");
const quizMiddleware = require("../middlewares/quiz.middleware");
const { verifyAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(verifyAuth);

router.post("/preview", quizController.previewQuiz);

router.post("/create", quizController.createQuiz);

router.get("/subjectsList", quizController.getSubjects);

router.get("/quizList", quizController.getQuizzes);

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

router.post("/start", quizController.startQuiz);

router.put("/submit", quizController.submitAnswer);

router.get("/next", quizController.nextQuestion);

module.exports = router;
