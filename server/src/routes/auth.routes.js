const express = require("express");

const authController = require("../controllers/auth.controller");

const {
  validateRegister,
  validateLogin,
  validateChangePass,
} = require("../middlewares/validate.middleware");

const { verifyAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", validateRegister, authController.register);

router.post("/login", validateLogin, authController.login);

router.post("/google", authController.googleLogin);

router.get("/me", authController.getMe);

router.post("/add-password", verifyAuth, authController.addPassword);

router.post(
  "/change-password",
  verifyAuth,
  validateChangePass,
  authController.changePass,
);

router.post("/logout", authController.logout);

module.exports = router;
