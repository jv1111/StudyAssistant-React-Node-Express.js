const express = require("express");

const passwordResetController = require("../controllers/passwordReset.controller");

const router = express.Router();

router.post("/request", passwordResetController.requestPasswordReset);

router.post("/reset", passwordResetController.resetPassword);

router.post("/validate", passwordResetController.validateResetToken);

module.exports = router;
