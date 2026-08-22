const userService = require("../services/user.service.js");
const AppError = require("../utils/AppError.js");
const asyncHandler = require("../utils/asyncHandler.js");

const changePass = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const result = await userService.changePass(
    req.user._id,
    oldPassword,
    newPassword,
  );

  res.status(200).json(result);
});

const changeProfile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("Profile image is required", 400);
  }

  const result = await userService.changeProfile(req.user._id, req.file.path);

  res.status(200).json(result);
});

const getProfileImg = asyncHandler(async (req, res) => {
  const result = await userService.getProfileImg(req.user._id);

  res.status(200).json(result);
});

const resetPass = asyncHandler(async (req, res) => {
  const { userId, newPassword } = req.body;

  const result = await userService.resetPass(userId, newPassword);

  res.status(200).json(result);
});

module.exports = {
  changePass,
  changeProfile,
  getProfileImg,
  resetPass,
};
