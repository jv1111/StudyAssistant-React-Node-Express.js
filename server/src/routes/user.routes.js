const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");
const upload = require("../multer.js");
const { verifyAuth } = require("../middlewares/auth.middleware.js");

router.post(
  "/changePass",
  verifyAuth, //check if the user is logged in
  UserController.changePass,
);

router.post(
  "/changeProfileImg",
  verifyAuth, //check if the user is logged in
  upload.single("image"),
  UserController.changeProfile,
);

router.post(
  "/getProfileImg",
  verifyAuth, //check if the user is logged in
  UserController.getProfileImg,
);

router.put(
  "/addOrUpdateEmail",
  verifyAuth, //check if the user is logged in
  UserController.addOrUpdateEmail,
);

router.put("/verifyEmail", UserController.verifyEmail);

router.put("/verifyToken", UserController.verifyToken);

router.put("/sendResetPassRequest", UserController.sendResetPassRequest);

router.put("/resetPass", UserController.resetPass);

module.exports = router;
