const passwordResetService = require("../services/passwordReset.service");

const asyncHandler = require("../utils/asyncHandler.js");

const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await passwordResetService.requestPasswordReset(email);

  return res.status(200).json({
    success: true,
    message: "Password reset link sent successfully",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  await passwordResetService.resetPassword(token, newPassword);

  return res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});

const validateResetToken = asyncHandler(async (req, res) => {
  const { token } = req.body;

  await passwordResetService.validateResetToken(token);

  return res.status(200).json({
    success: true,
    message: "Password reset token is valid",
  });
});

module.exports = {
  requestPasswordReset,
  resetPassword,
  validateResetToken,
};
