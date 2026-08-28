const express = require("express");

const quizDraftController = require("../controllers/quizDraft.controller");

const { verifyAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(verifyAuth);

router.get("/", quizDraftController.getCreateQuizDraft);

router.patch("/", quizDraftController.saveCreateQuizDraft);

router.delete("/", quizDraftController.deleteCreateQuizDraft);

module.exports = router;
