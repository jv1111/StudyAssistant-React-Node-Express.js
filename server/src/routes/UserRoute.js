const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");
const upload = require("../multer");

router.post(
    "/changePass",
    UserController.changePass
);

router.post(
    "/changeProfileImg",
    upload.single("image"),
    UserController.changeProfile
);

router.post(
    "/getProfileImg",
    UserController.getProfileImg
);

router.put(
    "/addOrUpdateEmail",
    UserController.addOrUpdateEmail
);

module.exports = router;