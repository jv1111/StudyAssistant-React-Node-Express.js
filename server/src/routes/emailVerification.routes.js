const express = require("express");

const emailVerificationController = require("../controllers/emailVerification.controller");
const { verifyAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/send",
  verifyAuth,
  emailVerificationController.createVerification,
);

router.post("/verify", verifyAuth, emailVerificationController.verifyEmail);

router.post(
  "/resend",
  verifyAuth,
  emailVerificationController.resendVerification,
);

module.exports = router;
