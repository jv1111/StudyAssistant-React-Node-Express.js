const passwordResetService = require("../services/passwordReset.service");

const asyncHandler = require("../utils/asyncHandler.js");

const { successResponse } = require("../utils/response.js");

const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await passwordResetService.requestPasswordReset(email);

  successResponse(res, 200, {
    message: "Password reset link sent successfully",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  await passwordResetService.resetPassword(token, newPassword);

  successResponse(res, 200, {
    message: "Password reset successfully",
  });
});

const validateResetToken = asyncHandler(async (req, res) => {
  const { token } = req.body;

  await passwordResetService.validateResetToken(token);

  successResponse(res, 200, {
    message: "Password reset token is valid",
  });
});

module.exports = {
  requestPasswordReset,
  resetPassword,
  validateResetToken,
};
