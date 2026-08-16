const express = require("express");
const passport = require("passport");

const authController = require("../controllers/auth.controller");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validate.middleware");

const router = express.Router();

router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);

router.get("/me", authController.getMe);
router.post("/logout", authController.logout);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
);

module.exports = router;
