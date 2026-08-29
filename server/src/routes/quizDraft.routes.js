const express = require("express");

const quizDraftController = require("../controllers/quizDraft.controller");

const { verifyAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(verifyAuth);

router.get("/create", quizDraftController.getCreateQuizDraft);
router.patch("/create", quizDraftController.saveCreateQuizDraft);
router.delete("/create", quizDraftController.deleteCreateQuizDraft);

router.get("/update", quizDraftController.getUpdateQuizDraft);
router.patch("/update", quizDraftController.saveUpdateQuizDraft);
router.delete("/update", quizDraftController.deleteUpdateQuizDraft);

module.exports = router;
