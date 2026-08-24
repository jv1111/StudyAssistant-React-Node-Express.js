const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User = require("../models/user.model");
const PasswordReset = require("../models/passwordReset.model");

const AppError = require("../utils/AppError");

const sendEmail = require("../utils/sendEmail");
const passwordResetEmail = require("../emails/passwordResetEmail");

const RESET_TOKEN_EXPIRATION_MINUTES = 10;

const findPasswordResetByToken = async (token) => {
  const passwordResets = await PasswordReset.find();

  for (const passwordReset of passwordResets) {
    const tokenMatch = await bcrypt.compare(token, passwordReset.tokenHash);

    if (tokenMatch) {
      return passwordReset;
    }
  }

  return null;
};

const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const requestPasswordReset = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const token = generateResetToken();
  const tokenHash = await bcrypt.hash(token, 10);

  const expiresAt = new Date(
    Date.now() + RESET_TOKEN_EXPIRATION_MINUTES * 60 * 1000,
  );

  await PasswordReset.findOneAndUpdate(
    { user: user._id },
    {
      user: user._id,
      tokenHash,
      expiresAt,
    },
    {
      upsert: true,
      new: true,
    },
  );

  await sendEmail(
    normalizedEmail,
    "Reset your password",
    passwordResetEmail(token, RESET_TOKEN_EXPIRATION_MINUTES),
  );
};

const resetPassword = async (token, newPassword) => {
  const passwordResets = await PasswordReset.find();

  let passwordReset = null;

  for (const reset of passwordResets) {
    const tokenMatch = await bcrypt.compare(token, reset.tokenHash);

    if (tokenMatch) {
      passwordReset = reset;
      break;
    }
  }

  if (!passwordReset) {
    throw new AppError("Invalid or expired password reset link", 400);
  }

  if (passwordReset.expiresAt < new Date()) {
    await passwordReset.deleteOne();

    throw new AppError("Password reset link has expired", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const user = await User.findById(passwordReset.user);

  if (!user) {
    await passwordReset.deleteOne();

    throw new AppError("User not found", 404);
  }

  user.password = hashedPassword;

  await user.save();
  await passwordReset.deleteOne();

  return user;
};

const validateResetToken = async (token) => {
  const passwordReset = await findPasswordResetByToken(token);

  if (!passwordReset) {
    throw new AppError("Invalid or expired password reset link", 400);
  }

  if (passwordReset.expiresAt < new Date()) {
    await passwordReset.deleteOne();

    throw new AppError("Password reset link has expired", 400);
  }

  return true;
};

module.exports = {
  requestPasswordReset,
  resetPassword,
  validateResetToken,
};
