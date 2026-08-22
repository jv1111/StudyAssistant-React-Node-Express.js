const fs = require("fs");
const util = require("util");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const GoogleUser = require("../models/googleUser.model");
const TokenRequest = require("../models/tokenRequest.model");

const {
  generateToken,
  insertTokenToDatabase,
} = require("../utils/tokenGenerator");

const sendEmail = require("../utils/sendEmail");
const { VerifacationLinkBuilder } = require("../utils/htmlBuilder");
const AppError = require("../utils/AppError");

const unlinkFile = util.promisify(fs.unlink);

const changePass = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const passwordMatched = await bcrypt.compare(oldPassword, user.password);

  if (!passwordMatched) {
    throw new AppError("Invalid password", 401);
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  await User.findByIdAndUpdate(userId, {
    password: newHashedPassword,
  });

  return {
    success: true,
  };
};

const changeProfile = async (userId, filePath) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await deleteLastProfileImg(user);

  const imgUrl = filePath.replace("public", process.env.BASE_URL);

  await User.findByIdAndUpdate(userId, {
    profileImg: {
      url: imgUrl,
      filePath,
    },
  });

  return {
    success: true,
    message: "Profile picture updated",
  };
};

const deleteLastProfileImg = async (user) => {
  const filePath = user.profileImg?.filePath;

  if (!filePath) {
    return;
  }

  try {
    await unlinkFile(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
};

const getProfileImg = async (userId) => {
  const user = await User.findById(userId);

  if (user) {
    return {
      url: user.profileImg?.url,
    };
  }

  const googleUser = await GoogleUser.findById(userId);

  if (!googleUser) {
    throw new AppError("User not found", 404);
  }

  return {
    url: googleUser.profileImg?.url,
  };
};

const addOrUpdateEmail = async (userId, newEmail) => {
  const existingUser = await User.findOne({
    email: newEmail,
  });

  const existingGoogleUser = await GoogleUser.findOne({
    email: newEmail,
  });

  if (existingUser || existingGoogleUser) {
    throw new AppError("Email already exists", 409);
  }

  const googleUser = await GoogleUser.findById(userId);

  if (googleUser) {
    throw new AppError("Cannot change email for a Google account", 400);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const token = generateToken(userId, "addOrUpdateEmail");

  const data = {
    email: newEmail,
  };

  await insertTokenToDatabase(userId, data, token, "addOrUpdateEmail");

  const url = `${process.env.CLIENT_URL}/verification/verifyEmail/${userId}/${token}`;

  await sendEmail(
    process.env.MAILER_USER,
    newEmail,
    "Email Verification",
    url,
    VerifacationLinkBuilder(
      "Verify your email",
      "Click the button below to verify your email",
      url,
      "Verify Email",
    ),
  );

  return {
    success: true,
  };
};

const sendResetPassRequest = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("This email is not registered", 404);
  }

  const token = generateToken();

  const data = {
    email,
  };

  await insertTokenToDatabase(user._id, data, token, "resetPass");

  const url = `${process.env.CLIENT_URL}/verification/resetPassword/${user._id}/${token}`;

  await sendEmail(
    process.env.MAILER_USER,
    email,
    "Reset Password",
    url,
    VerifacationLinkBuilder(
      "Reset your password",
      "Click the button below to reset your password",
      url,
      "Reset your password",
    ),
  );

  return {
    success: true,
  };
};

const verifyEmail = async (userId, token) => {
  const filter = {
    userId,
    token,
    type: "addOrUpdateEmail",
  };

  const registeredToken = await TokenRequest.findOne(filter);

  if (!registeredToken) {
    throw new AppError("Invalid or expired verification link", 400);
  }

  await User.findByIdAndUpdate(userId, {
    email: registeredToken.data.email,
    emailVerified: true,
  });

  await TokenRequest.findOneAndDelete(filter);

  return {
    success: true,
    message: "Email has been verified",
  };
};

const verifyToken = async (userId, token, type) => {
  const filter = {
    userId,
    token,
    type,
  };

  const registeredToken = await TokenRequest.findOne(filter);

  if (!registeredToken) {
    throw new AppError("Invalid or expired token", 400);
  }

  await TokenRequest.findOneAndDelete(filter);

  return {
    success: true,
    message: "Token is valid",
  };
};

const resetPass = async (userId, newPassword) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  await User.findByIdAndUpdate(userId, {
    password: newHashedPassword,
  });

  return {
    success: true,
    message: "Password changed",
  };
};

module.exports = {
  changePass,
  changeProfile,
  getProfileImg,
  addOrUpdateEmail,
  sendResetPassRequest,
  verifyEmail,
  verifyToken,
  resetPass,
};
