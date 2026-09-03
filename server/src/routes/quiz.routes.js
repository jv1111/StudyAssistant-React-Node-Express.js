const express = require("express");

const quizController = require("../controllers/quiz.controller");

const { verifyAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(verifyAuth);

router.post("/preview", quizController.previewQuiz);

router.post("/create", quizController.createQuiz);

router.post("/createMany", quizController.createManyQuizzes);

router.get("/subjectsList", quizController.getSubjects);

router.delete("/subjects", quizController.deleteAllSubjects);

router.delete("/subjects/:subjectId", quizController.deleteSubject);

router.delete("/subjects/:subjectId/quizzes", quizController.deleteAllQuizzes);

router.get("/quizList", quizController.getQuizzes);

router.put("/saveData", quizController.saveData);

router.get("/savedData", quizController.getSavedData);

router.delete("/savedData", quizController.deleteSavedData);

router.get("/items", quizController.getItems);

router.put("/update", quizController.updateQuiz);

router.delete("/:quizId", quizController.deleteQuiz);

router.get("/:quizId/pdf", quizController.downloadPdf);

router.get("/:quizId", quizController.getQuizById);

module.exports = router;
