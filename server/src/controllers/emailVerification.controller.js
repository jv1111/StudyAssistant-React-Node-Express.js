const emailVerificationService = require("../services/emailVerification.service");

const asyncHandler = require("../utils/asyncHandler.js");

const { successResponse } = require("../utils/response.js");

const {
  createUserResponse,
} = require("../utils/responseFormatters/authResponse.js");

const createVerification = asyncHandler(async (req, res) => {
  const { email, type } = req.body;

  const { email: verifiedEmail } =
    await emailVerificationService.createVerification(
      req.user._id,
      email,
      type,
    );

  successResponse(res, 200, {
    message: "Verification code sent successfully",
    email: verifiedEmail,
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const user = await emailVerificationService.verifyEmail(req.user._id, code);

  successResponse(res, 200, {
    message: "Email verified successfully",
    user: createUserResponse(user),
  });
});

const resendVerification = asyncHandler(async (req, res) => {
  const { email } = await emailVerificationService.resendVerification(
    req.user._id,
  );

  successResponse(res, 200, {
    message: "Verification code sent successfully",
    email,
  });
});

module.exports = {
  createVerification,
  verifyEmail,
  resendVerification,
};
