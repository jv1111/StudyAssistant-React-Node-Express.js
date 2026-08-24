const emailVerificationService = require("../services/emailVerification.service");

const asyncHandler = require("../utils/asyncHandler.js");

const createVerification = asyncHandler(async (req, res) => {
  const { email, type } = req.body;

  const { email: verifiedEmail } =
    await emailVerificationService.createVerification(
      req.user._id,
      email,
      type,
    );

  return res.status(200).json({
    success: true,
    message: "Verification code sent successfully",
    email: verifiedEmail,
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
  const { email } = await emailVerificationService.resendVerification(
    req.user._id,
  );

  return res.status(200).json({
    success: true,
    message: "Verification code sent successfully",
    email,
  });
});

module.exports = {
  createVerification,
  verifyEmail,
  resendVerification,
};
