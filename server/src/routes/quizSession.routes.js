const express = require("express");

const quizSessionController = require("../controllers/quizSession.controller");

const { verifyAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(verifyAuth);

router.post("/start", quizSessionController.startQuiz);

router.put("/submit", quizSessionController.submitAnswer);

router.get("/next", quizSessionController.nextQuestion);

router.delete("/delete", quizSessionController.deleteQuizSession);

module.exports = router;
