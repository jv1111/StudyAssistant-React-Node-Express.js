const express = require("express");

const userController = require("../controllers/user.controller.js");

const upload = require("../middlewares/upload.middleware.js");

const { verifyAuth } = require("../middlewares/auth.middleware.js");

const { validateChangePass } = require("../middlewares/validate.middleware.js");

const router = express.Router();

router.post(
  "/changePass",
  verifyAuth,
  validateChangePass,
  userController.changePass,
);

router.post(
  "/changeProfileImg",
  verifyAuth,
  upload.single("image"),
  userController.changeProfile,
);

router.get("/profileImg", verifyAuth, userController.getProfileImg);

router.put("/resetPass", userController.resetPass);

module.exports = router;
