const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User = require("../models/user.model");
const EmailVerification = require("../models/emailVerification.model");

const AppError = require("../utils/AppError");

const CODE_EXPIRATION_MINUTES = 10;
const MAX_ATTEMPTS = 5;

const generateVerificationCode = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

const createVerification = async (userId, email) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.emailVerified) {
    throw new AppError("Email is already verified", 400);
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    email: normalizedEmail,
    _id: { $ne: user._id },
  });

  if (existingUser) {
    throw new AppError("Email is already in use", 409);
  }

  const code = generateVerificationCode();
  const codeHash = await bcrypt.hash(code, 10);

  const expiresAt = new Date(Date.now() + CODE_EXPIRATION_MINUTES * 60 * 1000);

  await EmailVerification.findOneAndUpdate(
    { user: user._id },
    {
      user: user._id,
      email: normalizedEmail,
      codeHash,
      expiresAt,
      attempts: 0,
    },
    {
      upsert: true,
      new: true,
    },
  );

  return {
    email: normalizedEmail,
    code,
  };
};

const verifyEmail = async (userId, code) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.emailVerified) {
    throw new AppError("Email is already verified", 400);
  }

  const verification = await EmailVerification.findOne({
    user: user._id,
  });

  if (!verification) {
    throw new AppError("Verification code is invalid or expired", 400);
  }

  if (verification.expiresAt < new Date()) {
    await verification.deleteOne();

    throw new AppError("Verification code has expired", 400);
  }

  if (verification.attempts >= MAX_ATTEMPTS) {
    await verification.deleteOne();

    throw new AppError("Too many verification attempts", 429);
  }

  const codeMatch = await bcrypt.compare(code, verification.codeHash);

  if (!codeMatch) {
    verification.attempts += 1;
    await verification.save();

    throw new AppError("Invalid verification code", 400);
  }

  user.email = verification.email;
  user.emailVerified = true;

  await user.save();

  await verification.deleteOne();

  return user;
};

const resendVerification = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.emailVerified) {
    throw new AppError("Email is already verified", 400);
  }

  const verification = await EmailVerification.findOne({
    user: user._id,
  });

  if (!verification) {
    throw new AppError("No email verification request found", 404);
  }

  return createVerification(user._id, verification.email);
};

module.exports = {
  createVerification,
  verifyEmail,
  resendVerification,
};
