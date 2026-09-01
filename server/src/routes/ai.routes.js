const express = require("express");
const aiController = require("../controllers/ai.controller");
const { verifyAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/generate", verifyAuth, aiController.generateContent);

module.exports = router;
