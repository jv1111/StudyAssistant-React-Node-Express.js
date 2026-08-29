const express = require("express");

const quizRecordController = require("../controllers/quizRecord.controller");

const { verifyAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(verifyAuth);

router.post("/save", quizRecordController.saveRecord);

router.get("/list", quizRecordController.getRecords);

router.get("/record", quizRecordController.getRecordByRecordId);

module.exports = router;
