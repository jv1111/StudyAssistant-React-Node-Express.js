const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User = require("../models/user.model");
const EmailVerification = require("../models/emailVerification.model");

const AppError = require("../utils/AppError");
const sendEmail = require("../utils/sendEmail");
const verificationEmail = require("../emails/verificationEmail");

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

  await sendEmail(
    normalizedEmail,
    "Verify your email address",
    verificationEmail(code, CODE_EXPIRATION_MINUTES),
  );

  return {
    email: normalizedEmail,
  };
};
