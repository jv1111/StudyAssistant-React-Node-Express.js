const express = require("express");

const quizDraftController = require("../controllers/quizDraft.controller");

const { verifyAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(verifyAuth);

router.get("/", quizDraftController.getDraft);

router.patch("/", quizDraftController.saveDraft);

router.delete("/", quizDraftController.deleteDraft);

module.exports = router;
