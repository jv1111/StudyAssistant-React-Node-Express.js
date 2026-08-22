const emailVerificationService = require("../services/emailVerification.service");
const asyncHandler = require("../utils/asyncHandler.js");

const createVerification = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const { email: verifiedEmail, code } =
    await emailVerificationService.createVerification(req.user._id, email);

  return res.status(200).json({
    success: true,
    message: "Verification code sent successfully",
    email: verifiedEmail,
    code, // Remove this once email sending is implemented
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const user = await emailVerificationService.verifyEmail(req.user._id, code);

  return res.status(200).json({
    success: true,
    message: "Email verified successfully",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      emailVerified: user.emailVerified,
    },
  });
});

const resendVerification = asyncHandler(async (req, res) => {
  const { email, code } = await emailVerificationService.resendVerification(
    req.user._id,
  );

  return res.status(200).json({
    success: true,
    message: "Verification code sent successfully",
    email,
    code, // Remove this once email sending is implemented
  });
});

module.exports = {
  createVerification,
  verifyEmail,
  resendVerification,
};
