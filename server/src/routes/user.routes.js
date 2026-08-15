const express = require("express");

const userController = require("../controllers/user.controller.js");
const upload = require("../middlewares/upload.middleware.js");
const { verifyAuth } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/changePass", verifyAuth, userController.changePass);

router.post(
  "/changeProfileImg",
  verifyAuth,
  upload.single("image"),
  userController.changeProfile,
);

router.get("/profileImg", verifyAuth, userController.getProfileImg);

router.put("/email", verifyAuth, userController.addOrUpdateEmail);

router.put("/verifyEmail", userController.verifyEmail);

router.put("/verifyToken", userController.verifyToken);

router.put("/sendResetPassRequest", userController.sendResetPassRequest);

router.put("/resetPass", userController.resetPass);

module.exports = router;
