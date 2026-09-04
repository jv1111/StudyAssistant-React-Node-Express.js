const express = require("express");

const quizRecordController = require("../controllers/quizRecord.controller");

const { verifyAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(verifyAuth);

router.post("/save", quizRecordController.saveRecord);

router.get("/subjects", quizRecordController.getRecordedSubjects);

router.get("/subjects/:subjectId", quizRecordController.getRecordsBySubject);

router.get("/records/:recordId", quizRecordController.getRecordByRecordId);

module.exports = router;
