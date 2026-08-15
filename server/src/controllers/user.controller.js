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

const addOrUpdateEmail = asyncHandler(async (req, res) => {
  const { newEmail } = req.body;

  const result = await userService.addOrUpdateEmail(req.user._id, newEmail);

  res.status(200).json(result);
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { userId, token } = req.body;

  const result = await userService.verifyEmail(userId, token);

  res.status(200).json(result);
});

const verifyToken = asyncHandler(async (req, res) => {
  const { userId, token, type } = req.body;

  const result = await userService.verifyToken(userId, token, type);

  res.status(200).json(result);
});

const sendResetPassRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const result = await userService.sendResetPassRequest(email);

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
  addOrUpdateEmail,
  verifyEmail,
  verifyToken,
  sendResetPassRequest,
  resetPass,
};
