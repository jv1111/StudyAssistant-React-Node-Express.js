const userService = require("../services/user.service.js");

const AppError = require("../utils/AppError.js");

const asyncHandler = require("../utils/asyncHandler.js");

const { successResponse } = require("../utils/response");

const changeProfile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("Profile image is required", 400);
  }

  const result = await userService.changeProfile(req.user._id, req.file);

  successResponse(res, 200, result);
});

const getProfileImg = asyncHandler(async (req, res) => {
  const result = await userService.getProfileImg(req.user._id);

  successResponse(res, 200, result);
});

const resetPass = asyncHandler(async (req, res) => {
  const { userId, newPassword } = req.body;

  const result = await userService.resetPass(userId, newPassword);

  successResponse(res, 200, result);
});

module.exports = {
  changeProfile,
  getProfileImg,
  resetPass,
};
