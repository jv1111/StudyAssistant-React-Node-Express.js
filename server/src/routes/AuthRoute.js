const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController.js");

router.post(
    "/register",
    AuthController.register
);

router.post(
    "/login",
    AuthController.login
);

router.get(
    "/login",
    AuthController.getSession
);

router.get(
    "/logout",
    AuthController.logout
);

router.get(
    "/googleLogin",
    AuthController.googleLogin
);

router.get(
    "/google/callback",
    AuthController.googleCallback,
);

module.exports = router;